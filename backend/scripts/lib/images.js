const crypto = require("crypto");
const { objectExists, uploadBuffer, publicUrl } = require("../../src/lib/storage");

const MEALDB = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

async function fetchWithTimeout(url, ms = 20000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal, redirect: "follow" });
  } finally {
    clearTimeout(t);
  }
}

async function downloadBytes(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetchWithTimeout(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = (res.headers.get("content-type") || "image/jpeg")
        .split(";")[0]
        .trim();
      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length < 100) throw new Error("suspiciously small image");
      return { buffer, contentType };
    } catch (err) {
      if (attempt === 2) throw err;
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
    }
  }
}

// Cache the meal list per TheMealDB category; pick one deterministically by key.
const mealListCache = new Map();
async function mealImageUrl(category, key) {
  if (!mealListCache.has(category)) {
    const res = await fetchWithTimeout(`${MEALDB}${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error(`themealdb ${res.status}`);
    const { meals } = await res.json();
    mealListCache.set(
      category,
      (meals || []).map((m) => m.strMealThumb).filter(Boolean)
    );
  }
  const list = mealListCache.get(category);
  if (!list.length) throw new Error(`no meals for category ${category}`);
  const h = crypto.createHash("md5").update(key).digest().readUInt32BE(0);
  return list[h % list.length];
}

const PALETTE = ["#E94339", "#F6A21E", "#4C9A6E", "#3B6FB6", "#8659B5", "#C64D77"];
function svgPlaceholder(label, seed = 0) {
  const bg = PALETTE[seed % PALETTE.length];
  const safe = String(label).replace(/[<>&]/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="${bg}"/>
  <text x="400" y="312" font-family="system-ui,sans-serif" font-size="40" font-weight="700"
        fill="#ffffff" text-anchor="middle">${safe}</text>
</svg>`;
  return { buffer: Buffer.from(svg), contentType: "image/svg+xml" };
}

function sourceUrl(source) {
  const w = source.w || 800;
  const h = source.h || 600;
  if (source.flickr) {
    return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(
      source.flickr
    )}?lock=${source.lock || 1}`;
  }
  return `https://picsum.photos/seed/${encodeURIComponent(source.seed)}/${w}/${h}`;
}

/**
 * Public URL for an image at `key`, fetching + uploading on first run.
 * `source` is one of `{ meal: "<TheMealDB category>" }`,
 * `{ flickr: "<keywords>", lock }`, or `{ seed, w, h }` (Picsum).
 * Falls back to a generated SVG placeholder if the download fails.
 */
async function ensureImage(key, source, label, seed = 0) {
  if (await objectExists(key)) return publicUrl(key);
  if (await objectExists(`${key}.svg`)) return publicUrl(`${key}.svg`);

  try {
    const url = source.meal
      ? await mealImageUrl(source.meal, key)
      : sourceUrl(source);
    const { buffer, contentType } = await downloadBytes(url);
    process.stdout.write(".");
    return await uploadBuffer(key, buffer, contentType);
  } catch {
    process.stdout.write("!");
    const { buffer, contentType } = svgPlaceholder(label, seed);
    return await uploadBuffer(`${key}.svg`, buffer, contentType);
  }
}

module.exports = { ensureImage };

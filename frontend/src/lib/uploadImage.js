import api from "./api";

// Ask the backend for a presigned URL, PUT the file straight to object
// storage, then return the stable public URL to persist.
export async function uploadImage(file, prefix = "uploads") {
  if (!file) return "";

  const { data } = await api.post("/uploads/presign", {
    contentType: file.type,
    prefix,
  });

  const res = await fetch(data.uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
  if (!res.ok) {
    throw new Error(`Upload failed (${res.status})`);
  }

  return data.publicUrl;
}

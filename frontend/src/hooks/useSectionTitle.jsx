const useSectionTitle = (title, subtitle) => {
  return (
    <div>
      <h1 className="text-5xl text-center text-[#FF5331] font-[800]">
        {title}
      </h1>
      <h2 className="text-lg text-center text-[#121a23] font-[700] italic mt-2">
        {subtitle}
      </h2>
    </div>
  );
};

export default useSectionTitle;

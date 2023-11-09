import AllOffersCard from "./AllOffersCard";

export const AllOffers = () => {
  return (
      <div className="mt-16 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto">
        {Array.from({ length: 8 }, (_, i) => (
          <AllOffersCard key={i}></AllOffersCard>
        ))}
    </div>
  );
};

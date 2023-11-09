const RestaurantsCard = ({ restu }) => {
  const {
    // restaurantId,
    name,
    // liscenceNo,
    address,
    schedule,
    category,
    image,
    contact,
    email,
  } = restu;

  return (
    <div className="card w-96 bg-base-100 shadow-xl border border-green-200">
      <figure>
        <img className="min-w-full max-h-56" src={image} alt="Restaurant" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-sm">Address: {address}</p>
        <p className="text-sm">Contact: {contact}</p>
        <p className="text-sm">Email: {email}</p>
        <p className="text-sm">Category: {category}</p>
        <p className="text-sm">Schedule: {schedule}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-green-600 text-white">View Menu</button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsCard;

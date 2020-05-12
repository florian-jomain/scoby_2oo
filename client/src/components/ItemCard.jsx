import React from "react";

const ItemCard = (props) => {
  const {
    address,
    category,
    description,
    image,
    name,
    quantity,
  } = props.selectedItem;

  console.log(props);
  return (
    <div className='popupCard'>
      <div className='popupCard__image'>
        <img src={image} alt={name} />
      </div>
      <h3>{name}</h3>
      <p>
        Quantity: {quantity} | {category}
      </p>
      <div className='popupCard__description'>
        <p>{description}</p>
      </div>
      <p>{address}</p>
    </div>
  );
};

export default ItemCard;

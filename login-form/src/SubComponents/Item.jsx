function Item({ price, description, image }) {
  return (
    <div className="item-to-buy">
      <p>{price}</p>
      <p>{description}</p>
      {/* <img src={image} /> */}
      <button>Purchase</button>
    </div>
  );
}

export default Item;

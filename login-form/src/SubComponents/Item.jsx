function Item({ price, name }) {
  return (
    <div className="item-to-buy">
      <p>{price}</p>
      <p>{name}</p>
      <button>Purchase</button>
    </div>
  );
}

export default Item;

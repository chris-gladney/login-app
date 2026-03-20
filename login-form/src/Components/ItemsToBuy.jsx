import Item from "../SubComponents/Item";

const testItems = [
  {
    price: "£12",
    description: "Phone case",
    image: "",
  },
  {
    price: "£35",
    description: "Alarm Clock",
    image: "",
  },
  {
    price: "£500",
    description: "Phone",
    image: "",
  },
];

function ItemsToBuy() {
  return (
    <section>
      <h1>Items to buy</h1>
      <h3>Please find a list of items to purchase below</h3>

      <ul>
        {testItems.map((item, i) => {
          return (
            <li key={i}>
              <Item
                price={item.price}
                description={item.description}
                image={item.image}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ItemsToBuy;

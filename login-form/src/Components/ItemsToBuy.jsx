import Item from "../SubComponents/Item";
import LogOutButton from "../SubComponents/LogOutButton";
import { useEffect, useState } from "react";
import api from "../utils/api";

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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  return (
    <section>
      <h1>Items to buy</h1>
      <h3>Please find a list of items to purchase below</h3>

      <ul>
        {products.map((item, i) => {
          return (
            <li key={i}>
              <Item price={item.price} name={item.name} />
            </li>
          );
        })}
      </ul>
      <LogOutButton />
    </section>
  );
}

export default ItemsToBuy;

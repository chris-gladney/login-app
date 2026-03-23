import LogOutButton from "../SubComponents/LogOutButton";
import { useState } from "react";
import api from "../utils/api.js";

function AddItems() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const token = localStorage.getItem("token");

          api
            .post(
              "/products",
              { name, price },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            .then(() => {
              setMessage("Product added");
              setName("");
              setPrice("");
              alert("Message");
              setMessage("");
            })
            .catch((err) => {
              setMessage(err.response?.data?.message || "Error");
            });
        }}
      >
        <label htmlFor="price">Price (£)</label>
        <input
          name="price"
          id="price"
          type="number"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        {/* <label htmlFor="description">description</label>
        <input type="text" /> */}
        <button>Add Item</button>
      </form>
      <LogOutButton />
    </>
  );
}

export default AddItems;

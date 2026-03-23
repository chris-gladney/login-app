import LogOutButton from "../SubComponents/LogOutButton";

function AddItems() {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="price">Price (£)</label>
        <input type="number" />
        <br />
        <label htmlFor="description">Description</label>
        <input type="text" />
        <button>Add Item</button>
      </form>
      <LogOutButton />
    </>
  );
}

export default AddItems;

import React, { useState } from "react";

function ItemList() {
  // array state
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // add item
  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(),   // unique key
      text: input
    };

    setItems([...items, newItem]);
    setInput("");
  };

  // remove item
  const removeItem = (id) => {
    const updatedList = items.filter(item => item.id !== id);
    setItems(updatedList);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Item List</h2>

      <input
        type="text"
        placeholder="Enter item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addItem}>Add</button>

      {/* Conditional rendering */}
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.text}
              <button
                onClick={() => removeItem(item.id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
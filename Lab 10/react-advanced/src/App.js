import React from "react";
import UserForm from "./exercise4_form/UserForm";
import ItemList from "./exercise5_list/ItemList";
import FetchData from "./exercise6_api/FetchData";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>React Lab Exercises</h1>

      {/* Exercise 1 */}
      <div style={{ marginBottom: "50px" }}>
        <UserForm />
      </div>

      <hr />

      {/* Exercise 2 */}
      <div style={{ margin: "50px 0" }}>
        <ItemList />
      </div>

      <hr />

      {/* Exercise 3 */}
      <div style={{ marginTop: "50px" }}>
        <FetchData />
      </div>
    </div>
  );
}

export default App;
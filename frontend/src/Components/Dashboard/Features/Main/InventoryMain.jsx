import React, { useState } from "react";
import { connect } from "react-redux";
import { inventoryByClinic } from "../../../../ReduxActionsMain/inventoryItemsActions";
import "./InvMain.css";
import "./Main.css";

export const InventoryMain = ({ user, inventoryByClinic }) => {
  // Existing inventory state
  const [inventoryItems, setInventoryItems] = useState([
    {
      type: "Office Supply",
      item: "Business Cards",
      count: 10,
      status: "Insufficient",
    },
    {
      type: "Medical Equipment",
      item: "Electrodes",
      count: 15,
      status: "Available",
    },
    {
      type: "Office Supply",
      item: "Printing Paper",
      count: 20,
      status: "Available",
    },
    { type: "Cleaning Supply", item: "Paper Towels", count: 5, status: "Low" },
  ]);

  // Ordered inventory state
  const [orderedItems, setOrderedItems] = useState([
    {
      type: "Medical Equipment",
      item: "Bandages",
      count: 50,
      orderDate: "2024-11-01",
    },
    {
      type: "Cleaning Supply",
      item: "Disinfectant",
      count: 30,
      orderDate: "2024-10-28",
    },
    {
      type: "Office Supply",
      item: "Ink Cartridges",
      count: 10,
      orderDate: "2024-10-25",
    },
  ]);

  // State for new ordered item input
  const [newOrderedItem, setNewOrderedItem] = useState({
    type: "",
    item: "",
    count: "",
    orderDate: "",
  });

  // State for new inventory item input for available supplies
  const [newInventoryItem, setNewInventoryItem] = useState({
    type: "",
    item: "",
    count: "",
    status: "",
  });

  const [isEditingOrdered, setIsEditingOrdered] = useState(false);
  const [editOrderedIndex, setEditOrderedIndex] = useState(null);

  const [isEditingInventory, setIsEditingInventory] = useState(false);
  const [editInventoryIndex, setEditInventoryIndex] = useState(null);

  // Handle changes for ordered inventory input
  const handleOrderedChange = (e) => {
    const { name, value } = e.target;
    setNewOrderedItem({ ...newOrderedItem, [name]: value });
  };

  // Handle changes for available inventory input
  const handleInventoryChange = (e) => {
    const { name, value } = e.target;
    setNewInventoryItem({ ...newInventoryItem, [name]: value });
  };

  // Add or update ordered inventory item
  const addOrUpdateOrderedItem = () => {
    if (
      newOrderedItem.type &&
      newOrderedItem.item &&
      newOrderedItem.count &&
      newOrderedItem.orderDate
    ) {
      if (isEditingOrdered) {
        // Update the existing ordered item
        const updatedOrderedItems = [...orderedItems];
        updatedOrderedItems[editOrderedIndex] = newOrderedItem;
        setOrderedItems(updatedOrderedItems);
        setIsEditingOrdered(false);
        setEditOrderedIndex(null);
      } else {
        // Add a new ordered item
        setOrderedItems([...orderedItems, newOrderedItem]);
      }
      setNewOrderedItem({ type: "", item: "", count: "", orderDate: "" });
    } else {
      alert("Please fill out all fields before adding an ordered item.");
    }
  };

  // Add or update available inventory item
  const addOrUpdateInventoryItem = () => {
    if (
      newInventoryItem.type &&
      newInventoryItem.item &&
      newInventoryItem.count &&
      newInventoryItem.status
    ) {
      if (isEditingInventory) {
        // Update the existing inventory item
        const updatedInventoryItems = [...inventoryItems];
        updatedInventoryItems[editInventoryIndex] = newInventoryItem;
        setInventoryItems(updatedInventoryItems);
        setIsEditingInventory(false);
        setEditInventoryIndex(null);
      } else {
        // Add a new inventory item
        setInventoryItems([...inventoryItems, newInventoryItem]);
      }
      setNewInventoryItem({ type: "", item: "", count: "", status: "" });
    } else {
      alert("Please fill out all fields before adding an inventory item.");
    }
  };

  // Handle edit for ordered inventory
  const handleEditOrdered = (index) => {
    setNewOrderedItem(orderedItems[index]);
    setIsEditingOrdered(true);
    setEditOrderedIndex(index);
  };

  // Handle edit for available inventory
  const handleEditInventory = (index) => {
    setNewInventoryItem(inventoryItems[index]);
    setIsEditingInventory(true);
    setEditInventoryIndex(index);
  };

  const handleOrderEdit = () => {
    setIsEditingOrdered(false);
    setNewOrderedItem({ type: "", item: "", count: "", orderDate: "" });
  }

  const handleEditInv = () => {
    setIsEditingInventory(false);
    setNewInventoryItem({ type: "", item: "", count: "", status: "" });
  }

  // Handle marking an item as "Delivered"
  const markAsDelivered = () => {
    if (isEditingOrdered && editOrderedIndex !== null) {
      const deliveredItem = newOrderedItem;
      setInventoryItems([
        ...inventoryItems,
        {
          type: deliveredItem.type,
          item: deliveredItem.item,
          count: deliveredItem.count,
          status: "Available",
        },
      ]);
      const updatedOrderedItems = orderedItems.filter(
        (_, i) => i !== editOrderedIndex
      );
      setOrderedItems(updatedOrderedItems);
      setIsEditingOrdered(false);
      setEditOrderedIndex(null);
      setNewOrderedItem({ type: "", item: "", count: "", orderDate: "" });
    } else {
      alert("Please select an item to edit before marking as delivered.");
    }
  };

  return (
    <div className="main-container">
      <div className="inventory-table">
        <h2 className="main-title">Supplies Available</h2>
        <table>
          <thead>
            <tr>
              <th>Item name</th>
              <th>Count</th>
              <th>Status</th>
              <th>Item requested?</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item, index) => (
              <tr key={index} onClick={() => handleEditInventory(index)}>
                <td>{item.item}</td>
                <td>{item.count}</td>
                <td className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-inventory-item-form">
          <h3>
            {isEditingInventory
              ? "Edit Inventory Item"
              : "Add Existing Inventory Item"}
          </h3>
          {isEditingInventory && (
            <button onClick={handleEditInv}>x</button>
          )}
          <select
            name="type"
            value={newInventoryItem.type}
            onChange={handleInventoryChange}
          >
            <option value="">Select Type</option>
            <option value="Office Supply">Office Supply</option>
            <option value="Medical Equipment">Medical Equipment</option>
            <option value="Cleaning Supply">Cleaning Supply</option>
          </select>
          <input
            type="text"
            name="item"
            placeholder="Item name"
            value={newInventoryItem.item}
            onChange={handleInventoryChange}
          />
          <input
            type="number"
            name="count"
            placeholder="Quantity"
            value={newInventoryItem.count}
            onChange={handleInventoryChange}
          />
          <input
            type="number"
            name="count"
            placeholder="insufficint Quantity"
            value={newInventoryItem.count}
            onChange={handleInventoryChange}
          />
          <label>Staple item?</label>
          <input
            type="checkbox"
            name="stapleItem"
            placeholder="staple item?"
            onChange={handleInventoryChange}
          />

          <button onClick={addOrUpdateInventoryItem}>
            {isEditingInventory
              ? "Update Inventory Item"
              : "Add Inventory Item"}
          </button>
        </div>
      </div>

      <div className="ordered-inventory-table">
        <h2 className="main-title">Ordered Inventory</h2>
        <table>
          <thead>
            <tr>
              <th>Item name</th>
              <th>Quantity</th>
              <th>Order date</th>
              <th>Delivery date</th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map((item, index) => (
              <tr key={index} onClick={() => handleEditOrdered(index)}>
                <td>{item.item}</td>
                <td>{item.count}</td>
                <td>{item.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-ordered-item-form">
          <h3>
            {isEditingOrdered ? "Edit Ordered Item" : "Add New Ordered Item"}
          </h3>
          {isEditingOrdered && (
            <button onClick={handleOrderEdit} className="editOrderClose">x</button>
          )}
          <input
            type="text"
            name="item"
            placeholder="Item name"
            value={newOrderedItem.item}
            onChange={handleOrderedChange}
          />
          <input
            type="number"
            name="orderedQuantity"
            placeholder="Ordered quantity"
            value={newOrderedItem.count}
            onChange={handleOrderedChange}
          />
           <label>Order date</label>
          <input
            type="date"
            name="orderDate"
            placeholder="Order Date"
            value={newOrderedItem.orderDate}
            onChange={handleOrderedChange}
          />
          <label>Delivery date</label>
          <input
            type="date"
            name="deliveryDate"
            placeholder="Delivery date"
            value={newOrderedItem.orderDate}
            onChange={handleOrderedChange}
          />
          <button onClick={addOrUpdateOrderedItem}>
            {isEditingOrdered ? "Update Ordered Item" : "Add Ordered Item"}
          </button>
          {isEditingOrdered && (
            <button onClick={markAsDelivered}>Mark as Delivered</button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

const mapDispatchToProps = {
  inventoryByClinic,
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryMain);

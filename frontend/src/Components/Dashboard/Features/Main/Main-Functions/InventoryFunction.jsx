import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  inventoryByClinic,
  createInventoryItems,
  updateInventoryItems,
  deleteInventoryItems,
} from "../../../../../ReduxActionsMain/inventoryItemsActions";
import "../InvMain.css";
import "../Main.css";

export const InventoryFunction = ({
  user,
  inventory,
  inventoryByClinic,
  createInventoryItems,
  updateInventoryItems,
  deleteInventoryItems,
}) => {

  const clinicMapping = {
    east: "1",
    west: "2",
    "upper west": "3",
  };

  const token = localStorage.getItem("jwt");

  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedClinicKey, setSelectedClinicKey] = useState(
    clinicMapping[user?.clinic_location]
  );

  const [isEditingInventory, setIsEditingInventory] = useState(false);
  const [editInventoryIndex, setEditInventoryIndex] = useState(null);

  // State for new inventory item input for available supplies
  const [newInventoryItem, setNewInventoryItem] = useState({
    itemType: "",
    itemName: "",
    count: "",
    warningCount: "",
    stapleItem: "",
  });

  useEffect(() => {
    if (user) {
      inventoryByClinic(token);

      if (user.admin) {
        setIsAdmin(true);
      }
    }
  }, [inventoryByClinic, user, token]);

  console.log(inventory);

  console.log(newInventoryItem);

  // const handleClinicChange = (clinicKey) => {
  //   setSelectedClinicKey(clinicKey);
  // };

  // Handle changes for available inventory input
  const handleInventoryChange = (e) => {
    const { name, value } = e.target;
    setNewInventoryItem({ ...newInventoryItem, [name]: value });
  };

  // Add or update available inventory item
  const addOrUpdateInventoryItem = () => {
    if (
      newInventoryItem.itemType &&
      newInventoryItem.itemName &&
      newInventoryItem.count &&
      newInventoryItem.warningCount &&
      newInventoryItem.stapleItem
    ) {
      if (isEditingInventory) {
        // Update the existing inventory item
        const updatedInventoryItems = [...inventory];
        updatedInventoryItems[editInventoryIndex] = newInventoryItem;

        // patch item here
        // setInventoryItems(updatedInventoryItems);
        setIsEditingInventory(false);
        setEditInventoryIndex(null);
      } else {
        // Add a new inventory item
        // POST Method here
        // setInventoryItems([...inventory, newInventoryItem]);
      }
      setNewInventoryItem({
        itemType: "",
        itemName: "",
        count: "",
        warningCount: "",
        itemStatus: "",
        stapleItem: "",
      });
    } else {
      alert("Please fill out all fields before adding an inventory item.");
    }
  };

  // Handle edit for available inventory
  const handleEditInventory = (index) => {
    setNewInventoryItem(inventory[index]);
    setIsEditingInventory(true);
    setEditInventoryIndex(index);
  };

  const handleEditInv = () => {
    setIsEditingInventory(false);
    setNewInventoryItem({
      itemType: "",
      itemName: "",
      count: "",
      itemStatus: "",
    });
  };

  console.log(inventory[selectedClinicKey])
  return (
    <div>
      {/* Inventory items */}
      {selectedClinicKey && inventory[selectedClinicKey]?.length > 0 ? (
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
              {inventory[selectedClinicKey].map((item, index) => (
                <tr key={index} onClick={() => handleEditInventory(index)}>
                  <td>{item.item_name}</td>
                  <td>{item.count}</td>
                  <td className={`status ${item.item_status.toLowerCase()}`}>
                    {item.item_status}
                  </td>
                  <td>{item.item_requested ? "True" : "False"}</td>
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
            {isEditingInventory && <button onClick={handleEditInv}>x</button>}
            <select
              name="itemType"
              value={newInventoryItem?.itemType}
              onChange={handleInventoryChange}
            >
              <option value="">Select Type</option>
              <option value="Office Supply">Office Supply</option>
              <option value="Medical Equipment">Medical Equipment</option>
              <option value="Cleaning Supply">Cleaning Supply</option>
            </select>
            <input
              type="text"
              name="itemName"
              placeholder="Item name"
              value={newInventoryItem?.itemName}
              onChange={handleInventoryChange}
            />
            <input
              type="number"
              name="count"
              placeholder="Quantity"
              value={newInventoryItem?.count}
              onChange={handleInventoryChange}
            />
            <input
              type="number"
              name="warningCount"
              placeholder="insufficint Quantity"
              value={newInventoryItem?.warningCount}
              onChange={handleInventoryChange}
            />
            <label>Staple item?</label>
            <input
              type="checkbox"
              name="stapleItem"
              value={newInventoryItem?.stapleItem ? true : false}
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
      ) : (
        <p>No inventory insufficient data available for this clinic</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
  inventory: state.inventoryItem.inv,
});

const mapDispatchToProps = {
  inventoryByClinic,
  createInventoryItems,
  updateInventoryItems,
  deleteInventoryItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryFunction);

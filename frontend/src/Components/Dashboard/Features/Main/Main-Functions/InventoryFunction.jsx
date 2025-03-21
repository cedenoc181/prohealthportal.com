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
//   const [editInventoryIndex, setEditInventoryIndex] = useState(null);

  // State for new inventory item input for available supplies
  const [newInventoryItem, setNewInventoryItem] = useState({
    item_type: "",
    item_name: "",
    count: "",
    warning_count: "",
    staple_item: "",
    index: "",
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
  const addOrUpdateInventoryItem = async () => {
    if (
      newInventoryItem.item_type &&
      newInventoryItem.item_name &&
      newInventoryItem.count &&
      newInventoryItem.warning_count &&
      newInventoryItem.staple_item !== ""
    ) {
        
      try {
        if (isEditingInventory) {
          // ✅ UPDATE INVENTORY ITEM
          const updatedInfo = {
            clinic_id: parseInt(selectedClinicKey, 10),
            user_id: user.id,
            item_type: newInventoryItem.item_type,
            item_name: newInventoryItem.item_name,
            count: parseInt(newInventoryItem.count, 10), // Convert to integer
            warning_count: parseInt(newInventoryItem.warning_count, 10), // Convert to integer
            staple_item: newInventoryItem.staple_item,
          };

          await updateInventoryItems(newInventoryItem.index, updatedInfo);

          alert("Inventory item updated successfully!");
        } else {
          // ✅ CREATE INVENTORY ITEM
          const newItem = {
            clinic_id: parseInt(selectedClinicKey, 10),
            user_id: user.id,
            item_type: newInventoryItem.item_type,
            item_name: newInventoryItem.item_name,
            count: parseInt(newInventoryItem.count, 10), // Convert to integer
            warning_count: parseInt(newInventoryItem.warning_count, 10), // Convert to integer
            staple_item: newInventoryItem.staple_item
          };

          await createInventoryItems(newItem, token);
          alert("Inventory item created successfully!");
        }

        // ✅ RESET STATE
        setNewInventoryItem({
            item_type: "",
            item_name: "",
            count: "",
            warning_count: "",
            item_status: "",
            staple_item: "",
            index: "",
        });
        setIsEditingInventory(false);
        // setEditInventoryIndex(null);

        // ✅ REFETCH INVENTORY AFTER CHANGES
        await inventoryByClinic(token);
      } catch (error) {
        console.error("Failed to create or update inventory item:", error);
        alert("Failed to update or create inventory item.");
      }
    } else {
      alert("Please fill out all fields before adding an inventory item.");
    }
  };

  // Handle edit for available inventory
  const handleEditInventory = (item, index) => {
    console.log(item)
    console.log(index + 1) // plus one matches the index to its actual db id
    setNewInventoryItem({
      item_type: item?.item_type,
      item_name: item?.item_name,
      count: item?.count,
      warning_count: item?.warning_count,
      staple_item: item?.staple_item || false,
      index: index + 1// Ensure a boolean value
    });
    setIsEditingInventory(true);
    // setEditInventoryIndex(item);
  };

  const handleEditInv = () => {
    setIsEditingInventory(false);
    setNewInventoryItem({
        item_type: "",
        item_name: "",
        count: "",
        warning_count: "",
        staple_item: "",
    });
  };

  console.log(inventory[selectedClinicKey]);
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
                <tr key={index} onClick={() => handleEditInventory(item, index)}>
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
              name="item_type"
              value={newInventoryItem?.item_type || ""}
              onChange={handleInventoryChange}
            >
              <option value="">Select Type</option>
              <option value="Office Supply">Office Supply</option>
              <option value="Medical Equipment">Medical Equipment</option>
              <option value="Cleaning Supply">Cleaning Supply</option>
            </select>
            <input
              type="text"
              name="item_name"
              placeholder="Item name"
              value={newInventoryItem?.item_name || ""}
              onChange={handleInventoryChange}
            />
            <input
              type="number"
              name="count"
              placeholder="Quantity"
              value={newInventoryItem?.count || ""}
              onChange={handleInventoryChange}
            />
            <input
              type="number"
              name="warning_count"
              placeholder="insufficint Quantity"
              value={newInventoryItem?.warning_count || ""}
              onChange={handleInventoryChange}
            />
            <label>Staple item?</label>
            <input
              type="checkbox"
              name="staple_item"
              checked={!!newInventoryItem?.staple_item}
              onChange={(e) =>
                setNewInventoryItem({
                  ...newInventoryItem,
                  staple_item: e.target.checked,
                })
              }
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

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
  clinicSelected,
}) => {
  const token = localStorage.getItem("jwt");

  const [selectedClinicKey, setSelectedClinicKey] = useState(null);

  const [isEditingInventory, setIsEditingInventory] = useState(false);

  // State for new inventory item input for available supplies
  const [newInventoryItem, setNewInventoryItem] = useState({
    item_type: "",
    item_name: "",
    count: "",
    warning_count: "",
    staple_item: "",
  });

  useEffect(() => {
    if (user) {
      inventoryByClinic(token);
      setSelectedClinicKey(clinicSelected);
      setIsEditingInventory(false);
      setNewInventoryItem({
        item_type: "",
        item_name: "",
        count: "",
        warning_count: "",
        staple_item: "",
      });
    }
  }, [inventoryByClinic, clinicSelected, user, token]);

  // Handle changes for available inventory input
  const handleInventoryChange = (e) => {
    const { name, value } = e.target;
    setNewInventoryItem({ ...newInventoryItem, [name]: value });
  };

  // Handle edit for available inventory
  const handleEditInventory = (item) => {
    console.log(item.id);

    setNewInventoryItem({
      ...item,
    });
    console.log(newInventoryItem);
    setIsEditingInventory(true);
  };

  const closeEditInv = () => {
    setIsEditingInventory(false);
    setNewInventoryItem({
      item_type: "",
      item_name: "",
      count: "",
      warning_count: "",
      staple_item: "",
    });
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

          await updateInventoryItems(newInventoryItem.id, updatedInfo, token);

          alert("Inventory item updated successfully!");
        } else {
          // ✅ CREATE INVENTORY ITEM
          const newItem = {
            clinic_id: parseInt(selectedClinicKey, 10),
            user_id: user?.id,
            item_type: newInventoryItem.item_type,
            item_name: newInventoryItem.item_name,
            count: parseInt(newInventoryItem.count, 10), // Convert to integer
            warning_count: parseInt(newInventoryItem.warning_count, 10), // Convert to integer
            staple_item: newInventoryItem.staple_item,
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
        });
        setIsEditingInventory(false);
      } catch (error) {
        console.error("Failed to create or update inventory item:", error);
        alert("Failed to update or create inventory item.");
      }
    } else {
      alert("Please fill out all fields before adding an inventory item.");
    }
  };

  const deleteInvItem = async () => {
    if (newInventoryItem?.id != null) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        try {
          // const success = await deleteInventoryItems(newInventoryItem.index, token);
          await deleteInventoryItems(newInventoryItem.id, token);
          alert("Inventory item was deleted!");

          setIsEditingInventory(false);

          setNewInventoryItem({
            item_type: "",
            item_name: "",
            count: "",
            warning_count: "",
            item_status: "",
            staple_item: "",
          });
        } catch (error) {
          console.error("Failed to delete inventory item:", error);
          alert("Failed to delete inventory item.");
        }
      }
    }
  };

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
                <tr key={index} onClick={() => handleEditInventory(item)}>
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
            {isEditingInventory && (
              <div className="closeButton">
                <svg
                  onClick={closeEditInv}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x "
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
            )}
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
            {isEditingInventory ? (
              <svg
                onClick={deleteInvItem}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            ) : (
              ""
            )}

            <button onClick={addOrUpdateInventoryItem}>
              {isEditingInventory
                ? "Update Inventory Item"
                : "Add Inventory Item"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>No inventory items available for this clinic, add below.</p>
          <div className="add-inventory-item-form">
            <h3>
              {isEditingInventory
                ? "Edit Inventory Item"
                : "Add Existing Inventory Item"}
            </h3>
            {isEditingInventory && <button onClick={closeEditInv}>x</button>}
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
            {isEditingInventory ? (
              <svg
                onClick={deleteInvItem}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            ) : (
              ""
            )}

            <button onClick={addOrUpdateInventoryItem}>
              {isEditingInventory
                ? "Update Inventory Item"
                : "Add Inventory Item"}
            </button>
          </div>
        </div>
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

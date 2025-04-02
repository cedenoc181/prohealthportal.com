import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
receivedOrderedItemsGroupedByClinics,
  pendingOrderedItemsByClinic,
  createOrderedItems,
  updateOrderedItems,
  deleteOrderedItems,
} from "../../../../../ReduxActionsMain/orderedItemsAction";
import "../InvMain.css";
import "../Main.css";

export const OrderedFunction = ({
  user,
  orderedItems,
  orderedItemsNotReceived,
  receivedOrderedItemsGroupedByClinics,
  pendingOrderedItemsByClinic,
  createOrderedItems,
  updateOrderedItems,
  deleteOrderedItems,
  clinicSelected,
}) => {
  const token = localStorage.getItem("jwt");

  const [selectedClinicKey, setSelectedClinicKey] = useState(null);

  useEffect(() => {
    if (user) {
      receivedOrderedItemsGroupedByClinics(token);
      pendingOrderedItemsByClinic(token);
      setSelectedClinicKey(clinicSelected);
    }
  }, [receivedOrderedItemsGroupedByClinics, pendingOrderedItemsByClinic, clinicSelected, user, token]);

// receivedOrderedItemsGroupedByClinics

  console.log("ALL ORDERED ITEMS FOR ALL CLINICS:", orderedItems);
  console.log("ALL ORDERED ITEMS not received FOR USERS CLINIC:", orderedItemsNotReceived[selectedClinicKey]);

  console.log("Current clinic selected:", clinicSelected);

  // State for new ordered item input
  const [newOrderedItem, setNewOrderedItem] = useState({
    item_type: "",
    item_name: "",
    item_link: "",
    order_quantity: "",
    order_date: "",
    delivery_date: "",
    order_received: false,
  });

  const [isEditingOrdered, setIsEditingOrdered] = useState(false);

  // Handle changes for ordered inventory input
  const handleOrderedChange = (e) => {
    const { name, value } = e.target;
    setNewOrderedItem({ ...newOrderedItem, [name]: value });
  };

    // Handle edit for ordered inventory
    const handleEditOrdered = (item) => {
        console.log("item being handled handleEditOrdered:",item);
        setNewOrderedItem({ ...item });
        setIsEditingOrdered(true);
      };
    
      const closeEditOrder = () => {
        setIsEditingOrdered(false);
        setNewOrderedItem({
            item_type: "",
            item_name: "",
            item_link: "",
            order_quantity: "",
            order_date: "",
            delivery_date: "",
            order_received: false,
        });
      };


  // Add or update ordered inventory item
  const addOrUpdateOrderedItem = async () => {
    if (
      newOrderedItem.item_type &&
      newOrderedItem.item_name &&
      newOrderedItem.order_quantity &&
      newOrderedItem.order_date
    ) {
      try {
        if (isEditingOrdered) {
          // ✅ UPDATE ORDERED ITEM
          const updatedItem = {
            ...newOrderedItem,
            user_id: user.id,
            clinic_id: parseInt(selectedClinicKey, 10),
            order_quantity: parseInt(newOrderedItem.order_quantity, 10),
          };

    
          await updateOrderedItems(newOrderedItem.id, updatedItem, token);
          alert("Ordered item updated successfully!");
        } else {
          // ✅ CREATE ORDERED ITEM
          const newItem = {
            ...newOrderedItem,
            user_id: user.id,
            clinic_id: parseInt(selectedClinicKey, 10),
            order_quantity: parseInt(newOrderedItem.order_quantity, 10),
          };

          await createOrderedItems(newItem, token);
          alert("Ordered item created successfully!");
        }

        // ✅ RESET STATE
        setNewOrderedItem({
            item_type: "",
            item_name: "",
            item_link: "",
            order_quantity: "",
            order_date: "",
            delivery_date: "",
            order_received: false,
        });
        setIsEditingOrdered(false);

        // ✅ REFETCH DATA AFTER CHANGES
        console.log("FETCHING ORDERED ITEM ADDED")
        await pendingOrderedItemsByClinic(token);

      } catch (error) {
        console.error("Failed to create or update ordered item:", error);
        alert("Failed to update or create ordered item.");
      }
    } else {
      alert("Please fill out all fields before adding an ordered item.");
    }
  };


  // Handle marking an item as "Delivered"
  const markAsDelivered = async () => {
    if (isEditingOrdered && newOrderedItem?.delivery_date) {
        try {
                const markOrderItemDelivered = {
                    order_received: true
                }
        console.log("mark as delivered object:",markOrderItemDelivered.order_received)

     await updateOrderedItems(newOrderedItem.id, markOrderItemDelivered, token);
              alert("Order item is now marked as received!")

    // RESET STATE CLOSE EDIT FORM and refetch OrderItem table
      setNewOrderedItem({ 
        item_type: "",
        item_name: "",
        item_link: "",
        order_quantity: "",
        order_date: "",
        delivery_date: "",
        order_received: false,
       });

       setIsEditingOrdered(false);

       await pendingOrderedItemsByClinic(token);
      } catch (error) {
        console.error("Failed to update orderd item:", error);
        alert("Failed to update orderd item");
      }


    } else {
      alert("Ordered item was not updated.");
    }
  };

  const deleteInvItem = async () => {
    if (newOrderedItem?.id != null) {
        if (window.confirm("Are you sure you want to delete this item?")) {
          try {
            await deleteOrderedItems(newOrderedItem.id, token);
            // console.log(newOrderedItem.id);
            alert("Inventory item was deleted!");
  
            setIsEditingOrdered(false);
  
            setNewOrderedItem({
                item_type: "",
                item_name: "",
                item_link: "",
                order_quantity: "",
                order_date: "",
                delivery_date: "",
                order_received: false,
            });
  
            await  pendingOrderedItemsByClinic(token);
          } catch (error) {
            console.error("Failed to delete ordered item:", error);
            alert("Failed to delete ordered item.");
          }
        }
      }
  };


  const formatDate = (dateString) => {
    if (!dateString) return ''; 

    if (typeof dateString === 'string') {
      const [year, month, day] = dateString.split('-');
      return `${month}/${day}/${year}`;
    }
    return dateString;
  };

  return (
    <div>
      {/* Ordered item */}
      {selectedClinicKey && orderedItems[selectedClinicKey]?.length > 0 ? (
        <div className="ordered-inventory-table">
          <h2 className="main-title">Ordered Inventory</h2>
          <table>
            <thead>
              <tr>
                <th>Item name</th>
                <th>Quantity</th>
                <th>Order date</th>
                <th>Delivery date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderedItemsNotReceived[selectedClinicKey]?.map((item, index) => (
                <tr key={index} onClick={() => handleEditOrdered(item)}>
                  <td>{item.item_name}</td>
                  <td>{item.order_quantity}</td>
                  <td>{formatDate(item.order_date)}</td>
                  <td>{formatDate(item.delivery_date)}</td>
                  <td>
                    {item.order_received === true && "Delivered"}
                    {item.order_received === false && "In Transit"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="add-ordered-item-form">
            <h3>
              {isEditingOrdered ? "Edit Ordered Item" : "Add New Ordered Item"}
            </h3>
            {isEditingOrdered && (
              <button onClick={closeEditOrder} className="editOrderClose">
                x
              </button>
            )}
            <input
              type="text"
              name="item_name"
              placeholder="Item name"
              value={newOrderedItem?.item_name}
              onChange={handleOrderedChange}
            />
              <select
              name="item_type"
              value={newOrderedItem?.item_type || ""}
              onChange={handleOrderedChange}
            >
              <option value="">Select Type</option>
              <option value="Office Supply">Office Supply</option>
              <option value="Medical Equipment">Medical Equipment</option>
              <option value="Cleaning Supply">Cleaning Supply</option>
            </select>

            <input
              type="number"
              name="order_quantity"
              placeholder="Ordered quantity"
              value={newOrderedItem?.order_quantity}
              onChange={handleOrderedChange}
            />
            <label>Order date</label>
            <input
              type="date"
              name="order_date"
              value={newOrderedItem?.order_date || ""}
              onChange={(e) =>
                setNewOrderedItem({
                  ...newOrderedItem,
                  order_date: e.target.value,
                })
              }
            />
            <label>Delivery date</label>
            <input
              type="date"
              name="delivery_date"
              value={newOrderedItem?.delivery_date || ""}
              onChange={(e) =>
                setNewOrderedItem({
                  ...newOrderedItem,
                  delivery_date: e.target.value,
                })
              }
            />
         {isEditingOrdered ? (
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

            <button onClick={addOrUpdateOrderedItem}>
              {isEditingOrdered ? "Update Ordered Item" : "Add Ordered Item"}
            </button>
            {isEditingOrdered && !newOrderedItem.order_received && (
              <button onClick={markAsDelivered}>Mark as Delivered</button>
            )}
          </div>
        </div>
      ) : (
        <div>
            <p>No ordered items available for this clinic, add below.</p>
        <div className="add-ordered-item-form">
        <h3>
              {isEditingOrdered ? "Edit Ordered Item" : "Add New Ordered Item"}
            </h3>
            {isEditingOrdered && (
              <button onClick={closeEditOrder} className="editOrderClose">
                x
              </button>
            )}
            <input
              type="text"
              name="item_name"
              placeholder="Item name"
              value={newOrderedItem?.item_name}
              onChange={handleOrderedChange}
            />
              <select
              name="item_type"
              value={newOrderedItem?.item_type || ""}
              onChange={handleOrderedChange}
            >
              <option value="">Select Type</option>
              <option value="Office Supply">Office Supply</option>
              <option value="Medical Equipment">Medical Equipment</option>
              <option value="Cleaning Supply">Cleaning Supply</option>
            </select>

            <input
              type="number"
              name="order_quantity"
              placeholder="Ordered quantity"
              value={newOrderedItem?.order_quantity}
              onChange={handleOrderedChange}
            />
            <label>Order date</label>
            <input
              type="date"
              name="order_date"
              value={newOrderedItem?.order_date || ""}
              onChange={(e) =>
                setNewOrderedItem({
                  ...newOrderedItem,
                  order_date: e.target.value,
                })
              }
            />
            <label>Delivery date</label>
            <input
              type="date"
              name="delivery_date"
              value={newOrderedItem?.delivery_date || ""}
              onChange={(e) =>
                setNewOrderedItem({
                  ...newOrderedItem,
                  delivery_date: e.target.value,
                })
              }
            />

            <button onClick={addOrUpdateOrderedItem}>
              {isEditingOrdered ? "Update Ordered Item" : "Add Ordered Item"}
            </button>
         </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
  orderedItems: state.orderedItem.data,
  orderedItemsNotReceived: state.orderedItem.data,
});

const mapDispatchToProps = {
  receivedOrderedItemsGroupedByClinics,
  pendingOrderedItemsByClinic,
  createOrderedItems,
  updateOrderedItems,
  deleteOrderedItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderedFunction);

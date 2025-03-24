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

  console.log("Orders received:", orderedItems);
  console.log("orders not received:", orderedItemsNotReceived[selectedClinicKey]);

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
      newOrderedItem?.item_type &&
      newOrderedItem?.item_name &&
      newOrderedItem?.order_quantity &&
      newOrderedItem?.order_date
    ) {
      try {
        if (isEditingOrdered) {
          // ✅ UPDATE ORDERED ITEM
          const updatedItem = {
            ...newOrderedItem,
            clinic_id: parseInt(selectedClinicKey, 10),
            order_quantity: parseInt(newOrderedItem, 10),
          };

          console.log(updatedItem)

          await updateOrderedItems(newOrderedItem.id, updatedItem, token);
          alert("Ordered item updated successfully!");
        } else {
          // ✅ CREATE ORDERED ITEM
          const newItem = {
            ...newOrderedItem,
            user_id: user?.id,
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
        await allOrderedItemsGroupedByClinics(token);
      } catch (error) {
        console.error("Failed to create or update ordered item:", error);
        alert("Failed to update or create ordered item.");
      }
    } else {
      alert("Please fill out all fields before adding an ordered item.");
    }
  };


  // Handle marking an item as "Delivered"
  const markAsDelivered = () => {
    if (isEditingOrdered && newOrderedItem.order_received) {


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
    } else {
      alert("Please select an item to edit before marking as delivered.");
    }
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
              </tr>
            </thead>
            <tbody>
              {orderedItems[selectedClinicKey].map((item, index) => (
                <tr key={index} onClick={() => handleEditOrdered(item)}>
                  <td>{item.item_name}</td>
                  <td>{item.order_quantity}</td>
                  <td>{item.order_date}</td>
                  <td>{item.delivery_date}</td>
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
            {isEditingOrdered && (
              <button onClick={markAsDelivered}>Mark as Delivered</button>
            )}
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
  orderedItems: state.orderedItem.data,
  orderedItemsNotReceived: state.orderedItem.notReceived,
});

const mapDispatchToProps = {
receivedOrderedItemsGroupedByClinics,
  pendingOrderedItemsByClinic,
  createOrderedItems,
  updateOrderedItems,
  deleteOrderedItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderedFunction);

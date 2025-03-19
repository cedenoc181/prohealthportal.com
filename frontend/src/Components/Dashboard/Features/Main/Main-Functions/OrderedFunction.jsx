import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { allOrderedItemsGroupedByClinics, createOrderedItems, updateOrderedItems, deleteOrderedItems } from '../../../../../ReduxActionsMain/orderedItemsAction'
import "../InvMain.css";
import "../Main.css";

export const OrderedFunction = ({ user, orderedItems, allOrderedItemsGroupedByClinics, createOrderedItems, updateOrderedItems, deleteOrderedItems }) => {
  
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
  
  // State for new ordered item input
    const [newOrderedItem, setNewOrderedItem] = useState({
      itemType: "",
      itemName: "",
      count: "",
      orderDate: "",
    });

    const [isEditingOrdered, setIsEditingOrdered] = useState(false);
    const [editOrderedIndex, setEditOrderedIndex] = useState(null);
    
  // Handle changes for ordered inventory input
  const handleOrderedChange = (e) => {
    const { name, value } = e.target;
    setNewOrderedItem({ ...newOrderedItem, [name]: value });
  };

  // Add or update ordered inventory item
  const addOrUpdateOrderedItem = () => {
    if (
      newOrderedItem.itemType &&
      newOrderedItem.itemName &&
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
      setNewOrderedItem({ itemType: "", itemName: "", count: "", orderDate: "" });
    } else {
      alert("Please fill out all fields before adding an ordered item.");
    }
  };

  // Handle edit for ordered inventory
  const handleEditOrdered = (index) => {
    setNewOrderedItem(orderedItems[index]);
    setIsEditingOrdered(true);
    setEditOrderedIndex(index);
  };


  const handleOrderEdit = () => {
    setIsEditingOrdered(false);
    setNewOrderedItem({ itemType: "", itemName: "", count: "", orderDate: "" });
  }

    // Handle marking an item as "Delivered"
    const markAsDelivered = () => {
        if (isEditingOrdered && editOrderedIndex !== null) {
          const deliveredItem = newOrderedItem;
          // patch to ordered item to update index with ordered received attribute to true
          // setInventoryItems([
          //   ...inventory,
          //   {
          //     type: deliveredItem.type,
          //     item: deliveredItem.item,
          //     count: deliveredItem.count,
          //     status: "Available",
          //   },
          // ]);
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
    <div>
 {/* Ordered item */}
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
  )
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    orderedItems: state.orderedItem.data,
})

const mapDispatchToProps = { 
    allOrderedItemsGroupedByClinics, 
    createOrderedItems, 
    updateOrderedItems, 
    deleteOrderedItems 
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderedFunction)
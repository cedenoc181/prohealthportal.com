import React, { useState } from 'react';
import { connect } from 'react-redux';
import './InvMain.css';

export const InventoryMain = (props) => {
  // Existing inventory table state
  const [inventoryItems, setInventoryItems] = useState([
    { type: 'Office Supply', item: 'Business Cards', count: 10, status: 'Insufficient' },
    { type: 'Medical Equipment', item: 'Electrodes', count: 15, status: 'Available' },
    { type: 'Office Supply', item: 'Printing Paper', count: 20, status: 'Available' },
    { type: 'Cleaning Supply', item: 'Paper Towels', count: 5, status: 'Low' },
  ]);

  const [newItem, setNewItem] = useState({
    type: '',
    item: '',
    count: '',
    status: ''
  });

  // New state for ordered inventory items
  const [orderedItems, setOrderedItems] = useState([
    { type: 'Medical Equipment', item: 'Bandages', count: 50, orderDate: '11-01-2024', status: 'Ordered' },
    { type: 'Cleaning Supply', item: 'Disinfectant', count: 30, orderDate: '10-28-2024', status: 'Out for Delivery' },
    { type: 'Office Supply', item: 'Ink Cartridges', count: 10, orderDate: '10-25-2024', status: 'Shipped' },
  ]);

  const [newOrderedItem, setNewOrderedItem] = useState({
    type: '',
    item: '',
    count: '',
    orderDate: '',
    expectedDelivery: '',
    status: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Handle changes for the first inventory table
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Handle changes for the ordered inventory table
  const handleOrderedChange = (e) => {
    const { name, value } = e.target;
    setNewOrderedItem({ ...newOrderedItem, [name]: value });
  };

  const addNewItem = () => {
    if (newItem.type && newItem.item && newItem.count && newItem.status) {
      if (isEditing) {
        // Update the existing item
        const updatedItems = [...inventoryItems];
        updatedItems[editIndex] = newItem;
        setInventoryItems(updatedItems);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        // Add a new item
        setInventoryItems([...inventoryItems, newItem]);
      }
      setNewItem({ type: '', item: '', count: '', status: '' }); // Clear input fields
    } else {
      alert('Please fill out all fields before adding an item.');
    }
  };

  const addNewOrderedItem = () => {
    if (newOrderedItem.type && newOrderedItem.item && newOrderedItem.count && newOrderedItem.orderDate && newOrderedItem.expectedDelivery && newOrderedItem.status) {
      setOrderedItems([...orderedItems, newOrderedItem]);
      setNewOrderedItem({ type: '', item: '', count: '', orderDate: '', expectedDelivery: '', status: '' }); // Clear input fields
    } else {
      alert('Please fill out all fields before adding an ordered item.');
    }
  };

  const handleEdit = (index) => {
    setNewItem(inventoryItems[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="inventory-container">
      <div className="inventory-table">
        <h2 className="main-title">Supplies Available</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Item</th>
              <th>Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.item}</td>
                <td>{item.count}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-item-form">
          <h3>{isEditing ? 'Edit Item' : 'Add New Item'}</h3>
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={newItem.type}
            onChange={handleChange}
          />
          <input
            type="text"
            name="item"
            placeholder="Item"
            value={newItem.item}
            onChange={handleChange}
          />
          <input
            type="number"
            name="count"
            placeholder="Count"
            value={newItem.count}
            onChange={handleChange}
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={newItem.status}
            onChange={handleChange}
          />
          <button onClick={addNewItem}>
            {isEditing ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>

      <div className="ordered-inventory-table">
        <h2 className="main-title">Ordered Inventory</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Item</th>
              <th>Count</th>
              <th>Order Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.item}</td>
                <td>{item.count}</td>
                <td>{item.orderDate}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-ordered-item-form">
          <h3>Add New Ordered Item</h3>
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={newOrderedItem.type}
            onChange={handleOrderedChange}
          />
          <input
            type="text"
            name="item"
            placeholder="Item"
            value={newOrderedItem.item}
            onChange={handleOrderedChange}
          />
          <input
            type="number"
            name="count"
            placeholder="Count"
            value={newOrderedItem.count}
            onChange={handleOrderedChange}
          />
          <input
            type="date"
            name="orderDate"
            placeholder="Order Date"
            value={newOrderedItem.orderDate}
            onChange={handleOrderedChange}
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={newOrderedItem.status}
            onChange={handleOrderedChange}
          />
          <button onClick={addNewOrderedItem}>Add Ordered Item</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryMain);

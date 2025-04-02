import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchInsufficientItems } from "../../../ReduxActionsMain/inventoryItemsActions";
import { pendingOrderedItemsByClinic } from "../../../ReduxActionsMain/orderedItemsAction";
import { createRequestedItems } from "../../../ReduxActionsMain/requestedItemsAction";
import "./Features.css";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Button,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";


export const Inventory = ({ user, createRequestedItems, inventoryItems, orderedItems, fetchInsufficientItems, pendingOrderedItemsByClinic }) => {

  const clinicMapping = {
    east: "1",
    west: "2",
    "upper west": "3",
  };

  const token = localStorage.getItem("jwt");
  const [collapse, setCollapse] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedClinicKey, setSelectedClinicKey] = useState(
    clinicMapping[user?.clinic_location]
  );


  const  [requestItemForm, setRequestItemForm] = useState({
      clinic_id: "",
      user_id: "",
      item_name: "",
      item_link: "",
      item_type: "",
      requested_quantity: "",

    }
  )

  const handleTemplate = () => {
    if (isAdmin) {
      setCollapse(!collapse);
    }
  };

  const handleClinicChange = (clinicKey) => {
    setSelectedClinicKey(clinicKey);
    setCollapse(false);
  };

  useEffect(() => {
    if (user) {
      fetchInsufficientItems(token);
      pendingOrderedItemsByClinic(token);

      setRequestItemForm((prev) => ({
        ...prev,
        clinic_id: user?.clinic_id,
        user_id: user?.id
      }))

      if (user.admin) {
        setIsAdmin(true);
      }
    }
  }, [fetchInsufficientItems, pendingOrderedItemsByClinic, user, token]);

  console.log(inventoryItems);

  console.log(orderedItems)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestItemForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  console.log("request form:", requestItemForm)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!requestItemForm.item_name || !requestItemForm.item_type || !requestItemForm.requested_quantity) {
      alert('Please fill in all required fields.');
      return;
    }
    // Ensure clinic_id is an integer
    const formData = {
      ...requestItemForm,
      clinic_id: parseInt(requestItemForm.clinic_id, 10), // Convert to integer
      requested_quantity: parseInt(requestItemForm.requested_quantity, 10)
    };

    console.log(formData);

    // Send request to backend via Redux action
    createRequestedItems(formData);

    // Clear form after submission
    setRequestItemForm({
      clinic_id: '',
      item_name: '',
      item_link: '',
      category: '',
      requested_quantity: ''
    });
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
    <div id="inventory">
      <div className="console">
        <div className="console-title">
          Inventory
          <span>
            <div className="sideMenuItems">
              <svg
                className="svg"
                onClick={handleTemplate}
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </div>
            {collapse ? (

                <ul className="filter-li-container">
                    <li className="filter-li" onClick={() => handleClinicChange('1')}>
                      Eastside
                    </li>
                    <li className="filter-li" onClick={() => handleClinicChange('2')}>
                      West 150
                    </li>
                    <li className="filter-li" onClick={() => handleClinicChange('3')}>
                      West 180
                    </li>
                </ul>
            ) : (
              ""
            )}
          </span>
        </div>
        <br />
        <div className="selected-menu">
           {selectedClinicKey === '1' && 'Eastside'}
           {selectedClinicKey === '2' && 'West 150'}
           {selectedClinicKey === '3' && 'West 180'}
        </div>

        {/* inventory items */}
        {selectedClinicKey && inventoryItems[selectedClinicKey]?.length > 0 ? (
          <div>
            <h2 className="low-inv-title">Insufficient Inventory</h2>
            <div className="inventory-con">
              <table className="low-inv-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Count</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems[selectedClinicKey].slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td>{item.item_name}</td>
                      <td>{item.count}</td>
                      <td>
                        {item.item_requested === true && "Request sent"}
                        {item.item_requested === false && "Request Item"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>No inventory insufficient data available for this clinic</p>
        )}

        {/* ordered items */}
        {selectedClinicKey && orderedItems[selectedClinicKey]?.length > 0 ? (
          <div>
        <h2 className="inv-order-title">Expected delivery</h2>
        <div className="inventory-con">
          <table className="order-status-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Delivery date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {orderedItems[selectedClinicKey].slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td>{item.item_name}</td>
                      <td>{formatDate(item.delivery_date)}</td>
                      <td>
                        {item.order_received === true && "Delivered"}
                        {item.order_received === false && "In Transit"}
                        </td>
                    </tr>
                  ))}
            </tbody>
          </table>
         </div>
        </div>
              ) : (
                <p>No inventory ordered data available for this clinic</p>
              )}

        <div className="inventory-req">
          <h2 className="inv-req-title">Request Items</h2>
          <form className="inv-form" onSubmit={handleSubmit}>
      <Stack spacing={4} className="form-stack">
        {/* Item Name */}
        <InputGroup className="inv-input">
          <Input
            type="text"
            name="item_name"
            placeholder="Item name"
            value={requestItemForm.item_name}
            onChange={handleChange}
          />
        </InputGroup>

        {/* Item Link */}
        <InputGroup className="inv-input">
          <InputLeftElement pointerEvents="none">
            <LinkIcon color="gray.800" />
          </InputLeftElement>
          <Input
            type="url"
            name="item_link"
            placeholder="Item link"
            value={requestItemForm.item_link}
            onChange={handleChange}
          />
        </InputGroup>

        {/* Amount */}
        <div className="input-group select-count">
          {/* <label className="input-group-text" htmlFor="inputGroupSelect02">
            Amount:
          </label> */}
          <Input
            type="number"
            step="1"
            pattern="^\d+$"
            className="form-select"
            placeholder="Requested amount"
            name="requested_quantity"
            value={requestItemForm.requested_quantity}
            onChange={handleChange}
          >
          </Input>
        </div>

                {/* Category */}
        <div className="input-group select-category">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Category:
          </label>
          <select
            className="form-select"
            id="inputGroupSelect01"
            name="item_type"
            value={requestItemForm.item_type}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="Office">Office</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Equipment">Equipment</option>
          </select>
        </div>


        {/* clinic selection for admins   */}
      { isAdmin ? (
        <div className="input-group select-category">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Clinic:
          </label>
          <select
            className="form-select"
            id="inputGroupSelect01"
            name="clinic_id"
            value={requestItemForm.clinic_id}
            onChange={handleChange}
          >
            <option value="">Choose...</option>
            <option value="1">Eastside</option>
            <option value="2">West 150</option>
            <option value="3">Upper West 180</option>
          </select>
        </div>) : " " }


        {/* Submit Button */}
        <Button
          className="inv-submission"
          colorScheme="blue"
          variant="outline"
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  inventoryItems: state.inventoryItem.insufficient,
  orderedItems: state.orderedItem.notReceived,
  user: state.user.data,
});

const mapDispatchToProps = {
  fetchInsufficientItems,
  pendingOrderedItemsByClinic,
  createRequestedItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);

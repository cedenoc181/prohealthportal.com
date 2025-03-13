import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchInsufficientItems } from "../../../ReduxActionsMain/inventoryItemsActions";
import { orderedItemsByClinic } from "../../../ReduxActionsMain/orderedItemsAction";
import "./Features.css";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Button,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";


export const Inventory = ({ user, inventoryItems, orderedItems, fetchInsufficientItems, orderedItemsByClinic }) => {

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
      orderedItemsByClinic(token);
      if (user.admin) {
        setIsAdmin(true);
      }
    }
  }, [fetchInsufficientItems, user]);


  console.log(inventoryItems);

  console.log(orderedItems)


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
        <h2 className="inv-order-title">Order Items</h2>
        <div className="inventory-con">
          <table className="order-status-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Ordered date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {orderedItems[selectedClinicKey].slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td>{item.item_name}</td>
                      <td>{item.order_date}</td>
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
          <h2 className="inv-req-title">Request Form</h2>
          <form className="inv-form">
            <Stack spacing={4} className="form-stack">
              <InputGroup className="inv-input">
                <Input type="text" placeholder="Item name" />
              </InputGroup>

              <InputGroup className="inv-input">
                <InputLeftElement pointerEvents="none">
                  <LinkIcon color="gray.800" />
                </InputLeftElement>
                <Input type="url" placeholder="Item link" />
              </InputGroup>

              <div className="input-group select-category">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Category:
                </label>
                <select className="form-select" id="inputGroupSelect01">
                  <option value="">Choose...</option>
                  <option value="1">Office</option>
                  <option value="2">Cleaning</option>
                  <option value="3">Equipment</option>
                </select>
              </div>

              <div className="input-group select-count">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect02"
                >
                  Amount:
                </label>
                <select className="form-select" id="inputGroupSelect02">
                  <option value="">Count...</option>
                  <option value="1">1-3</option>
                  <option value="2">4-6</option>
                  <option value="3">7-10</option>
                </select>
              </div>

              <Button
                className="inv-submission"
                colorScheme="blue"
                variant="outline"
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
  inventoryItems: state.inventoryItem.data,
  orderedItems: state.orderedItem.data,
  user: state.user.data,
});

const mapDispatchToProps = {
  fetchInsufficientItems,
  orderedItemsByClinic,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);

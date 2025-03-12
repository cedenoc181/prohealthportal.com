import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchInsufficientItems } from "../../../ReduxActionsMain/inventoryItemsActions";
import "./Features.css";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Button,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
// import InventoryMain from './Main/InventoryMain'

export const Inventory = ({ user, inventoryItems, fetchInsufficientItems }) => {
  const token = localStorage.getItem("jwt");
  // const [inventory, setInventory] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [west150Clinic, setWest150Clinic] = useState(false);
  const [west180Clinic, setWest180Clinic] = useState(false);
  const [eastsideClinic, setEastsideClinic] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const handleTemplate = () => {
    if (isAdmin) {
      setCollapse(!collapse);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInsufficientItems(token);
      if (user.admin) {
        setIsAdmin(true);
      }
    }
  }, [fetchInsufficientItems, token, user]);

  useEffect(() => {
    if (user) {
      if (user.clinic_location === "west" && !west150Clinic) {
        setWest150Clinic(true);
        setEastsideClinic(false);
        setWest180Clinic(false);
      } else if (user.clinic_location === "upper west" && !west180Clinic) {
        setWest180Clinic(true);
        setWest150Clinic(false);
        setEastsideClinic(false);
      } else if (user.clinic_location === "east" && !eastsideClinic) {
        setEastsideClinic(true);
        setWest180Clinic(false);
        setWest150Clinic(false);
      }
    }
  }, [user, west150Clinic, west180Clinic, eastsideClinic]);

  console.log(eastsideClinic);

  console.log(inventoryItems);

  const clinicMapping = {
    east: "1",
    west: "2",
    "upper west": "3",
  };

  const userClinicKey = clinicMapping[user?.clinic_location];

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
                <li className="filter-li">West 180</li>
                <li className="filter-li">West 150</li>
                <li className="filter-li">Eastside</li>
              </ul>
            ) : (
              ""
            )}
          </span>
        </div>
        <br />
        <div className="selected-menu">
          {userClinicKey === "1" && "Eastside"}
          {userClinicKey === "2" && "Westside"}
          {userClinicKey === "3" && "Upper Westside"}
        </div>

        {/* inventory items */}
        {userClinicKey && inventoryItems[userClinicKey]?.length > 0 ? (
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
                  {inventoryItems[userClinicKey].slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td>{item.item_name}</td>
                      <td>{item.count}</td>
                      <td>{item.item_status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>No inventory data available for this clinic</p>
        )}

        {/* ordered items */}
        <h2 className="inv-order-title">Order Status</h2>
        <div className="inventory-con">
          <table className="order-status-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Count</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="icon-order-status pending"></span> Business
                  Cards
                </td>
                <td></td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>
                  <span className="icon-order-status ordered"></span> Electrodes
                </td>
                <td></td>
                <td>Ordered</td>
              </tr>
              <tr>
                <td>
                  <span className="icon-order-status delivered"></span> Printing
                  Paper
                </td>
                <td></td>
                <td>Delivered</td>
              </tr>
              <tr>
                <td>
                  <span className="icon-order-status ordered"></span> Paper
                  Towels
                </td>
                <td></td>
                <td>Ordered</td>
              </tr>
            </tbody>
          </table>
        </div>

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
  user: state.user.data,
});

const mapDispatchToProps = {
  fetchInsufficientItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);

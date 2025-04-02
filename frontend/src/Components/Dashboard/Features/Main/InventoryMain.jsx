import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InventoryTable from "./Main-Functions/InventoryFunction.jsx"
import OrderedItemsTable from "./Main-Functions/OrderedFunction.jsx"
import "./InvMain.css";
import "./Main.css";

  export const InventoryMain = ({ user }) => {

  const clinicMapping = {
      east: "1",
      west: "2",
      "upper west": "3",
  };

    useEffect(() => {
        if (user?.admin) {
          setIsAdmin(true);
        }
    }, [user]);

    const [isAdmin, setIsAdmin] = useState(false);

    const [selectedClinicKey, setSelectedClinicKey] = useState(
      clinicMapping[user?.clinic_location]
    );
  const [collapse, setCollapse] = useState(false);

  const handleClinicChange = (clinicKey) => {
    setSelectedClinicKey(clinicKey);
    setCollapse(false);
  };

  const handleTemplate = () => {
    if (isAdmin) {
      setCollapse(!collapse);
    }
  };

  console.log("current selected clinic:", selectedClinicKey)

  return (
    <div className="main-container">
        <h5>
            {selectedClinicKey === "1" && "Eastside"}
            {selectedClinicKey === "2" && "West 150"}
            {selectedClinicKey === "3" && "West 180"}
            {isAdmin ? (
              <span>
                <div className="sideMenuItems">
                  <svg
                    className="svg-inv-function"
                    onClick={handleTemplate}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-three-dots-vertical"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  </svg>
                </div>
                {collapse ? (
                  <ul className="filter-li-container">
                    <li
                      className="filter-li"
                      onClick={() => handleClinicChange("1")}
                    >
                      Eastside
                    </li>
                    <li
                      className="filter-li"
                      onClick={() => handleClinicChange("2")}
                    >
                      West 150
                    </li>
                    <li
                      className="filter-li"
                      onClick={() => handleClinicChange("3")}
                    >
                      West 180
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </span>
            ) : (
              ""
            )}
          </h5>
      <div className="main-container">
      <InventoryTable clinicSelected={selectedClinicKey}/>
      </div>
      <br />
      <div className="main-container">
      <OrderedItemsTable clinicSelected={selectedClinicKey}/>
    </div>
  </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryMain);

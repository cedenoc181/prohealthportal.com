import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InventoryTable from "./Main-Functions/InventoryFunction.jsx"
import OrderedItemsTable from "./Main-Functions/OrderedFunction.jsx"
import RequestedItemsTable from "./Main-Functions/RequestedFunction.jsx"
import "./InvMain.css";
import "./Main.css";

  export const InventoryMain = ({ user, clinicSelected }) => {

  const [selectedClinicKey, setSelectedClinicKey] = useState('');

  useEffect(() => {
    setSelectedClinicKey(clinicSelected);
  }, [clinicSelected]);

  return (
    <div className="main-container">
        <h5>
            {selectedClinicKey === "1" && "Eastside"}
            {selectedClinicKey === "2" && "West 150"}
            {selectedClinicKey === "3" && "West 180"}
          </h5>
      <div className="main-container">
      <InventoryTable clinicSelected={selectedClinicKey}/>
      </div>
      <br />
      <div className="main-container">
      <OrderedItemsTable clinicSelected={selectedClinicKey}/>
    </div>
    <div className="main-container">
      <RequestedItemsTable clinicSelected={selectedClinicKey}/>
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

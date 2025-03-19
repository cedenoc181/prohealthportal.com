import React, { useState } from "react";
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

    
  const token = localStorage.getItem("jwt");

    const [isAdmin, setIsAdmin] = useState(false);

    const [selectedClinicKey, setSelectedClinicKey] = useState(
      clinicMapping[user?.clinic_location]
    );


  // const handleClinicChange = (clinicKey) => {
  //   setSelectedClinicKey(clinicKey);
  // };




  return (
    <div className="main-container">
       
      <InventoryTable />
      <OrderedItemsTable />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryMain);

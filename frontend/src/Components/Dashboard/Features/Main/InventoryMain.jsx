import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InventoryTable from "./Main-Functions/InventoryFunction.jsx"
import OrderedItemsTable from "./Main-Functions/OrderedFunction.jsx"
import "./InvMain.css";
import "./Main.css";

  export const InventoryMain = ({ user, clinicSelected }) => {

  // const clinicMapping = {
  //     east: "1",
  //     west: "2",
  //     "upper west": "3",
  // };

  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedClinicKey, setSelectedClinicKey] = useState('');


    useEffect(() => {
    if (user?.admin) {
          setIsAdmin(true);
        }
    }, [user]);


  useEffect(() => {
    setSelectedClinicKey(clinicSelected);
    console.log("CLINIC CHANGED FROM MAIN.JSX:", clinicSelected);
  }, [clinicSelected]);

  const handleTemplate = () => {
    if (isAdmin) {
      setCollapse(!collapse);
    }
  };



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
  </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryMain);

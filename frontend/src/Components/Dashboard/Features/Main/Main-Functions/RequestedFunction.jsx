import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import "../InvMain.css";
import "../Main.css";
import {
    requestedItemsGroupedByClinics, 
    deleteRequestedItems,
    updateRequestedItems
} from "../../../../../ReduxActionsMain/requestedItemsAction.js";

export const RequestedFunction = ({
    user,
    clinicSelected,
    itemsRequestedList,
    requestedItemsGroupedByClinics, 
    deleteRequestedItems,
    updateRequestedItems
}) => {
  const token = localStorage.getItem("jwt");

  const [selectedClinicKey, setSelectedClinicKey] = useState(null);

  useEffect(() => {
    if (user) {
        setSelectedClinicKey(clinicSelected);
        requestedItemsGroupedByClinics(token);
    } 
  }, [requestedItemsGroupedByClinics, clinicSelected, user, token]);

  return (
    <div>
    {/* Requested item */}
    {selectedClinicKey && itemsRequestedList[selectedClinicKey]?.length > 0 ? (
      <div className="requested-inventory-table">
        <h2 className="main-title">Requested Items</h2>
        <table>
          <thead>
            <tr>
              <th>Item name</th>
              <th>Item link</th>
              <th>Item type</th>
              <th>Quantity</th>
              <th>Fulfilled</th>
            </tr>
          </thead>
          <tbody>
            {itemsRequestedList[selectedClinicKey]?.map((item, index) => (
              <tr key={index}>
                <td>{item.item_name}</td>
                <td>{item.item_link}</td>
                <td>{item.item_type}</td>
                <td>{item.requested_quantity}</td>
                <td>
                  {item.request_fulfilled === true && "Yes"}
                  {item.request_fulfilled === false && "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>
    ) : (
        <div>
            <p>No requested items available for this clinic.</p>
       </div>
    )}
    </div>
  )
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    itemsRequestedList: state.requestedItem.reqList,
})

const mapDispatchToProps = {
    requestedItemsGroupedByClinics, 
    deleteRequestedItems,
    updateRequestedItems,

}

export default connect(mapStateToProps, mapDispatchToProps)(RequestedFunction)
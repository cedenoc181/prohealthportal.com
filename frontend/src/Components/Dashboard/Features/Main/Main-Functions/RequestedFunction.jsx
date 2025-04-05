import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../InvMain.css";
import "../Main.css";
import {
  requestedItemsGroupedByClinics,
  deleteRequestedItems,
  updateRequestedItems,
} from "../../../../../ReduxActionsMain/requestedItemsAction.js";

export const RequestedFunction = ({
  user,
  clinicSelected,
  itemsRequestedList,
  requestedItemsGroupedByClinics,
  deleteRequestedItems,
  updateRequestedItems,
}) => {
  const token = localStorage.getItem("jwt");

  const [selectedClinicKey, setSelectedClinicKey] = useState(null);

  const [isEditingRequested, setIsEditingRequested] = useState(false);

  const [selectedRequestItem, setSelectedRequestItem] = useState({
    item_type: "",
    item_name: "",
    item_link: "",
    requested_quantity: "",
    request_fulfilled: "",
  });

  useEffect(() => {
    if (user) {
      setSelectedClinicKey(clinicSelected);
      requestedItemsGroupedByClinics(token);
      setSelectedRequestItem({
        item_type: "",
        item_name: "",
        item_link: "",
        requested_quantity: "",
        request_fulfilled: "",
      });
      setIsEditingRequested(false);
    }
  }, [requestedItemsGroupedByClinics, clinicSelected, user, token]);

  const handleRequestedItemChange = (e) => {
    const { name, value } = e.target;
    setSelectedRequestItem({ ...selectedRequestItem, [name]: value });
  };

  const handleEditRequest = (item) => {
    console.log("item being handled handleEditRequest item:", item);
    setSelectedRequestItem({ ...item });
    setIsEditingRequested(true);
  };

  const closeEditRequest = () => {
    setIsEditingRequested(false);
    setSelectedRequestItem({
      item_type: "",
      item_name: "",
      item_link: "",
      requested_quantity: "",
      request_fulfilled: "",
    });
  };

  const updateRequestedItem = async () => {
    if (
      selectedRequestItem.item_type &&
      selectedRequestItem.item_name &&
      selectedRequestItem.requested_quantity
    ) {
      try {
        if (isEditingRequested) {
          // ✅ UPDATE ORDERED ITEM
          const updatedInfo = {
            ...selectedRequestItem,
            user_id: user.id,
            clinic_id: parseInt(selectedClinicKey, 10),
            requested_quantity: parseInt(
              selectedRequestItem.requested_quantity,
              10
            ),
          };

          await updateRequestedItems(
            selectedRequestItem.id,
            updatedInfo,
            token
          );
          alert("Ordered item updated successfully!");
        }

        // ✅ RESET STATE
        setSelectedRequestItem({
          item_type: "",
          item_name: "",
          item_link: "",
          requested_quantity: "",
          request_fulfilled: "",
        });

        setIsEditingRequested(false);
      } catch (error) {
        console.error("Failed to update requested item:", error);
        alert("Failed to update requested item.");
      }
    } else {
      alert("Please fill out all fields before adding an requested item.");
    }
  };

  const deleteReqItem = async () => {
    if (selectedRequestItem?.id != null) {
      if (
        window.confirm("Are you sure you want to delete this requested item?")
      ) {
        try {
          await deleteRequestedItems(selectedRequestItem.id, token);
          alert("Requested item was deleted!");

          setIsEditingRequested(false);

          setSelectedRequestItem({
            item_type: "",
            item_name: "",
            item_link: "",
            requested_quantity: "",
            request_fulfilled: "",
          });
        } catch (error) {
          console.error("Failed to delete requested item:", error);
          alert("Failed to delete requested item.");
        }
      }
    }
  };

  return (
    <div>
      {/* Requested item */}
      {selectedClinicKey &&
      itemsRequestedList[selectedClinicKey]?.length > 0 ? (
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
                <tr key={index} onClick={() => handleEditRequest(item)}>
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
          {isEditingRequested ? (
            <div className="add-ordered-item-form">
              <h3>{isEditingRequested ? "Edit Requested Item" : ""} </h3>
              {isEditingRequested && (
                <button onClick={closeEditRequest} className="editOrderClose">
                  x
                </button>
              )}
                <select
                  name="item_type"
                  value={selectedRequestItem?.item_type || ""}
                  onChange={handleRequestedItemChange}
                >
                  <option value="">Select Type</option>
                  <option value="Office Supply">Office Supply</option>
                  <option value="Medical Equipment">Medical Equipment</option>
                  <option value="Cleaning Supply">Cleaning Supply</option>
                </select>

                <input
                  type="text"
                  name="item_name"
                  placeholder="Item name"
                  value={selectedRequestItem?.item_name}
                  onChange={handleRequestedItemChange}
                />

                <input
                  type="number"
                  name="requested_quantity"
                  placeholder="Requested quantity"
                  value={selectedRequestItem?.requested_quantity}
                  onChange={handleRequestedItemChange}
                />

                <input
                  type="url"
                  name="item_link"
                  placeholder="Item link"
                  value={selectedRequestItem?.item_link}
                  onChange={handleRequestedItemChange}
                />

                <label>Request fulfilled </label>
                <input
                  type="checkbox"
                  name="request_fulfilled"
                  checked={!!selectedRequestItem?.request_fulfilled}
                  onChange={(e) =>
                    setSelectedRequestItem({
                      ...selectedRequestItem,
                      request_fulfilled: e.target.checked,
                    })
                  }
                />

                <svg
                  onClick={deleteReqItem}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>

                <button onClick={updateRequestedItem}>
                  Update Requested Item
                </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          <p>No requested items available for this clinic.</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
  itemsRequestedList: state.requestedItem.reqList,
});

const mapDispatchToProps = {
  requestedItemsGroupedByClinics,
  deleteRequestedItems,
  updateRequestedItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestedFunction);

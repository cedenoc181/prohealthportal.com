import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Main.css";
import { groupedClinicTasksTables } from "../../../../ReduxActionsMain/taskActions";

export const TasksMain = ({ user, taskTable, groupedClinicTasksTables }) => {
  const clinicMapping = {
    east: "1",
    west: "2",
    "upper west": "3",
  };

  const token = localStorage.getItem("jwt");

  const [selectedClinicKey, setSelectedClinicKey] = useState("");

  // const [isEditingReminder, setIsEditingReminder] = useState(false);

  const [editingRowId, setEditingRowId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      groupedClinicTasksTables(token);
      console.log(taskTable);
      setSelectedClinicKey(clinicMapping[user?.clinic_location]);
    }
  }, [groupedClinicTasksTables, token, user]);

  console.log(selectedClinicKey);
  const taskTableList = taskTable[selectedClinicKey];

  const handleEditClick = (taskContent) => {
    setEditingRowId(taskContent.id);
    setFormData({ ...taskContent.task_data });
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (taskId, taskContentId) => {
    // Perform your PUT request here
    console.log("Saving taskContent:", formData);

    // Reset editing
    setEditingRowId(null);
    setFormData({});
  };

  return (
    <div className="main-container">
      <div className="task-table">
        {selectedClinicKey && taskTableList?.length > 0
          ? taskTableList?.map((table) => (
              <div key={table.id}>
                <h2 className="main-title">{table.task_table_title}</h2>
                <table>
                  <thead>
                    <tr>
                      {table.column_names &&
                        Object.values(table.column_names).map((col, idx) => (
                          <th key={idx}>{col}</th>
                        ))}
                    </tr>
                  </thead>

                  <tbody>
                    {table.task_contents?.map((taskContent) => (
                      <tr
                        key={taskContent.id}
                        onClick={() => handleEditClick(taskContent)}
                      >
                        {Object.keys(table.column_names).map((key, idx) => {
                          const value =
                            editingRowId === taskContent.id
                              ? formData[key]
                              : taskContent.task_data[key];

                          const type =
                            typeof value === "boolean"
                              ? "checkbox"
                              : typeof value === "number"
                              ? "number"
                              : key.includes("date") || key.includes("time")
                              ? "datetime-local"
                              : "text";

                          return (
                            <td key={idx}>
                              {editingRowId === taskContent.id ? (
                                type === "checkbox" ? (
                                  <input
                                    type="checkbox"
                                    checked={!!formData[key]}
                                    onChange={(e) =>
                                      handleChange(key, e.target.checked)
                                    }
                                  />
                                ) : (
                                  <input
                                    type={type}
                                    value={formData[key] || ""}
                                    onChange={(e) =>
                                      handleChange(key, e.target.value)
                                    }
                                  />
                                )
                              ) : (
                                String(taskContent.task_data[key])
                              )}
                            </td>
                          );
                        })}
                        {editingRowId === taskContent.id && (
                          <td>
                            <button
                              onClick={() =>
                                handleSave(table.id, taskContent.id)
                              }
                            >
                              Save
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="task-form-field add-inventory-item-form">
                  <h3></h3>
                  <input />

                  <input />
                  <button></button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  taskTable: state.task.data,
  user: state.user.data,
});

const mapDispatchToProps = {
  groupedClinicTasksTables,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksMain);

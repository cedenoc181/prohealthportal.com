import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Main.css";
import { groupedClinicTasksTables } from "../../../../ReduxActionsMain/taskActions";
import {
  createTaskContent,
  updateTaskContents,
  deleteTaskContent,
} from "../../../../ReduxActionsMain/taskContentActions";

export const TasksMain = ({
  user,
  taskTable,
  groupedClinicTasksTables,
  createTaskContent,
  updateTaskContents,
  deleteTaskContent,
}) => {
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
  // for adding new task
  const [newTaskDataMap, setNewTaskDataMap] = useState({});

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

  // for editting task
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // for adding task changes
  const handleNewTaskChange = (tableId, key, value) => {
    setNewTaskDataMap((prev) => ({
      ...prev,
      [tableId]: {
        ...(prev[tableId] || {}),
        [key]: value,
      },
    }));
  };

  const handleSave = async (taskId, taskContentId) => {
    // Perform your PUT request here
    const payload = {
      "task_content": {
        task_id: taskId,
        user_id: user.id,
        task_data: {
          column_one: formData.column_one,
          column_two: formData.column_two,
          column_three: formData.column_three,
          column_four: formData.column_four,
        },
      },
    };

    try {
      await updateTaskContents(taskContentId, payload, token);
      // Reset editing
      setEditingRowId(null);
      setFormData({});
      await groupedClinicTasksTables(token);
    } catch (error) {
      console.error("Error creating new task content:", error);
    }
  };

  const handleSubmitNewTask = async (taskId) => {
    const taskData = newTaskDataMap[taskId] || {};

    console.log(taskData);

    const payload = {
      "task_content": {
        task_id: taskId,
        user_id: user.id,
        task_data: {
          column_one: taskData.column_one,
          column_two: taskData.column_two,
          column_three: taskData.column_three,
          column_four: taskData.column_four,
        },
      },
    };

    try {
      await createTaskContent(payload, token);
      setNewTaskDataMap((prev) => ({ ...prev, [taskId]: {} }));
      await groupedClinicTasksTables(token);
    } catch (error) {
      console.error("Error creating new task content:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="task-table">
        {selectedClinicKey && taskTableList?.length > 0
          ? taskTableList?.map((table) => {
              const columnTypes = table.column_types || {};
              const selectOptions = table.select_type_options || {};
              return (
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

        const type = columnTypes[key] || "text";
        const options = selectOptions[key] || [];

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
              ) : type === "select" ? (
                <select
                  value={value}
                  onChange={(e) =>
                    handleChange(key, e.target.value)
                  }
                >
                  <option value="">Select option</option>
                  {options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  value={value || ""}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const parsedValue =
                      type === "number"
                        ? inputValue === ""
                          ? ""
                          : parseInt(inputValue, 10)
                        : inputValue;

                    handleChange(key, parsedValue);
                  }}
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
                    <h3>Add New Task</h3>
                    {Object.keys(table.column_names).map((key, idx) => {
                      const label = table.column_names[key];
                      const value = newTaskDataMap[table.id]?.[key] || "";
                      const type = columnTypes[key] || "text";
                      const options = selectOptions[key] || [];
                      return (
                        <div key={idx} className="form-input-row">
                          <label>{label}</label>
                          {type === "checkbox" ? (
                            <input
                              type="checkbox"
                              checked={!!newTaskDataMap[table.id]?.[key]}
                              onChange={(e) =>
                                handleNewTaskChange(
                                  table.id,
                                  key,
                                  e.target.checked
                                )
                              }
                            />
                          ) : type === "select" ? (
                            <select
                              value={value}
                              onChange={(e) =>
                                handleNewTaskChange(
                                  table.id,
                                  key,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select option</option>
                              {options.map((opt, i) => (
                                <option key={i} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={type}
                              value={value}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                const parsedValue =
                                  type === "number"
                                    ? inputValue === ""
                                      ? ""
                                      : parseInt(inputValue, 10)
                                    : inputValue;

                                handleNewTaskChange(table.id, key, parsedValue);
                              }}
                            />
                          )}
                        </div>
                      );
                    })}

                    <button onClick={() => handleSubmitNewTask(table.id)}>
                      Submit Task
                    </button>
                  </div>
                </div>
              );
            })
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
  createTaskContent,
  updateTaskContents,
  deleteTaskContent,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksMain);

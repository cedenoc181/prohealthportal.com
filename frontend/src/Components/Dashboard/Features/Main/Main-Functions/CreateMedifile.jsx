import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Button } from "@chakra-ui/react";
import { Textarea, Input } from "@chakra-ui/react";
import { fetchUsers, createMedifile } from "../../../../../ReduxActionsMain/userActions.js";
// import { createMedifile } from "../../../../../ReduxActionsMain/medifilesActions.js";



export const CreateMedifile = ({ createMedifile, user, allUsers, fetchUsers }) => {


  const [newMedifileObject, setNewMedifileObject] = useState({
    title: "",
    description: "",
    instructions: "",
    file_link: null, // Updated to hold File object
    file_cover: null, // Updated to hold File object
    category: "",
    language: "",
    owner_id: null, //user.id
    receiver_id: null, //user.id
  });

  console.log(newMedifileObject);

  const [userList, setUserList] = useState([]);


  useEffect(() => {
    if (allUsers && user) {
      setUserList(allUsers.filter((currentUser) => currentUser.id !== user.id));
      if (newMedifileObject.owner_id !== user.id) {
        setNewMedifileObject((prev) => ({
          ...prev,
          owner_id: user.id,
        }));
      }
    }
  }, [allUsers, user, newMedifileObject.owner_id]);

  console.log(userList);

  const memoizedFetchUsers = useCallback(() => {
    if (!allUsers) {
      fetchUsers();
    }
  }, [allUsers, fetchUsers]);
  
  useEffect(() => {
    memoizedFetchUsers();
  }, [memoizedFetchUsers]);


  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectChange = (e) => {
    const userId = e.target.value;
    const receivingUser = userList.find((reciever) => reciever.id === parseInt(userId));
    console.log(receivingUser.id);
    setSelectedUser(receivingUser);
    setNewMedifileObject((prev) => ({
      ...prev,
      receiver_id: receivingUser.id,
    }));
  };

  // Handles the form submission
  const handleCreateMedifile = (e) => {
    // e.preventDefault(); 
    if (
      newMedifileObject.title &&
      newMedifileObject.description &&
      newMedifileObject.instructions &&
      newMedifileObject.file_link &&
      newMedifileObject.file_cover &&
      newMedifileObject.category &&
      newMedifileObject.language &&
      newMedifileObject.owner_id 
    ) {
      console.log(newMedifileObject);
      createMedifile(newMedifileObject);
      alert(
        "medical file added to database successfully"
      );
    } else {
      alert(
        "Fill out all inputs in order to add new medifile to the database."
      );
      console.log(
        "Fill out all inputs in order to add new medifile to the database"
      );
    }
  };


  return (
    <div className="main-container create-medical-file">
      <h2 className="createTitle"> Add a New Medical File to Database </h2>
      <form
        className="medifiles-form"
        name="medical-form-addition"
        onSubmit={handleCreateMedifile}
      >
        <div className="create-email-inputs">
          <div className="form-check form-switch">
            <div class="icon-select">
            <select onChange={handleSelectChange}>
            <option value={null} >select recipient</option>
                  {
                userList.map((list) => (
                     <option key={list.id} value={list.id}>{list.first_name} {list.last_name}</option>
                  ))
                }
                 </select>
              <svg
              
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-add"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
              </svg>
              { selectedUser && <span className="selected-name">{selectedUser.first_name}</span>}
            </div>
          </div>

          <br />

          <label className="input-label">Medical file title: </label>
          <Input
            mb="12px"
            placeholder="Medical file title"
            size="md"
            name="pdf-title"
            onChange={(e) =>
              setNewMedifileObject({
                ...newMedifileObject,
                title: e.target.value,
              })
            }
            required
          />
          <br />
          <label className="input-label">Medical file description: </label>
          <Textarea
            mb="12px"
            placeholder="Advise the purpose of the form."
            name="pdf-description"
            onChange={(e) =>
              setNewMedifileObject({
                ...newMedifileObject,
                description: e.target.value,
              })
            }
            required
          />
          <br />
          <label className="input-label">Medical file instructions: </label>
          <Textarea
            mb="12px"
            placeholder="Advise how the file should be stored and filed."
            name="pdf-instructions"
            onChange={(e) =>
              setNewMedifileObject({
                ...newMedifileObject,
                instructions: e.target.value,
              })
            }
            required
          />
          <br />
          <label className="input-label">Medical file link: </label>
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="fileLinkInput"
              name="pdf-link"
              onChange={(e) =>
                setNewMedifileObject({
                  ...newMedifileObject,
                  file_link: e.target.files[0],
                })
              } // Use e.target.files[0] to get the File object
              required
            />
          </div>
          <br />
          <label className="input-label">Medical file cover: </label>
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="fileCoverInput"
              name="pdf-cover"
              onChange={(e) =>
                setNewMedifileObject({
                  ...newMedifileObject,
                  file_cover: e.target.files[0],
                })
              } // Use e.target.files[0] to get the File object
              required
            />
          </div>

          <br />
          <label className="input-label">Medical file category:</label>
          <select
            name="category"
            className="medical-category-selection"
            onChange={(e) =>
              setNewMedifileObject({
                ...newMedifileObject,
                category: e.target.value,
              })
            }
            required
          >
            <option value="">--Please choose form category--</option>
            <option value="APOS">APOS</option>
            <option value="PT/OT">PT or OT</option>
            <option value="authorization">Authorization</option>
            <option value="General">General</option>
          </select>
          <br />

          <label className="input-label">Medical file language:</label>
          <select
            name="language"
            className="medical-language-selection"
            onChange={(e) =>
              setNewMedifileObject({
                ...newMedifileObject,
                language: e.target.value,
              })
            }
            required
          >
            <option value="">--Please choose form language--</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div className="medifile-submit-button">
          <Button colorScheme="blue" variant="solid" size="lg" type="submit">
            Create template
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
  allUsers: state.user.allUserData,
});

const mapDispatchToProps = {
  createMedifile,
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMedifile);

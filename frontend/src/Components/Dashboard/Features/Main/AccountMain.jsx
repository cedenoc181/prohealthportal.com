
import React, {useState, useEffect} from 'react'
import "./AccMain.css"
import { connect } from 'react-redux'
import './Main.css'
import MyProfile from './Main-Functions/MyProfile.jsx'
import StaffProfile from './Main-Functions/StaffProfile.jsx'
import { ChevronLeftIcon } from '@chakra-ui/icons'


export const AccountMain = ({ user, selectedUser }) => {

  const [staffInfo, setStaffInfo] = useState(false);
  

  useEffect(() => {
      if (selectedUser) {
        setStaffInfo(true);
      }
  }, [selectedUser]);
  

  const handleUIClick = () => {
    setStaffInfo(false);
    console.log("set staff info:", staffInfo);
    console.log(selectedUser);
  };


if (!selectedUser) {
  // setStaffInfo(false);
  return  (   
    <div className="acc-ui">
        <MyProfile user={user}/>
    </div>
    );
} 

return (
  <div>

     { staffInfo ? 
      
      (    
      <div >
        <div className="createUI-button">
          <button onClick={handleUIClick}>
          <ChevronLeftIcon />
          My profile
          </button>
        </div>
        <StaffProfile staffUser={selectedUser}/>
      </div>
      )
      :
      
      (
      <div>
    <div>
        <MyProfile user={user}/>
    </div>
    </div>
    )
    } 
</div>
)

}

const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
});

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMain)

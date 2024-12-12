import React, { useEffect, useState }from 'react';
import { connect } from 'react-redux'
import './OverviewMain.css'
import './Main.css'
import MedicalMain from './MedicalMain.jsx'
import EmailMain from './EmailMain.jsx'


export const OverviewMain = ({user}) => {

  const [userName, setUserName] = useState("");

  function capitalizeWords(str) {
    return str
       .split(' ') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the array back into a single string
  }

useEffect(() => {
  let name = user ? user.full_name.split(" ")[0]  : "null";
  setUserName(capitalizeWords(name));
}, [user])

console.log(userName)


  return (
    <div className="main-container">
      <h1 className="welcome">{userName}</h1>
      <br />
      <h2 className="overview-sub-titles">Continue working on email </h2>
      <EmailMain />
      <br />
        <h2 className="overview-sub-titles">Continue working on medical file </h2>
        <div className="medical-comp">
        <MedicalMain />
        </div>
        <br />
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.data,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewMain)
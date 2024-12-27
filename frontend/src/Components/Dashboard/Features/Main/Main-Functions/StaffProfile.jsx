import React from 'react'
import { connect } from 'react-redux'

export const StaffProfile = ({staffUser}) => {
    console.log(staffUser);
  return (
    <div>
        <p>{staffUser.full_name}</p>
        <p>{staffUser.email}</p>
        <p>{staffUser.clinic_location.to_string}</p>
        <p>{staffUser.direct_access}</p>
        <p>{staffUser.credentials}</p>
        <p>{staffUser.insurance_network}</p>
        <p>{staffUser.role}</p>
    <div className="my-medifiles">
        <div>{staffUser.my_medifiles}</div>
    </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StaffProfile)
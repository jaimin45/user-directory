import { Card, CardContent, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"

import UserContext from "../../Context/User/UserContext"

const UserDetailView = () => {
  const { selectedUser } = useContext(UserContext)
  const [storedUser, setStoredUser] = useState(null)

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem("selectedUser", JSON.stringify(selectedUser))
    }
  }, [selectedUser])

  useEffect(() => {
    const storedUserData = localStorage.getItem("selectedUser")
    if (storedUserData) {
      setStoredUser(JSON.parse(storedUserData))
    }
  }, [])

  // Define an array of objects containing the label and value for each user detail
  const userDetails = [
    { label: "ID", value: storedUser?.id },
    { label: "First Name", value: storedUser?.firstName },
    { label: "Last Name", value: storedUser?.lastName },
    { label: "Address", value: storedUser?.address },
    { label: "Phone Number", value: storedUser?.phoneNumber },
    { label: "Age", value: storedUser?.age },
    { label: "Gender", value: storedUser?.gender },
  ]

  return (
    <div style={{ marginTop: "20px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            User Details
          </Typography>
          {userDetails.map((detail, index) => (
            <Typography key={index} variant="body1">
              <strong>{detail.label}:</strong> {detail.value}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

UserDetailView.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
  })
}

export default UserDetailView

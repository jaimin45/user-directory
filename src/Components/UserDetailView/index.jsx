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

  return (
    <div style={{ marginTop: "20px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            User Details
          </Typography>
          <Typography variant="body1">
            <strong>ID:</strong> {storedUser?.id}
          </Typography>
          <Typography variant="body1">
            <strong>First Name:</strong> {storedUser?.firstName}
          </Typography>
          <Typography variant="body1">
            <strong>Last Name:</strong> {storedUser?.lastName}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {storedUser?.address}
          </Typography>
          <Typography variant="body1">
            <strong>Phone Number:</strong> {storedUser?.phoneNumber}
          </Typography>
          <Typography variant="body1">
            <strong>Age:</strong> {storedUser?.age}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {storedUser?.gender}
          </Typography>
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
  }),
}

export default UserDetailView

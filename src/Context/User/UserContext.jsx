import { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [filters, setFilters] = useState(() => {
    // Retrieve filters from local storage or use default values
    const storedFilters = localStorage.getItem("filters")
    return storedFilters ? JSON.parse(storedFilters) : {
      id: true,
      firstName: true,
      lastName: true,
      address: true,
      phoneNumber: true,
      age: true,
      gender: true,
    }
  })

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters))
  }, [filters])

  const handleSetSelectedUser = (user) => {
    setSelectedUser(user)
  }

  const handleSetFilters = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <UserContext.Provider
      value={{
        selectedUser,
        setSelectedUser: handleSetSelectedUser,
        filters,
        setFilters: handleSetFilters,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContext

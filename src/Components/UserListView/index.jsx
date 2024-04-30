import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";

import UserContext from "../../Context/User/UserContext";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    renderCell: (params) => (
      <Link to={`/user/${params.row.id}`}>{params.id}</Link>
    ),
  },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "phoneNumber", headerName: "Phone Number", width: 150 },
  { field: "age", headerName: "Age", width: 90 },
  { field: "gender", headerName: "Gender", width: 110 },
];

const multiSelectColumns = [
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "phoneNumber", headerName: "Phone Number", width: 150 },
];

const UserListView = () => {
  const { selectedUser, setSelectedUser, filters, setFilters } =
    useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [searchfield, setSearchfield] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users");
        const data = await response.json();
        setUsers(data);
        setSearchfield(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [selectedUser, filters]);

  const handleRowClick = (row) => {
    setSelectedUser(row.row);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filtered = users.filter((user) =>
      columns.some((column) =>
        String(user[column.field]).toLowerCase().includes(value)
      )
    );

    setSearchfield(filtered);
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="filled"
        color="success"
        value={searchText}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px", background: "white" }}
      />
      <FormGroup style={{ flexDirection: "row" }}>
        {multiSelectColumns.map((column) => (
          <FormControlLabel
            key={column.field}
            control={
              <Checkbox
                checked={filters[column.field]}
                onChange={handleFilterChange}
                name={column.field}
              />
            }
            label={column.headerName}
          />
        ))}
      </FormGroup>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: 400,
          width: "100%",
          background: "white",
        }}
      >
        <DataGrid
          rows={searchfield}
          columns={columns.filter((column) => filters[column.field])}
          pageSize={5}
          onRowClick={handleRowClick}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default UserListView;

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { IMainState, IUser } from "../redux/interfaces";

const UserListTable = () => {
  const users = useSelector((state: IMainState) => state?.userState?.users);

  console.log("users is", users);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user: IUser, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user?.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {user?.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {user?.username}
              </TableCell>
              <TableCell component="th" scope="row">
                {user?.email}
              </TableCell>
              <TableCell component="th" scope="row">
                {user?.address?.city}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                <Button variant="contained" color="warning">
                  Edit
                </Button>
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListTable;
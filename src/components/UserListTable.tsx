import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DialogType, IMainState, IUser } from "../redux/interfaces";
import { openDialog } from "../redux/actions/dialog";
import { setUserIdInRedux } from "../redux/actions/users";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { orderBy } from "lodash";

enum SortType {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

const UserListTable = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = React.useState<SortType>();
  const isAscSortByUsername = sort === SortType.ASCENDING;
  const userState = useSelector((state: IMainState) => state?.userState);
  const users = userState?.users;
  const allUsersDeleted = userState?.remainingUser === 0;

  const onEdit = (userId: string) => {
    dispatch(setUserIdInRedux(userId));
    dispatch(openDialog(DialogType.EDIT_USER));
  };

  const onDelete = (userId: string) => {
    dispatch(setUserIdInRedux(userId));
    dispatch(openDialog(DialogType.DELETE_USER_CONFIRM));
  };

  const sortedUsers = sort
    ? orderBy(users, [(user) => user?.username?.toLowerCase()], [sort])
    : users;

  if (allUsersDeleted) {
    return (
      <Box textAlign="center">
        <Typography>All users are deleted</Typography>
      </Box>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell
              title="Sort"
              onClick={() =>
                setSort(
                  isAscSortByUsername ? SortType.DESCENDING : SortType.ASCENDING
                )
              }
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              UserName
              {isAscSortByUsername ? (
                <KeyboardArrowDownOutlinedIcon fontSize="small" />
              ) : (
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
              )}
            </TableCell>
            <TableCell>Email</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers?.map((user: IUser, index) => (
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
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => onEdit(user.id)}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(user.id)}
                >
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

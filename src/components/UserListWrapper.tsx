import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DialogType, IMainState } from "../redux/interfaces";
import { getUserListWrapperComponent } from "./componentFactory";
import { openDialog } from "../redux/actions/dialog";

const UserListWrapper = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: IMainState) => state?.userState);
  const progressStatus = userState?.progressStatus;

  const onAddUser = React.useCallback(
    (e: any) => {
      dispatch(openDialog(DialogType.ADD_USER));
    },
    [dispatch]
  );

  return (
    <Box
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 2,
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Typography>User List</Typography>
        <Button variant="contained" onClick={onAddUser}>
          Add New
        </Button>
      </Box>
      {getUserListWrapperComponent(progressStatus)}
    </Box>
  );
};

export default UserListWrapper;

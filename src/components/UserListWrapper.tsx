import React from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { IMainState, ProgressStatus } from "../redux/interfaces";
import UserListTable from "./UserListTable";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps } from "@mui/system";

const boxStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 300,
};

const UserListWrapper = () => {
  const userState = useSelector((state: IMainState) => state?.userState);
  const progressStatus = userState?.progressStatus;

  let component: React.ReactNode = null;

  switch (progressStatus) {
    case ProgressStatus.LOADING: {
      component = (
        <Box sx={boxStyle}>
          <CircularProgress />
        </Box>
      );
      break;
    }

    case ProgressStatus.SUCCESSFUL: {
      component = <UserListTable />;
      break;
    }

    case ProgressStatus.FAILED: {
      component = (
        <Box sx={boxStyle}>
          <Alert severity="error">Failed to fetch users.</Alert>
        </Box>
      );
      break;
    }
  }

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
        <Button variant="contained">Add New</Button>
      </Box>
      {component}
    </Box>
  );
};

export default UserListWrapper;

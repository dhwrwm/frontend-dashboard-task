import { Box, Alert } from "@mui/material";
import { DialogType, ProgressStatus } from "../redux/interfaces";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps } from "@mui/system";
import UserListTable from "./UserListTable";
import AddUserForm from "./AddUserForm";
import DeleteConfirm from "./DeleteConfirm";

const boxStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 300,
};

export const getDialogTitle = (type?: DialogType) => {
  switch (type) {
    case DialogType.ADD_USER:
      return "Add user";

    case DialogType.EDIT_USER:
      return "Edit user";

    case DialogType.DELETE_USER_CONFIRM:
      return "Delete User";

    default:
      return "";
  }
};

export const getDialogChildren = (
  type?: DialogType,
  handleClose?: () => void
) => {
  switch (type) {
    case DialogType.ADD_USER:
      return <AddUserForm handleClose={handleClose} />;

    case DialogType.EDIT_USER:
      return <AddUserForm handleClose={handleClose} />;

    case DialogType.DELETE_USER_CONFIRM:
      return <DeleteConfirm handleClose={handleClose} />;

    default:
      return "";
  }
};

export const getUserListWrapperComponent = (
  progressStatus?: ProgressStatus
) => {
  switch (progressStatus) {
    case ProgressStatus.LOADING:
      return (
        <Box sx={boxStyle}>
          <CircularProgress />
        </Box>
      );

    case ProgressStatus.SUCCESSFUL:
      return <UserListTable />;

    case ProgressStatus.FAILED:
      return (
        <Box sx={boxStyle}>
          <Alert severity="error">Failed to fetch users.</Alert>
        </Box>
      );

    default:
      return null;
  }
};

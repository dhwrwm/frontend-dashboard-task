import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, setUserIdInRedux } from "../redux/actions/users";
import { IMainState, ProgressStatus } from "../redux/interfaces";

interface Props {
  handleClose?: () => void;
}

const DeleteConfirm = ({ handleClose }: Props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: IMainState) => state?.userState);
  const selectedUserId = userState?.selectedUserId;
  const updatingStatus = userState?.updatingStatus;
  const isUpdating = updatingStatus === ProgressStatus.LOADING;
  const hasFailed = updatingStatus === ProgressStatus.FAILED;

  const onCancel = React.useCallback(() => {
    handleClose?.();
    dispatch(setUserIdInRedux(undefined));
  }, [dispatch, handleClose]);

  const onConfirm = React.useCallback(() => {
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  React.useEffect(() => {
    if (updatingStatus === ProgressStatus.SUCCESSFUL) {
      onCancel();
    }
  }, [updatingStatus, onCancel]);

  return (
    <Box>
      {hasFailed && (
        <Box textAlign="center" m={1} width="100%">
          <FormHelperText error>
            Failed to delete user ({userState?.error})
          </FormHelperText>
        </Box>
      )}
      <Box textAlign="center">
        <Typography>Are you sure, you want to delete?</Typography>
      </Box>
      <Box display="flex" mt={3} width="100%" justifyContent="flex-end">
        <Button
          variant="outlined"
          color="error"
          sx={{ marginRight: 1 }}
          onClick={onCancel}
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="success"
          disabled={isUpdating}
          sx={{ minWidth: 120 }}
        >
          {isUpdating ? (
            <CircularProgress sx={{ color: "white" }} size={18} />
          ) : (
            "Delete"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteConfirm;

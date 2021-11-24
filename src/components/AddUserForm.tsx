import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IMainState, IUser, ProgressStatus } from "../redux/interfaces";
import { addNewUser, editUser, setUserIdInRedux } from "../redux/actions/users";
import React from "react";

export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a name"),
  email: Yup.string()
    .required("Please enter a email")
    .matches(EMAIL_PATTERN, "Invalid email address"),
});

interface Props {
  handleClose?: () => void;
}

export interface UserForm {
  name: string;
  username: string;
  email: string;
  city: string;
}

const mapUserToForm = (user?: IUser) => ({
  name: user?.name ? user?.name : "",
  username: user?.username ? user?.username : "",
  email: user?.email ? user?.email : "",
  city: user?.address?.city ? user?.address?.city : "",
});

const mapUserFormToUser = (id: string, user: UserForm) => ({
  id,
  name: user.name,
  username: user.username,
  email: user.email,
  address: {
    city: user.city,
  },
});

const generateRandomNumber = (max: number, min: number) =>
  Math.ceil(Math.random() * (max - min + 1) + min);

const AddUserForm = ({ handleClose }: Props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: IMainState) => state?.userState);
  const selectedUserId = userState?.selectedUserId;
  const updatingStatus = userState?.updatingStatus;
  const users = userState.users;
  const isUpdating = updatingStatus === ProgressStatus.LOADING;
  const hasFailed = updatingStatus === ProgressStatus.FAILED;
  const user = users.find((user: IUser) => user.id === selectedUserId);

  const userData: UserForm = mapUserToForm(user);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "all", resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    if (selectedUserId) {
      dispatch(
        editUser(selectedUserId, mapUserFormToUser(selectedUserId, data))
      );
      return;
    }
    dispatch(
      addNewUser(mapUserFormToUser(String(generateRandomNumber(100, 10)), data))
    );
  };

  const onCancel = React.useCallback(() => {
    handleClose?.();
    dispatch(setUserIdInRedux(undefined));
  }, [dispatch, handleClose]);

  React.useEffect(() => {
    if (updatingStatus === ProgressStatus.SUCCESSFUL) {
      onCancel();
    }
  }, [updatingStatus, onCancel]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      {hasFailed && (
        <Box textAlign="center" m={1} width="100%">
          <FormHelperText error>
            Failed to {selectedUserId ? "Edit" : "Add"} user ({userState?.error}
            )
          </FormHelperText>
        </Box>
      )}
      <Box
        mb={2}
        sx={{
          "& > :not(style)": { m: 1, width: "47%" },
        }}
      >
        <Controller
          control={control}
          name="name"
          defaultValue={userData?.name}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              label="Name"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors?.name}
              helperText={errors?.name ? errors?.name?.message : ""}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          defaultValue={userData?.email}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              label="Email"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors?.email}
              helperText={errors?.email ? errors?.email?.message : ""}
            />
          )}
        />
      </Box>

      <Box
        mb={2}
        sx={{
          "& > :not(style)": { m: 1, width: "47%" },
        }}
      >
        <Controller
          control={control}
          name="username"
          defaultValue={userData?.username}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              label="Username"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors?.username}
              helperText={errors?.username ? errors?.username?.message : ""}
            />
          )}
        />
        <Controller
          control={control}
          name="city"
          defaultValue={userData?.city}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              label="City"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors?.city}
              helperText={errors?.city ? errors?.city?.message : ""}
            />
          )}
        />
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
          type="submit"
          variant="contained"
          color="success"
          disabled={isUpdating}
          sx={{ minWidth: 120 }}
        >
          {isUpdating ? (
            <CircularProgress sx={{ color: "white" }} size={18} />
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default AddUserForm;

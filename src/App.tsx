import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./components/Header";
import UserListWrapper from "./components/UserListWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./redux/actions/users";
import Dialog from "./components/common/Dialog";
import { IMainState } from "./redux/interfaces";
import { closeDialog } from "./redux/actions/dialog";
import {
  getDialogTitle,
  getDialogChildren,
} from "./components/componentFactory";

function App(): any {
  const dispatch = useDispatch();
  const dialogState = useSelector((state: IMainState) => state?.dialogState);

  const handleClose = React.useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box mt={10}>
        <Container>
          <UserListWrapper />
        </Container>
      </Box>
      <Dialog
        fullWidth
        open={!!dialogState?.open}
        handleClose={handleClose}
        title={getDialogTitle(dialogState?.dialogType)}
        children={getDialogChildren(dialogState?.dialogType, handleClose)}
      />
    </>
  );
}

export default App;

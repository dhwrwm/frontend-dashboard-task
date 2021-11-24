import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./components/Header";
import UserListWrapper from "./components/UserListWrapper";
import { useDispatch } from "react-redux";
import { getUsers } from "./redux/actions/users";

function App(): any {
  const dispatch = useDispatch();

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
    </>
  );
}

export default App;

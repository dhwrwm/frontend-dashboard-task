import { AppBar, Container, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <Container>
          <Typography variant="h6" component="div">
            Dashboard
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Button, Typography, Avatar } from '@mui/material';

const StyledAppBar = styled(AppBar)`
  background-color: #00005a !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Adjust the z-index as needed */
`;

const Title = styled(Typography)`
  flex-grow: 1;
`;

const SignInButton = styled(Button)`
  margin-right: 16px;
`;

const Logo = styled(Avatar)`
  margin-left: 16px;
  margin-right: 16px;
`;

const Navbar = (props) => {
  const MilanaLogo = "/logo-og.png"
  return (
    <StyledAppBar position="static" >
      <Toolbar>
        <Logo src={process.env.PUBLIC_URL + MilanaLogo} alt="milana logo" />
        <Title variant="h6">
          Milana
        </Title>
        <SignInButton color="inherit" onClick={props.signin}>Sign In</SignInButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;

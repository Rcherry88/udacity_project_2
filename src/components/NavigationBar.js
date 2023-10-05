import { useSelector, useDispatch } from "react-redux";
import React from 'react';

import { Link, Redirect } from "react-router-dom";
import { removeCurrentUser } from "../actions/authedUser";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const NavigationBar = () => {
  const loggedInUser = useSelector((state) => state.users[state.authedUser]);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeCurrentUser());
  };

  if (!loggedInUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Box style={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "green" }}>
        <Toolbar>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/add">
            New Question
          </Link>
          <Link style={{ flexGrow: 1 }} className="nav-link" to="/leaderboard">
            Leaderboard
          </Link>
          <div className="navText">Hello, {loggedInUser.name}</div>
          <img
            alt=""
            src={loggedInUser.avatarURL}
            style={{ borderRadius: "50%", width: 50, height: 50 }}
          />
          <Button variant="outline-primary" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */

import React, { useContext, useState } from "react";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Menu,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  AccountCircle,
  Chat,
  ArrowBackIos,
} from "@material-ui/icons";
import { AuthContext } from "../services/auth";
// import auth from "../../services/auth";
import app from "../config/firestore";

const useStyles = makeStyles(() => ({
  switch: {
    justifyContent: "flex-end",
  },
  appbarContainer: {
    "& div": {
      justifyContent: "space-between",
    },
  },
}));

// eslint-disable-next-line no-unused-expressions
("use strict");

// eslint-disable-next-line no-unused-vars
const AppBarModule = (props) => {
  const classAppBar = useStyles();
  // const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDrawer, setDrawer] = useState(false);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const user = useContext(AuthContext).currentUser;

  const { uid, email, displayName } = user;

  console.log(user);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (opened) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(opened);
  };

  let userStatusDatabaseRef = firebase.database().ref(`/users/${uid}`);
  let userStatusFirestoreRef = firebase.firestore().doc(`/users/${uid}`);

  let isOfflineForDatabase = {
    state: "offline",
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  let isOnlineForDatabase = {
    state: "online",
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };

  let isOfflineForFirestore = {
    state: "offline",
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  let isOnlineForFirestore = {
    state: "online",
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  };

  firebase
    .database()
    .ref(".info/connected")
    .on("value", (snapshot) => {
      console.log(snapshot.val());
      // If we're not currently connected, don't do anything.
      if (snapshot.val() === false) {
        userStatusFirestoreRef.set({
          email,
          displayName,
          ...isOfflineForFirestore,
        });
        return;
      }
      userStatusDatabaseRef
        .onDisconnect()
        .set({
          email,
          displayName,
          ...isOfflineForDatabase,
        })
        .then(() => {
          userStatusDatabaseRef.set({
            email,
            displayName,
            ...isOnlineForDatabase,
          });
          userStatusFirestoreRef.set({
            email,
            displayName,
            ...isOnlineForFirestore,
          });
        });
    });

  function handleLogout() {
    // auth.logout(() => {
    //   props.history.push("/");
    // });
    userStatusDatabaseRef.set({
      email,
      displayName,
      ...isOfflineForDatabase,
    });
    userStatusFirestoreRef.set({
      email,
      displayName,
      ...isOfflineForFirestore,
    });
    app.auth().signOut();
  }

  return (
    <div>
      <AppBar position="static" className={classAppBar.appbarContainer}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
            <DrawerComponent toggleDrawer={toggleDrawer} />
          </Drawer>
          <Typography variant="h6">My Account</Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {user.displayName ? user.displayName : user.email}
              </MenuItem>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const DrawerComponent = ({ toggleDrawer }) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
    style={{ minWidth: 210 }}
  >
    <FormGroup>
      <FormControlLabel
        control={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <IconButton onClick={toggleDrawer(false)}>
            <ArrowBackIos />
          </IconButton>
        }
        label="My Account"
        style={{ justifyContent: "space-around" }}
      />
    </FormGroup>
    <List>
      <ListItem button>
        <ListItemIcon>
          <Chat />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItem>
    </List>
  </div>
);

export default AppBarModule;

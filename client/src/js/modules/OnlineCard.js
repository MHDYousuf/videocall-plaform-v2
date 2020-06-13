/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React, { useEffect, useState, useContext } from "react";
import { Paper, Grid, Avatar, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { Call, Block } from "@material-ui/icons";
import { AuthContext } from "../services/auth";

// eslint-disable-next-line no-unused-expressions
("use strict");

function OnlineCard() {
  const [users, setUsers] = useState({});

  const { currentUser } = useContext(AuthContext);
  const { email } = currentUser;

  function handleCall(e) {
    e.preventDefault();
    // eslint-disable-next-line no-use-before-define
    history.push(`${url}/call`);
  }

  const url = "/profile";
  const history = useHistory();

  useEffect(() => {
    let subscribe = true;
    if (subscribe) {
      const fetchUsers = firebase.database().ref("users");

      fetchUsers.on("value", (snapshot) => {
        setUsers(snapshot.val());
      });
    }
    return () => {
      subscribe = false;
    };
  }, []);

  console.log(users);

  return (
    <Grid
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        top: "10%",
        maxWidth: "300px",
        height: "100%",
      }}
    >
      <Paper style={{ position: "inherit", bottom: 0, padding: 10 }}>
        {Object.values(users).map((item) => {
          if (email === item.email) {
            // eslint-disable-next-line no-useless-return
            return;
          } else {
            return (
              <div
                style={{
                  display: "flex",
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "inherit" }}>
                  <Avatar
                    alt="Avatar"
                    src="https://cdn3.iconfinder.com/data/icons/galaxy-open-line-gradient-i/200/contacts-512.png"
                  />
                  <div style={{ display: "inherit", flexDirection: "column" }}>
                    <h5>{item.displayName}</h5>
                    <pre>{item.state}</pre>
                  </div>
                </div>
                <div style={{ padding: 5 }}>
                  {item.state === "online" ? (
                    <IconButton onClick={handleCall}>
                      <Call />
                    </IconButton>
                  ) : (
                    <IconButton disabled>
                      <Block />
                    </IconButton>
                  )}
                </div>
              </div>
            );
          }
        })}
      </Paper>
    </Grid>
  );
}

export default OnlineCard;

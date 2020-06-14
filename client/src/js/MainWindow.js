/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-spacing */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper, Grid, Avatar, IconButton } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { Call, Block } from "@material-ui/icons";
import { AuthContext } from "./services/auth";

function MainWindow({ startCall, clientId }) {
  const [friendID, setFriendID] = useState(null);

  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  const callWithVideo = (video) => {
    const config = { audio: true, video };
    return () => friendID && startCall(true, friendID, config);
  };

  return (
    <div className="container main-window">
      <div>
        <h3 style={{ color: "#000" }}>
          Hi, your ID is
          <input
            type="text"
            className="txt-clientId"
            defaultValue={clientId}
            readOnly
            style={{ color: "#000" }}
          />
        </h3>
        <h4 style={{ color: "#000" }}>Get started by calling a friend below</h4>
      </div>
      <div>
        <input
          style={{ color: "#000" }}
          type="text"
          className="txt-clientId"
          spellCheck={false}
          placeholder="Your friend ID"
          onChange={(event) => setFriendID(event.target.value)}
        />
        <div>
          <button
            style={{ color: "#000" }}
            type="button"
            className="btn-action fa fa-video-camera"
            onClick={callWithVideo(true)}
          />
          <button
            style={{ color: "#000" }}
            type="button"
            className="btn-action fa fa-phone"
            onClick={callWithVideo(false)}
          />
        </div>
      </div>
      <OnlineCard startCall={startCall} />
    </div>
  );
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
};

export default MainWindow;

// eslint-disable-next-line no-unused-expressions
("use strict");

// eslint-disable-next-line react/prop-types
function OnlineCard({ startCall }) {
  const [users, setUsers] = useState({});

  const { currentUser } = useContext(AuthContext);
  const { email } = currentUser;

  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  const callWithVideo = (video, id) => {
    const config = { audio: true, video };
    return () => id && startCall(true, id, config);
  };

  // const url = "/profile";
  // const history = useHistory();

  useEffect(() => {
    let subscribe = true;
    if (subscribe) {
      const fetchUsers = firebase.database().ref("users");

      fetchUsers.on("value", (snapshot) => {
        setUsers(snapshot.val());
      });
    }
    return () => {
      console.log("cleanUp Mainwindow");
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
        width: "235px",
      }}
    >
      <Paper
        style={{
          position: "inherit",
          bottom: 0,
          padding: 10,
          overflow: "scroll",
          maxHeight: "350px",
        }}
      >
        {Object.values(users).map((item) => {
          if (email === item.email) {
            // eslint-disable-next-line no-useless-return
            return;
          } else {
            return (
              <div
                key={item.socket}
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
                    {item.state === "online" ? (
                      <p style={{ fontSize: 8 }}>
                        Caller ID: <br />
                        {item.socket}
                      </p>
                    ) : null}
                    <pre>{item.state}</pre>
                  </div>
                </div>
                <div style={{ padding: 5 }}>
                  {item.state === "online" ? (
                    <IconButton onClick={callWithVideo(true, item.socket)}>
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

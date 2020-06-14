/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

// eslint-disable-next-line no-unused-expressions
("use strict");

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSented, setSended] = useState(false);

  function handleForgotpass() {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // eslint-disable-next-line no-alert
        window.alert("Email has been sent to you,please check it. Voilaa!");
        setSended(true);
      })
      .catch((err) => setError(err.message));
  }

  if (isSented) return <Redirect to="/" />;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Typography style={{ color: "#000", padding: 10 }} variant="h5">
        Please Enter your Email and we will send the Reset Link for your
        password
      </Typography>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        type="email"
        label="Enter Email"
        style={{ marginBottom: "1rem" }}
      />
      <Button
        variant="contained"
        style={{ background: "#2d3436", color: "white" }}
        onClick={handleForgotpass}
      >
        Submit
      </Button>
      <div>{error}</div>
    </Grid>
  );
}

export default ForgotPassword;

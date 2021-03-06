/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React, { useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import { Grid, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as firebase from "firebase/app";
import app, { db } from "../config/firestore";

// import auth from "../../services/auth";

// eslint-disable-next-line no-unused-expressions
("use strict");

const Register = ({ history }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setErrors] = useState("");
  const classRegister = useStyles();

  // const Auth = useContext(AuthContext);

  // const handleForm = (e) => {
  //   e.preventDefault();
  //   auth.login(() => {
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then((user) => {
  //         console.log(user);
  //         console.log("user is created");
  //       })
  //       .catch((err) => console.log(err.code));
  //     history.push("/profile");
  //   });
  // };

  const handleForm = useCallback(async (e) => {
    e.preventDefault();
    try {
      const { username, email, password } = e.target.elements;
      let temp;
      // eslint-disable-next-line prefer-template
      if (username.value === "") temp = "Guest" + Math.random(0, 100);
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((cred) => {
          cred.user.updateProfile({
            displayName: username.value || temp,
          });

          return db
            .collection("users")
            .doc(cred.user.uid)
            .set({
              displayName: username.value || temp,
              email: email.value,
            });
        });
      history.push("/profile");
    } catch (err) {
      alert(err);
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      var provider = new firebase.auth.GoogleAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log(user);
          history.push("/profile");
          return user;
        });
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }, []);

  return (
    <Grid
      className={classRegister.mainContainer}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h4" component="h4" className={classRegister.heading}>
        Register
      </Typography>
      <form onSubmit={handleForm} className={classRegister.formContainer}>
        <TextField
          name="username"
          type="text"
          label="Enter Username"
          style={{ marginBottom: 5 }}
        />
        <TextField
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          label="Enter Email"
          style={{ marginBottom: 5 }}
          required
        />
        <TextField
          // onChange={(e) => setPassword(e.target.value)}
          name="password"
          // value={password}
          label="Enter password"
          type="password"
          style={{ marginBottom: 5 }}
          required
        />
        <button
          onClick={() => handleGoogleLogin()}
          className={classRegister.googleBtn}
          type="button"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Register With Google
        </button>

        <button className={classRegister.loginBtn} type="submit">
          Register
        </button>

        {/* <div className={classRegister.error}>{error}</div> */}
      </form>
      <Typography style={{ color: "#000" }}>
        Already have account? <Link to="/login">Login here</Link>
      </Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(3),
    color: "#000",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    minWidth: 300,
  },
  mainContainer: {
    minHeight: "100vh",
  },
  googleBtn: {
    display: "inherit",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 10,
    border: "none",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: "0px 4px 5px 0px rgba(194,194,194,1)",
    fontWeight: "bold",
    "& img": {
      width: 30,
      margin: 5,
      marginRight: 10,
    },
    color: "#000",
  },
  loginBtn: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(1),
    borderRadius: 10,
    border: "none",
    boxShadow: "0px 4px 5px 0px rgba(194,194,194,1)",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "bold",
    backgroundColor: "#2d3436",
    color: "white",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
}));

export default withRouter(Register);

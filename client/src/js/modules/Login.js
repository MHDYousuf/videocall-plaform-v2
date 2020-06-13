/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import auth from "../../services/auth";
import app from "../config/firestore";
import { AuthContext } from "../services/auth";

// eslint-disable-next-line no-unused-expressions
("use strict");

// eslint-disable-next-line react/prop-types
const Login = ({ history }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setErrors] = useState("");

  // eslint-disable-next-line no-use-before-define
  const classLogin = useStyles();

  function handleForgotPassword() {
    // eslint-disable-next-line react/prop-types
    history.push("/forgot-password");
  }

  const handleForm = useCallback(async (e) => {
    e.preventDefault();
    try {
      const { email, password } = e.target.elements;
      await app.auth().signInWithEmailAndPassword(email.value, password.value);
      // eslint-disable-next-line react/prop-types
      history.push("/profile");
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err);
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  const { currentUser } = useContext(AuthContext);

  const signInWithGoogle = () => {};

  if (currentUser) {
    return <Redirect to="/profile" />;
  }

  return (
    <Grid
      className={classLogin.mainContainer}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h4" component="h4" className={classLogin.heading}>
        Login
      </Typography>
      <form onSubmit={handleForm} className={classLogin.formContainer}>
        <TextField
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          label="Enter Email"
          style={{ marginBottom: 5 }}
        />
        <TextField
          // onChange={(e) => setPassword(e.target.value)}
          name="password"
          // value={password}
          type="password"
          label="Enter password"
          style={{ marginBottom: 5, color: "white" }}
        />
        <button
          onClick={() => signInWithGoogle()}
          className={classLogin.googleBtn}
          type="button"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Login With Google
        </button>
        <button className={classLogin.loginBtn} type="submit">
          Login
        </button>
        {/* <div className={classLogin.error}>{error}</div> */}
      </form>
      <Button onClick={() => history.push("/register")} variant="text">
        Register
      </Button>
      <Button onClick={handleForgotPassword} variant="text">
        Forgot password?
      </Button>
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

export default withRouter(Login);

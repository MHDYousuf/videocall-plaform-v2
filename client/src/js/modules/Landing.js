/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React, { useContext } from "react";
import {
  Grid,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  ArrowRightAltOutlined,
  ArrowRightAltRounded,
} from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../services/auth";

// eslint-disable-next-line no-unused-expressions
("use strict");

function Main() {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/profile" />;
  }

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid item xs={12} lg={8} sm={8} style={{ minHeight: "inherit" }}>
        <CardMedia image="./background.jpg" style={{ minHeight: "inherit" }} />
      </Grid>
      <Grid
        item
        xs={12}
        lg={4}
        sm={4}
        style={{
          justifyContent: "center",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#2d3436",
          padding: 15,
        }}
      >
        <Link to="/register">
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowRightAltOutlined />}
            style={{ margin: "2rem auto" }}
          >
            Register With Us
          </Button>
        </Link>
        <Typography style={{ color: "white" }}>
          Already have an Account? Sign In
          <Link to="/login">
            <IconButton
              style={{
                backgroundColor: "white",
                padding: 10,
                margin: "0 10px",
                transform: "scale(0.8)",
              }}
              color="secondary"
              aria-label="add to shopping cart"
            >
              <ArrowRightAltRounded />
            </IconButton>
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Main;

/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React, { Component } from "react";
import _ from "lodash";
import socket from "./socket";
import PeerConnection from "./PeerConnection";
import MainWindow from "./MainWindow";
import CallWindow from "./CallWindow";
import CallModal from "./CallModal";
import AppBar from "./modules/AppBar";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      clientId: "",
      callWindow: "",
      callModal: "",
      callFrom: "",
      localSrc: null,
      peerSrc: null,
    };
    this.pc = {};
    this.config = null;
    this.startCallHandler = this.startCall.bind(this);
    this.endCallHandler = this.endCall.bind(this);
    this.rejectCallHandler = this.rejectCall.bind(this);
  }

  componentDidMount() {
    socket
      .on("init", ({ id: clientId }) => {
        document.title = `${clientId} - VideoCall`;
        this.setState({ clientId });
      })
      .on("request", ({ from: callFrom }) => {
        this.setState({ callModal: "active", callFrom });
      })
      .on("call", (data) => {
        if (data.sdp) {
          this.pc.setRemoteDescription(data.sdp);
          if (data.sdp.type === "offer") this.pc.createAnswer();
        } else this.pc.addIceCandidate(data.candidate);
      })
      .on("end", this.endCall.bind(this, false))
      .emit("init");
  }

  startCall(isCaller, friendID, config) {
    this.config = config;
    this.pc = new PeerConnection(friendID)
      .on("localStream", (src) => {
        const newState = { callWindow: "active", localSrc: src };
        if (!isCaller) newState.callModal = "";
        this.setState(newState);
      })
      .on("peerStream", (src) => this.setState({ peerSrc: src }))
      .start(isCaller, config);
  }

  rejectCall() {
    const { callFrom } = this.state;
    socket.emit("end", { to: callFrom });
    this.setState({ callModal: "" });
  }

  endCall(isStarter) {
    if (_.isFunction(this.pc.stop)) {
      this.pc.stop(isStarter);
    }
    this.pc = {};
    this.config = null;
    this.setState({
      callWindow: "",
      callModal: "",
      localSrc: null,
      peerSrc: null,
    });
  }

  render() {
    const {
      clientId,
      callFrom,
      callModal,
      callWindow,
      localSrc,
      peerSrc,
    } = this.state;
    return (
      <div>
        <AppBar clientId={clientId} startCall={this.startCallHandler} />
        <MainWindow clientId={clientId} startCall={this.startCallHandler} />
        {/* <OnlineCard clientId={clientId} /> */}
        {!_.isEmpty(this.config) && (
          <CallWindow
            status={callWindow}
            localSrc={localSrc}
            peerSrc={peerSrc}
            config={this.config}
            mediaDevice={this.pc.mediaDevice}
            endCall={this.endCallHandler}
          />
        )}
        {callFrom !== "" ? (
          <CallModal
            status={callModal}
            startCall={this.startCallHandler}
            rejectCall={this.rejectCallHandler}
            callFrom={callFrom}
          />
        ) : null}
      </div>
    );
  }
}

export default Profile;

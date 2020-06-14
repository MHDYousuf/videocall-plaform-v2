/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import firebase from "firebase";

function CallModal({ status, callFrom, startCall, rejectCall }) {
  const [users, setUsers] = useState({});
  // const [caller, setCaller] = useState("");

  useEffect(() => {
    let subscribe = true;
    if (subscribe) {
      const fetchUsers = firebase.database().ref("users");

      fetchUsers.on("value", (snapshot) => {
        setUsers(snapshot.val());
      });
    }

    // let caller = Object.values(users).filter(
    //   (item) => item.socket === callFrom
    // );

    // setCaller(caller[0].displayName);
    return () => {
      subscribe = false;
    };
  }, []);

  // eslint-disable-next-line array-callback-return
  // eslint-disable-next-line no-lone-blocks

  const acceptWithVideo = (video) => {
    const config = { audio: true, video };
    return () => startCall(false, callFrom, config);
  };

  return (
    <div className={classnames("call-modal", status)}>
      <p>
        <span className="caller">{`${callFrom} is calling`}</span>
      </p>
      <button
        type="button"
        className="btn-action fa fa-video-camera"
        onClick={acceptWithVideo(true)}
      />
      <button
        type="button"
        className="btn-action fa fa-phone"
        onClick={acceptWithVideo(false)}
      />
      <button
        type="button"
        className="btn-action hangup fa fa-phone"
        onClick={rejectCall}
      />
    </div>
  );
}

CallModal.propTypes = {
  status: PropTypes.string.isRequired,
  callFrom: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  rejectCall: PropTypes.func.isRequired,
};

export default CallModal;

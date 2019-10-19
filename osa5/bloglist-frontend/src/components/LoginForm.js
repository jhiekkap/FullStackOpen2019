import React from "react";
import Notification from "./Notification";
import PropTypes from "prop-types";

 
const LoginForm = ({ notification, handleLogin, username, password }) => {

 
  const omitReset = (customHook) => {
    const { reset, ...shorterHook } = customHook
    return shorterHook
  }

  const inputUsername = omitReset(username)
  const inputPassword = omitReset(password)


  return (
    <div>
      <div className="row">
        <h2>Log in to application</h2>
      </div>
      <div className="row">
        <div className="col-4">
          <Notification notification={notification} />
          <form onSubmit={handleLogin}>
            <div className="form-group">
              username
              <input className="form-control" {...inputUsername} />
            </div>
            <div className="form-group">
              password
              <input className="form-control" {...inputPassword} />
            </div>
            <button className="btn btn-primary" type="submit">
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* 

LoginForm.propTypes = {
    notification: PropTypes.string.isRequired,
    setNotification: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
} */
 
export default LoginForm;

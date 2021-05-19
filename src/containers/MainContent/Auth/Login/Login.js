import React, { Component } from "react";
import AUX from "../../../../hoc/Aux_";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../../../store/action";
import UserService from "../../../../services/UserService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  componentDidMount() {
    if (this.props.loginpage === false) {
      this.props.UpdateLogin();
    }
    window.onpopstate = (e) => {
      this.props.UpdateLoginAgain();
    };
  }

  render() {
    return (
      <AUX>
        <div className="accountbg" />
        <div className="wrapper-page">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center m-0">
                <Link
                  to="/"
                  onClick={() => this.props.UpdateLoginAgain()}
                  className="logo logo-admin"
                >
                  <img src="assets/images/logo.png" height="30" alt="logo" />
                </Link>
              </h3>

              <div className="p-3">
                <h4 className="font-18 m-b-5 text-center">Welcome Back !</h4>
                <p className="text-muted text-center">
                  Sign in to continue to Admiria.
                </p>

                <form className="form-horizontal m-t-30">
                  <div className="form-group">
                    <label for="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label for="userpassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="userpassword"
                      placeholder="Enter password"
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group row m-t-20">
                    <div className="col-sm-6">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customControlInline"
                        />
                        <label
                          className="custom-control-label"
                          for="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6 text-right">
                      <button
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="button"
                        onClick={async () => {
                          UserService.login(
                            this.state.email,
                            this.state.password
                          )
                            .then((res) => {
                              this.props.history.push("/");
                              console.log(res);
                              window.location.reload();
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Log In
                      </button>
                    </div>
                  </div>

                  <div className="form-group m-t-10 mb-0 row">
                    <div className="col-12 m-t-20">
                      <Link to="pages_recoverpw" className="text-muted">
                        <i className="mdi mdi-lock" /> Forgot your password?
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="m-t-40 text-center">
            <p className="text-white">
              Don't have an account ?{" "}
              <Link
                to="pages_register"
                className="font-500 font-14 text-white font-secondary"
              >
                {" "}
                Signup Now{" "}
              </Link>{" "}
            </p>
            <p className="text-white">
              © {new Date().getFullYear() - 1} - {new Date().getFullYear()}{" "}
              Admiria. Crafted with <i className="mdi mdi-heart text-danger" />{" "}
              by Themesbrand
            </p>
          </div>
        </div>
      </AUX>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    loginpage: state.ui_red.loginpage,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    UpdateLogin: () => dispatch({ type: actionTypes.LOGINPAGE, value: true }),
    UpdateLoginAgain: () =>
      dispatch({ type: actionTypes.LOGINPAGE, value: false }),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Login);

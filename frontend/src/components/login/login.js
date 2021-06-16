import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth-service";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordShown: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    AuthService.login(this.state.username, this.state.password).then(authRes => {
      if (authRes.ok) {
        this.props.updateUser();
        this.props.history.push("/find");
      } else {
          alert(authRes.data.message);
      }
    });
  };

  render() {
    return (
      <div data-testid="login" className="login-container">
        <div className="login-box">
          <h1 className="login-title">Login</h1>
          <h4 className="login-message">{this.props?.location?.state ? this.props.location.state.message : ""}</h4>
          <form className="login-form">
            <label>
              <p className="field">Username</p>
              <input
                type="text"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </label>
            <label>
              <p className="field">Password</p>
                <input style={{marginLeft:"3em"}}
                  type={this.state.passwordShown ? "text" : "password"}
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <i style={{marginLeft:"1em"}} onClick={()=>{this.setState({passwordShown: !this.state.passwordShown})}}>{eye}</i>
              <br />
            </label>
            <button
              className="button"
              type="submit"
              onClick={(e) => this.handleSubmit(e)}
            >
              Login
            </button>
            <h4 className="no-account">Don't have an account yet?</h4>
            <Link className="post-button" to="/register">
              Create An Account
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

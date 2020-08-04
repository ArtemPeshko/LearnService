import React, {Component} from "react";
// import form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";

import AuthService from "../service/auth.service";

/**
 *
 * @author Artem Peshko
 * @version 1.0
 */

const required = value => {
    if(!value) {
        return(
            <div className = "alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }


    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.props.history.push("/profile");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        const name = this.state.username;
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <form
                        onSubmit={this.handleLogin}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={required}
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={required}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block"
                                    disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-boarder spinner-boarder-sm"/>
                                )} <span>login</span></button>
                        </div>

                        {/*)*/}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        )
    }
}
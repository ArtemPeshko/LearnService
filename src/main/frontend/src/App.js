import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthService from "./service/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

/**
 *
 * @author Artem Peshko
 * @version 1.0
 */

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            ShowAdminBoard: false,
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: AuthService.getCurrentUser(),
                ShowAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const {currentUser, ShowAdminBoard} = this.state;

        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="nav-link">
                            LearnService
                        </Link>
                        <div className="navbar-nav ar-auto">
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">Home</Link>
                            </li>

                            {ShowAdminBoard && (
                                <li className="nav-item">
                                    <Link to={"/admin"} className="nav-link">
                                        Admin Board
                                    </Link>
                                </li>
                            )}
                            {currentUser && (
                                <li className="nav-item">
                                    <Link to={"/user"} className="nav-link">
                                        User Board
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <a href="/login" className="nav-link" onClick={this.logOut}>Logout</a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sing Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route path="/user" component={BoardUser}/>
                            <Route path="/admin" component={BoardAdmin}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;

import React, {Component} from "react";

import AuthService from "../service/auth.service";

/**
 *
 * @author Artem Peshko
 * @version 1.0
 */

export default class Profile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="container">
                <header className="jumbotron">
                    <h1>
                        <strong>{currentUser.username}</strong> Profile
                    </h1>
                </header>

                <p> 
                    {currentUser.accessToken.substring(0, 20)}...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>Id</strong>
                    {currentUser.id}
                </p>
                <p>
                    <strong>Email</strong>
                    {currentUser.email}
                </p>
                <strong>Authorities</strong>
                <ul>
                    {currentUser.roles && 
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </div>
        );
    }
}
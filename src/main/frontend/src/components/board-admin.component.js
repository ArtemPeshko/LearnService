import React, {Component} from "react";

import UserService from "../service/user.service"

/**
 *
 * @author Artem Peshko
 * @version 1.0
 */

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }
    componentDidMount() {
        UserService.getAdminBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                    (error.response && 
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
        }
        );
    }
    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h1>{this.state.content}</h1>
                </header>
            </div>
        );
    }
}
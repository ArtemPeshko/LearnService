import axios from 'axios';

/**
 *
 * @author Artem Peshko
 * @version 1.0
 */ 

const API_URL = 'http://localhost:8090/api/auth/';
class AuthService {
    login(username, password) {
        return axios
        .post(API_URL + "singin", {
            username,
            password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    logout(){
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "singup",{
            username,
            email,
            password
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
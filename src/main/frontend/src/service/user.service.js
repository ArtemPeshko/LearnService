import axios from 'axios';
import authHeader from './auth-header.js';

/**
 *
 * @author Artem Peshko
 * @version 1.0
 */

const API_URL = 'http://localhost:8090/api/auth/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', {headers: authHeader()});
    }
}

export default new UserService();
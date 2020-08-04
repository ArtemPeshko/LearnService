/**
 *
 * @author Artem Peshko
 * @version 1.0
 */

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {Authorization: 'Bearer_' + user.token};
    } else {
        return {};
    }
}
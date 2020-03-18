import config from '../config';
import { authHeader } from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    getById,
    checkIsLogin
};

function login(username, password) {

    return fetch(`${config.api}/my/account.json`,{
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }})
        .then(res => res.json())
        .then((data) => {
          console.log('data => ', data)
          localStorage.setItem('api_key', data.user.api_key);
          this.setState({ contacts: data })
        })
        .catch(console.log)
}

function checkIsLogin() {
  const token = localStorage.getItem('api_key');
  return fetch(`${config.api}/my/account.json`,{
    method: 'GET',
      headers: {
        'X-Redmine-API-Key': token,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }}).then(res => res.json())

}


function logout() {
    localStorage.removeItem('api_key');
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
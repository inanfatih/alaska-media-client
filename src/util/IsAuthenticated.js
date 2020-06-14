import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function IsAuthenticated() {
  let isAuthenticated = true;

  const token = localStorage.AlaskaMediaToken;

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('AlaskaMediaToken');
      delete axios.defaults.headers.common['Authorization'];
      isAuthenticated = false;
      window.location.href = '/login';
    } else {
      axios.defaults.headers.common['Authorization'] = token;
    }
  } else {
    delete axios.defaults.headers.common['Authorization'];
    isAuthenticated = false;
    window.location.href = '/login';
  }
  return isAuthenticated;
}

import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function IsAuthenticated() {
  let isAuthenticated = true;

  const token = localStorage.DreamPicturesToken;

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('DreamPicturesToken');
      delete axios.defaults.headers.common['Authorization'];
      isAuthenticated = false;
      // window.location.href = '/admin';
    } else {
      axios.defaults.headers.common['Authorization'] = token;
    }
  } else {
    delete axios.defaults.headers.common['Authorization'];
    isAuthenticated = false;
  }
  return isAuthenticated;
}

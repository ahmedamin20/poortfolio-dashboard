import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authStorageKeys from '../constants/authStorageKeys';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the code from the URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // Send the code to your backend to exchange it for a token
      axios
        .post('http://localhost:3001/api/auth/google/token', { code })
        .then((response) => {
          // Assuming the response contains the token
          const { token } = response.data;

          // Save the token securely (e.g., localStorage or cookies)
          localStorage.setItem(authStorageKeys.TOKEN, token);

          // Redirect the user to the desired route
          navigate('/skills'); // Or any protected route
        })
        .catch((error) => {
          console.error('Token exchange failed', error);
          // Handle the error appropriately
        });
    } else {
      console.error('Authorization code not found in URL');
    }
  }, [navigate]);

  return <div>Authenticating...</div>; // Loading indicator while redirecting
};

export default AuthCallback;

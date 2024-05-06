'use client';
import './login.css';
import { useState } from 'react'; // Import useState hook for error message

function Login() {
  const [name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState(''); // State for error message
  
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Creating form data to send to the server
    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);

    try {
      // Sending a POST request to the server for login
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        // If login is successful, extract the token from the response 
        const token = await response.text();
        console.log('Successful login, here is your token:', token);
        // Store the token in the browser's local storage for later use
        localStorage.setItem('token', token); 


        // Redirect to another page after successful login
        window.location.href = '/websiteview';
        // The following is an authentication test with the token, calling the /auth/secure endpoint.
        // This endpoint is a test endpoint to verify authentication. The expectation is that every endpoint
        // requiring verification should only need to request the token, which is sent through the header.

        // Checking user authentication by calling a secure endpoint
        const profileResponse = await fetch(
          'http://localhost:8080/auth/secure',
          {
            method: 'GET',
            headers: {
              Authorization: token,
            },
          }
        );

        if (profileResponse.status === 200) {
          const userData = await profileResponse.text();
          // If the user is authenticated, log their data
          console.log('The user is:', userData);
        } else {
          // If user not found, log an error
          console.log('The user was not found');
        }

        //Store the token in local storage or use it for subsequent API calls
      } else {
        // If login is unsuccessful, throw an error
        throw new Error('Failed login');
      }
    } catch (error) {
      // If any error occurs during login, log the error and set an error message
      console.error('Login error:', error.message);
      setMensajeError('Invalid username or password'); // Set error message
    }
  };

  return (
    <div className="login">
      <h1>
        <strong>USER LOGIN</strong>
      </h1>
      <form onSubmit={handleSubmit}>
         {/* Input fields for username and password */}
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Button to submit the form */}
        <button type="submit">LOGIN</button>
      </form>
      {mensajeError && <p className="error-message">{mensajeError}</p>}{' '}
      {/* Display error message if present */}
      <div className="circle-image">{/* ... */}</div>
    </div>
  );
}

export default Login;

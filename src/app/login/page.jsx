'use client';
import './login.css';
import { useState } from 'react'; // Import useState hook for error message

function Login() {
  const [name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState(''); // State for error message

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        // Inicio de sesión exitoso, maneja los datos de respuesta (potencialmente un token)
        const token = await response.text();
        console.log('Inicio de sesión exitoso, aquí tienes tu token:', token);
        localStorage.setItem('token', token); // El token es guardado como variable local en el navegador para uso posterior

        window.location.href = '/websiteview';
        // Lo siguiente es una prueba de autenticacion con el token, se manda a llamar al endpoint /auth/secure
        // que es un endpoint de prueba para verificar el endpoint, se supone que cada endpoint que necesite
        // verificacion solo deba de pedir el token, el token se manda por el header
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
          console.log('El usuario es:', userData);
          localStorage.setItem('token', userData.name); // El token es guardado como variable local en el navegador para uso posterior
        } else {
          console.log('No se encontro tal usuario');
        }

        // Almacena el token en el almacenamiento local o úsalo para llamadas API posteriores
      } else {
        throw new Error('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
      setMensajeError('Nombre de usuario o contraseña no válidos'); // Set error message
    }
  };

  return (
    <div className="login">
      <h1>
        <strong>USER LOGIN</strong>
      </h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">LOGIN</button>
      </form>
      {mensajeError && <p className="error-message">{mensajeError}</p>}{' '}
      {/* Display error message if present */}
      <div className="circle-image">{/* ... */}</div>
    </div>
  );
}

export default Login;

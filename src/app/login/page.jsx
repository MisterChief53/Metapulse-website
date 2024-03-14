'use client';
import '../login/login.css';
import { useState } from 'react'; // Import useState hook for error message

function Login() {
  const [name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState(''); // State for error message

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, password }),
});


      if (response.status === 200) {
        // Inicio de sesión exitoso, maneja los datos de respuesta (potencialmente un token)
        const datos = await response.json();
        console.log('Inicio de sesión exitoso:', datos);
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
      <h1><strong>USER LOGIN</strong></h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} onChange={(e) => setUserName(e.target.value)} />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">LOGIN</button>
      </form>
      {mensajeError && <p className="error-message">{mensajeError}</p>}  {/* Display error message if present */}
      <div className="circle-image">
      {/* ... */}
      </div>
    </div>
  );
}

export default Login;

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, password } = req.body;
  
      try {
        // Call your Spring Boot backend API to authenticate the user
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, password }),
        });
  
        if (response.ok) {
          // Handle successful authentication (e.g., send token or redirect)
          const data = await response.json();
          res.status(200).json(data);
        } else {
          // Handle failed authentication
          res.status(response.status).json({ message: 'Invalid username or password' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Handle other methods (e.g., GET)
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  
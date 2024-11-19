import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // To handle errors
    const navigate = useNavigate();
  
    const handleSignup = async () => {
        const token = localStorage.getItem('token');
        try {
        const response = await fetch('http://localhost:3000/Login', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, token }),  // Correct body format
        });
  
        const data = await response.json();  // Parsing the response JSON
  
        if (response.status === 201) {
          console.log("Login successful");
          console.log(data);  // Log the parsed data, not response.data
          
          // You can redirect the user or show a success message here
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (err) {
        setError('Error occurred while Login up');
        console.error('Error adding item:', err);
      }
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!username || !password) {
        setError('Both fields are required');
        return;
      }
  
      setError("");  // Clear any previous error
      handleSignup();
      setTimeout(() => {
          navigate('/main'); 
      }, 5000);

  
    
    }




  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          <h1 className='text-xl md:text-3xl font-bold text-gray-500 mb-9 px-5'>
            Aryan Bandooni - Reachify Full Stack Assignment
          </h1>

          <h2 className="text-2xl font-semibold text-center mb-4">Login Page</h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}  {/* Error Message */}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

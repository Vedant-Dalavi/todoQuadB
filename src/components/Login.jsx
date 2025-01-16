import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import night from "../assets/night.png";
import day from "../assets/day.png";
import { toggleDarkMode } from '../redux/slices/themeSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Find the user with matching email and password
        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            // Save the logged-in user in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Update Redux state
            dispatch(login({ email: user.email, name: user.name }));

            // Redirect to dashboard
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    const dark = useSelector((state) => state.theme.darkMode);

    return (
        <div className={`relative min-h-screen w-full  ${!dark ? "bg-gray-100" : "bg-[#232323] text-white"} flex items-center justify-center`}>
            <div className='cursor-pointer absolute right-5 top-5'>

                {
                    dark == false ?
                        <img src={night} width={24} height={24} alt="" loading='lazy' onClick={() => dispatch(toggleDarkMode())} /> : <img src={day} alt="" width={24} height={24} loading='lazy' onClick={() => dispatch(toggleDarkMode())} />
                }
            </div>

            <div className={`${!dark ? "bg-gray-100" : "bg-[#2C2C2C] text-white"} p-8 rounded-lg shadow-md w-96`}>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className={`block text-sm font-medium ${dark ? "text-white" : "text-gray-700"}`}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`${dark && "bg-[#2F3630] text-white"} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className={`block text-sm font-medium${dark ? "text-white" : "text-gray-700"}`}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${dark && "bg-[#2F3630] text-white"} mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
                <p className={`mt-4 text-center text-sm ${dark ? "text-white" : "text-gray-600"}`}>
                    Do not have an account?{' '}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
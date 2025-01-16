import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/slices/authSlice';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const toggle = useSelector((state) => state.tasks.sidebar);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const darkMode = useSelector((state) => state.theme.darkMode)
  const dispatch = useDispatch();

  // Check for a logged-in user in localStorage on page load
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      dispatch(login({ email: loggedInUser.email, name: loggedInUser.name }));
    }
  }, [dispatch]);

  const dark = useSelector((state) => state.theme.darkMode)

  return (
    <div className={`overflow-auto scrollbar-hide ${!dark ? "bg-[#FBFDFC] " : "dark:bg-[#242424] dark:text-white"} `}>
      {isAuthenticated && <Navbar />}
      <div className="flex flex-row justify-between gap-x-5">
        {isAuthenticated && toggle && <Sidebar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Redirect to login for unknown routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}
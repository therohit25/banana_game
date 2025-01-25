import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { getUserInfo } from '../api/get-players';
import { login } from '../features/LoginLogout';
import AdminPanel from '../pages/admin-dashboard';
import Login from '../pages/login';
import Registration from '../pages/registration';
import FruitSection from '../pages/user/fruit-section';
import PlayersRankings from '../pages/user/players-rankings';
import AdminProtectedRoute from './admin-protected-routes';
import ProtectedRoute from './protected-routes';

const AppRoutes: React.FC = () => {
  const userdetails = useSelector((state) => (state as any).user.value);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (Cookies.get('accesstoken')) {
      const fetchUser = async () => {
        try {
          const data = await getUserInfo();
          dispatch(login({ email: data.email, role: data.role }));
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontWeight: 'bold',
        }}
      >
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute requiredRole={!!userdetails} />}>
          <Route path='/' element={<FruitSection />} />
          <Route path='/rankings' element={<PlayersRankings />} />
        </Route>
        <Route
          element={
            <AdminProtectedRoute requiredRole={userdetails?.role === 'admin'} />
          }
        >
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/addUsers' element={<Registration />} />
          <Route path='/editUsers/:userId' element={<Registration />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

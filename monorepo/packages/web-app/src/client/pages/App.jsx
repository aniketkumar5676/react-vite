import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useStore from '../store';
const Core = React.lazy(() => import('../components/Core'));
const Login = React.lazy(() => import('../auth/Login'));
const Dashboard = React.lazy(() => import('dashboard/DashboardApp'));
const Profile = React.lazy(() => import('profile/ProfileApp'));

const App = () => {
  const user = useStore((state) => state.user);
   
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Suspense fallback={<div>Loading...</div>}><Core /></Suspense> : <Navigate to="/login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route
        path="/login"
        element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            )
        }
      />
    </Routes>
  );
};

export default App;

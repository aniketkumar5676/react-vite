import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useStore from '../store';
import Core from '../components/Core';
const Login = React.lazy(() => import('../auth/Login'));
const Dashboard = React.lazy(() => import('dashboard/DashboardApp'));
const Profile = React.lazy(() => import('profile/ProfileApp'));

const App = () => {
  const user = useStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Core /> : <Navigate to="/login" />}
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
    </BrowserRouter>
  );
};

export default App;

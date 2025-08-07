'use client';

import { Layout } from 'antd';
import { useAuthStore } from 'shared-store';

const { Header } = Layout;

export const Navbar = () => {
  const { username } = useAuthStore();

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        padding: '0 24px',
      }}
    >
      <div style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>
        Multizone Architecture
      </div>
      <div style={{ color: 'black' }}>
        Welcome, {username}!
      </div>
    </Header>
  );
};

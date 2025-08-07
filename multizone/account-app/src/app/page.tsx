'use client';

import { Button } from 'antd';
import { useAuthStore } from 'shared-store';

import { DashboardOutlined, LogoutOutlined, ProfileOutlined,  MenuFoldOutlined,
  MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu ,theme } from 'antd';
import { useState, useEffect } from 'react';
import styles from './loading.module.css';

const { Header, Sider, Content } = Layout;


export default function DashboardPage() {
  const { isLoggedIn, username, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [bankBalance, setBankBalance] = useState('');
  const [lienAccount, setLienAccount] = useState('');
  const [depositAccount, setDepositAccount] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setIsLoading(false);
    setBankBalance(Math.floor(Math.random() * 100000).toLocaleString());
    setLienAccount(Math.floor(Math.random() * 10000).toLocaleString());
    setDepositAccount(Math.floor(Math.random() * 50000).toLocaleString());
    setShowDetails(true);
  }, [isLoggedIn]);

  return (
    <>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <div className={styles.loadingText}>Loading Account Details...</div>
        </div>
      ) : !isLoggedIn ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <h1>Please login to view the Accounts</h1><br></br>
          <Button type="primary" onClick={() => window.location.href = 'http://localhost:3000'}>
            Login
          </Button>
        </div>
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["2"]}
              onClick={({ key }) => {
                console.log(key)
                if (key === "3") {
                  logout();
                }
              }}
              items={[
                {
                  key: "1",
                  icon: <DashboardOutlined />,
                  label: <a href="http://localhost:3001">Dashboard</a>,
                },
                {
                  key: "2",
                  icon: <ProfileOutlined />,
                  label: <a href="http://localhost:3002">Account</a>,
                },
                {
                  key: "3",
                  icon: <LogoutOutlined />,
                  label: "Logout",
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div style={{ padding: '2rem' }}>
                <h1>Welcome to your Account, {username}!</h1>
                <div style={{ marginTop: '2rem', border: '1px solid #e8e8e8', padding: '1rem', borderRadius: '8px' }}>
                  <h2>Account Details</h2>
                  <p><strong>Bank Account Balance:</strong> ₹{bankBalance}</p>
                  <p><strong>Lien Account:</strong> ₹{lienAccount}</p>
                  <p><strong>Deposit Account:</strong> ₹{depositAccount}</p>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
}

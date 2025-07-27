import React from 'react';
import { Layout, Menu, Button ,theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import useStore from '../store';
import { useState } from 'react';
import { DashboardOutlined, LogoutOutlined, ProfileOutlined,  MenuFoldOutlined,
  MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;



const Core = () => {
  const logout = useStore((state) => state.logout);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const redirect=()=>{
    window.location.reload();
  }
  return (
    <Layout style={{ minHeight: '100vh',marginTop:'20px' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            console.log(key)
            if (key === "3") {
              console.log(key)
              logout();
              redirect()
            }
          }}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <ProfileOutlined />,
              label: <Link to="/profile">Profile</Link>,
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Core;

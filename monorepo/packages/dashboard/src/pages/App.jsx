import React from 'react';
import { Layout, Menu, Card, Button, Typography } from 'antd';
import { UserOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import useStore from 'shell/store';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const user = useStore((state) => state.user);

  return (
    <Layout className="min-h-screen">
      <Content className="p-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <Title level={2} className="mb-6 text-gray-800">Welcome, {user?.username || 'Guest'}!</Title>
          <Paragraph className="mb-8 text-gray-600">
            This is your personalized dashboard. Here you can find an overview of your activities and important metrics.
          </Paragraph>


        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
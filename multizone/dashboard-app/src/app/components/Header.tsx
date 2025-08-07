import { Layout } from 'antd';

const { Header: AntdHeader } = Layout;

export const Header = () => (
  <AntdHeader style={{ display: 'flex', alignItems: 'center' }}>
    <div className="demo-logo" />
    <h1 style={{ color: 'white', margin: 0 }}>Dashboard Application</h1>
  </AntdHeader>
);

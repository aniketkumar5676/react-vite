import { Layout } from 'antd';

const { Footer: AntdFooter } = Layout;

export const Footer = () => (
  <AntdFooter style={{ textAlign: 'center' }}>
    Login App Footer ©{new Date().getFullYear()}
  </AntdFooter>
);

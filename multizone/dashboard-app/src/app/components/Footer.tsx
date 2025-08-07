import { Layout } from 'antd';

const { Footer: AntdFooter } = Layout;

export const Footer = () => (
  <AntdFooter style={{ textAlign: 'center' }}>
    Dashboard App Footer ©{new Date().getFullYear()}
  </AntdFooter>
);

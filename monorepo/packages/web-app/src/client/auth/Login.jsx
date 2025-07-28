import { Tabs, Form, Input, Button } from 'antd';
import useStore from '../store';

const { TabPane } = Tabs;

const Login = () => {
  const login = useStore((state) => state.login);
  const register = useStore((state) => state.register);

  const onFinishLogin = (values) => {
    login(values);
  };

  const onFinishRegister = (values) => {
    register(values);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-96">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Login" key="1">
            <Form onFinish={onFinishLogin}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Register" key="2">
            <Form onFinish={onFinishRegister}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;

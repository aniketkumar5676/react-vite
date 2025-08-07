'use client';

import { Button, Form, Input } from 'antd';
import { useAuthStore } from 'shared-store';

export default function LoginPage() {
  const { login } = useAuthStore();

  interface LoginFormValues {
    username: string;
    password?: string;
  }

  const onFinish = (values: LoginFormValues) => {
    console.log('Success:', values);
    login(values.username);
    window.location.href = 'http://localhost:3001'; // Redirect to dashboard
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
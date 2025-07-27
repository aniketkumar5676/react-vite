import React from 'react';
import { Form, Input, Button } from 'antd';
import useStore from 'shell/store';

const Profile = () => {
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);

  const onFinish = (values) => {
    updateUser(values);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Profile</h1>
      <Form initialValues={user} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
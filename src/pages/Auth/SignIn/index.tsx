import React, { useState } from 'react';

import { Form, Input, Button, message } from 'antd';
import { history, Link, useModel } from 'umi';

import styles from '../index.less';
import { login } from '@/services/user';

const SignIn: React.FC = () => {
    const [form] = Form.useForm();
    const { setInitialState } = useModel('@@initialState');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: any) => {
        const { email, password } = values;
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);
        if (result.uid) {
            setInitialState({
                currentUser: result,
            });
            history.push('/');
        }
    };

    return (
        <div className={styles.container}>
            <h1>SMASH1</h1>
            <h4>Welcome back!</h4>
            <Form validateTrigger="onBlur" form={form} onFinish={onSubmit}>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid email!',
                        },
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    loading={loading}
                >
                    Sign In
                </Button>
                <Link to="/sign-up">
                    <h5>Don’t have an account?</h5>
                </Link>
            </Form>
        </div>
    );
};

export default SignIn;

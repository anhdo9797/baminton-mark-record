import React, { useState } from 'react';

import { Form, Input, message, Button } from 'antd';
import { checkPassword, rulerConfirm, rulerPassWord } from '../checkInputType';
import { history, Link, useModel } from 'umi';

import styles from '../index.less';
import { register } from '@/services/user';

const SignUp: React.FC = () => {
    const [form] = Form.useForm();
    const { setInitialState } = useModel('@@initialState');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: any) => {
        const { email, password } = values;
        setLoading(true);
        const result = await register(email, password);
        setLoading(false);
        if (result.uid) {
            setInitialState({
                currentUser: result,
            });
            history.push('/update-profile');
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>SMASH</h1>
                <h4>Create your account to fully experience the app</h4>
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
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        'The two passwords that you entered do not match!',
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm password" />
                    </Form.Item>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        loading={loading}
                    >
                        Sign In
                    </Button>
                    <Link to="/">
                        <h5>Already have an account?</h5>
                    </Link>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;

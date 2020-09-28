import React, { useState } from 'react';

import { Form, Input, message, Button } from 'antd';
import { checkPassword } from '../checkInputType';
import { Link } from 'umi';

import styles from '../index.less';

const validateMessages = {
    types: {
        email: 'Email is not validate email!',
        password: 'Password is not a validate',
        confirmPassword: 'Password is not a validate',
    },
};

const SignUp: React.FC = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmPass: '',
    });

    const sigUp = () => {
        const { email, password, confirmPass } = input;
        if (!email || email.indexOf('@gmail.com') == -1) {
            message.error('Please check your email!');
        } else if (!checkPassword(password)) {
            message.error('Please check your password!');
        } else {
            if (password !== confirmPass) {
                message.error('Incorrect password');
            }
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>SMASH</h1>
                <h4>Create your account to fully experience the app </h4>
                <Form validateMessages={validateMessages}>
                    <Form.Item name={['email']} rules={[{ type: 'email' }]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name={['password']}
                        rules={[
                            {},
                            () => ({
                                validator(rule, value) {
                                    if (!value || checkPassword(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        'Password must be 8 characters long and have no special characters!',
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name={['confirm']}
                        rules={[
                            {},
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Incorrect password');
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm password" />
                    </Form.Item>
                    <Button type="primary" block onClick={sigUp}>
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

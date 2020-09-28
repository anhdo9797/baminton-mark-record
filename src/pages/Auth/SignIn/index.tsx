import React, { useState } from 'react';

import { Form, Input, Button, message } from 'antd';
import { Link } from 'umi';

import styles from '../index.less';
import { checkPassword } from '../checkInputType';

const validateMessages = {
    types: {
        email: 'Please enter a valid email!',
        password: 'Password is not a validate',
        confirmPassword: 'Password is not a validate',
    },
};

const SignIn: React.FC = () => {
    const [input, setInput] = useState({ email: '', password: '' });

    const signIn = () => {
        if (!input.email || input.email.indexOf('@gmail.com') == -1) {
            message.error('Please check your email!');
        } else if (!checkPassword(input.password)) {
            message.error('Please check your password!');
        }
    };

    return (
        <div className={styles.container}>
            <h1>SMASH</h1>
            <h4>Welcome back!</h4>
            <Form validateMessages={validateMessages}>
                <Form.Item name={['email']} rules={[{ type: 'email' }]}>
                    <Input
                        placeholder="Email"
                        onChange={text =>
                            setInput({ ...input, email: text.target.value })
                        }
                    />
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
                    <Input.Password
                        placeholder="Password"
                        className={styles.inputType}
                        onChange={text =>
                            setInput({
                                ...input,
                                password: text.target.value,
                            })
                        }
                    />
                </Form.Item>
                <Button type="primary" block onClick={signIn}>
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

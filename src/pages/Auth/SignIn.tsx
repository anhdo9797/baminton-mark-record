import React, { useState } from 'react';

import { Form, Input, message } from 'antd';
import { Link, NavLink } from 'umi';

import style from './styles.scss';
import '../../theme.scss';

import ButtonCustom from '@/components/Button';
import { checkPassword } from './checkPass';

const validateMessages = {
    types: {
        email: 'Email is not validate email!',
        password: 'Password is not a validate',
        confirmPassword: 'Password is not a validate',
    },
};

const SignIn: React.FC = () => {
    const [input, setInput] = useState({ email: '', password: '' });
    const signIn = () => {
        if (!input.email) {
            message.error('Please enter email!');
        } else if (!input.password) {
            message.error('Please enter password!');
        }
    };

    return (
        <div className="container">
            <div className={style.sigIn}>
                <h1>SMASH</h1>
                <h3>Welcome back!</h3>
                <Form validateMessages={validateMessages}>
                    <Form.Item name={['email']} rules={[{ type: 'email' }]}>
                        <Input
                            placeholder="Email"
                            className={style.inputType}
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
                            className={style.inputType}
                            onChange={text =>
                                setInput({ ...input, email: text.target.value })
                            }
                        />
                    </Form.Item>
                    <ButtonCustom label="Sign In" style={{}} onClick={signIn} />
                    <Link to="/sign-up">
                        <h4>Don’t have an account?</h4>
                    </Link>
                </Form>
            </div>
        </div>
    );
};

export default SignIn;

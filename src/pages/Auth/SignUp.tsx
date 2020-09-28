import React, { useState } from 'react';

import style from './styles.scss';
import '../../theme.scss';
import { Form, Input, message } from 'antd';
import ButtonCustom from '@/components/Button';
import { checkPassword } from './checkPass';
import { Link } from 'umi';

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: 'Email is not validate email!',
        password: 'Password is not a validate',
        confirmPassword: 'Password is not a validate',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
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
        <div className="container">
            <div className={style.sigIn}>
                <h1>SMASH</h1>
                <h3>Create your account to fully experience the app </h3>
                <Form validateMessages={validateMessages}>
                    <Form.Item name={['email']} rules={[{ type: 'email' }]}>
                        <Input
                            placeholder="Email"
                            className={style.inputType}
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
                        />
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
                        <Input.Password
                            placeholder="Confirm password"
                            className={style.inputType}
                        />
                    </Form.Item>
                    <ButtonCustom label="Sign Up" onClick={sigUp} style={{}} />
                    <Link to="/">
                        <h4>Already have an account?</h4>
                    </Link>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;

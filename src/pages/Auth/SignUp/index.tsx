import React, { useState } from 'react';

import { Form, Input, message, Button } from 'antd';
import { checkPassword, rulerConfirm, rulerPassWord } from '../checkInputType';
import { history, Link } from 'umi';

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
            } else {
                history.push('/update-profile');
            }
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>SMASH</h1>
                <h4>Create your account to fully experience the app</h4>
                <Form validateMessages={validateMessages}>
                    <Form.Item name={['email']} rules={[{ type: 'email' }]}>
                        <Input
                            placeholder="Email"
                            onChange={text =>
                                setInput({ ...input, email: text.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item name={['password']} rules={rulerPassWord}>
                        <Input.Password
                            placeholder="Password"
                            onChange={text =>
                                setInput({
                                    ...input,
                                    password: text.target.value,
                                })
                            }
                        />
                    </Form.Item>

                    <Form.Item name={['confirm']} rules={rulerConfirm}>
                        <Input.Password
                            placeholder="Confirm password"
                            onChange={text =>
                                setInput({
                                    ...input,
                                    confirmPass: text.target.value,
                                })
                            }
                        />
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

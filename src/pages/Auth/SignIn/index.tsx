import React from 'react';

import { Form, Input, Button } from 'antd';
import { Link } from 'umi';
import style from './index.less';

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: 'Please enter a valid email!',
        password: 'Password is not a validate',
        confirmPassword: 'Password is not a validate',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const checkPassword = (password: string) => {
    const check = !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password);
    if (password.length > 7 && check) {
        return true;
    }
    return false;
};

const SignIn: React.FC = () => {
    return (
        <div className={style.container}>
            <h1>SMASH</h1>
            <h4>Welcome back!</h4>
            <Form validateMessages={validateMessages}>
                <Form.Item name={['email']} rules={[{ type: 'email' }]}>
                    <Input placeholder="Email" className={style.inputType} />
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
                <Button type="primary" block>
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

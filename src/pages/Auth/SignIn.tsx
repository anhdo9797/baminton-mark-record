import React from 'react';


import style from './styles.scss';
import '../../theme.scss';
import { Form, Input, message } from 'antd';
import { Link, NavLink } from 'umi';
import ButtonCustom from '@/components/Button';



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


const checkPassword = (password: string) => {
  const check = !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password);
  if (password.length > 7 && check) {
    return true;
  }
  return false;
};


const SignIn: React.FC = () => {
  return (
    <div className="container">
      <div className={style.sigIn}>
        <h1>SMASH</h1>
        <h3>Welcome back!</h3>
        <Form validateMessages={validateMessages}>
          <Form.Item name={['email']} rules={[{ type: 'email' }]}>
            <Input placeholder='Email' className={style.inputType} />
          </Form.Item>
          <Form.Item name={['password']} rules={[{

          }, () => ({
            validator(rule, value) {
              if (!value || checkPassword(value)) {
                return Promise.resolve();
              }
              return Promise.reject('Password must be 8 characters long and have no special characters!');
            },
          })]} >
            <Input.Password placeholder='Password' className={style.inputType} />
          </Form.Item>
          <ButtonCustom
            label='Sign In'
            onClick={() => message.success('Sign In success')}
          />
          <Link to='/sig-up'>
            <h4>
              Don’t have an account?
            </h4>
          </Link>
        </Form>
      </div>
    </div>
  );
};



export default SignIn;

import { message } from 'antd';

const checkEmail = (email: string) => {
    if (!email || email.indexOf('@gmail.com') == -1) {
        message.error('Please check your email!');
    }
};

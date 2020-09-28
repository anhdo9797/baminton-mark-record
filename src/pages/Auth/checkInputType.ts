import { message } from 'antd';

export const checkPassword = (password: string) => {
    const check = !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password);
    if (password.length > 7 && check) {
        return true;
    }
    return false;
};

export const checkEmail = (email: string) => {
    if (!email || email.indexOf('@gmail.com') == -1) {
        message.error('Please check your email!');
    }
};

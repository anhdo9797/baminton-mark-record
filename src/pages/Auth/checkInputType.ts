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

export const rulerPassWord = [
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
];

export const rulerConfirm = [
    {},
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('Incorrect password');
        },
    }),
];

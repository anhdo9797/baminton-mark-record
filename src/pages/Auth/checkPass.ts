export const checkPassword = (password: string) => {
    const check = !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password);
    if (password.length > 7 && check) {
        return true;
    }
    return false;
};

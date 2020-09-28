import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        {
            exact: true,
            path: '/',
            component: '@/pages/Auth/SignIn',
        },
        {
            exact: true,
            path: '/sign-up',
            component: '@/pages/Auth/SignUp',
        },
        {
            exact: true,
            path: '/update-profile',
            component: '@/pages/Auth/UpdateProfile',
        },
    ],
});

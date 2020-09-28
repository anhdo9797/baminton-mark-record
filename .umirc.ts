import { defineConfig } from 'umi';
export default defineConfig({
    hash: true,
    antd: {
        dark: true,
        config: {
            prefixCls: 'ant',
        },
    },
    dva: {
        hmr: true,
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        {
            path: '/',
            component: '@/layouts/index',
            routes: [
                {
                    path: '/',
                    redirect: '/sign-in',
                },
                {
                    path: '/sign-in',
                    component: '@/pages/Auth/SignIn',
                },
                {
                    path: '/sign-up',
                    component: '@/pages/Auth/SignUp',
                },
                {
                    path: '/update-profile',
                    component: '@/pages/Auth/UpdateProfile',
                },
            ],
        },
    ],
    theme: {
        '@primary-color': '#ffc22f',
    },
});

import { defineConfig } from 'umi';
export default defineConfig({
    hash: true,
    antd: {
        dark: true,
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
                    component: '@/pages/Auth/SignIn/index',
                },
                {
                    path: '/sign-up',
                    component: '@/pages/Auth/SignUp/index',
                },
                {
                    path: '/update-profile',
                    component: '@/pages/Auth/UpdateProfile/index',
                },
            ],
        },
    ],
    theme: {
        'primary-color': '#ffc22f',
        black: '#151522',
        'component-background': '#333333',
        'border-radius-base': '5px',
        'input-border-color': 'transparent',
        'input-number-handler-border-color': 'transparent',
        'select-border-color': 'transparent',
        'select-background': '#333333',
        'input-bg': '#333333',
        'picker-bg': '#333333',
        'font-family': "'SF Pro Display', sans-serif",
        'height-base': '50px',
        'height-lg': '60px',
        'height-sm': '40px',
        'font-size-base': '16px',

        'padding-lg': '32px',
        'padding-md': '24px',
        'padding-sm': '16px',
        'padding-xs': '12px',
        'padding-xss': '8px',

        'margin-lg': '32px',
        'margin-md': '24px',
        'margin-sm': '16px',
        'margin-xs': '12px',
        'margin-xss': '8px',

        'text-default': '#FFFFFF',
        'placeholder-color': '#999999',
        // 'text-question': '#E0E0E0',
    },
});

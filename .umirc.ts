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
                {
                    path: '/',
                    component: '@/pages/HomePage',
                },
                {
                    path: '/playing',
                    component: '@/pages/Playing',
                },
            ],
        },
    ],
    theme: {
        'primary-color': '#ffc22f',
        black: '#151522',
        'component-background': '#333333',
        'border-radius-base': '5px',

        'select-border-color': 'transparent',
        'select-background': '#333333',
        'picker-bg': '#333333',
        'font-family': "'SF Pro Display', sans-serif",
        'height-base': '50px',
        'height-lg': '60px',
        'height-sm': '40px',
        'font-size-base': '16px',

        'input-border-color': 'transparent',
        'input-bg': '#333333',
        'input-number-handler-border-color': 'transparent',
        'input-placeholder-color': '#999999',
        'input-icon-color': '#999999',
        'input-color': '#ffc22f',

        'padding-lg': '32px',
        'padding-md': '24px',
        'padding-sm': '16px',
        'padding-xs': '12px',
        'padding-xss': '8px',

        'text-color': '#fff',
        'text-color-secondary': '#E0E0E0',
        'text-default': '#FFFFFF',

        'card-background': '#333333',
        'card-radius': '10px',
        'card-padding-base': '0',
        'card-actions-li-margin': '4px 0',

        'modal-content-bg': '#151522',
    },
});

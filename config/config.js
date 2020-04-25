export default {
    // base: "/learn/",
    // publicPath: "/learn/",
    targets: {
        ie: 11
    },
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: {
                hmr: true,
            },
            dynamicImport: {
                loadingComponent: './components/PageLoading/index',
                webpackChunkName: true,
                level: 1,
            },
            title: '学习强国挑战赛',
            metas: [{charset: 'utf-8'}]
        }]
    ],
    routes: [

        {
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [
                {path: '/user', redirect: '/user/login'},
                {path: '/user/login', component: './Login/Login'},
            ]
        },
        {
            path: '/',
            component: '../layouts/AdminLayout',
            routes: [
                {path: '/', redirect: '/user/login'},
                {path: '/demo/index', component: './Demo/Index'},
                {path: '/company/DemoForm', component: './Company/DemoForm'},
                {path: '/fileUpDown/index', component: './FileUpDown/Index'},
                {path: '/test', component: './Test/Test1'},
                {path: '/subject/index', component: './Subjects/Index'},
                {path: '/sysuser/index', component: './Sysuser/Index'},
                {path: '/groupList/index', component: './GroupList/Index'},
                {path: '/personalList/index', component: './PersonalList/Index'},
                {path: '/tbUser/index', component: './TbUser/Index'},
                {path: '/company/index', component: './Company/Index'},
            ]
        }
    ],
    theme: {
        "primary-color": "red"
    },
    proxy: {
        '/learn': {
            target: 'http://localhost:8081',
            changeOrigin: true,
        },
    }
    // disableCSSModules: true
}
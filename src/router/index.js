import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: {
            title: 'Главная',
            needAuth: true,
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: 'О проекте',
            needAuth: true,
        }
    },
    {
        //:name - обязательный параметр, :sub? - опциональный не обязательный со знаком вопрос
        path: '/breed/:name/:sub?',
        name: 'breed-page',
        component: () => import(/* webpackChunkName: "breed" */ '../views/Breed.vue'),
        meta: {
            title: 'Просмотр породы',
            needAuth: true,
        }
    },
    {
        path: '/favorites',
        name: 'fav',
        component: () => import(/* webpackChunkName: "fav" */ '../views/Favorites.vue'),
        meta: {
            title: 'Список избранного',
            needAuth: true,
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue'),
        meta: {
            title: 'Настройки профеля',
            needAuth: true, //если авторизован тользователь то даем ему вход
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Вход'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
        meta: {
            title: 'Регистрация'
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

//ешеду
//переход на страницу загружается перед переходом на страницу
router.beforeEach((to, from, next) =>{
    document.title = to.meta.title;
    document.body.classList.add('show-preloader');
    next();
});

router.beforeEach((to, from, next) =>{
    if (to.meta.needAuth && store.state.user.uid === null){
        //редирект на страницу входа
        return next({ name: 'login'})
    }
    return next();
});

router.afterEach(() => {
    document.body.classList.remove('show-preloader');
});

export default router

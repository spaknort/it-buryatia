export function getRoutes() {
    return [
        { link: '/', title: 'Главная', children: [], requiresAuth: false },
        { link: '/about', title: 'О нас', children: [], requiresAuth: false },
        { link: '/projects', title: 'Список проектов', children: [], requiresAuth: false },
        { link: '/contacts', title: 'Контакты', children: [], requiresAuth: false },
        { link: '/advertising', title: 'Аукцион', children: [], requiresAuth: false },
        { link: '/admin', title: 'Личный кабинет', children: [
                { link: '/admin/editProfile', title: 'Редактировать профиль' },
                { link: '/admin/betting', title: 'Мои ставки' },
        ], requiresAuth: true },
    ]
}
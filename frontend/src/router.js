import {Index} from './components/index.js';
import {Login} from './components/login.js';

export class Router {
    constructor() {
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                styles: 'styles/index.css',
                load: () => {
                    new Index();
                }
            },
            {
                route: '#/login',
                title: 'Вход',
                template: 'templates/login.html',
                styles: 'styles/style.css',
                load: () => {
                    new Login();
                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: 'styles/style.css',
                load: () => {
                    new Login();
                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: 'templates/income.html',
                styles: 'styles/income.css',
                load: () => {
                }
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                template: 'templates/expenses.html',
                styles: 'styles/expenses.css',
                load: () => {
                }
            },
            {
                route: '#/incomeAndExpenses',
                title: 'Доходы и расходы',
                template: 'templates/incomeAndExpenses.html',
                styles: 'styles/incomeAndExpenses.css',
                load: () => {
                }
            },
            {
                route: '#/createExpenses',
                title: 'Создать расход',
                template: 'templates/createExpenses.html',
                styles: 'styles/createIncome.css',
                load: () => {
                }
            },
            {
                route: '#/createIncome',
                title: 'Создать доход',
                template: 'templates/createIncome.html',
                styles: 'styles/createIncome.css',
                load: () => {
                }
            },
            {
                route: '#/uploadExpenses',
                title: 'Редактировать расход',
                template: 'templates/uploadExpenses.html',
                styles: 'styles/createIncome.css',
                load: () => {
                }
            },
            {
                route: '#/uploadIncome',
                title: 'Редактировать доход',
                template: 'templates/uploadIncome.html',
                styles: 'styles/createIncome.css',
                load: () => {
                }
            },
            {
                route: '#/createIncomeAndExpenses',
                title: 'Создать доход и расход',
                template: 'templates/createIncomeAndExpenses.html',
                styles: 'styles/createIncomeAndExpenses.css',
                load: () => {
                }
            },
            {
                route: '#/uploadIncomeAndExpenses',
                title: 'Редактировать доход и расход',
                template: 'templates/uploadIncomeAndExpenses.html',
                styles: 'styles/createIncomeAndExpenses.css',
                load: () => {
                }
            },
        ]
    }

    async openRoute() {
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash;
        });

        if(!newRoute) {
            window.location.href = '#/';
            return;
        }

        document.getElementById('content').innerHTML =
            await fetch(newRoute.template).then(response => response.text());

        document.getElementById('styles').setAttribute('href', newRoute.styles);
        document.getElementById('page-title').innerText = newRoute.title;
        newRoute.load();

    }
}
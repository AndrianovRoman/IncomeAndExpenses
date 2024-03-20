import {Index} from './components/index.js';
import {Login} from './components/login.js';
import {Auth} from "./services/auth.js";
import {Expenses} from "./components/expenses.js";
import {CreateExpenses} from "./components/createExpenses.js";
import {UploadExpenses} from "./components/uploadExpenses.js";
import {Income} from "./components/income.js";
import {CreateIncome} from "./components/createIncome.js";
import {UploadIncome} from "./components/uploadIncome.js";
import {IncomeAndExpenses} from "./components/incomeAndExpenses.js";
import {CreateIncomeAndExpenses} from "./components/createIncomeAndExpenses.js";
import {UploadIncomeAndExpenses} from "./components/uploadIncomeAndExpenses.js";
import {Common} from "./components/common.js";

export class Router {
    constructor() {
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                idActiveElement: 'main',
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
                isNotAuth: true,
                load: () => {
                    new Login('login');
                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: 'styles/style.css',
                isNotAuth: true,
                load: () => {
                    new Login('signup');
                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                idActiveElement: 'income',
                template: 'templates/income.html',
                styles: 'styles/income.css',
                load: () => {
                    new Income();
                }
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                idActiveElement: 'expenses',
                template: 'templates/expenses.html',
                styles: 'styles/expenses.css',
                load: () => {
                    new Expenses();
                }
            },
            {
                route: '#/incomeAndExpenses',
                title: 'Доходы и расходы',
                idActiveElement: 'incomeAndExpenses',
                template: 'templates/incomeAndExpenses.html',
                styles: 'styles/incomeAndExpenses.css',
                load: () => {
                    new IncomeAndExpenses();
                }
            },
            {
                route: '#/createExpenses',
                title: 'Создать расход',
                idActiveElement: 'expenses',
                template: 'templates/createExpenses.html',
                styles: 'styles/createIncome.css',
                load: () => {
                    new CreateExpenses();
                }
            },
            {
                route: '#/createIncome',
                title: 'Создать доход',
                idActiveElement: 'income',
                template: 'templates/createIncome.html',
                styles: 'styles/createIncome.css',
                load: () => {
                    new CreateIncome();
                }
            },
            {
                route: '#/uploadExpenses',
                title: 'Редактировать расход',
                idActiveElement: 'expenses',
                template: 'templates/uploadExpenses.html',
                styles: 'styles/createIncome.css',
                load: () => {
                    new UploadExpenses();
                }
            },
            {
                route: '#/uploadIncome',
                title: 'Редактировать доход',
                idActiveElement: 'income',
                template: 'templates/uploadIncome.html',
                styles: 'styles/createIncome.css',
                load: () => {
                    new UploadIncome();
                }
            },
            {
                route: '#/createIncomeAndExpenses',
                title: 'Создать доход и расход',
                idActiveElement: 'incomeAndExpenses',
                template: 'templates/createIncomeAndExpenses.html',
                styles: 'styles/createIncomeAndExpenses.css',
                load: () => {
                    new CreateIncomeAndExpenses();
                }
            },
            {
                route: '#/uploadIncomeAndExpenses',
                title: 'Редактировать доход и расход',
                idActiveElement: 'incomeAndExpenses',
                template: 'templates/uploadIncomeAndExpenses.html',
                styles: 'styles/createIncomeAndExpenses.css',
                load: () => {
                    new UploadIncomeAndExpenses();
                }
            },
        ]
    }

    async openRoute() {

        const urlRoute = window.location.hash.split('?')[0];

        if (urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = '#/login';
            return;
        }

        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash;
        });

        if(!newRoute) {
            window.location.href = '#/login';
            return;
        }

        if(!newRoute.isNotAuth) {
            const accessToken = localStorage.getItem(Auth.accessTokenKey);
            if(!accessToken) {
                location.href = '#/login';
                return;
            }
        }

        document.getElementById('content').innerHTML =
            await fetch(newRoute.template).then(response => response.text());

        document.getElementById('styles').setAttribute('href', newRoute.styles);
        document.getElementById('page-title').innerText = newRoute.title;
        newRoute.load();
        new Common(newRoute.idActiveElement);
    }
}
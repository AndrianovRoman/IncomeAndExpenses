import {CustomHttp} from "../services/custom-http.js";
import {Auth} from "../services/auth.js";
import config from "../../config/config.js";

export class Login {
    constructor(page) {

        this.aside = document.getElementById('aside');
        this.burger = document.getElementById('burger');
        this.close = document.getElementById('close');
        this.layout = document.querySelector('.layout');
        this.aside.style.display = 'none';
        this.burger.style.display = 'none';
        this.close.style.display = 'none';
        this.layout.style.display = 'block';

        // this.aside.removeAttribute('style');
        // this.burger.removeAttribute('style');
        // this.close.removeAttribute('style');
        // this.layout.removeAttribute('style');

        this.agreeElement = null;
        this.processElement = null;
        this.page = page;

        this.password = document.getElementById('floatingPassword');
        this.passwordRepeat = document.getElementById('floatingRepeatPassword');

        this.fields = [
            {
                name: 'email',
                id: 'floatingEmail',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'floatingPassword',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            }
        ];

        if(this.page === 'signup'){
            this.fields.unshift({
                name: 'name',
                id: 'floatingPerson',
                element: null,
                regex: /([А-ЯЁ][а-яё]+[\-\s]?){3,}/,
                valid: false,
            },
            {
                name: 'passwordRepeat',
                id: 'floatingRepeatPassword',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            });
        }

        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this)
            }
        });

        // this.agreeElement = document.getElementById('agree');
        // this.agreeElement.onchange = function () {
        //     that.validateForm();
        // }

        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm();
        }
        // this.init();
    }

    init() {

    };

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.classList.add('error');
            field.valid = false;
        } else {
            element.classList.remove('error');
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        const isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        if (validForm) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return isValid;
    }

    async processForm() {
        if(this.validateForm()) {
            const email = this.fields.find(item => item.name === 'email').element.value;
            const password = this.fields.find(item => item.name === 'password').element.value;

            if (this.page === 'signup') {

                const passwordRepeat = this.fields.find(item => item.name === 'passwordRepeat').element.value;
                if (password !== passwordRepeat) {
                    this.processElement.setAttribute('disabled', 'disabled');
                    this.passwordRepeat.classList.add('error');
                    throw new Error('Пароли не совпадают');
                } else {
                    const nameArray = this.fields.find(item => item.name === 'name').element.value.split(' ');
                    const name = nameArray[1];
                    const lastName = nameArray[0];

                    try{
                        const result = await CustomHttp.request(config.host + '/signup', 'POST', {
                            name: name,
                            lastName: lastName,
                            email: email,
                            password: password,
                            passwordRepeat: passwordRepeat,
                        });

                        if (result) {
                            // console.log(result.user);
                            if (result.error || !result.user) {
                                throw new Error(result.message);
                            }

                            location.href = '#/';
                            this.aside.removeAttribute('style');
                            this.burger.removeAttribute('style');
                            this.close.removeAttribute('style');
                            this.layout.removeAttribute('style');
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            try {
                const result = await CustomHttp.request(config.host + '/login', 'POST', {
                    email: email,
                    password: password,
                });

                if (result) {

                    if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken
                        || !result.user.name || !result.user.id || !result.user.lastName) {
                        throw new Error(result.message);
                    }

                    Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
                    Auth.setUserInfo({
                        fullName: result.user.lastName + ' ' + result.user.name,
                        userId: result.user.id
                    })
                    localStorage.setItem('email', email);
                    // localStorage.setItem('fullName', result.user.lastName + ' ' + result.user.name);
                    // console.log(localStorage.getItem('email'));
                    location.href = '#/';
                    this.aside.removeAttribute('style');
                    this.burger.removeAttribute('style');
                    this.close.removeAttribute('style');
                    this.layout.removeAttribute('style');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
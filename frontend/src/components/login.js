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

                const nameArray = this.fields.find(item => item.name === 'name').element.value.split(' ');
                const name = nameArray[1];
                const lastName = nameArray[0];

                try{
                    const result = await CustomHttp.request('http://localhost:6000/api/signup', 'POST', {
                        name: name,
                        lastName: lastName,
                        email: email,
                        password: password,
                        passwordRepeat: password,
                    });

                    if (result) {
                        if (result.error || !result.user) {
                            throw new Error(result.message);
                        }

                        location.href = '#/';
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const result = await CustomHttp.request(config.host + '/login', 'POST', {
                        email: email,
                        password: password,
                    });

                    if (result) {
                        if (result.error || !result.accessToken || !result.refreshToken
                            || !result.fullName || !result.userId) {
                            throw new Error(result.message);
                        }

                        Auth.setTokens(result.accessToken, result.refreshToken);
                        Auth.setUserInfo({
                            fullName: result.fullName,
                            userId: result.userId
                        })
                        localStorage.setItem('email', email);
                        // console.log(localStorage.getItem('email'));
                        location.href = '#/';
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}
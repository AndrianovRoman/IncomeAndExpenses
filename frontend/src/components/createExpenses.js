import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";


export class CreateExpenses {

    constructor() {

        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if(!accessToken) {
            location.href = '#/login';
            return;
        }

        this.init();
    }

    init() {
        this.createBtn = document.getElementById('create');
        this.backBtn = document.getElementById('back');
        this.input = document.getElementById('input');

        this.createBtn.addEventListener('click', this.create);
        this.backBtn.addEventListener('click', this.back);
    }
    async create() {
        this.input = document.getElementById('input');
        const value = this.input.value;
        // console.log(value);
        try {
            const result = await CustomHttp.request(config.host + '/categories/expense', 'POST', {
                title: value,
            });

            if (result) {
                location.href = '#/expenses';
            }
        } catch (e) {
            console.log(e);
        }
    }

    back() {
        location.href = '#/expenses';
    }
}
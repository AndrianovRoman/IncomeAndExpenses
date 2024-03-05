import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";


export class CreateIncomeAndExpenses {

    constructor() {
        this.init();
    }

    init() {
        this.createBtn = document.getElementById('create');
        this.backBtn = document.getElementById('back');

        this.createBtn.addEventListener('click', this.create);
        this.backBtn.addEventListener('click', this.back);

        this.createPage();
        let type = document.getElementById('type');
        type.addEventListener('change', this.createPage);
    }

    async createPage() {
        let type = document.getElementById('type').value;
        this.category = document.getElementById('category');
        // console.log(this.category);
        if (type === 'expense') {
            try {
                const result = await CustomHttp.request(config.host + '/categories/expense', 'GET');
                // console.log(result);
                if (result) {
                    // console.log(result);
                    this.category.innerHTML = '';
                    result.forEach(item => {
                        const option = document.createElement('option');
                        option.setAttribute('value', item.id);
                        option.innerText = item.title;

                        this.category.appendChild(option);
                    });
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const result = await CustomHttp.request(config.host + '/categories/income', 'GET');
                // console.log(result);
                if (result) {
                    this.category.innerHTML = '';
                    // console.log(result);
                    result.forEach(item => {
                        const option = document.createElement('option');
                        option.setAttribute('value', item.id);
                        option.innerText = item.title;

                        this.category.appendChild(option);
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    async create(e) {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;
        const comment = document.getElementById('comment').value;

        try {
            const result = await CustomHttp.request(config.host + '/operations', 'POST', {
                type: type,
                amount: amount,
                date: date,
                comment: comment,
                category_id: +category,
            });

            if (result) {
                location.href = '#/incomeAndExpenses';
            }
        } catch (e) {
            console.log(e);
        }
    }

    back(e) {
        e.preventDefault();
        location.href = '#/incomeAndExpenses';
    }

}
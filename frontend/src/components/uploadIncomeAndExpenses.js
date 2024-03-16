import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Balance} from "../services/balance.js";


export class UploadIncomeAndExpenses {

    constructor() {
        this.obj = JSON.parse(localStorage.getItem('obj'));
        console.log(this.obj);
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
        this.category = document.getElementById('category');

        let type = document.getElementById('type');
        if (this.obj.type === 'доход') {
            type.value = 'income';
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
                        if (this.obj.category === item.title){
                            option.setAttribute('selected', 'selected');
                        }

                        this.category.appendChild(option);
                    });
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            type.value = 'expense';
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
                        if (this.obj.category === item.title){
                            option.setAttribute('selected', 'selected');
                        }
                        this.category.appendChild(option);
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
        // const category = document.getElementById('category').value;
        let amount = document.getElementById('amount');
        amount.value = this.obj.amount;

        let date = document.getElementById('date');
        console.log(this.obj.date);
        date.value = this.obj.date;

        let comment = document.getElementById('comment');
        comment.value = this.obj.comment;
    }

    async create(e) {
        e.preventDefault();
        const id = localStorage.getItem('id');
        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;
        console.log(+category);
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;
        const comment = document.getElementById('comment').value;

        try {
            const result = await CustomHttp.request(config.host + '/operations/' + id, 'PUT', {
                type: type,
                amount: amount,
                date: date,
                comment: comment,
                category_id: +category,
            });

            if (result) {
                await Balance.getBalance();
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
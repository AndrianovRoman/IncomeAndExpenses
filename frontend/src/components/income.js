import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Income {
    id = '';
    constructor() {
        this.incomeCard = null;
        this.init();
    }

    async init() {
        try {
            const result = await CustomHttp.request(config.host + '/categories/income', 'GET');
            // console.log(result);
            if (result) {
                // console.log(result);
                // if (result.error || !result.user) {
                //     throw new Error(result.message);
                // }
                this.createPage(result);
            }
        } catch (e) {
            console.log(e);
        }
        document.getElementById('modalDelete').addEventListener('click', () => this.delete());
    }

    createPage(data) {
        this.incomeCard = document.getElementById('income-card');
        if (data && data.length > 0) {
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                card.setAttribute('data-id', item.id)

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                cardTitle.innerText = item.title;

                const cardButton = document.createElement('div');
                cardButton.className = 'card-button';
                cardButton.classList.add('d-flex');

                const btnPrimary = document.createElement('a');
                btnPrimary.className = 'btn-primary';
                btnPrimary.classList.add('btn');
                btnPrimary.setAttribute('href', '#');
                btnPrimary.innerText = 'Редактировать';
                btnPrimary.addEventListener('click', this.uploadIncomePage);

                const btnDanger = document.createElement('a');
                btnDanger.className = 'btn-danger';
                btnDanger.classList.add('btn');
                btnDanger.setAttribute('href', '#');
                btnDanger.setAttribute('data-bs-toggle', 'modal');
                btnDanger.setAttribute('data-bs-target', '#staticBackdrop');
                btnDanger.innerText = 'Удалить';
                const that = this;
                btnDanger.addEventListener('click', function (e) {
                    that.id = e.target.closest('.card').getAttribute('data-id');
                });

                cardButton.appendChild(btnPrimary);
                cardButton.appendChild(btnDanger);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardButton);
                card.appendChild(cardBody);
                this.incomeCard.appendChild(card);

            });
        }
        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardNew = document.createElement('a');
        cardNew.className = 'card-new';
        cardNew.setAttribute('href', '#/createIncome');
        cardNew.innerText = '+'

        cardBody.appendChild(cardNew);
        card.appendChild(cardBody);
        this.incomeCard.appendChild(card);
    }
    async delete(){
        console.log(this.id);
        try {
            const result = await CustomHttp.request(config.host + '/categories/income/' + this.id, 'DELETE');
            console.log(result);
            if(!result.error) {
                location.href = '#/income'
            }
        } catch (e) {
            console.log(e);
        }
    }

    // async modalDelete() {
    //     localStorage.setItem('id', id);
    //     this.modalDeleteBtn = document.getElementById('modalDelete');
    //     this.modalDeleteBtn.addEventListener('click', this.modalDelete);
    //     console.log(this.modalDeleteBtn);
    //     let id = localStorage.getItem('id');
    //     console.log(id);
    // }

    uploadIncomePage(e) {
        e.preventDefault();
        const id = e.target.closest('.card').getAttribute('data-id');
        localStorage.setItem("id", id);
        const text = e.target.closest('.card-body').childNodes[0];
        localStorage.setItem("text", text.innerText);
        location.href = '#/uploadIncome';
    }
}
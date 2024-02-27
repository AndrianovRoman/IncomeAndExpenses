import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class UploadExpenses {

    constructor() {

        this.init();
    }

    init(){

        this.uploadBtn = document.getElementById('upload');
        this.backBtn = document.getElementById('back');
        this.input = document.getElementById('input');

        this.uploadBtn.addEventListener('click', this.upload);
        this.backBtn.addEventListener('click', this.back);
    }

    async upload() {
        this.input = document.getElementById('input');
        const value = this.input.value;
        this.id = localStorage.getItem('id');
        // console.log(value);
        // console.log(this.id);
        try {
            const result = await CustomHttp.request(config.host + '/categories/expense/' + this.id, 'PUT', {
                title: value,
            });
            console.log(result);
            if(!result.error) {
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
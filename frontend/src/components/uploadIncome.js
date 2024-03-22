import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class UploadIncome {
    text = '';
    constructor() {
        this.text = localStorage.getItem('text');
        // console.log(this.text);
        this.init();
    }

    init() {
        this.uploadBtn = document.getElementById('upload');
        this.backBtn = document.getElementById('back');
        this.input = document.getElementById('input');
        this.input.value = this.text;

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
            const result = await CustomHttp.request(config.host + '/categories/income/' + this.id, 'PUT', {
                title: value,
            });
            console.log(result);
            if(!result.error) {
                location.href = '#/income';
            }
        } catch (e) {
            console.log(e);
        }
    }

    back() {
        location.href = '#/income';
    }

}
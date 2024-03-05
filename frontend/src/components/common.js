
// Очень примитивное и простое открытие и закрытие меню!

import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

class Common {

    constructor() {
        this.init();
    }

    init() {
        const burger = document.getElementById('burger');
        const aside = document.getElementById('aside')
        const close = document.getElementById('close');

        const userInfo = Auth.getUserInfo();
        console.log(userInfo);

        const fullName = document.getElementById('fullName');
        fullName.innerText = userInfo.fullName;

        this.balance = null;
        this.getBalance();

        burger.onclick = () => {
            aside.style.display = 'flex';
            burger.style.display = 'none';
            close.style.display = 'flex';
        };

        close.onclick = () => {
            aside.style.display = 'none';
            burger.style.display = 'flex';
            close.style.display = 'none';
        }

        window.addEventListener('resize', () => {
            // console.log(window.location.hash);
            if(window.innerWidth > 767 && window.location.hash !== '#/login' && window.location.hash !== '#/signup') {
                aside.removeAttribute('style');
                burger.removeAttribute('style');
                close.removeAttribute('style');
            }
        });
    }
    async getBalance() {
        try {
            const result = await CustomHttp.request(config.host + '/balance', 'GET');
            let balance = document.getElementById('balance');
            // console.log(result);
            if (result) {
                // console.log(result);
                // if (result.error || !result.user) {
                //     throw new Error(result.message);
                // }

                balance.innerText = result.balance + '$';
            } else {
                balance.innerText = '0$';
            }
        } catch (e) {
            console.log(e);
        }
    }
}
new Common();

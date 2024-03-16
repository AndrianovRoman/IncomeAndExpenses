import {CustomHttp} from "./custom-http.js";
import config from "../../config/config.js";

export class Balance {
    static async getBalance() {
        try {
            const result = await CustomHttp.request(config.host + '/balance', 'GET');
            let balance = document.getElementById('balance');

            if (result) {
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

    static async updateBalance(value) {

        try {
            const result = await CustomHttp.request(config.host + '/balance', 'PUT', {
                newBalance: value,
            });
            let balance = document.getElementById('balance');

            if (result) {
                // console.log(result);
                // if (result.error || !result.user) {
                //     throw new Error(result.message);
                // }
                balance.innerText = result.balance + '$';
            }
        } catch (e) {
            console.log(e);
        }
    }

}
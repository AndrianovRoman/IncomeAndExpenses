import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";


export class IncomeAndExpenses {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const result = await CustomHttp.request(config.host + '/operations', 'GET');
            console.log(result);
            if (result) {
                console.log(result);
                // if (result.error || !result.user) {
                //     throw new Error(result.message);
                // }

            }
        } catch (e) {
            console.log(e);
        }
    }

}
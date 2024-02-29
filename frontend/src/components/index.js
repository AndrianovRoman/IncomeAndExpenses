import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
export class Index {
    constructor() {

        const userInfo = Auth.getUserInfo();

        const fullName = document.getElementById('fullName');
        fullName.innerText = userInfo.fullName;

        this.balance = null;

        this.graph();
        this.init();
    }



    graph() {
        let ctxD = document.getElementById('myChartD').getContext('2d');
        let ctxR = document.getElementById('myChartR').getContext('2d');
        let myChartD = new Chart(ctxD, {
            type: 'pie',
            data: {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        'rgba(220, 53, 69, 1)',
                        'rgba(253, 126, 20, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(32, 201, 151, 1)',
                        'rgba(13, 110, 253, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                // title: {
                //     display: true,
                //     text: 'Доходы',
                //     fontSize: 14,
                //     fontColor: '#000',
                //     position: 'top'
                // },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        });
        let myChartR = new Chart(ctxR, {
            type: 'pie',
            data: {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        'rgba(220, 53, 69, 1)',
                        'rgba(253, 126, 20, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(32, 201, 151, 1)',
                        'rgba(13, 110, 253, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                // title: {
                //     display: true,
                //     text: 'Доходы',
                //     fontSize: 14,
                //     fontColor: '#000',
                //     position: 'top'
                // },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        });
    }

    async init() {
        try {
            const result = await CustomHttp.request(config.host + '/balance', 'GET');
            this.balance = document.getElementById('balance');
            // console.log(result);
            if (result) {
                // console.log(result);
                // if (result.error || !result.user) {
                //     throw new Error(result.message);
                // }

                this.balance.innerText = result.balance + '$';
            } else {
                this.balance.innerText = '0$';
            }
        } catch (e) {
            console.log(e);
        }
    }
}

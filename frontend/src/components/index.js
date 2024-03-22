import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
export class Index {

    dateFrom = null;
    dateTo = null;
    value;
    selectedId;
    period = localStorage.getItem("periodValue");
    income = [];
    expense = [];
    myChartD;
    myChartR;
    newArrayDataExpense;
    newArrayLabelsExpense;
    newArrayLabelsIncome;
    newArrayDataIncome;

    constructor() {

        let activeElem = document.querySelector('.btn-group');

        for (let i = 0; i < activeElem.children.length; i++) {
            if (activeElem.children[i].dataset.value === this.period) {
                activeElem.children[0].classList.remove('active');
                activeElem.children[i].classList.add('active');
            }
        }

        this.dateFrom = document.getElementById('dateFrom');
        this.dateFrom.addEventListener('input', () => {
            this.workWithDates(this.dateFrom);
            this.init();
        });

        this.dateTo = document.getElementById('dateTo');
        this.dateTo.addEventListener('input', () => {
            this.workWithDates(this.dateTo);
            this.init();
        });

        this.btnActive();
        this.init();
    }

    workWithDates(item) {
        // console.log(item.id);
        if (item.value !== '') {
            item.className = 'has-value';
        } else {
            item.className = '';
        }
        localStorage.setItem(item.id, item.value);
    }

    btnActive() {
        const btnGroup = document.querySelector('.btn-group');
        console.log(btnGroup);
        for (let i = 0; i < btnGroup.children.length; i++) {
            if (btnGroup.children[i].classList.contains('active')) {
                this.value = btnGroup.children[i];
            }
        }

        // this.value = btnGroup.children[0];
        console.log(this.value);

        btnGroup.onclick = (e) => {
            console.log(e.target.dataset.value);
            this.expense = [];
            this.income = [];

            let target = e.target;

            // && target.classList.contains('active')

            if (target.tagName === 'BUTTON') {

                this.value.classList.remove('active');

                this.period = e.target.dataset.value;
                localStorage.setItem("periodValue", this.period);
                this.init();

                if (this.selectedId) {
                    this.selectedId.classList.remove('active');
                }
                this.selectedId = target;
                this.selectedId.classList.add('active');
            }
        }
    }

    async init() {

        if (!this.period) {
            this.period = "today";
        }
        if (this.period === 'interval') {

            let dateFromValue = localStorage.getItem('dateFrom');
            let dateToValue = localStorage.getItem('dateTo');

            try {
                const result = await CustomHttp.request(config.host + '/operations?period=interval&dateFrom=' + dateFromValue + '&dateTo=' + dateToValue, 'GET');
                console.log(result);
                if (result) {
                    console.log(result);
                    result.forEach(item => {
                        if (item.type === 'income') {
                            this.income.push(item);
                        } else {
                            this.expense.push(item);
                        }
                    });
                    console.log(this.expense);
                    console.log(this.income);
                    // if (result.error || !result.user) {
                    //     throw new Error(result.message);
                    // }
                    // this.createPage(result);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const result = await CustomHttp.request(config.host + '/operations?period=' + this.period, 'GET');
                console.log(result);
                if (result) {
                    console.log(result);
                    result.forEach(item => {
                        if (item.type === 'income') {
                            this.income.push(item);
                        } else {
                            this.expense.push(item);
                        }
                    });
                    console.log(this.expense);
                    console.log(this.income);
                    // if (result.error || !result.user) {
                    //     throw new Error(result.message);
                    // }
                    // this.createPage(result);
                }
            } catch (e) {
                console.log(e);
            }
        }

        this.graph();
    }

    getExpense() {
        let arrayLabelsExpense = [];
        let arrayDataExpense = [];
        this.newArrayDataExpense = [];
        this.newArrayLabelsExpense = [];

        for(let i = 0; i < this.expense.length; i++) {

            arrayLabelsExpense.push(this.expense[i].category);
            arrayDataExpense.push(0);

            let newSet = new Set(arrayLabelsExpense);
            this.newArrayLabelsExpense = Array.from(newSet);

            for(let j = 0; j < this.newArrayLabelsExpense.length; j++) {
                if(this.newArrayLabelsExpense[j] === this.expense[i].category) {
                    arrayDataExpense[j] += this.expense[i].amount;
                }
            }
        }

        this.newArrayDataExpense = arrayDataExpense.filter(item => {
            return (item !== 0);
        })
    }

    getIncome() {
        let arrayLabelsIncome = [];
        let arrayDataIncome = [];
        this.newArrayLabelsIncome = [];
        this.newArrayDataIncome = [];

        for(let i = 0; i < this.income.length; i++) {

            arrayLabelsIncome.push(this.income[i].category);
            arrayDataIncome.push(0);

            let newSet = new Set(arrayLabelsIncome);
            this.newArrayLabelsIncome = Array.from(newSet);

            for(let j = 0; j < this.newArrayLabelsIncome.length; j++) {
                if(this.newArrayLabelsIncome[j] === this.income[i].category) {
                    arrayDataIncome[j] += this.income[i].amount;
                }
            }
        }

        this.newArrayDataIncome = arrayDataIncome.filter(item => {
            return (item !== 0);
        })
    }

    graph() {
        let ctxD = document.getElementById('myChartD').getContext('2d');
        let ctxR = document.getElementById('myChartR').getContext('2d');

        this.getExpense();
        this.getIncome();

        if (this.myChartD && this.myChartR) {
            this.myChartD.destroy();
            this.myChartR.destroy();
        }

        this.myChartD = new Chart(ctxD, {
            type: 'pie',
            data: {
                labels: this.newArrayLabelsIncome,
                datasets: [{
                    label: '# of Votes',
                    data: this.newArrayDataIncome,
                    backgroundColor: [
                        'rgba(220, 53, 69, 1)',
                        'rgba(253, 126, 20, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(32, 201, 151, 1)',
                        'rgba(13, 110, 253, 1)',
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
        this.myChartR = new Chart(ctxR, {
            type: 'pie',
            data: {
                labels: this.newArrayLabelsExpense,
                datasets: [{
                    label: '# of Votes',
                    data: this.newArrayDataExpense,
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
}

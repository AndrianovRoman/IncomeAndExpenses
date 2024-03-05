import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";


export class IncomeAndExpenses {

    constructor() {
        this.index = 0;
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
                this.createPage(result);
            }
        } catch (e) {
            console.log(e);
        }

        document.getElementById('modalDelete').addEventListener('click', () => this.delete());
    }

    createPage(data) {
        this.tbody = document.getElementById('tbody');
        if (data && data.length > 0) {
            data.forEach(item => {
                // console.log(item);
                const tr = document.createElement('tr');
                tr.setAttribute('data-id', item.id);

                const th = document.createElement('th');
                th.setAttribute('scope', "row");
                this.index = this.index + 1
                th.innerText = this.index;

                const tdType = document.createElement('td');
                if (item.type === 'expense') {
                    tdType.className = 'exp';
                    tdType.innerText = 'расход';
                } else {
                    tdType.className = 'inc';
                    tdType.innerText = 'доход';
                }

                const tdCategory = document.createElement('td');
                tdCategory.innerText = item.category;

                const tdAmount = document.createElement('td');
                tdAmount.innerText = item.amount + '$';

                const tdDate = document.createElement('td');
                tdDate.innerText = item.date;

                const tdComment = document.createElement('td');
                tdComment.innerText = item.comment;

                const tdButtons = document.createElement('td');

                const aDelete = document.createElement('a');
                aDelete.setAttribute('href', '#');
                aDelete.setAttribute('data-bs-toggle', 'modal');
                aDelete.setAttribute('data-bs-target', '#staticBackdrop');
                const that = this;
                aDelete.addEventListener('click', function (e) {
                    that.id = e.target.parentNode.closest('tr').getAttribute('data-id');
                });
                aDelete.innerHTML = `<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z" fill="black"/>
                    <path d="M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z" fill="black"/>
                    <path d="M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z" fill="black"/>
                </svg>`;

                const aUpload = document.createElement('a');
                aUpload.setAttribute('href', '#/uploadIncomeAndExpenses');
                aUpload.addEventListener('click', this.upload);
                aUpload.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z" fill="black"/>
                    </svg>`;

                tdButtons.appendChild(aDelete);
                tdButtons.appendChild(aUpload);
                tr.appendChild(th);
                tr.appendChild(tdType);
                tr.appendChild(tdCategory);
                tr.appendChild(tdAmount);
                tr.appendChild(tdDate);
                tr.appendChild(tdComment);
                tr.appendChild(tdButtons);

                this.tbody.appendChild(tr);
            });
        }
    }

    async delete() {
        console.log(this.id);
        try {
            const result = await CustomHttp.request(config.host + '/operations/' + this.id, 'DELETE');
            if(!result.error) {
                location.href = '#/incomeAndExpenses'
            }
        } catch (e) {
            console.log(e);
        }
    }

    upload(e) {
        e.preventDefault();

        const id = e.target.closest('tr').getAttribute('data-id');
        localStorage.setItem("id", id);

        // console.log(e.target.closest('tr').childNodes[1].innerText);
        // console.log(e.target.closest('tr').childNodes[2].innerText);
        // console.log(e.target.closest('tr').childNodes[3].innerText.replace('$', ''));
        // console.log(e.target.closest('tr').childNodes[4].innerText);
        // console.log(e.target.closest('tr').childNodes[5].innerText);

        const type = e.target.closest('tr').childNodes[1].innerText;
        const category = e.target.closest('tr').childNodes[2].innerText;
        const amount = e.target.closest('tr').childNodes[3].innerText.replace('$', '');
        const date = e.target.closest('tr').childNodes[4].innerText;
        const comment = e.target.closest('tr').childNodes[5].innerText;

        const obj = {
            type: type,
            category: category,
            amount: amount,
            date: date,
            comment: comment,
        }
        localStorage.setItem("obj", JSON.stringify(obj));

        location.href = '#/uploadIncomeAndExpenses'
    }
}

import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Balance} from "../services/balance.js";

class Common {
    selectedTd;

    constructor() {
        this.init();
        // this.updateInterface();
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
        Balance.getBalance();

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

    // updateInterface() {
    //     let nav = document.querySelector('.nav');
    //     // console.log(nav);
    //
    //     nav.onclick = function (e) {
    //         let target = e.target;
    //
    //         if (target.tagName !== 'A' && target.className !== 'nav-link'){
    //             console.log('error)))');
    //         } else {
    //             const that = this;
    //             // console.log(that.selectedTd);
    //             let main = document.querySelector('.nav-item').children[0];
    //             // console.log(main);
    //
    //             if (main.className === 'nav-link active') {
    //                 main.classList.remove('active');
    //                 main.classList.add('link-body-emphasis');
    //             }
    //
    //             if (that.selectedTd) {
    //                 that.selectedTd.classList.remove('active');
    //                 that.selectedTd.classList.add('link-body-emphasis');
    //             }
    //             that.selectedTd = target;
    //             that.selectedTd.classList.add('active');
    //             that.selectedTd.classList.remove('link-body-emphasis');
    //             // console.log(that.selectedTd);
    //         }
    //     }
    // }

    highlight(a) {
        if (selectedTd) {
            selectedTd.classList.remove('active');
            selectedTd.classList.add('link-body-emphasis');
        }
        let selectedTd = a;
        selectedTd.classList.add('active');
        selectedTd.classList.remove('link-body-emphasis');
    }

}
new Common();

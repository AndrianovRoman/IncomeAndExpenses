class Login {
    constructor() {
        this.agreeElement = null;
        this.processElement = null;

        this.fields = [
            {
                name: 'name',
                id: 'floatingPerson',
                element: null,
                regex: /([А-ЯЁ][а-яё]+[\-\s]?){3,}/,
                valid: false,
            },
            {
                name: 'email',
                id: 'floatingEmail',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'floatingPassword',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            }
        ];
        this.init();
    }

    init() {
        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this)
            }
        });

        // this.agreeElement = document.getElementById('agree');
        // this.agreeElement.onchange = function () {
        //     that.validateForm();
        // }

        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm();
        }

    };

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.classList.add('error');
            field.valid = false;
        } else {
            element.classList.remove('error');
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        const isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        if (validForm) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return isValid;
    }

    processForm() {
        if(this.validateForm()) {
            location.href = '../../index.html';
        }
    }
}
new Login();
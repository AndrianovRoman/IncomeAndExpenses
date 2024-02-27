
// Очень примитивное и простое открытие и закрытие меню!

const burger = document.getElementById('burger');
const aside = document.getElementById('aside')
const close = document.getElementById('close');

const fullName = document.getElementById('fullName');
fullName.innerText = localStorage.getItem('fullName');

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
    if(window.innerWidth > 767) {
        aside.removeAttribute('style');
        burger.removeAttribute('style');
        close.removeAttribute('style');
    }
});


// Очень примитивное и простое открытие и закрытие меню!

const burger = document.getElementById('burger');
const aside = document.getElementById('aside')
const close = document.getElementById('close');

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


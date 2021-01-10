const burger = document.querySelector('.navbar-burger');
burger.onclick = () => {
    if(burger.classList.contains('is-active'))
        burger.classList.remove('is-active');
    else
        burger.classList.add('is-active');
}

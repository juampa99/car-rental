const burger = document.querySelector('.navbar-burger');
const dropdown = document.querySelector('.my-dropdown');
burger.onclick = () => {
    if(burger.classList.contains('is-active')) {
        burger.classList.remove('is-active');
        dropdown.style.display = "none";
    }
    else {
        burger.classList.add('is-active');
        dropdown.style.display = "block";
    }
}

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

const menuToggle = document.querySelector(".menu-toggle");

const nav = document.querySelector(".nav");

menuToggle.addEventListener("click",()=>{

    nav.classList.toggle("active");

});

document.querySelectorAll(".nav-menu a").forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("active");

    });

});
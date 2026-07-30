window.addEventListener("scroll",()=>{

    const header=document.querySelector(".header");

    if(window.scrollY>80){

        header.style.background="rgba(255,255,255,.95)";
        header.style.backdropFilter="blur(12px)";
        header.style.boxShadow="0 10px 25px rgba(0,0,0,.08)";

    }else{

        header.style.background="transparent";
        header.style.boxShadow="none";

    }

});
// MENU MOBILE

const menuButton = document.querySelector(".menu-mobile");

const menu = document.querySelector(".nav-menu");


if(menuButton){

    menuButton.addEventListener("click",()=>{

        menu.classList.toggle("active");

        menuButton.classList.toggle("active");

    });

}



// FECHAR MENU AO CLICAR NO LINK

const menuLinks = document.querySelectorAll(".nav-menu a");


menuLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        menu.classList.remove("active");

        menuButton.classList.remove("active");

    });

});



// BOTÃO VOLTAR AO TOPO

const backTop = document.querySelector(".back-top");


window.addEventListener("scroll",()=>{


    if(window.scrollY > 500){

        backTop.style.opacity="1";

        backTop.style.visibility="visible";

    }else{

        backTop.style.opacity="0";

        backTop.style.visibility="hidden";

    }


});



// ANIMAÇÃO AO ROLAR

const elements = document.querySelectorAll(
".service-card, .about-content, .gallery-item, .testimonial-card, .video-card"
);


const observer = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }


    });


},
{
    threshold:.15
});



elements.forEach(element=>{

    observer.observe(element);

});
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

// ===========================
// LIGHTBOX GALERIA
// ===========================

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>
    <button class="lightbox-prev">&#10094;</button>

    <img src="" alt="Imagem ampliada">

    <button class="lightbox-next">&#10095;</button>
`;

document.body.appendChild(lightbox);


const lightboxImage = lightbox.querySelector("img");

const closeLightbox = lightbox.querySelector(".lightbox-close");

const prevButton = lightbox.querySelector(".lightbox-prev");

const nextButton = lightbox.querySelector(".lightbox-next");


let currentImage = 0;

const images = [];


galleryItems.forEach((item,index)=>{

    const img = item.querySelector("img");

    images.push(img.src);


    item.addEventListener("click",(e)=>{

        e.preventDefault();

        currentImage = index;

        openLightbox();

    });

});



function openLightbox(){

    lightboxImage.src = images[currentImage];

    lightbox.classList.add("active");

    document.body.style.overflow="hidden";

}



function closeLightboxFunction(){

    lightbox.classList.remove("active");

    document.body.style.overflow="auto";

}



function showNext(){

    currentImage++;

    if(currentImage >= images.length){

        currentImage = 0;

    }

    lightboxImage.src = images[currentImage];

}



function showPrev(){

    currentImage--;

    if(currentImage < 0){

        currentImage = images.length - 1;

    }

    lightboxImage.src = images[currentImage];

}



closeLightbox.addEventListener(
"click",
closeLightboxFunction
);


nextButton.addEventListener(
"click",
showNext
);


prevButton.addEventListener(
"click",
showPrev
);



lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        closeLightboxFunction();

    }

});



// Fechar com ESC

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        closeLightboxFunction();

    }

});



// Navegação pelo teclado

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;


    if(e.key==="ArrowRight"){

        showNext();

    }


    if(e.key==="ArrowLeft"){

        showPrev();

    }

});
/* ===========================
FORMULÁRIO DE CONTATO
=========================== */

const contactForm = document.querySelector("#contact-form");

if (contactForm) {

```
contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const button = contactForm.querySelector("button");

    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Enviando...";


    try {

        const formData = new FormData(contactForm);

        const response = await fetch(
            contactForm.action,
            {
                method: "POST",
                body: formData
            }
        );


        if (!response.ok) {

            throw new Error("Erro ao enviar formulário.");

        }


        contactForm.reset();

        button.textContent = "Mensagem enviada!";


        setTimeout(() => {

            button.disabled = false;
            button.textContent = originalText;

        }, 4000);


    } catch (error) {

        console.error(error);

        button.disabled = false;
        button.textContent = "Erro. Tente novamente.";

        setTimeout(() => {

            button.textContent = originalText;

        }, 4000);

    }

});
```

}

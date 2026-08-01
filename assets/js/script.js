/* ===========================
HEADER / SCROLL
=========================== */

window.addEventListener("scroll", () => {


const header = document.querySelector("header");

if (!header) return;

if (window.scrollY > 80) {

    header.style.background = "rgba(255,255,255,.95)";
    header.style.backdropFilter = "blur(12px)";
    header.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";

} else {

    header.style.background = "transparent";
    header.style.backdropFilter = "none";
    header.style.boxShadow = "none";

}


});

/* ===========================
MENU MOBILE
=========================== */

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

if (menuButton && menu) {


menuButton.addEventListener("click", () => {

    menu.classList.toggle("active");
    menuButton.classList.toggle("active");

});


}

/* ===========================
FECHAR MENU AO CLICAR
=========================== */

const menuLinks = document.querySelectorAll(".nav-menu a");

menuLinks.forEach(link => {


link.addEventListener("click", () => {

    if (menu) {
        menu.classList.remove("active");
    }

    if (menuButton) {
        menuButton.classList.remove("active");
    }

});


});

/* ===========================
BOTÃO VOLTAR AO TOPO
=========================== */

const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", () => {


if (!backTop) return;

if (window.scrollY > 500) {

    backTop.style.opacity = "1";
    backTop.style.visibility = "visible";

} else {

    backTop.style.opacity = "0";
    backTop.style.visibility = "hidden";

}


});

/* ===========================
ANIMAÇÃO AO ROLAR
=========================== */

const elements = document.querySelectorAll(
".service-card, .about-content, .gallery-item, .testimonial-card, .video-card"
);

if ("IntersectionObserver" in window) {


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);

elements.forEach(element => {

    observer.observe(element);

});


} else {


elements.forEach(element => {

    element.classList.add("show");

});


}

/* ===========================
LIGHTBOX GALERIA
=========================== */

const galleryItems = document.querySelectorAll(".gallery-item");

if (galleryItems.length > 0) {


const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>

    <button class="lightbox-prev">&#10094;</button>

    <img src="" alt="Imagem ampliada">

    <button class="lightbox-next">&#10095;</button>
`;

document.body.appendChild(lightbox);


const lightboxImage =
    lightbox.querySelector("img");

const closeLightbox =
    lightbox.querySelector(".lightbox-close");

const prevButton =
    lightbox.querySelector(".lightbox-prev");

const nextButton =
    lightbox.querySelector(".lightbox-next");


let currentImage = 0;

const images = [];


galleryItems.forEach((item, index) => {

    const img = item.querySelector("img");

    if (!img) return;

    images.push(img.src);


    item.addEventListener("click", (event) => {

        event.preventDefault();

        currentImage = index;

        openLightbox();

    });

});


function openLightbox() {

    if (!images.length) return;

    lightboxImage.src =
        images[currentImage];

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeLightboxFunction() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

}


function showNextImage() {

    currentImage++;

    if (currentImage >= images.length) {

        currentImage = 0;

    }

    lightboxImage.src =
        images[currentImage];

}


function showPreviousImage() {

    currentImage--;

    if (currentImage < 0) {

        currentImage = images.length - 1;

    }

    lightboxImage.src =
        images[currentImage];

}


closeLightbox.addEventListener(
    "click",
    closeLightboxFunction
);


nextButton.addEventListener(
    "click",
    showNextImage
);


prevButton.addEventListener(
    "click",
    showPreviousImage
);


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightboxFunction();

    }

});


document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }


    if (event.key === "Escape") {

        closeLightboxFunction();

    }


    if (event.key === "ArrowRight") {

        showNextImage();

    }


    if (event.key === "ArrowLeft") {

        showPreviousImage();

    }

});


}

/* ===========================
CARROSSEL DEPOIMENTOS
=========================== */

const testimonialTrack =
document.querySelector(".testimonials-track");

const testimonialCards =
document.querySelectorAll(".testimonial-card");

const testimonialNext =
document.querySelector(".testimonial-next");

const testimonialPrev =
document.querySelector(".testimonial-prev");

const testimonialDots =
document.querySelectorAll(".testimonial-dot");

if (
testimonialTrack &&
testimonialCards.length > 0
) {


let testimonialIndex = 0;

let testimonialAutoplay;


function updateTestimonials() {

    testimonialTrack.style.transform =
        "translateX(-" +
        (testimonialIndex * 100) +
        "%)";


    testimonialDots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === testimonialIndex
            );

        }
    );

}


function nextTestimonial() {

    testimonialIndex++;

    if (
        testimonialIndex >=
        testimonialCards.length
    ) {

        testimonialIndex = 0;

    }

    updateTestimonials();

}


function previousTestimonial() {

    testimonialIndex--;

    if (testimonialIndex < 0) {

        testimonialIndex =
            testimonialCards.length - 1;

    }

    updateTestimonials();

}


function startTestimonialAutoplay() {

    clearInterval(testimonialAutoplay);

    testimonialAutoplay =
        setInterval(
            nextTestimonial,
            5000
        );

}


if (testimonialNext) {

    testimonialNext.addEventListener(
        "click",
        () => {

            nextTestimonial();

            startTestimonialAutoplay();

        }
    );

}


if (testimonialPrev) {

    testimonialPrev.addEventListener(
        "click",
        () => {

            previousTestimonial();

            startTestimonialAutoplay();

        }
    );

}


testimonialDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                testimonialIndex = index;

                updateTestimonials();

                startTestimonialAutoplay();

            }
        );

    }
);


const testimonialCarousel =
    document.querySelector(
        ".testimonials-carousel"
    );


if (testimonialCarousel) {

    testimonialCarousel.addEventListener(
        "mouseenter",
        () => {

            clearInterval(
                testimonialAutoplay
            );

        }
    );


    testimonialCarousel.addEventListener(
        "mouseleave",
        () => {

            startTestimonialAutoplay();

        }
    );

}


updateTestimonials();

startTestimonialAutoplay();


}

/* ===========================
FORMULÁRIO DE CONTATO
=========================== */

const contactForm =
document.querySelector("#contact-form");

if (contactForm) {


contactForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const button =
            contactForm.querySelector("button");

        if (!button) return;

        const originalText =
            button.textContent;

        button.disabled = true;

        button.textContent = "Enviando...";


        try {

            const formData =
                new FormData(contactForm);


            const response =
                await fetch(
                    contactForm.action,
                    {
                        method: "POST",
                        body: formData
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Erro ao enviar formulário."
                );

            }


            contactForm.reset();

            button.textContent =
                "Mensagem enviada!";


            setTimeout(() => {

                button.disabled = false;

                button.textContent =
                    originalText;

            }, 4000);


        } catch (error) {

            console.error(error);

            button.disabled = false;

            button.textContent =
                "Erro. Tente novamente.";


            setTimeout(() => {

                button.textContent =
                    originalText;

            }, 4000);

        }

    }
);


}

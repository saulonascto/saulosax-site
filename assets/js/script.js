
/* =========================================================
   SAULO NASCIMENTO | SAXOFONISTA
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   HEADER / SCROLL
========================================================= */

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

if (menuButton && menu) {

    menuButton.addEventListener("click", () => {

        menu.classList.toggle("active");
        menuButton.classList.toggle("active");

    });

}


/* =========================================================
   FECHAR MENU AO CLICAR
========================================================= */

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


/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

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


/* =========================================================
   ANIMAÇÃO AO ROLAR
========================================================= */

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


/* =========================================================
   HERO VIDEO
   AUTOPLAY / MOBILE / SAFARI
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const heroVideos =
        document.querySelectorAll(".hero-video");

    if (!heroVideos.length) return;


    heroVideos.forEach(video => {

        /* -----------------------------------------
           GARANTIR CONFIGURAÇÕES DE AUTOPLAY
        ----------------------------------------- */

        video.muted = true;

        video.defaultMuted = true;

        video.setAttribute("muted", "");

        video.setAttribute("autoplay", "");

        video.setAttribute("playsinline", "");

        video.setAttribute("webkit-playsinline", "");


        /* -----------------------------------------
           TENTAR REPRODUZIR
        ----------------------------------------- */

        const playVideo = () => {

            video.muted = true;

            const playPromise =
                video.play();

            if (
                playPromise !== undefined
            ) {

                playPromise.catch(() => {

                    /*
                     O navegador pode bloquear
                     o autoplay até existir uma
                     interação do usuário.
                    */

                });

            }

        };


        /* -----------------------------------------
           QUANDO O VÍDEO ESTIVER PRONTO
        ----------------------------------------- */

        if (
            video.readyState >= 2
        ) {

            playVideo();

        } else {

            video.addEventListener(
                "loadeddata",
                playVideo,
                {
                    once: true
                }
            );

        }


        /* -----------------------------------------
           TENTAR NOVAMENTE QUANDO A PÁGINA
           TERMINAR DE CARREGAR
        ----------------------------------------- */

        window.addEventListener(
            "load",
            playVideo,
            {
                once: true
            }
        );


        /* -----------------------------------------
           TENTAR NOVAMENTE APÓS PRIMEIRA
           INTERAÇÃO DO USUÁRIO
        ----------------------------------------- */

        const resumeVideo = () => {

            if (video.paused) {

                playVideo();

            }

        };


        document.addEventListener(
            "touchstart",
            resumeVideo,
            {
                once: true,
                passive: true
            }
        );


        document.addEventListener(
            "click",
            resumeVideo,
            {
                once: true
            }
        );


    });

});


/* =========================================================
   LIGHTBOX GALERIA
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

if (galleryItems.length > 0) {

    const lightbox =
        document.createElement("div");

    lightbox.className = "lightbox";


    lightbox.innerHTML = `

        <button
            class="lightbox-close"
            aria-label="Fechar">
            &times;
        </button>

        <button
            class="lightbox-prev"
            aria-label="Imagem anterior">
            &#10094;
        </button>

        <div class="lightbox-content">

            <img
                class="lightbox-image"
                src=""
                alt="Imagem ampliada">

            <div class="lightbox-caption">

                <h3></h3>

                <p></p>

            </div>

        </div>

        <button
            class="lightbox-next"
            aria-label="Próxima imagem">
            &#10095;
        </button>

    `;


    document.body.appendChild(lightbox);


    const lightboxImage =
        lightbox.querySelector(
            ".lightbox-image"
        );


    const lightboxTitle =
        lightbox.querySelector(
            ".lightbox-caption h3"
        );


    const lightboxDescription =
        lightbox.querySelector(
            ".lightbox-caption p"
        );


    const closeLightbox =
        lightbox.querySelector(
            ".lightbox-close"
        );


    const prevButton =
        lightbox.querySelector(
            ".lightbox-prev"
        );


    const nextButton =
        lightbox.querySelector(
            ".lightbox-next"
        );


    let currentImage = 0;


    const images = [];


    /* =====================================================
       CAPTURA DAS FOTOS
    ===================================================== */

    galleryItems.forEach(
        (item, index) => {

            const img =
                item.querySelector("img");


            if (!img) return;


            const title =
                item.querySelector(
                    ".gallery-caption h3"
                );


            const description =
                item.querySelector(
                    ".gallery-caption p"
                );


            images.push({

                src: img.src,

                alt: img.alt,

                title:
                    title
                        ? title.textContent
                        : "",

                description:
                    description
                        ? description.textContent
                        : ""

            });


            item.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    currentImage = index;

                    openLightbox();

                }
            );

        }
    );


    /* =====================================================
       ATUALIZAR LIGHTBOX
    ===================================================== */

    function updateLightbox() {

        if (!images.length) return;


        const image =
            images[currentImage];


        lightboxImage.src =
            image.src;


        lightboxImage.alt =
            image.alt;


        lightboxTitle.textContent =
            image.title;


        lightboxDescription.textContent =
            image.description;

    }


    /* =====================================================
       ABRIR
    ===================================================== */

    function openLightbox() {

        if (!images.length) return;


        updateLightbox();


        lightbox.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       FECHAR
    ===================================================== */

    function closeLightboxFunction() {

        lightbox.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }


    /* =====================================================
       PRÓXIMA
    ===================================================== */

    function showNextImage() {

        currentImage++;


        if (
            currentImage >=
            images.length
        ) {

            currentImage = 0;

        }


        updateLightbox();

    }


    /* =====================================================
       ANTERIOR
    ===================================================== */

    function showPreviousImage() {

        currentImage--;


        if (currentImage < 0) {

            currentImage =
                images.length - 1;

        }


        updateLightbox();

    }


    /* =====================================================
       BOTÃO FECHAR
    ===================================================== */

    closeLightbox.addEventListener(
        "click",
        closeLightboxFunction
    );


    /* =====================================================
       PRÓXIMA
    ===================================================== */

    nextButton.addEventListener(
        "click",
        showNextImage
    );


    /* =====================================================
       ANTERIOR
    ===================================================== */

    prevButton.addEventListener(
        "click",
        showPreviousImage
    );


    /* =====================================================
       CLICAR NO FUNDO
    ===================================================== */

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightboxFunction();

            }

        }
    );


    /* =====================================================
       TECLADO
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.key === "Escape"
            ) {

                closeLightboxFunction();

            }


            if (
                event.key === "ArrowRight"
            ) {

                showNextImage();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                showPreviousImage();

            }

        }
    );


}


/* =========================================================
   CARROSSEL DEPOIMENTOS
========================================================= */

const testimonialTrack =
    document.querySelector(
        ".testimonials-track"
    );


const testimonialCards =
    document.querySelectorAll(
        ".testimonial-card"
    );


const testimonialNext =
    document.querySelector(
        ".testimonial-next"
    );


const testimonialPrev =
    document.querySelector(
        ".testimonial-prev"
    );


const testimonialDots =
    document.querySelectorAll(
        ".testimonial-dot"
    );


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


        if (
            testimonialIndex < 0
        ) {

            testimonialIndex =
                testimonialCards.length - 1;

        }


        updateTestimonials();

    }


    function startTestimonialAutoplay() {

        clearInterval(
            testimonialAutoplay
        );


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

                    testimonialIndex =
                        index;

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


/* =========================================================
   FORMULÁRIO DE CONTATO
========================================================= */

const contactForm =
    document.querySelector(
        "#contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const button =
                contactForm.querySelector(
                    "button"
                );


            if (!button) return;


            const originalText =
                button.textContent;


            button.disabled = true;

            button.textContent =
                "Enviando...";


            try {

                const formData =
                    new FormData(
                        contactForm
                    );


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

                    button.disabled =
                        false;

                    button.textContent =
                        originalText;

                }, 4000);


            } catch (error) {

                console.error(error);


                button.disabled =
                    false;


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

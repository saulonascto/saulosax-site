/* =========================================================
   SAULO SAX
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");
        menuToggle.classList.toggle("active");

    });


    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");
            menuToggle.classList.remove("active");

        });

    });

}


/* =========================================================
   HEADER AO ROLAR
========================================================= */

const header = document.querySelector("header");

if (header) {

    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();

}


/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

const backTop = document.querySelector(".back-top");

if (backTop) {

    function updateBackTop() {

        if (window.scrollY > 500) {

            backTop.style.opacity = "1";
            backTop.style.visibility = "visible";

        } else {

            backTop.style.opacity = "0";
            backTop.style.visibility = "hidden";

        }

    }

    window.addEventListener(
        "scroll",
        updateBackTop,
        { passive: true }
    );

    updateBackTop();

}


/* =========================================================
   ANIMAÇÃO AO ROLAR
========================================================= */

const animatedElements = document.querySelectorAll(
    ".service-card, .about-content, .gallery-item, .testimonial-card, .video-card"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    animatedElements.forEach(element => {

        observer.observe(element);

    });

} else {

    animatedElements.forEach(element => {

        element.classList.add("show");

    });

}


/* =========================================================
   HERO VIDEO
   VERSÃO ROBUSTA
========================================================= */

function initHeroVideo() {

    const heroVideo = document.querySelector("#hero-video");

    if (!heroVideo) {

        console.warn("Hero video não encontrado.");

        return;

    }


    /*
     * IMPORTANTE:
     * O caminho começa com "/" para funcionar
     * corretamente no site publicado.
     */

    const desktopVideo =
        "/assets/videos/hero-video.mp4";

    const mobileVideo =
        "/assets/videos/hero-video-mobile.mp4";


    const isMobile =
        window.matchMedia("(max-width: 768px)").matches;


    const videoSource =
        isMobile
            ? mobileVideo
            : desktopVideo;


    console.log(
        "Hero Video:",
        videoSource
    );


    /* -----------------------------------------------------
       CONFIGURAÇÕES
    ----------------------------------------------------- */

    heroVideo.muted = true;

    heroVideo.defaultMuted = true;

    heroVideo.autoplay = true;

    heroVideo.loop = true;

    heroVideo.playsInline = true;


    heroVideo.setAttribute(
        "muted",
        ""
    );

    heroVideo.setAttribute(
        "autoplay",
        ""
    );

    heroVideo.setAttribute(
        "loop",
        ""
    );

    heroVideo.setAttribute(
        "playsinline",
        ""
    );


    /* -----------------------------------------------------
       DEFINIR SRC
    ----------------------------------------------------- */

    


    /* -----------------------------------------------------
       CARREGAR VÍDEO
    ----------------------------------------------------- */

    


    /* -----------------------------------------------------
       TENTAR REPRODUZIR
    ----------------------------------------------------- */

    function playHeroVideo() {

        if (!heroVideo) return;

        heroVideo.muted = true;

        const promise = heroVideo.play();

        if (promise !== undefined) {

            promise.catch(error => {

                /*
                 * AbortError pode acontecer quando
                 * load() é chamado novamente.
                 * Não é necessário interromper o site.
                 */

                if (
                    error.name !== "AbortError"
                ) {

                    console.warn(
                        "Hero video não iniciou automaticamente:",
                        error
                    );

                }

            });

        }

    }


    /* -----------------------------------------------------
       EVENTOS DO VÍDEO
    ----------------------------------------------------- */

    heroVideo.addEventListener(
        "loadeddata",
        playHeroVideo,
        { once: true }
    );


    heroVideo.addEventListener(
        "canplay",
        playHeroVideo,
        { once: true }
    );


    heroVideo.addEventListener(
        "loadedmetadata",
        () => {

            console.log(
                "Hero video carregado:",
                heroVideo.currentSrc
            );

        },
        { once: true }
    );


    heroVideo.addEventListener(
        "error",
        () => {

            console.error(
                "Erro ao carregar Hero Video:",
                heroVideo.error
            );

        }
    );


    /* -----------------------------------------------------
       QUANDO A PÁGINA TERMINAR DE CARREGAR
    ----------------------------------------------------- */

    window.addEventListener(
        "load",
        () => {

            playHeroVideo();

        },
        { once: true }
    );


    /* -----------------------------------------------------
       INTERAÇÃO DO USUÁRIO
    ----------------------------------------------------- */

    function resumeHeroVideo() {

        if (heroVideo.paused) {

            playHeroVideo();

        }

    }


    document.addEventListener(
        "touchstart",
        resumeHeroVideo,
        {
            once: true,
            passive: true
        }
    );


    document.addEventListener(
        "click",
        resumeHeroVideo,
        {
            once: true
        }
    );


    /* -----------------------------------------------------
       VOLTAR PARA A ABA
    ----------------------------------------------------- */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState === "visible" &&
                heroVideo.paused
            ) {

                playHeroVideo();

            }

        }
    );

}


/* =========================================================
   INICIAR HERO VIDEO
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initHeroVideo,
        { once: true }
    );

} else {

    initHeroVideo();

}


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
        lightbox.querySelector(".lightbox-image");

    const lightboxTitle =
        lightbox.querySelector(".lightbox-caption h3");

    const lightboxDescription =
        lightbox.querySelector(".lightbox-caption p");

    const closeLightbox =
        lightbox.querySelector(".lightbox-close");

    const prevButton =
        lightbox.querySelector(".lightbox-prev");

    const nextButton =
        lightbox.querySelector(".lightbox-next");


    let currentImage = 0;

    const images = [];


    galleryItems.forEach((item, index) => {

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

            title: title
                ? title.textContent.trim()
                : "",

            description: description
                ? description.textContent.trim()
                : ""

        });


        item.addEventListener(
            "click",
            event => {

                event.preventDefault();

                currentImage = index;

                openLightbox();

            }
        );

    });


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


    function openLightbox() {

        if (!images.length) return;


        updateLightbox();

        lightbox.classList.add("active");

        document.body.style.overflow =
            "hidden";

    }


    function closeLightboxFunction() {

        lightbox.classList.remove("active");

        document.body.style.overflow =
            "";

    }


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


    function showPreviousImage() {

        currentImage--;

        if (currentImage < 0) {

            currentImage =
                images.length - 1;

        }

        updateLightbox();

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


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightboxFunction();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

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

        }
    );

}


/* =========================================================
   CARROSSEL DEPOIMENTOS
========================================================= */

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
            `translateX(-${testimonialIndex * 100}%)`;


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
    document.querySelector("#contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const button =
                contactForm.querySelector("button");


            if (!button) return;


            const originalText =
                button.textContent;


            button.disabled = true;

            button.textContent =
                "Enviando...";


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


                setTimeout(
                    () => {

                        button.disabled =
                            false;

                        button.textContent =
                            originalText;

                    },
                    4000
                );


            } catch (error) {

                console.error(error);

                button.disabled =
                    false;

                button.textContent =
                    "Erro. Tente novamente.";


                setTimeout(
                    () => {

                        button.textContent =
                            originalText;

                    },
                    4000
                );

            }

        }
    );

}
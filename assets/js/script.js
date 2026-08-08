
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

    const updateHeader = () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}


/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

const backTop = document.querySelector(".back-top");

if (backTop) {

    const updateBackTop = () => {

        if (window.scrollY > 500) {

            backTop.style.opacity = "1";
            backTop.style.visibility = "visible";

        } else {

            backTop.style.opacity = "0";
            backTop.style.visibility = "hidden";

        }

    };


    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive: true
        }
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
        (entries) => {

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
   DESKTOP / MOBILE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const heroVideo = document.querySelector("#hero-video");

    if (!heroVideo) return;


    /* -----------------------------------------------------
       DETECTAR DISPOSITIVO
    ----------------------------------------------------- */

    const mobileQuery = window.matchMedia(
        "(max-width: 768px)"
    );


    /* -----------------------------------------------------
       DEFINIR VÍDEO
    ----------------------------------------------------- */

    const setHeroVideo = () => {

        const isMobile = mobileQuery.matches;

        const videoSource = isMobile
            ? "assets/videos/hero-video-mobile.mp4"
            : "assets/videos/hero-video.mp4";


        /* Evitar recarregar o mesmo arquivo */

        if (
            heroVideo.getAttribute("src") ===
            videoSource
        ) {

            return;

        }


        heroVideo.src = videoSource;


        /* -------------------------------------------------
           CONFIGURAÇÕES DE AUTOPLAY
        ------------------------------------------------- */

        heroVideo.muted = true;
        heroVideo.defaultMuted = true;
        heroVideo.autoplay = true;
        heroVideo.loop = true;
        heroVideo.playsInline = true;

        heroVideo.setAttribute("muted", "");
        heroVideo.setAttribute("autoplay", "");
        heroVideo.setAttribute("loop", "");
        heroVideo.setAttribute("playsinline", "");
        heroVideo.setAttribute(
            "webkit-playsinline",
            ""
        );


        /* -------------------------------------------------
           CARREGAR VÍDEO
        ------------------------------------------------- */

        heroVideo.load();


        /* -------------------------------------------------
           TENTAR REPRODUZIR
        ------------------------------------------------- */

        const playVideo = () => {

            heroVideo.muted = true;

            const promise = heroVideo.play();

            if (promise !== undefined) {

                promise.catch(() => {

                    /*
                       Alguns navegadores podem bloquear
                       autoplay. Nesse caso o vídeo será
                       iniciado na primeira interação.
                    */

                });

            }

        };


        /* -------------------------------------------------
           VÍDEO PRONTO
        ------------------------------------------------- */

        heroVideo.addEventListener(
            "loadeddata",
            playVideo,
            {
                once: true
            }
        );


        heroVideo.addEventListener(
            "canplay",
            playVideo,
            {
                once: true
            }
        );


        /* -------------------------------------------------
           TENTAR NOVAMENTE APÓS O CARREGAMENTO DA PÁGINA
        ------------------------------------------------- */

        if (document.readyState === "complete") {

            playVideo();

        } else {

            window.addEventListener(
                "load",
                playVideo,
                {
                    once: true
                }
            );

        }


        /* -------------------------------------------------
           INTERAÇÃO DO USUÁRIO
        ------------------------------------------------- */

        const resumeVideo = () => {

            if (heroVideo.paused) {

                playVideo();

            }

        };


        document.addEventListener(
            "click",
            resumeVideo,
            {
                once: true
            }
        );


        document.addEventListener(
            "touchstart",
            resumeVideo,
            {
                once: true,
                passive: true
            }
        );

    };


    /* -----------------------------------------------------
       INICIAR
    ----------------------------------------------------- */

    setHeroVideo();


    /* -----------------------------------------------------
       TROCAR VÍDEO SE MUDAR ENTRE DESKTOP/MOBILE
    ----------------------------------------------------- */

    if (mobileQuery.addEventListener) {

        mobileQuery.addEventListener(
            "change",
            setHeroVideo
        );

    }

});


/* =========================================================
   LIGHTBOX GALERIA
========================================================= */

const galleryItems = document.querySelectorAll(
    ".gallery-item"
);

if (galleryItems.length > 0) {

    const lightbox = document.createElement("div");

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


    /* -----------------------------------------------------
       CAPTURAR IMAGENS
    ----------------------------------------------------- */

    galleryItems.forEach((item, index) => {

        const img = item.querySelector("img");

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

            src: img.currentSrc || img.src,

            alt: img.alt || "Imagem da galeria",

            title: title
                ? title.textContent.trim()
                : "",

            description: description
                ? description.textContent.trim()
                : ""

        });


        item.addEventListener("click", event => {

            event.preventDefault();

            currentImage = index;

            openLightbox();

        });

    });


    /* -----------------------------------------------------
       ATUALIZAR LIGHTBOX
    ----------------------------------------------------- */

    function updateLightbox() {

        if (!images.length) return;


        const image = images[currentImage];


        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

        lightboxTitle.textContent = image.title;

        lightboxDescription.textContent =
            image.description;

    }


    /* -----------------------------------------------------
       ABRIR
    ----------------------------------------------------- */

    function openLightbox() {

        if (!images.length) return;


        updateLightbox();


        lightbox.classList.add("active");


        document.body.style.overflow = "hidden";

    }


    /* -----------------------------------------------------
       FECHAR
    ----------------------------------------------------- */

    function closeLightboxFunction() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    /* -----------------------------------------------------
       PRÓXIMA
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       ANTERIOR
    ----------------------------------------------------- */

    function showPreviousImage() {

        currentImage--;


        if (currentImage < 0) {

            currentImage =
                images.length - 1;

        }


        updateLightbox();

    }


    /* -----------------------------------------------------
       BOTÕES
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       CLICAR NO FUNDO
    ----------------------------------------------------- */

    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {

                closeLightboxFunction();

            }

        }
    );


    /* -----------------------------------------------------
       TECLADO
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       ATUALIZAR
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       PRÓXIMO
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       ANTERIOR
    ----------------------------------------------------- */

    function previousTestimonial() {

        testimonialIndex--;


        if (testimonialIndex < 0) {

            testimonialIndex =
                testimonialCards.length - 1;

        }


        updateTestimonials();

    }


    /* -----------------------------------------------------
       AUTOPLAY
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       BOTÃO PRÓXIMO
    ----------------------------------------------------- */

    if (testimonialNext) {

        testimonialNext.addEventListener(
            "click",
            () => {

                nextTestimonial();

                startTestimonialAutoplay();

            }
        );

    }


    /* -----------------------------------------------------
       BOTÃO ANTERIOR
    ----------------------------------------------------- */

    if (testimonialPrev) {

        testimonialPrev.addEventListener(
            "click",
            () => {

                previousTestimonial();

                startTestimonialAutoplay();

            }
        );

    }


    /* -----------------------------------------------------
       DOTS
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       PAUSAR AO PASSAR O MOUSE
    ----------------------------------------------------- */

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
   FINALIZAÇÃO
========================================================= */

console.log(
    "Saulo Sax — JavaScript carregado com sucesso."
);

/* =========================================================
   FINESSE AGÊNCIA MUSICAL
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton =
    document.querySelector(".menu-toggle");

const menu =
    document.querySelector(".nav-menu");


if (menuButton && menu) {

    menuButton.addEventListener("click", () => {

        menu.classList.toggle("active");

        menuButton.classList.toggle("active");

    });

}


/* =========================================================
   FECHAR MENU AO CLICAR
========================================================= */

const menuLinks =
    document.querySelectorAll(".nav-menu a");


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
        { passive: true }
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
        { passive: true }
    );


    updateBackTop();

}


/* =========================================================
   ANIMAÇÕES AO ROLAR
========================================================= */

const animatedElements = document.querySelectorAll(
    ".formation, .about-content, .gallery-item, .contact-form"
);

if ("IntersectionObserver" in window && animatedElements.length) {

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    animatedElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   NAVEGAÇÃO SUAVE
========================================================= */

const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
);

internalLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") {

            return;

        }


        const target =
            document.querySelector(targetId);

        if (!target) {

            return;

        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   LIGHTBOX — GALERIA
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");


if (galleryItems.length) {

    const lightbox =
        document.createElement("div");

    lightbox.className =
        "lightbox";


    lightbox.innerHTML = `
        <button
            class="lightbox-close"
            type="button"
            aria-label="Fechar imagem">
            ×
        </button>

        <button
            class="lightbox-prev"
            type="button"
            aria-label="Imagem anterior">
            ‹
        </button>

        <div class="lightbox-content">

            <img
                class="lightbox-image"
                src=""
                alt="">

            <div class="lightbox-caption">

                <h3></h3>

                <p></p>

            </div>

        </div>

        <button
            class="lightbox-next"
            type="button"
            aria-label="Próxima imagem">
            ›
        </button>
    `;


    document.body.appendChild(lightbox);


    const lightboxImage =
        lightbox.querySelector(".lightbox-image");

    const lightboxTitle =
        lightbox.querySelector(
            ".lightbox-caption h3"
        );

    const lightboxText =
        lightbox.querySelector(
            ".lightbox-caption p"
        );

    const closeButton =
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


    let currentIndex = 0;


    const updateLightbox = index => {

        const item =
            galleryItems[index];

        if (!item) return;


        const image =
            item.querySelector("img");

        const title =
            item.querySelector(
                ".gallery-caption h3"
            );

        const text =
            item.querySelector(
                ".gallery-caption p"
            );


        if (!image) return;


        currentIndex = index;


        lightboxImage.src =
            item.getAttribute("href") ||
            image.src;

        lightboxImage.alt =
            image.alt || "";


        lightboxTitle.textContent =
            title ? title.textContent.trim() : "";

        lightboxText.textContent =
            text ? text.textContent.trim() : "";

    };


    const openLightbox = index => {

        updateLightbox(index);

        lightbox.classList.add("active");

        document.body.classList.add(
            "lightbox-open"
        );

    };


    const closeLightbox = () => {

        lightbox.classList.remove("active");

        document.body.classList.remove(
            "lightbox-open"
        );

    };


    galleryItems.forEach((item, index) => {

        item.addEventListener("click", event => {

            event.preventDefault();

            openLightbox(index);

        });

    });


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    prevButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const newIndex =
                currentIndex === 0
                    ? galleryItems.length - 1
                    : currentIndex - 1;

            updateLightbox(newIndex);

        }
    );


    nextButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const newIndex =
                currentIndex ===
                galleryItems.length - 1
                    ? 0
                    : currentIndex + 1;

            updateLightbox(newIndex);

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

                closeLightbox();

            }


            if (event.key === "ArrowLeft") {

                prevButton.click();

            }


            if (event.key === "ArrowRight") {

                nextButton.click();

            }

        }
    );

}


/* =========================================================
   WHATSAPP
========================================================= */

const whatsappButton =
    document.querySelector(
        ".whatsapp-button"
    );

if (whatsappButton) {

    whatsappButton.setAttribute(
        "aria-label",
        "Falar pelo WhatsApp"
    );

}


/* =========================================================
   FINALIZAÇÃO
========================================================= */

console.log(
    "Finesse Agência Musical — JavaScript carregado."
);


/* =========================================================
   DEPOIMENTOS — CARROSSEL
========================================================= */

const testimonialsTrack =
    document.querySelector(".testimonials-track");

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

const testimonialPrev =
    document.querySelector(".testimonial-prev");

const testimonialNext =
    document.querySelector(".testimonial-next");

const testimonialDots =
    document.querySelectorAll(".testimonial-dot");


if (
    testimonialsTrack &&
    testimonialCards.length &&
    testimonialPrev &&
    testimonialNext
) {

    let testimonialIndex = 0;


    function updateTestimonials() {

        testimonialsTrack.style.transform =
            `translateX(-${testimonialIndex * 100}%)`;


        testimonialDots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === testimonialIndex
            );

        });

    }


    testimonialNext.addEventListener(
        "click",
        () => {

            testimonialIndex++;

            if (
                testimonialIndex >=
                testimonialCards.length
            ) {

                testimonialIndex = 0;

            }

            updateTestimonials();

        }
    );


    testimonialPrev.addEventListener(
        "click",
        () => {

            testimonialIndex--;

            if (testimonialIndex < 0) {

                testimonialIndex =
                    testimonialCards.length - 1;

            }

            updateTestimonials();

        }
    );


    testimonialDots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                testimonialIndex = index;

                updateTestimonials();

            }
        );

    });


    updateTestimonials();

}

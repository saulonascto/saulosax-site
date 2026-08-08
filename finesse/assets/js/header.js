
/* =========================================================
   FINESSE AGÊNCIA MUSICAL
   HEADER + MENU MOBILE + LIGHTBOX
========================================================= */


/* =========================================================
   HEADER / SCROLL
========================================================= */

window.addEventListener("scroll", () => {

    const header =
        document.querySelector(".header");


    if (!header) return;


    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   MENU HAMBURGER — MOBILE
========================================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const menu =
    document.querySelector(".menu");


if (menuToggle && menu) {


    /* =====================================================
       ABRIR / FECHAR MENU
    ===================================================== */

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                menu.classList.toggle("active");


            menuToggle.classList.toggle(
                "active",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Fechar menu"
                    : "Abrir menu"
            );

        }
    );


    /* =====================================================
       FECHAR AO CLICAR EM UM LINK
    ===================================================== */

    menu.querySelectorAll("a").forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove(
                        "active"
                    );


                    menuToggle.classList.remove(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                }
            );

        }
    );


    /* =====================================================
       FECHAR COM ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                menu.classList.contains("active")
            ) {

                menu.classList.remove(
                    "active"
                );


                menuToggle.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            }

        }
    );

}


/* =========================================================
   LIGHTBOX GALERIA
========================================================= */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


if (galleryItems.length > 0) {


    /* =====================================================
       CRIAR LIGHTBOX
    ===================================================== */

    const lightbox =
        document.createElement("div");


    lightbox.className =
        "lightbox";


    lightbox.innerHTML = `

        <button
            class="lightbox-close"
            type="button"
            aria-label="Fechar galeria">

            &times;

        </button>


        <button
            class="lightbox-prev"
            type="button"
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
            type="button"
            aria-label="Próxima imagem">

            &#10095;

        </button>

    `;


    document.body.appendChild(
        lightbox
    );


    /* =====================================================
       ELEMENTOS
    ===================================================== */

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


    /* =====================================================
       VARIÁVEIS
    ===================================================== */

    let currentImage = 0;


    const galleryData = [];


    /* =====================================================
       CAPTURAR IMAGENS E LEGENDAS
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


            galleryData.push({

                src:
                    img.src,

                alt:
                    img.alt,

                title:
                    title
                        ? title.textContent.trim()
                        : "",

                description:
                    description
                        ? description.textContent.trim()
                        : ""

            });


            item.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();


                    currentImage =
                        index;


                    openLightbox();

                }
            );

        }
    );


    /* =====================================================
       ABRIR LIGHTBOX
    ===================================================== */

    function openLightbox() {

        if (!galleryData.length) return;


        updateLightbox();


        lightbox.classList.add(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       ATUALIZAR LIGHTBOX
    ===================================================== */

    function updateLightbox() {

        const item =
            galleryData[currentImage];


        if (!item) return;


        lightboxImage.src =
            item.src;


        lightboxImage.alt =
            item.alt;


        lightboxTitle.textContent =
            item.title;


        lightboxDescription.textContent =
            item.description;

    }


    /* =====================================================
       FECHAR LIGHTBOX
    ===================================================== */

    function closeLightboxFunction() {

        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    /* =====================================================
       PRÓXIMA IMAGEM
    ===================================================== */

    function showNextImage() {

        currentImage++;


        if (
            currentImage >=
            galleryData.length
        ) {

            currentImage = 0;

        }


        updateLightbox();

    }


    /* =====================================================
       IMAGEM ANTERIOR
    ===================================================== */

    function showPreviousImage() {

        currentImage--;


        if (currentImage < 0) {

            currentImage =
                galleryData.length - 1;

        }


        updateLightbox();

    }


    /* =====================================================
       BOTÃO FECHAR
    ===================================================== */

    closeButton.addEventListener(
        "click",
        closeLightboxFunction
    );


    /* =====================================================
       BOTÃO PRÓXIMO
    ===================================================== */

    nextButton.addEventListener(
        "click",
        showNextImage
    );


    /* =====================================================
       BOTÃO ANTERIOR
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
                event.target === lightbox
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
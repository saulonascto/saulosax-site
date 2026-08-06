/* =========================================================
FINESSE AGÊNCIA MUSICAL
HEADER + LIGHTBOX
========================================================= */


/* =========================================================
HEADER / SCROLL
========================================================= */

window.addEventListener("scroll", () => {

    const header =
        document.querySelector("header");


    if (!header) return;


    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
LIGHTBOX GALERIA
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");


if (galleryItems.length > 0) {


    const lightbox =
        document.createElement("div");


    lightbox.className =
        "lightbox";


    lightbox.innerHTML = `

        <button
            class="lightbox-close"
            aria-label="Fechar galeria">

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


    document.body.appendChild(
        lightbox
    );


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

                src: img.src,

                alt: img.alt,

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
       ABRIR
    ===================================================== */

    function openLightbox() {

        if (!galleryData.length)
            return;


        updateLightbox();


        lightbox.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       ATUALIZAR
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
            galleryData.length
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
                galleryData.length - 1;

        }


        updateLightbox();

    }


    /* =====================================================
       BOTÕES
    ===================================================== */

    closeButton.addEventListener(
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
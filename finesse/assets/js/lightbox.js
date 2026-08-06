
/* ===========================
   GALERIA — LIGHTBOX
=========================== */

const galleryItems =
    document.querySelectorAll("[data-gallery]");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.querySelector(".lightbox-image");

const lightboxTitle =
    document.querySelector(".lightbox-caption h3");

const lightboxDescription =
    document.querySelector(".lightbox-caption p");

const closeButton =
    document.querySelector(".lightbox-close");

const prevButton =
    document.querySelector(".lightbox-prev");

const nextButton =
    document.querySelector(".lightbox-next");


let currentIndex = 0;


/* ===========================
   VERIFICAÇÃO
=========================== */

if (
    galleryItems.length &&
    lightbox &&
    lightboxImage &&
    closeButton &&
    prevButton &&
    nextButton
) {


    /* ===========================
       ABRIR
    =========================== */

    function openLightbox(index) {

        currentIndex = index;

        updateLightbox();

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    /* ===========================
       ATUALIZAR
    =========================== */

    function updateLightbox() {

        const item =
            galleryItems[currentIndex];


        const image =
            item.querySelector("img");


        const title =
            item.querySelector(
                ".gallery-caption h3"
            );


        const description =
            item.querySelector(
                ".gallery-caption p"
            );


        lightboxImage.src =
            image.currentSrc ||
            image.src;


        lightboxImage.alt =
            image.alt || "";


        if (lightboxTitle) {

            lightboxTitle.textContent =
                title
                    ? title.textContent
                    : "";

        }


        if (lightboxDescription) {

            lightboxDescription.textContent =
                description
                    ? description.textContent
                    : "";

        }

    }


    /* ===========================
       FECHAR
    =========================== */

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    /* ===========================
       PRÓXIMA
    =========================== */

    function nextImage() {

        currentIndex =
            (currentIndex + 1)
            % galleryItems.length;

        updateLightbox();

    }


    /* ===========================
       ANTERIOR
    =========================== */

    function previousImage() {

        currentIndex =
            (currentIndex - 1 +
                galleryItems.length)
            % galleryItems.length;

        updateLightbox();

    }


    /* ===========================
       CLIQUE NAS FOTOS
    =========================== */

    galleryItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    openLightbox(index);

                }
            );

        }
    );


    /* ===========================
       BOTÕES
    =========================== */

    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    nextButton.addEventListener(
        "click",
        nextImage
    );


    prevButton.addEventListener(
        "click",
        previousImage
    );


    /* ===========================
       FUNDO
    =========================== */

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* ===========================
       TECLADO
    =========================== */

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

                closeLightbox();

            }


            if (
                event.key === "ArrowRight"
            ) {

                nextImage();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousImage();

            }

        }
    );

}

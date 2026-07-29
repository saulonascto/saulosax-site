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
/*
==========================================================
TIME WELL KEPT
Watch Page
Museum Edition
Part 1
==========================================================
*/

let currentWatch = null;
let timeline = [];
let currentIndex = -1;

/*
==========================================================
Initialise Page
==========================================================
*/

document.addEventListener("DOMContentLoaded", initialiseWatchPage);

async function initialiseWatchPage() {

    showLoading();

    try {

        const params = new URLSearchParams(window.location.search);

        const id = params.get("id");

        if (!id) {

            showError("No chapter specified.");

            return;

        }

        currentWatch = await TimeWellKept.getWatchById(id);

        if (!currentWatch) {

            showError("Chapter not found.");

            return;

        }

        timeline = await TimeWellKept.getTimeline();

        currentIndex = timeline.findIndex(

            watch => watch.catalogNumber === currentWatch.catalogNumber

        );

        renderWatch();

    }

    catch(error){

        console.error(error);

        showError("Unable to load chapter.");

    }

}

/*
==========================================================
Helpers
==========================================================
*/

function previousChapter(){

    if(currentIndex<=0) return null;

    return timeline[currentIndex-1];

}

function nextChapter(){

    if(currentIndex>=timeline.length-1) return null;

    return timeline[currentIndex+1];

}

function heroImage(){

    return `../images/watches/${currentWatch.catalogNumber}/${currentWatch.catalogNumber} hero.jpg`;

}

function frontImage(){

    return `../images/watches/${currentWatch.catalogNumber}/${currentWatch.catalogNumber} front.jpg`;

}

/*
==========================================================
Loading Screen
==========================================================
*/

function showLoading(){

    const page=document.getElementById("watch-page");

    page.innerHTML=`

        <section class="watch-loading">

            <div class="watch-container">

                <h2>Loading Chapter...</h2>

            </div>

        </section>

    `;

}

/*
==========================================================
Error Screen
==========================================================
*/

function showError(message){

    const page=document.getElementById("watch-page");

    page.innerHTML=`

        <section class="watch-error">

            <div class="watch-container">

                <h2>${message}</h2>

            </div>

        </section>

    `;

}

/*
==========================================================
Main Renderer

Implemented in Part 2
==========================================================
*/

/*
==========================================================
Render Chapter
Museum Edition
==========================================================
*/

function renderWatch(){

    const page = document.getElementById("watch-page");

    const watch = currentWatch;

    const story = watch.story;

    page.innerHTML = `

<section class="watch-hero">

    <div class="watch-container">

        <span class="catalog-number">

            ${watch.catalogNumber}

        </span>

        <h1>

            ${watch.identity.displayName}

        </h1>

        <div class="watch-year">

            ${watch.acquisition.year}

        </div>

        <h2>

            ${watch.chapter.title}

        </h2>

        <img
            class="watch-hero-image"
            src="${heroImage()}"
            data-hero="${heroImage()}"
            data-front="${frontImage()}"
            alt="${watch.identity.displayName}"
        >

        <blockquote class="museum-caption">

            "${watch.museumPlaque.caption}"

        </blockquote>

    </div>

</section>

<section class="watch-story">

    <div class="watch-container">

        <div class="story-section">

            <p>

                ${story.opening}

            </p>

        </div>

        <div class="story-section">

            <p>

                ${story.background}

            </p>

        </div>

        <div class="story-section">

            <p>

                ${story.acquisition}

            </p>

        </div>

        <div class="story-section">

            <p>

                ${story.experience}

            </p>

        </div>

        <div class="story-section highlight">

            <h3>

                Why It Matters

            </h3>

            <p>

                ${story.whyItMatters}

            </p>

        </div>

        <div class="story-section">

            <h3>

                Favourite Memory

            </h3>

            <p>

                ${story.favoriteMemory}

            </p>

        </div>

        <div class="story-section">

            <h3>

                Reflection

            </h3>

            <p>

                ${story.reflection}

            </p>

        </div>

    </div>

</section>



    initialiseHeroImage();
    /*
==========================================================
Reveal Animation
==========================================================
*/

function initialiseRevealAnimation(){

    const sections=document.querySelectorAll(
        ".story-section,.detail-card,.collector-reflection"
    );

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            }

        });

    },{

        threshold:.15

    });

    sections.forEach(section=>observer.observe(section));

}

}
/*
==========================================================
Hero Image Transition
==========================================================
*/

function initialiseHeroImage(){

    const image = document.querySelector(".watch-hero-image");

    if(!image) return;

    const hero = image.dataset.hero;

    const front = image.dataset.front;

    const preload = new Image();

    preload.src = front;

    image.addEventListener("mouseenter",()=>{

        image.classList.add("fade-out");

        setTimeout(()=>{

            image.src = front;

            image.classList.remove("fade-out");

            image.classList.add("fade-in");

        },200);

    });

    image.addEventListener("mouseleave",()=>{

        image.classList.add("fade-out");

        setTimeout(()=>{

            image.src = hero;

            image.classList.remove("fade-out");

            image.classList.add("fade-in");

        },200);

    });

    image.addEventListener("transitionend",()=>{

        image.classList.remove("fade-in");

    });

    /*
==========================================================
Reveal Animation
==========================================================
*/

function initialiseRevealAnimation(){

    const sections=document.querySelectorAll(
        ".story-section,.detail-card,.collector-reflection"
    );

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            }

        });

    },{

        threshold:.15

    });

    sections.forEach(section=>observer.observe(section));

}

}
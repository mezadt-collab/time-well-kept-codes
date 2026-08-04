/*
==========================================================
TIME WELL KEPT
Watch Page
Museum Edition v4
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
        initialiseHeroImage();
        initialiseRevealAnimation();
    }
    catch (error) {
        console.error(error);
        showError("Unable to load chapter.");
    }
}

/*
==========================================================
Helpers
==========================================================
*/

function previousChapter() {
    if (currentIndex <= 0) return null;
    return timeline[currentIndex - 1];
}

function nextChapter() {
    if (currentIndex >= timeline.length - 1) return null;
    return timeline[currentIndex + 1];
}

function heroImage() {
    return `../images/watches/${currentWatch.catalogNumber}/${currentWatch.catalogNumber} hero.jpg`;
}

function frontImage() {
    return `../images/watches/${currentWatch.catalogNumber}/${currentWatch.catalogNumber} front.jpg`;
}

function safeText(value) {
    return value ?? "";
}

function storyParagraphs(story) {
    const parts = [
        story?.opening,
        story?.background,
        story?.acquisition,
        story?.experience,
        story?.whyItMatters,
        story?.favoriteMemory,
        story?.reflection,
    ].filter(Boolean);

    return parts.map(text => `<p>${text}</p>`).join("\n");
}

function detailCard(label, value) {
    if (!value) return "";
    return `
        <div class="detail-card">
            <span>${label}</span>
            <strong>${value}</strong>
        </div>
    `;
}

/*
==========================================================
Loading Screen
==========================================================
*/

function showLoading() {
    const page = document.getElementById("watch-page");
    if (!page) return;

    page.innerHTML = `
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

function showError(message) {
    const page = document.getElementById("watch-page");
    if (!page) return;

    page.innerHTML = `
        <section class="watch-error">
            <div class="watch-container">
                <h2>${message}</h2>
            </div>
        </section>
    `;
}

/*
==========================================================
Render Chapter
==========================================================
*/

function renderWatch() {
    const page = document.getElementById("watch-page");
    if (!page || !currentWatch) return;

    const watch = currentWatch;
    const story = watch.story || {};
    const plaque = watch.museumPlaque || {};
    const tech = watch.technicalSpecifications || {};
    const acquisition = watch.acquisition || {};
    const notes = watch.collectionNotes || {};
    const ownership = watch.ownership || {};

    const previous = previousChapter();
    const next = nextChapter();

    const detailsHtml = [
        detailCard("Brand", safeText(watch.identity?.brand)),
        detailCard("Collection", safeText(watch.identity?.collection)),
        detailCard("Reference", safeText(watch.identity?.reference)),
        detailCard("Movement", safeText(tech.movement)),
        detailCard("Case Diameter", safeText(tech.caseDiameter)),
        detailCard("Case Material", safeText(tech.caseMaterial)),
        detailCard("Crystal", safeText(tech.crystal)),
        detailCard("Dial", safeText(tech.dialColor)),
        detailCard("Bezel", safeText(tech.bezel)),
        detailCard("Original Strap", safeText(tech.originalStrap)),
        detailCard("Current Strap", safeText(tech.currentStrap)),
        detailCard("Lug Width", safeText(tech.lugWidth)),
        detailCard("Water Resistance", safeText(tech.waterResistance)),
        detailCard("Acquired", safeText(acquisition.year)),
        detailCard("Occasion", safeText(acquisition.occasion || acquisition.type)),
        detailCard("Purchased At", safeText(acquisition.purchaseLocation)),
        detailCard("Country", safeText(acquisition.country)),
        detailCard("Current Condition", safeText(notes.currentCondition)),
        detailCard("Daily Wear", safeText(notes.dailyWear)),
        detailCard("Ownership", safeText(ownership.ownershipStatus)),
        detailCard("Future", safeText(ownership.futureDisposition)),
    ].filter(Boolean).join("\n");

    page.innerHTML = `
        <section class="watch-hero">
            <div class="watch-container">
                <span class="catalog-number">${safeText(watch.catalogNumber)}</span>
                <h1>${safeText(watch.identity?.displayName)}</h1>
                <div class="watch-year">${safeText(acquisition.year)}</div>
                <h2>${safeText(watch.chapter?.title)}</h2>

                <img
                    class="watch-hero-image"
                    src="${heroImage()}"
                    data-hero="${heroImage()}"
                    data-front="${frontImage()}"
                    alt="${safeText(watch.identity?.displayName)}"
                >

                ${plaque.caption ? `<blockquote class="museum-caption">“${plaque.caption}”</blockquote>` : ""}
            </div>
        </section>

        <section class="watch-story">
            <div class="watch-container">
                ${storyParagraphs(story)}
            </div>
        </section>

        <section class="watch-details">
            <div class="watch-container">
                <h2 class="section-title">Museum Plaque</h2>
                <div class="plaque-heading">
                    ${plaque.displayName ? `<h3>${plaque.displayName}</h3>` : ""}
                    ${plaque.milestone ? `<p class="plaque-milestone">${plaque.milestone}</p>` : ""}
                </div>
                ${plaque.caption ? `<p class="plaque-caption">${plaque.caption}</p>` : ""}
                <div class="detail-grid">
                    ${detailsHtml}
                </div>
            </div>
        </section>

        ${story.collectorReflection ? `
        <section class="collector-reflection">
            <div class="watch-container">
                <h2 class="section-title">Collector’s Reflection</h2>
                <blockquote class="reflection-quote">${story.collectorReflection}</blockquote>
            </div>
        </section>
        ` : ""}

        <section class="chapter-navigation">
            <div class="watch-container nav-grid">
                <div class="previous-chapter">
                    ${previous ? `<a href="watch.html?id=${previous.catalogNumber}">← ${previous.identity?.displayName || previous.catalogNumber}</a>` : ""}
                </div>
                <div class="next-chapter">
                    ${next ? `<a href="watch.html?id=${next.catalogNumber}">${next.identity?.displayName || next.catalogNumber} →</a>` : ""}
                </div>
            </div>
        </section>
    `;
}

/*
==========================================================
Hero Image Transition
==========================================================
*/

function initialiseHeroImage() {
    const image = document.querySelector(".watch-hero-image");
    if (!image) return;

    const hero = image.dataset.hero;
    const front = image.dataset.front;

    const preload = new Image();
    preload.src = front;

    image.addEventListener("mouseenter", () => {
        image.classList.add("fade-out");
        setTimeout(() => {
            image.src = front;
            image.classList.remove("fade-out");
            image.classList.add("fade-in");
        }, 200);
    });

    image.addEventListener("mouseleave", () => {
        image.classList.add("fade-out");
        setTimeout(() => {
            image.src = hero;
            image.classList.remove("fade-out");
            image.classList.add("fade-in");
        }, 200);
    });

    image.addEventListener("transitionend", () => {
        image.classList.remove("fade-in");
    });
}

/*
==========================================================
Reveal Animation
==========================================================
*/

function initialiseRevealAnimation() {
    const sections = document.querySelectorAll(
        ".story-section,.detail-card,.collector-reflection,.plaque-heading,.plaque-caption"
    );

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(section => observer.observe(section));
}

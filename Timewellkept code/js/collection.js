/*
==========================================================
TIME WELL KEPT
Collection
==========================================================
*/

async function renderCollection() {

    const container = document.getElementById("collection-grid");

    if (!container) return;

    const watches = await TimeWellKept.getAllWatches();

    container.innerHTML = "";

    watches.forEach((watch, index) => {

        const exhibit = document.createElement("article");

        exhibit.className = "collection-item";

        if (index % 2 !== 0) {
            exhibit.classList.add("reverse");
        }

      
        const heroImage = `images/watches/${watch.catalogNumber}/${watch.catalogNumber} hero.jpg`;

        const frontImage = `images/watches/${watch.catalogNumber}/${watch.catalogNumber} front.jpg`;

        console.log(heroImage);
console.log(frontImage);

        const preview =
            watch.story.preview ||
            watch.story.summary ||
            "";

        exhibit.innerHTML = `

    <div class="collection-image">

    <img
        class="front-image"
        src="${frontImage}"
        alt="${watch.identity.displayName}"
        loading="lazy"
        onerror="this.style.display='none';"
    >

    <img
        class="hero-image"
        src="${heroImage}"
        alt="${watch.identity.displayName}"
        loading="lazy"
    >

</div>

    <div class="collection-content">

        <span class="catalog-number">
            ${watch.catalogNumber}
        </span>

        <h3>
            ${watch.identity.displayName}
        </h3>

        <h4>
            ${watch.chapter.title}
        </h4>

        ${preview ? `<p>${preview}</p>` : ""}

        <a
            href="pages/watch.html?id=${watch.catalogNumber}"
            class="read-story"
        >
            Explore This Chapter →
        </a>

    </div>

`;
        container.appendChild(exhibit);

    });
    

}


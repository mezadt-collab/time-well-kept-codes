/*
==========================================================
TIME WELL KEPT
Timeline
==========================================================
*/

async function renderTimeline() {

    const container = document.getElementById("timeline-list");

    if (!container) return;

    const watches = await TimeWellKept.getTimeline();

    container.innerHTML = "";

    // Group watches by acquisition year
    const grouped = {};

    watches.forEach(watch => {

        const year = watch.acquisition.year;

        if (!grouped[year]) {

            grouped[year] = [];

        }

        grouped[year].push(watch);

    });

    Object.keys(grouped).forEach(year => {

        const yearSection = document.createElement("div");

        yearSection.className = "timeline-year-group";

        yearSection.innerHTML = `

            <div class="timeline-year-heading">

                ${year}

            </div>

        `;

        grouped[year].forEach(watch => {

            const article = document.createElement("article");

            article.className = "timeline-item";

            article.innerHTML = `

                <div class="timeline-marker"></div>

                <div class="timeline-content">

                    <div class="timeline-number">

                        ${watch.catalogNumber}

                    </div>

                    <h3>

                        ${watch.identity.displayName}

                    </h3>

                    <p>

                        ${watch.chapter.title}

                    </p>

                </div>

            `;

            yearSection.appendChild(article);

        });

        container.appendChild(yearSection);

    });

}
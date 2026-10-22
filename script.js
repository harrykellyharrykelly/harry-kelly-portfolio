// The video player stays hidden until a user selects a project.
document.getElementById("videoModal").hidden = true;


const videoModal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const videoModalTitle = document.getElementById("videoModalTitle");
const videoClose = document.getElementById("videoClose");

let previousFocus = null;

function openVideo(button) {
    previousFocus = document.activeElement;

    videoPlayer.src = button.dataset.video;
    document.querySelector(".video-frame").classList.toggle(
    "vertical",
    button.closest(".shortform-project") !== null
);
    videoModalTitle.textContent = button.dataset.title || "Video";

    videoModal.hidden = false;
    videoModal.classList.add("active");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    videoClose.focus();
}

function closeVideo() {
    videoModal.classList.remove("active");
    videoModal.hidden = true;
    videoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    // Stop playback when the modal closes
    videoPlayer.src = "";
    document.querySelector(".video-frame").classList.remove("vertical");

    if (previousFocus) {
        previousFocus.focus();
    }
}

document.querySelectorAll(".video-trigger").forEach(button => {
    button.addEventListener("click", () => openVideo(button));
});

videoClose.addEventListener("click", closeVideo);

videoModal.addEventListener("click", event => {
    if (event.target === videoModal) {
        closeVideo();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" &&
        videoModal.classList.contains("active")) {
        closeVideo();
    }
});


// =========================
// PORTFOLIO CATEGORY FILTERS
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioProjects = document.querySelectorAll(
    ".projects .project"
);

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        // Switch to three columns for Short-Form only
        const projectsGrid = document.querySelector(".projects");

        projectsGrid.classList.toggle(
            "shortform-grid",
            selectedCategory === "shortform"
        );


        // Update active filter button
        filterButtons.forEach(btn => {
            const isActive = btn === button;

            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
        });

        // Show matching projects
        portfolioProjects.forEach(project => {
            const show =
                selectedCategory === "all" ||
                project.dataset.category === selectedCategory;

            project.classList.toggle("is-hidden", !show);
        });
    });
});

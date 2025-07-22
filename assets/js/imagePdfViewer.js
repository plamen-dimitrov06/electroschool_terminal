const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function initImagePdfViewer(config) {
    const {
        documentId,
        totalPages,
        containerId = "viewer",
        pathTemplate,
        prevBtnId = "prevBtn",
        nextBtnId = "nextBtn"
    } = config;

    let currentPage = 1;

    const viewer = document.getElementById(containerId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!documentId || !viewer || !prevBtn || !nextBtn || typeof pathTemplate !== "function") {
        console.error("initImagePdfViewer: Missing required DOM elements or config.");
        return;
    }

    // Public navigation functions
    function updatePage() {
        viewer.src = pathTemplate(documentId, currentPage);
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    }

    // Check if image exists
    function imageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    // Event listeners
    prevBtn.addEventListener("click", prevPage);
    nextBtn.addEventListener("click", nextPage);

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") nextPage();
        if (e.key === "ArrowLeft") prevPage();
    });

    updatePage();
}

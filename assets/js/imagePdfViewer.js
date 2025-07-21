const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function initImagePdfViewer(config) {
    const {
        documentId,
        containerId = "viewer",
        pathTemplate,
        prevBtnId = "prevBtn",
        nextBtnId = "nextBtn",
        onReady = () => {}
    } = config;

    let currentPage = 1;
    let totalPages = 0;

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
    
    // Get total pages count
    async function getTotalPages(pageKey, timeKey) {
        const cachedCount = localStorage.getItem(pageKey);
        const cachedTime = localStorage.getItem(timeKey);
        const now = Date.now();

        // Check if cache is valid and return
        if (cachedCount && cachedTime) {
            const age = now - parseInt(cachedTime, 10);
            if (age < CACHE_TTL_MS) {
                return parseInt(cachedCount, 10);
            }
        }

        // Count pages
        let count = 1;
        while (true) {
            const exists = await imageExists(pathTemplate(documentId, count));
            if (!exists) break;
            count++;
        }

        // Store in cache for 24 hours
        localStorage.setItem(pageKey, count - 1);
        localStorage.setItem(timeKey, now.toString());

        return count - 1;
    }

    // Init viewer
    (async function () {
        totalPages = await getTotalPages(`pages_${documentId}`, `time_${documentId}`);
        updatePage();
        onReady(totalPages);
    })();

    // Event listeners
    prevBtn.addEventListener("click", prevPage);
    nextBtn.addEventListener("click", nextPage);

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") nextPage();
        if (e.key === "ArrowLeft") prevPage();
    });
}

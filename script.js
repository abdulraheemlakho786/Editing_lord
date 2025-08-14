// Clear localStorage on first load in a session
window.addEventListener("load", () => {
    if (!sessionStorage.getItem("sessionInitialized")) {
        localStorage.clear();
        sessionStorage.setItem("sessionInitialized", "true");
    }

    // Check subscription status and update button
    const subscribed = localStorage.getItem("subscribed");
    if (subscribed === "true") {
        showDownloadButton();
    }
});

// Handle subscription
function handleSubscription() {
    localStorage.setItem("subscribed", "true");
}

// Show download button
function showDownloadButton() {
    const buttonContainer = document.getElementById("button-container");
    const downloadLink = "https://drive.google.com/file/d/1-28iI-9fNGwTrfIgu030G3kSiKOD-Jt2/view?usp=drivesdk";
    buttonContainer.innerHTML = `
        <a href="${downloadLink}" class="btn" target="_blank">Download</a>
        <button class="btn" onclick="copyToClipboard('${downloadLink}')">Copy Link</button>
    `;
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const copyButton = document.querySelector("#button-container button");
        copyButton.textContent = "Copied!";
        setTimeout(() => {
            copyButton.textContent = "Copy Link";
        }, 2000);
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

// Detect if the user returns after subscribing
document.addEventListener("visibilitychange", () => {
    if (
        document.visibilityState === "visible" &&
        localStorage.getItem("subscribed") === "true"
    ) {
        showDownloadButton();
    }
});

// Handle link opening for the first time
function handleFirstTimeOpen() {
    if (!localStorage.getItem("firstTimeOpened")) {
        localStorage.setItem("firstTimeOpened", "true");
    }
}

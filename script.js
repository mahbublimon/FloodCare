document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => document.getElementById("navbar-placeholder").innerHTML = data)
        .then(() => addLanguageToggleFunctionality());

    // Load Footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-placeholder").innerHTML = data);
});

function addLanguageToggleFunctionality() {
    const switchButton = document.getElementById("languageSwitch");

    switchButton.addEventListener("change", function () {
        if (this.checked) {
            translateToEnglish();
        } else {
            translateToBangla();
        }
    });
}

function translateToBangla() {
    document.body.classList.add("bangla-text");

    // Example: Replacing text manually (can be replaced with an API)
    document.querySelectorAll(".nav-link").forEach(el => {
        if (el.textContent.trim() === "Home") el.textContent = "হোম";
        if (el.textContent.trim() === "About") el.textContent = "সম্পর্কে";
        if (el.textContent.trim() === "Relief & Support") el.textContent = "ত্রাণ ও সহায়তা";
        if (el.textContent.trim() === "Flood Information") el.textContent = "বন্যা তথ্য";
        if (el.textContent.trim() === "News") el.textContent = "সংবাদ";
        if (el.textContent.trim() === "Contact") el.textContent = "যোগাযোগ";
    });
}

function translateToEnglish() {
    document.body.classList.remove("bangla-text");

    // Revert back to English
    document.querySelectorAll(".nav-link").forEach(el => {
        if (el.textContent.trim() === "হোম") el.textContent = "Home";
        if (el.textContent.trim() === "সম্পর্কে") el.textContent = "About";
        if (el.textContent.trim() === "ত্রাণ ও সহায়তা") el.textContent = "Relief & Support";
        if (el.textContent.trim() === "বন্যা তথ্য") el.textContent = "Flood Information";
        if (el.textContent.trim() === "সংবাদ") el.textContent = "News";
        if (el.textContent.trim() === "যোগাযোগ") el.textContent = "Contact";
    });
}
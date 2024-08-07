function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = window.location.href.split('#')[0]; // Base URL without hash
    const currentHash = window.location.hash; // Current hash if any

    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburgerLinks = document.querySelectorAll('.menu-links a');

    // Function to check if a link should be active
    function setActiveLink(links) {
        links.forEach((link) => {
            const linkUrl = link.href.split('#')[0]; // Base URL without hash
            const linkText = link.textContent.toLowerCase(); // Get link text

            // Exclude About page link
            if (linkText === 'about') return;

            if (linkUrl === currentUrl && (link.hash === currentHash || link.hash === '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveLink(navLinks);
    setActiveLink(hamburgerLinks);
});
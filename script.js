document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('shown');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Smooth scroll for navigation links (Enhanced)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById("contactModal");
    const btns = document.querySelectorAll(".btn-primary"); // Assuming "Contáctame" buttons share this class or we target specific one
    // Specifically target the "Contáctame" button in hero, or all contact buttons
    const contactBtns = document.querySelectorAll('a[href^="mailto:"], .btn-primary');

    const closeBtn = document.querySelector(".close-btn");

    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default mailto behavior if we want to show modal instead
            modal.style.display = "flex";
        });
    });

    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

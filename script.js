// JOY DIGITAL - Main Script
document.addEventListener('DOMContentLoaded', () => {
    // 1. Explicitly ensure portfolio section is hidden if present
    const hidePortfolio = () => {
        const portfolioElements = document.querySelectorAll('#portfolio, .portfolio, .portfolio-section, a[href="#portfolio"]');
        portfolioElements.forEach(el => {
            el.style.display = 'none';
            el.setAttribute('aria-hidden', 'true');
        });
    };
    hidePortfolio();

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. Toast Notification Helper
    const showToast = (message, iconClass = 'fa-solid fa-circle-check') => {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    // 4. Copy Address Button
    const copyBtns = document.querySelectorAll('.copy-address-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const address = btn.getAttribute('data-address') || "3/769, Kalaivanar 1St street, Koodal nagar, Madurai 625018";
            navigator.clipboard.writeText(address).then(() => {
                showToast('Address copied to clipboard!');
            }).catch(() => {
                showToast('Failed to copy address', 'fa-solid fa-triangle-exclamation');
            });
        });
    });

    // 5. Contact Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;

            if (formStatus) {
                formStatus.style.color = '#2563eb';
                formStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting your inquiry...';
            }

            setTimeout(() => {
                if (formStatus) {
                    formStatus.style.color = '#16a34a';
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you, ' + name + '! Your inquiry has been sent. We will contact you at ' + phone + ' shortly.';
                }
                showToast('Inquiry submitted successfully!');
                contactForm.reset();
            }, 1000);
        });
    }

    // 6. Active nav link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
});

/* ==========================================================================
   Joy Digital Growth Agency - Client-Side Controller
   Author: Antigravity AI
   Target: Form Validation, Portfolio Filtering & FAQ Accordion
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. Sticky Header Transformation on Scroll
       ========================================================================== */
    const siteHeader = document.getElementById("site-header");
    
    const handleScrollHeader = () => {
        if (window.scrollY > 50) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleScrollHeader);
    handleScrollHeader(); // Trigger on load in case of page refresh mid-page

    /* ==========================================================================
       2. Interactive Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");
    let menuBackdrop = null;

    const openMobileMenu = () => {
        mobileMenuToggle.classList.add("active");
        mobileMenuToggle.setAttribute("aria-expanded", "true");
        mobileMenuDrawer.classList.add("open");
        
        // Create backdrop overlay
        menuBackdrop = document.createElement("div");
        menuBackdrop.className = "drawer-backdrop";
        document.body.appendChild(menuBackdrop);
        document.body.style.overflow = "hidden"; // Disable scroll when menu is active
        
        menuBackdrop.addEventListener("click", closeMobileMenu);
    };

    const closeMobileMenu = () => {
        mobileMenuToggle.classList.remove("active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        mobileMenuDrawer.classList.remove("open");
        
        if (menuBackdrop) {
            menuBackdrop.remove();
            menuBackdrop = null;
        }
        document.body.style.overflow = ""; // Restore scrolling
    };

    mobileMenuToggle.addEventListener("click", () => {
        const isOpen = mobileMenuDrawer.classList.contains("open");
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    /* ==========================================================================
       3. ScrollSpy - Active Navigation Link Tracking
       ========================================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const scrollSpyActiveLink = () => {
        const scrollPosition = window.scrollY + 120; // Eye-line offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", scrollSpyActiveLink);

    /* ==========================================================================
       4. FAQ Accordion Component Toggle
       ========================================================================== */
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question-btn");
        const answerPane = item.querySelector(".faq-answer-pane");

        questionBtn.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            // Close all other FAQ items for a clean accordion effect
            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");
                otherItem.querySelector(".faq-question-btn").setAttribute("aria-expanded", "false");
                otherItem.querySelector(".faq-answer-pane").style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add("active");
                questionBtn.setAttribute("aria-expanded", "true");
                answerPane.style.maxHeight = answerPane.scrollHeight + "px"; // Expand based on content height
            }
        });
    });

    /* ==========================================================================
       5. Portfolio Filtering Logic
       ========================================================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Toggle active filter button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            portfolioCards.forEach(card => {
                card.classList.remove("show");
                card.classList.add("hide");

                if (filterValue === "all" || card.classList.contains(filterValue)) {
                    card.classList.remove("hide");
                    card.classList.add("show");
                }
            });
        });
    });

    /* ==========================================================================
       6. Preselect Service in Enquiry Form
       ========================================================================== */
    window.preselectService = (serviceName) => {
        const serviceSelect = document.getElementById("service_required");
        if (serviceSelect) {
            serviceSelect.value = serviceName;
            // Clear validation error on change
            const parentGroup = serviceSelect.closest(".form-group");
            if (parentGroup) {
                parentGroup.classList.remove("invalid");
            }
        }
    };

    /* ==========================================================================
       7. Form Validation & AJAX Submission (FormSubmit.co)
       ========================================================================== */
    const enquiryForm = document.getElementById("enquiry-form");
    const submitBtn = document.getElementById("submit-btn");
    const submitText = submitBtn.querySelector(".submit-text");
    const submitLoader = submitBtn.querySelector(".submit-loader");
    
    const userName = document.getElementById("user_name");
    const userMobile = document.getElementById("user_mobile");
    const userEmail = document.getElementById("user_email");
    const serviceRequired = document.getElementById("service_required");
    const userMessage = document.getElementById("user_message");

    const addInputListener = (inputElement) => {
        const parent = inputElement.closest(".form-group");
        const triggerEvent = inputElement.tagName === "SELECT" ? "change" : "input";
        
        inputElement.addEventListener(triggerEvent, () => {
            parent.classList.remove("invalid");
        });
    };

    [userName, userMobile, userEmail, serviceRequired, userMessage].forEach(addInputListener);

    const validateForm = () => {
        let isFormValid = true;
        let firstInvalidField = null;

        const setInvalid = (inputElement) => {
            const parent = inputElement.closest(".form-group");
            parent.classList.add("invalid");
            isFormValid = false;
            if (!firstInvalidField) {
                firstInvalidField = inputElement;
            }
        };

        // 1. Name validation
        if (userName.value.trim() === "") {
            setInvalid(userName);
        }

        // 2. Mobile validation (10-digit indian numbers)
        const mobileReg = /^[6-9]\d{9}$/;
        if (!mobileReg.test(userMobile.value.trim())) {
            setInvalid(userMobile);
        }

        // 3. Email validation
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailReg.test(userEmail.value.trim())) {
            setInvalid(userEmail);
        }

        // 4. Service validation
        if (serviceRequired.value === "") {
            setInvalid(serviceRequired);
        }

        // 5. Message validation
        if (userMessage.value.trim() === "") {
            setInvalid(userMessage);
        }

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return isFormValid;
    };

    const successModalOverlay = document.getElementById("success-modal-overlay");
    const successModalCloseBtn = document.getElementById("success-modal-close");

    const openSuccessModal = () => {
        successModalOverlay.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    };

    const closeSuccessModal = () => {
        successModalOverlay.classList.add("hidden");
        document.body.style.overflow = ""; // Restore scrolling
    };

    successModalCloseBtn.addEventListener("click", closeSuccessModal);
    
    successModalOverlay.addEventListener("click", (e) => {
        if (e.target === successModalOverlay) {
            closeSuccessModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !successModalOverlay.classList.contains("hidden")) {
            closeSuccessModal();
        }
    });

    enquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        submitBtn.disabled = true;
        submitText.classList.add("hidden");
        submitLoader.classList.remove("hidden");

        const payload = {
            Name: userName.value.trim(),
            Mobile: userMobile.value.trim(),
            Email: userEmail.value.trim(),
            Service: serviceRequired.value,
            Message: userMessage.value.trim(),
            _subject: "New Web Lead - Joy Digital Growth Agency",
            _captcha: "false",
            _template: "table"
        };

        fetch("https://formsubmit.co/ajax/joydiigtals@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Form submission network error");
            }
            return response.json();
        })
        .then(data => {
            console.log("Lead dispatched via FormSubmit.co:", data);
            handleSubmissionSuccess();
        })
        .catch(error => {
            console.error("Failed to send lead payload:", error);
            alert("Oops! Lead delivery failed. Please check your connectivity or mail us at joydiigtals@gmail.com.");
            restoreSubmitButtonState();
        });

        const handleSubmissionSuccess = () => {
            enquiryForm.reset();
            openSuccessModal();
            restoreSubmitButtonState();
        };

        const restoreSubmitButtonState = () => {
            submitBtn.disabled = false;
            submitText.classList.remove("hidden");
            submitLoader.classList.add("hidden");
        };
    });

});

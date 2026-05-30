/* ==========================================================================
   Joy Digital Marketing - Brand Interactive Controller
   Author: Antigravity AI
   Target: Form Validation, Active Tracking & FormSubmit.co Live Delivery
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
    handleScrollHeader(); // Trigger once on load in case page is refreshed halfway down

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
        
        // Create glass blur backdrop
        menuBackdrop = document.createElement("div");
        menuBackdrop.className = "drawer-backdrop";
        document.body.appendChild(menuBackdrop);
        document.body.style.overflow = "hidden"; // Prevent scrolling
        
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
        document.body.style.overflow = ""; // Re-enable scrolling
    };

    mobileMenuToggle.addEventListener("click", () => {
        const isOpen = mobileMenuDrawer.classList.contains("open");
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close mobile menu when clicking any nav link
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
        const scrollPosition = window.scrollY + 120; // Offset for header height and user eye focus

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
       4. Preselect Service in Enquiry Form
       ========================================================================== */
    window.preselectService = (serviceName) => {
        const serviceSelect = document.getElementById("service_required");
        if (serviceSelect) {
            serviceSelect.value = serviceName;
            // Clear any lingering select validation errors
            const parentGroup = serviceSelect.closest(".form-group");
            if (parentGroup) {
                parentGroup.classList.remove("invalid");
            }
        }
    };

    /* ==========================================================================
       5. Robust Form Validation & FormSubmit.co Live Delivery
       ========================================================================== */
    const enquiryForm = document.getElementById("enquiry-form");
    const submitBtn = document.getElementById("submit-btn");
    const submitText = submitBtn.querySelector(".submit-text");
    const submitLoader = submitBtn.querySelector(".submit-loader");
    
    // Form Input References
    const userName = document.getElementById("user_name");
    const userMobile = document.getElementById("user_mobile");
    const userEmail = document.getElementById("user_email");
    const serviceRequired = document.getElementById("service_required");
    const userMessage = document.getElementById("user_message");

    // Real-time error removal when user starts typing / editing
    const addInputListener = (inputElement) => {
        const parent = inputElement.closest(".form-group");
        const triggerEvent = inputElement.tagName === "SELECT" ? "change" : "input";
        
        inputElement.addEventListener(triggerEvent, () => {
            parent.classList.remove("invalid");
        });
    };

    [userName, userMobile, userEmail, serviceRequired, userMessage].forEach(addInputListener);

    // Validation checks
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

        // 1. Name Check
        if (userName.value.trim() === "") {
            setInvalid(userName);
        }

        // 2. Mobile Check (10-digit number, starts with 6-9)
        const mobileReg = /^[6-9]\d{9}$/;
        if (!mobileReg.test(userMobile.value.trim())) {
            setInvalid(userMobile);
        }

        // 3. Email Check (valid standard pattern)
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailReg.test(userEmail.value.trim())) {
            setInvalid(userEmail);
        }

        // 4. Service Selection Check
        if (serviceRequired.value === "") {
            setInvalid(serviceRequired);
        }

        // 5. Message Check
        if (userMessage.value.trim() === "") {
            setInvalid(userMessage);
        }

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return isFormValid;
    };

    // Modal success triggers
    const successModalOverlay = document.getElementById("success-modal-overlay");
    const successModalCloseBtn = document.getElementById("success-modal-close");

    const openSuccessModal = () => {
        successModalOverlay.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Freeze scroll under modal
    };

    const closeSuccessModal = () => {
        successModalOverlay.classList.add("hidden");
        document.body.style.overflow = ""; // restore scroll
    };

    successModalCloseBtn.addEventListener("click", closeSuccessModal);
    
    // Close modal clicking overlay backdrop
    successModalOverlay.addEventListener("click", (e) => {
        if (e.target === successModalOverlay) {
            closeSuccessModal();
        }
    });

    // Close modal on Escape Key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !successModalOverlay.classList.contains("hidden")) {
            closeSuccessModal();
        }
    });

    // Handle Form Submit Event via FormSubmit.co (Zero-Configuration Free Routing)
    enquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // 1. Run rigorous validation check
        if (!validateForm()) {
            return; // Halt if validation fails
        }

        // 2. Enter loading state
        submitBtn.disabled = true;
        submitText.classList.add("hidden");
        submitLoader.classList.remove("hidden");

        // 3. Prepare payload for FormSubmit.co JSON API
        const payload = {
            Name: userName.value.trim(),
            Mobile: userMobile.value.trim(),
            Email: userEmail.value.trim(),
            Service: serviceRequired.value,
            Message: userMessage.value.trim(),
            _subject: "New Website Lead - Joy Digital Marketing",
            _captcha: "false", // Disable captcha page for seamless AJAX submit
            _template: "table" // Structured table format in email
        };

        // 4. Send Live AJAX request to FormSubmit.co
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
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("FormSubmit.co send success!", data);
            handleSubmissionSuccess();
        })
        .catch(error => {
            console.error("FormSubmit.co send failed:", error);
            alert("Form submission failed. Please check your internet connection or email us directly at joydiigtals@gmail.com.");
            restoreSubmitButtonState();
        });

        const handleSubmissionSuccess = () => {
            // Reset form input values
            enquiryForm.reset();
            
            // Open the elegant Success feedback Modal
            openSuccessModal();
            
            // Restore button visual state
            restoreSubmitButtonState();
        };

        const restoreSubmitButtonState = () => {
            submitBtn.disabled = false;
            submitText.classList.remove("hidden");
            submitLoader.classList.add("hidden");
        };
    });

});

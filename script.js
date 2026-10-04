document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // SELECTORS
    // ==========================================

    const sections = document.querySelectorAll(
        "#home, #about, #achievements, #Portofolio, #contact"
    );
    const navLinks = document.querySelectorAll("nav a");
    const buttons = document.querySelectorAll(".tab-btn");
    const projects = document.querySelector(".projects");
    const certificates = document.querySelector(".certificates");
    const skills = document.querySelector(".skills");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");
    const popup = document.getElementById("imagePopup");
    const popupImg = document.getElementById("popupImg");
    const closeBtn = document.querySelector(".close");

    // Popup ko <body> me move karo, taaki parent ke transform/AOS/overflow
    // fixed position ko na tode aur overlay poori screen cover kare
    if (popup && popup.parentElement !== document.body) {
        document.body.appendChild(popup);
    }
    const certificateImages =
        document.querySelectorAll(".certificate-card");


    // ==========================================
    // TYPING ANIMATION
    // ==========================================

    if (window.Typed && document.querySelector(".typing")) {

        new Typed(".typing", {

            strings: [
                "Frontend Developer",
                "JavaScript And React.js" ,
                "Tailwind CSS And Github"
            ],

            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1500,
            loop: true

        });

    }


    // ==========================================
    // AOS ANIMATION
    // ==========================================


    AOS.init({

        duration: 900,
        once: false,
        mirror: true,
        offset: 80

    });



    // ==========================================
    // MOBILE NAVBAR
    // ==========================================

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            if (isOpen) {

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-xmark"></i>';

            } else {

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        });


        // Navbar link click
        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            });

        });

    }


    // ==========================================
    // ACTIVE NAVBAR LINK ON SCROLL
    // ==========================================

    const updateActiveLink = () => {

        const scrollPosition =
            window.scrollY + 160;

        let current = "home";


        sections.forEach(section => {

            if (scrollPosition >= section.offsetTop) {

                current = section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.toggle(

                "active",

                link.getAttribute("href") ===
                `#${current}`

            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );


    updateActiveLink();


    // ==========================================
    // PORTFOLIO TABS
    // PROJECT / CERTIFICATE / SKILLS
    // ==========================================

    const showTab = (target) => {

        if (
            !projects ||
            !certificates ||
            !skills
        ) {
            return;
        }


        // Hide everything
        projects.style.display = "none";
        certificates.style.display = "none";
        skills.style.display = "none";


        // Remove active from all buttons
        buttons.forEach(button => {

            button.classList.remove("active");

        });


        // Show selected section
        if (target === "projects") {

            projects.style.display = "block";

        }


        if (target === "certificates") {

            certificates.style.display = "block";

        }


        if (target === "technical-skills") {

            skills.style.display = "block";

        }


        // Active button
        buttons.forEach(button => {

            if (button.dataset.target === target) {

                button.classList.add("active");

            }

        });


        // Refresh AOS
        AOS.refreshHard();

    };


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.target;


            showTab(target);


            // Mobile par portfolio section par le jao
            if (window.innerWidth <= 768) {

                document
                    .querySelector(".portofolio")
                    ?.scrollIntoView({

                        behavior: "smooth",
                        block: "start"

                    });

            }

        });

    });


    // ==========================================
    // CERTIFICATE POPUP
    // ==========================================

    const openPopup = (image) => {

        if (!popup || !popupImg) {
            return;
        }


        popupImg.src = image.src;

        popupImg.alt =
            image.alt || "Certificate Preview";


        popup.classList.add("show");

        popup.setAttribute(
            "aria-hidden",
            "false"
        );


        // Prevent background scrolling
        document.body.classList.add(
            "popup-open"
        );

    };


    const closePopup = () => {

        if (!popup) {
            return;
        }


        popup.classList.remove("show");

        popup.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "popup-open"
        );


        // Clear image after animation
        setTimeout(() => {

            if (
                !popup.classList.contains("show") &&
                popupImg
            ) {

                popupImg.src = "";

            }

        }, 250);

    };


    // Open certificate
    certificateImages.forEach(image => {

        image.addEventListener(
            "click",
            () => {

                openPopup(image);

            }
        );

    });


    // Close button
    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closePopup
        );

    }


    // Click outside image
    if (popup) {

        popup.addEventListener(
            "click",
            event => {

                if (event.target === popup) {

                    closePopup();

                }

            }
        );

    }


    // ==========================================
    // ESC KEY → CLOSE POPUP
    // ==========================================

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closePopup();

            }

        }
    );


    // ==========================================
    // DEFAULT PORTFOLIO TAB
    // PROJECTS ACTIVE
    // ==========================================

    if (projects && certificates && skills) {

        showTab("projects");

    }


    /* ==========================================
   INTERACTIVE STAR PARTICLE BACKGROUND
========================================== */

    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");

    let particles = [];

    let mouse = {
        x: null,
        y: null,
        radius: 140
    };


    /* ==========================================
       CANVAS SIZE
    ========================================== */

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener("resize", () => {

        resizeCanvas();

        createParticles();

    });

    /* ==========================================
       PARTICLE
    ========================================== */

    class Particle {

        constructor() {

            this.x =
                Math.random() * canvas.width;

            this.y =
                Math.random() * canvas.height;

            this.size =
                Math.random() * 1.8 + 0.4;

            this.baseSize = this.size;

            this.speedX =
                (Math.random() - 0.5) * 0.25;

            this.speedY =
                (Math.random() - 0.5) * 0.25;

            this.opacity =
                Math.random() * 0.7 + 0.2;

            this.twinkle =
                Math.random() * 0.03 + 0.01;

            this.angle =
                Math.random() * Math.PI * 2;

            this.color =
                Math.random() > 0.5
                    ? "56,189,248"
                    : "139,92,246";

        }


        update() {

            /* Normal slow movement */

            this.x += this.speedX;
            this.y += this.speedY;


            /* ==================================
               CURSOR INTERACTION
            ================================== */

            if (
                mouse.x !== null &&
                mouse.y !== null
            ) {

                const dx =
                    mouse.x - this.x;

                const dy =
                    mouse.y - this.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < mouse.radius) {

                    const force =
                        (mouse.radius - distance) /
                        mouse.radius;

                    /*
                     * Stars cursor ki taraf flow
                     */

                    this.x +=
                        dx * force * 0.035;

                    this.y +=
                        dy * force * 0.035;


                    /*
                     * Cursor ke paas particle bada
                     */

                    this.size =
                        this.baseSize +
                        force * 2.5;

                } else {

                    this.size =
                        this.baseSize;

                }

            }


            /* ==================================
               SCREEN WRAP
            ================================== */

            if (this.x < 0)
                this.x = canvas.width;

            if (this.x > canvas.width)
                this.x = 0;

            if (this.y < 0)
                this.y = canvas.height;

            if (this.y > canvas.height)
                this.y = 0;


            /* ==================================
               TWINKLE
            ================================== */

            this.opacity +=
                this.twinkle *
                (Math.random() > 0.5 ? 1 : -1);


            if (this.opacity > 1)
                this.opacity = 1;

            if (this.opacity < 0.15)
                this.opacity = 0.15;

        }


        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(${this.color},${this.opacity})`;


            ctx.shadowBlur =
                mouse.x !== null ? 8 : 4;

            ctx.shadowColor =
                `rgba(${this.color},0.8)`;


            ctx.fill();

            ctx.shadowBlur = 0;

        }

    }


    /* ==========================================
       CREATE PARTICLES
    ========================================== */

    function createParticles() {

        particles = [];

        /*
         * Screen size ke according
         * particles count
         */

        const particleCount =
            window.innerWidth < 600
                ? 70
                : 150;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push(
                new Particle()
            );

        }

    }


    /* ==========================================
       CONNECT PARTICLES NEAR CURSOR
    ========================================== */

    function connectParticles() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {
            return;
        }


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            const p = particles[i];

            const dx =
                mouse.x - p.x;

            const dy =
                mouse.y - p.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 120) {

                const opacity =
                    (1 - distance / 120) * 0.35;


                ctx.beginPath();

                ctx.moveTo(
                    p.x,
                    p.y
                );

                ctx.lineTo(
                    mouse.x,
                    mouse.y
                );


                ctx.strokeStyle =
                    `rgba(56,189,248,${opacity})`;

                ctx.lineWidth = 0.5;

                ctx.stroke();

            }

        }

    }


    /* ==========================================
       ANIMATION
    ========================================== */

    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach(particle => {

            particle.update();

            particle.draw();

        });


        connectParticles();


        requestAnimationFrame(
            animateParticles
        );

    }


    /* ==========================================
       START
    ========================================== */

    createParticles();

    animateParticles();
});
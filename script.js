const sections = document.querySelectorAll("#home, #about,#achievements , #Portofolio , #contact");
const navLinks = document.querySelectorAll("nav a");
const buttons = document.querySelectorAll(".tab-btn");
const projects = document.querySelector(".projects");
const certificates = document.querySelector(".certificates");
const skill = document.querySelector(".skills");
const images = document.querySelectorAll(".certificate-card");
const popup = document.getElementById("imagePopup");
const popupImg = document.getElementById("popupImg");
const closeBtn = document.querySelector(".close");



new Typed(".typing", {

    strings: [
        "Frontend Developer",
        "Full Stack Developer",
    ],

    typeSpeed: 70,

    backSpeed: 50,

    backDelay: 1500,

    loop: true

});

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((item) => {
        const top = item.offsetTop - 120;
        const height = item.offsetHeight;

        if (scrollY >= top && scrollY < top + height) {
            current = item.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

AOS.init({
    duration: 1500,
    once: false,
    mirror: true
});


buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        projects.style.display = "none";
        certificates.style.display = "none";
        skill.style.display = "none";

        if (button.dataset.target === "projects") {
            projects.style.display = "block";

            const cards = projects.querySelectorAll(".project-card");

            cards.forEach(card => {
                card.classList.remove("aos-animate");
            });

            setTimeout(() => {
                AOS.refreshHard();

                cards.forEach(card => {
                    card.classList.add("aos-animate");
                });
            }, 100);
        }

        if (button.dataset.target === "certificates") {
            certificates.style.display = "block";

            // AOS animation restart
            const cards = certificates.querySelectorAll(".certificate-card");

            cards.forEach(card => {
                card.classList.remove("aos-animate");
            });

            setTimeout(() => {
                AOS.refreshHard();

                cards.forEach(card => {
                    card.classList.add("aos-animate");
                });
            }, 100);
        }

        if (button.dataset.target === "technical-skills") {
            skill.style.display = "block";

            const cards = skill.querySelectorAll(".skill-card");

            cards.forEach(card => {
                card.classList.remove("aos-animate");
            });

            setTimeout(() => {
                AOS.refreshHard();

                cards.forEach(card => {
                    card.classList.add("aos-animate");
                });
            }, 100);
        }

        AOS.refreshHard();

    });

});



images.forEach(img => {
    img.addEventListener("click", () => {
        popup.style.display = "flex";
        popupImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Click outside image to close
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});
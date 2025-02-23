document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const playButton = document.querySelector(".nav-link[href='#play']");

    function updateActiveNav() {
        let scrollPosition = window.scrollY + 50;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const isPlaySection = section.id === "play";

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove("font-bold", "underline", "text-red-500"));
                
                if (isPlaySection) {
                    playButton.classList.add("font-bold", "underline");
                } else {
                    navLinks[index].classList.add("font-bold", "underline", "text-red-500");
                }
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);
});

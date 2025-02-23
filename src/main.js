document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const playButton = document.querySelector(".nav-link[href='#play']");
    const navActiveStyle = [
        "font-bold",
        "underline",
    ]
    const textRed = "text-red-500"

    function updateActiveNav() {
        let scrollPosition = window.scrollY + 50;
        let navLinksStyle = [...navActiveStyle, textRed];

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const isPlaySection = section.id === "play";

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove(...navLinksStyle));
                
                if (isPlaySection) {
                    playButton.classList.add(...navActiveStyle);
                } else {
                    navLinks[index].classList.add(...navLinksStyle);
                }
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);
});

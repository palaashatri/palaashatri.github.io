// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Current year for footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animation
    const heroTl = gsap.timeline();
    
    // We split lines manually or just fade them sequentially
    // Using autoAlpha ensures visibility is toggled correctly
    heroTl.fromTo(".hero .sub-heading", 
        { y: 30, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(".hero .main-heading", 
        { y: 30, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
        "-=0.7"
    )
    .fromTo(".hero .hero-desc", 
        { y: 30, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
        "-=0.7"
    )
    .fromTo(".scroll-indicator",
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
        "-=0.4"
    );

    // Section Titles text reveal (Apple style scale + fade up)
    const sectionTitles = gsap.utils.toArray(".section-title");
    sectionTitles.forEach((title) => {
        gsap.fromTo(title,
            { y: 50, autoAlpha: 0, scale: 0.95 },
            {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1,
                ease: "power3.out"
            }
        );
    });

    // General Fade Up Elements (paragraphs, timeline items, skills)
    const fadeUpElements = gsap.utils.toArray(".fade-up");
    fadeUpElements.forEach((el) => {
        gsap.fromTo(el,
            { y: 40, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power2.out"
            }
        );
    });

    // Subtle parallax for timeline border transitions
    const timelineItems = gsap.utils.toArray(".timeline-item");
    timelineItems.forEach((item) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 95%",
                end: "bottom center",
                scrub: true
            },
            borderColor: "rgba(255, 255, 255, 0.2)"
        });
    });
});

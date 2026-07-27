"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Project Data
    const projectsData = [
        {
            title: "AI Study Ecosystem",
            techStack: "Python | Flask/Django | MySQL | NLP",
            description: "An AI-based notes generation system that extracts content from PDF documents and generates concise study notes.",
            imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
            codeUrl: "https://github.com/Ganesha2002/AI_Study_EcoSystem"
        },
        {
            title: "Online Voting System",
            techStack: "PHP | MySQL | Bootstrap | HTML/CSS",
            description: "A secure web application built to allow voters to cast their votes online easily with robust backend logic.",
            imageUrl: "https://electionbuddy.com/wp-content/uploads/2022/01/Voting-image-6-scaled.jpg",
            codeUrl: "#"
        },
        {
            title: "Attendance System",
            techStack: "Java | MySQL | HTML/CSS",
            description: "Software designed for educational institutes to help teachers record and track daily student attendance digitally.",
            imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80",
            codeUrl: "#"
        }
    ];

    // Function to generate a single project card
    function generateProjectCard(project) {
        return `
            <div class="project-card">
                <div class="project-img-wrapper">
                    <img src="${project.imageUrl}" alt="${project.title}" class="project-img">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p class="tech-stack">${project.techStack}</p>
                    <p>${project.description}</p>
                    <a href="${project.codeUrl}" class="btn card-btn">View Code</a>
                </div>
            </div>
        `;
    }

    // Function to render all projects
    function renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = projectsData.map(generateProjectCard).join('');
        }
    }

    renderProjects();

    // 2. Dynamic Typing Effect for Hero Section
    const typedTextSpan = document.getElementById('typing-text');
    const roles = ["Web Developer", "MCA Student", "Problem Solver"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            roleIndex++;
            if (roleIndex >= roles.length) roleIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }

    if (roles.length) {
        setTimeout(type, newTextDelay + 250);
    }

    // 3. Scroll Reveal Animation Logic
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    // Initial check to reveal elements in view on page load
    revealOnScroll();

    // 5. Notification Card Logic
    function showNotification(message, isSuccess = true) {
        const notificationCard = document.getElementById('notification-card');
        if (notificationCard) {
            notificationCard.textContent = message;
            notificationCard.style.borderLeftColor = isSuccess ? '#28a745' : '#dc3545'; // Green for success, Red for error
            notificationCard.classList.add('show');

            // Hide the notification after 5 seconds
            setTimeout(() => {
                notificationCard.classList.remove('show');
            }, 5000);
        }
    }

    // 4. Contact Form Submission using EmailJS
    (function() {
        // Initialize EmailJS with your public key
        emailjs.init('G0fw0OzE93aYU7mwY');
    })();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // --- Email to YOU (the owner) ---
            // Replace with your EmailJS Service ID and Notification Template ID
            const serviceID = 'service_duzkr85';
            const notificationTemplateID = 'template_t2x4b35'; 

            emailjs.sendForm(serviceID, notificationTemplateID, this)
                .then(() => {
                    // --- Auto-reply Email to the VISITOR ---
                    // Replace with your Auto-Reply Template ID
                    const autoReplyTemplateID = 'template_mmb64ii';

                    // Gets the visitor's name and email from the form
                    const templateParams = {
                        from_name: this.from_name.value,
                        from_email: this.from_email.value
                    };

                    return emailjs.send(serviceID, autoReplyTemplateID, templateParams);
                })
                .then(() => {
                    showNotification('Thank you! Your message has been sent and you will receive a confirmation email shortly.');
                    contactForm.reset();
                })
                .catch((err) => {
                    console.error('EmailJS send failed:', err);
                    showNotification('Something went wrong. Please try again later.', false);
                })
                .finally(() => {
                    submitBtn.innerText = 'Send Message';
                    submitBtn.disabled = false;
                });
        });
    }
});
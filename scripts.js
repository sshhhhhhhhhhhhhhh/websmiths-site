/*
    Code sample for SITE 1101 Principles of Information Systems 
    (c)2024 by Shahin Alakbarli & Said Bakirov
    DISCLAIMER: All code examples we will look at are quick hacks intended to present working prototypes.
    Hence they do not follow best practice of programming or software engineering.    
*/

const greeting = document.getElementById('dynamic-greeting');
const currentHour = new Date().getHours();

if (currentHour < 12) {
    greeting.textContent = 'Good Morning! Welcome!';
} else if (currentHour < 18) {
    greeting.textContent = 'Good Afternoon! Welcome!';
} else {
    greeting.textContent = 'Good Evening! Welcome!';
}

const greetingElement = document.getElementById('dynamic-greeting');
greetingElement.style.opacity = 0; // start invisible for smooth appearance
greetingElement.style.transform = 'translateY(-20px)'; // position upward initially

setTimeout(() => {
    greetingElement.style.transition = 'all 0.5s ease'; // add a smooth effect
    greetingElement.style.opacity = 1; // make visible
    greetingElement.style.transform = 'translateY(0)'; // reset position
}, 300);

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.transform = 'scale(0.9)'; // shrink header on scroll
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)'; // add shadow for effect
    } else {
        header.style.transform = 'scale(1)'; // reset size when at top
        header.style.boxShadow = 'none'; // remove shadow
    }
});

const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.style.color = '#8a85ff'; // highlight current page link
        link.style.fontWeight = 'bold'; // emphasize with bold font
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const checkpoints = document.querySelectorAll('.checkpoint');
    const eventDescription = document.getElementById('event-description');

    checkpoints.forEach(checkpoint => {
        checkpoint.addEventListener('mouseover', () => {
            const event = checkpoint.getAttribute('data-event'); // get related event info
            eventDescription.style.opacity = '0'; // fade out current text
            setTimeout(() => {
                eventDescription.textContent = event; // set new text
                eventDescription.style.opacity = '1'; // fade in with new text
            }, 300);
        });

        checkpoint.addEventListener('mouseout', () => {
            eventDescription.style.opacity = '0'; // fade out current text
            setTimeout(() => {
                eventDescription.textContent = 'Hover over a checkpoint to see details!'; // reset message
                eventDescription.style.opacity = '1'; // fade back in
            }, 300);
        });
    });
});

/*
    Code sample for SITE 1101 Principles of Information Systems 
    (c)2024 by Araz Nabizde & Shahin Alakbarli
    DISCLAIMER: All code examples we will look at are quick hacks intended to present working prototypes.
    Hence they do not follow best practice of programming or software engineering.    
*/



var socialLinks = document.querySelectorAll('.social-links a');

socialLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.stopPropagation(); // prevent navigation issues by blocking parent clicks
    });
});

var Sahin = document.getElementById("1");
var Araz = document.getElementById("2");
var Said = document.getElementById("3");
var Eli = document.getElementById("4");

var howMuch = {"1": "0px", "2": "-285px", "3": "-570px", "4": "-855px"};

var descriptions = {
    "1": "Hi! I am Shahin, a Computer Engineering student at ADA University, School of IT & Engineering. If you ask why computer engineering, well, I am really passionate about this field. Because I have worked with software and electronics since my childhood, I wanted to select a major that would include both of them. Since I was 6 years old, I have constantly played with electronics and made robotics/maker projects when I have time. During my school years, I participated in the national and international olympiads in informatics, where I won silver and bronze medals from the national olympiad in informatics and an honorable mention from JBOI. Besides, I really love cybersecurity, too. I have several national and international achievements in this field, too. And now here, I work with these very valuable, dear, and skillful people on making a site!",
    "2": "Hello, I'm Araz, and I'm a student of ADA, school of IT. Why IT? Well, I just have an interesting in that field. Why? It stemmed from my obsession with game development. I learned how to program by making games, and game development has been my hobby ever since i was 12. This eventually led me to be interested in programming and, eventually, things like how computers display things on the screen and how networks work. And now I'm here making a website with a bunch of cool dudes.",
    "3": "My first big success was passing the exam for acceptance from FRITL( Which is one of the greatest school in Azerbaijan). My olympiad journey began there. Since 8th grade I participated in national math olympiad and earned medal each year: bronze, bronze, silver, gold respectively. I also participated international olmpiads, such as IMO( International Math olympiad), BMO( Balkan Math Olympiad) and JBMO( Junior Balkan Math Olympiad). And I earned honorable mention from IMO and BMO, silver medal from JBMO. Finally, using this results I was accepted to ADA.",
    "4": "Hi, I’m Ali Hasanli, and I am a student of ADA, School of IT and Engineering, who’s passionate about blending creativity and technology. My journey started with a love for design—turning simple ideas into visuals that tell a story—but along the way, I got curious about the code behind it all. That curiosity led me to explore web development, and now I enjoy bringing designs to life on the screen. Whether I’m crafting graphics, building interactive websites, or experimenting with animations, in my free time, I dive into photography, explore new creative tools, and just enjoy creating things that inspire others."
};

var elements = [Sahin, Araz, Said, Eli];

var currentElement = null;

Sahin.onclick = function(){fn(Sahin);};
Araz.onclick = function(){fn(Araz);};
Said.onclick = function(){fn(Said);};
Eli.onclick = function(){fn(Eli);};

var teamDescription = document.getElementById("description");
var descriptionText = document.getElementById("description-text");

function fn(element) {
    if (currentElement == null) {
        teamDescription.style.animation = "fade-in 2s linear"; // focus on smooth visibility
        teamDescription.style.opacity = "1"; // ensure description is visible
        currentElement = element;
        descriptionText.innerHTML = descriptions[currentElement.id]; // show correct details
        currentElement.style.cursor = "grab"; // make the card draggable (if needed)
        currentElement.style.transform = "translateX(" + howMuch[currentElement.id] + ")";
        currentElement.classList.add("selected"); // highlight current card

        for (var i = 1; i < 5; i++) {
            if (i != currentElement.id) {
                elements[i - 1].style.pointerEvents = "none"; // block clicks on other cards
                elements[i - 1].style.animation = "fade-out 0.3s linear"; // smooth removal
                elements[i - 1].style.opacity = "0"; // visually remove other cards
            }
        }
    } 
    else {
        currentElement.style.transform = "translateX(0px)"; // reset position
        currentElement.classList.remove("selected"); // remove highlight

        for (var i = 1; i < 5; i++) {
            if (i != currentElement.id) {
                elements[i - 1].style.pointerEvents = "auto"; // enable other cards
                elements[i - 1].style.animation = "fade-in 0.3s linear"; // bring cards back
                elements[i - 1].style.opacity = "1"; // restore visibility
            }
        }
        teamDescription.style.animation = "fade-out 0.1s linear"; // hide description
        teamDescription.style.opacity = "0"; // ensure it disappears

        currentElement = null; // reset the active card
    }
}

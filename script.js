const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')


const navLink = document.querySelectorAll('.nav-link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)


const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});


const cards = document.querySelectorAll('.img');

// darknight

const checkbox = document.getElementById('light-checkbox');
const light = document.getElementById('light');

checkbox.addEventListener('click', function() {
  if (checkbox.checked) {
    var root = document.documentElement;
    light.textContent = '🌞';
    root.style.setProperty('--first-color', 'hsl(0, 0%, 83%)');
    root.style.setProperty('--second-color', 'black');
    root.style.setProperty('--third-color', 'white');
    root.style.setProperty('--forth-color', 'blue');
    console.log('Checkbox is checked!');
  } else {
    var root = document.documentElement;
    light.textContent = '🌙';
    root.style.setProperty('--first-color', 'black');
    root.style.setProperty('--second-color', 'hsl(0, 0%, 83%)');
    root.style.setProperty('--third-color', 'black');
    root.style.setProperty('--forth-color', 'blue');
    button.style.backgroundColor = 'black';
  }
});
// typing effect

const words = ["YouTuber.", "Hacker.", "Game Developer.", "Programmer.", "UI_UX Designer."];
    let wordIndex = 0;
    let charIndex = 0;
    const speed = 100; // Adjust typing speed (milliseconds)

    function type() {
      const typingText = document.querySelector(".typing-text");
      typingText.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;

      if (charIndex < words[wordIndex].length) {
        setTimeout(type, speed);
      } else {
        // Move to the next word
        setTimeout(erase, speed * 2);
      }
    }

    function erase() {
      const typingText = document.querySelector(".typing-text");
      typingText.textContent = words[wordIndex].substring(0, charIndex);
      charIndex--;

      if (charIndex >= 0) {
        setTimeout(erase, speed);
      } else {
        // Move to the next word
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, speed);
      }
    }

    type();


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


const navLink = document.querySelectorAll('.nav__link')

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
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
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

let tl = new gsap.timeline({
    scrollTrigger: {
            trigger: ".work",
            start: "top bottom",
            end: "+=700",
            scrub: 1
    },
})


cards.forEach((img) => {
let rotation = Math.floor(Math.random() * 40) - 20;
    positionX = Math.floor(Math.random() * 300) - 150;
    positionY = Math.floor(Math.random() * 300) - 150;

    tl.from(img, {
        rotation: rotation,
        x: positionX,
        y: positionY,
    }, "-=1")
    tl.to(img, {
        backgroundSize: '100%',
    }, .2);
})

const darkModeControl = () => {
    const darkCheck = document.getElementById('night-light-checkbox');
  
    darkCheck.addEventListener('click', () => {
      if (darkCheck.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('animate-css', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.removeItem('animate-css');
      }
    })
  
    if (localStorage.getItem('animate-css')) {
      document.body.className = 'dark';
      darkCheck.checked = true;
    }
  }
  
  export default darkModeControl;


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


function dark(){
    alert("test");
}
const checkbox = document.getElementById('night-light-checkbox');
var stxt = document.getElementById('stxt');
var body = document.body;
const  button = document.querySelectorAll('button');
var social = document.getElementById('home-social-icon');
var h1 =document.h1;
var span = document.getElementsByTagName("span")

checkbox.addEventListener('click', function() {
  if (checkbox.checked) {


    
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    stxt.style.color = 'white';
    social.style.color = 'white';
    span.classList.toggle("red");
    button.style.color = 'black';
    button.style.backgroundColor = 'white';
    span.style.backgroundColor = 'black';

    
    // dark.style.backgroundColor = 'red';

    console.log('Checkbox is checked!');
  } else {
    body.style.backgroundColor = 'white';
    console.log('Checkbox is unchecked!');
    social.style.color = 'black';
    button.style.color = 'white';
    button.style.backgroundColor = 'black';
  }
});
  
  
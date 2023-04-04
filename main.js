@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

:root[data-theme="dark"] {
  background-color: #333;
  color: #fff;
}

:root[data-theme="light"] {
  background-color: #fff;
  color: #333;
}

:root {
  --header-height: 3rem;
  --font-semi: 600;
  --hue-color: 224;
  --first-color: rgb(0, 0, 0);
  --second-color: whitesmoke;
  --body-font: 'Poppins', sans-serif;
  --big-font-size: 2rem;
  --h2-font-size: 1.25rem;
  --normal-font-size: .938rem;
  --smaller-font-size: .75rem;
  --mb-2: 1rem;
  --mb-4: 2rem;
  --mb-5: 2.5rem;
  --mb-6: 3rem;
  --z-back: -10;
  --z-fixed: 100;
}

@media screen and (min-width: 968px) {
  :root {
    --big-font-size: 3.5rem;
    --h2-font-size: 2rem;
    --normal-font-size: 1rem;
    --smaller-font-size: .875rem;
  }

}

*,
::before,
::after {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 22px;
  background: rgb(20, 20, 20);

}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 20px;
  border-radius: 20px;
  background: rgb(255, 255, 255);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: rgb(255, 0, 0);
}

html {
  scroll-behavior: smooth;
  
 
  
}

body {
  margin: var(--header-height) 0 0 0;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  color: var(--first-color);
  
}

h1,


h2,
p {
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.section-title {
  position: relative;
  font-size: var(--h2-font-size);
  color: var(--first-color);
  margin-top: var(--mb-2);
  margin-bottom: var(--mb-4);
  text-align: center;
}

.section-title::after {
  position: absolute;
  content: '';
  width: 64px;
  height: 0.18rem;
  left: 0;
  right: 0;
  margin: auto;
  top: 2rem;
  background-color: var(--secod-color);
}

.section {
  padding-top: 3rem;
  padding-bottom: 2rem;
}


.bd-grid {
  max-width: 1024px;
  display: grid;
  margin-left: var(--mb-2);
  margin-right: var(--mb-2);
}

.l-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;

  z-index: var(--z-fixed);
  background-color: rgb(255, 255, 255);
  color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.nav {
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: var(--font-semi);

}

@media screen and (max-width: 767px) {
  .nav-menu {
    position: fixed;
    top: var(--header-height);
    right: -100%;
    width: 80%;
    height: 100%;
    padding: 2rem;

    transition: .5s;
  }

  .static-txt {
    margin-top: 20px;
  }

  .dynamic-txts li span::after {

    background: #000000;
    margin-top: 20px;
    border-left: 2px solid #000000;

  }
}

.nav-item {
  margin-bottom: var(--mb-4);

}

.nav-item:hover {
  display: inline-block;
  animation: headShake;
  animation-duration: 3s;
}

.nav-link {
  position: relative;
  color: rgb(255, 255, 255);
}

.nav-link:hover {
  position: relative;
}

.nav-link:hover::after {
  left: 0;
  top: 2rem;
  background-color: rgb(255, 255, 255);

}

.nav-logo:hover {
  cursor: grab;
  margin: 0 0.5rem;
  animation: hinge;
  animation-duration: 10s;
}

.nav-logo {
  height: 50px;
}

.nav-toggle {
  color: rgb(231, 13, 13);
  font-size: 1.5rem;
  cursor: pointer;
}

.active::after {
  position: absolute;
  content: '';
  width: 100%;
  height: 0.18rem;
  left: 0;
  top: 2rem;
  background-color: var(--second-color);
}

.show {
  right: 0;
}

.home {
  position: relative;
  row-gap: 5rem;
  padding: 4rem 0 5rem;
}

.home-data {
  align-self: center;
}

.home-title {
  font-size: var(--big-font-size);
  margin-bottom: var(--mb-5);
  color: blue;
}

.home-title:hover {

  animation: pulse;
  animation-duration: 3s;
  cursor: pointer;
}


.home-title-color {
  color: var(--first-color);
}

.home-social {
  display: flex;
  flex-direction: column;
}

.home-social-icon {
  width: max-content;
  margin-bottom: var(--mb-2);
  font-size: 1.5rem;
  color: rgb(0, 0, 0);
}

.home-social-icon:hover {
  color: blue;
}

#home-img {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 260px;
}

.home-blob {
  fill: var(--first-color);
}

.home-blob-img {
  width: 360px;
}

.button {
  display: inline-block;
  background-color: var(--first-color);
  color: #fff;
  padding: .75rem 2.5rem;
  font-weight: var(--font-semi);
  border-radius: .5rem;
  transition: .3s;
}

.button:hover {
  box-shadow: 0px 10px 36px rgba(0, 0, 0, 0.15);
  animation: swing;
  animation-duration: 2s;
}

.wrapper {
  display: flex;
}

.wrapper .static-txt {
  color: rgb(0, 0, 0);
  font-size: var(--big-font-size);
}

.wrapper .dynamic-txts {
  margin-left: 15px;
  height: 90px;
  line-height: 90px;
  overflow: hidden;
}

.dynamic-txts li {
  list-style: none;
  color: blue;
  font-size: var(--big-font-size);
  position: relative;
  top: 0;
  animation: slide 12s steps(4) infinite;
}

@keyframes slide {
  100% {
    top: -360px;
  }
}

.dynamic-txts li span {
  position: relative;
  margin: 5px 0;
  line-height: 90px;
}
.red{
  background-color: red;
  color: white;
}
.dynamic-txts li span::after {
  content: "";
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  background: #ffffff;
  border-left: 2px solid #FC6D6D;
  animation: typing 3s steps(10) infinite;
}

@keyframes typing {

  40%,
  60% {
    left: calc(100% + 30px);
  }

  100% {
    left: 0;
  }
}

.about-container {
  row-gap: 2rem;
  text-align: center;
}

.about-subtitle {
  margin-bottom: var(--mb-2);
}

.about-img {
  justify-self: center;
}

.about-img img {
  width: 200px;
  border-radius: .5rem;
}

.skills-container {
  row-gap: 2rem;
  text-align: center;
}

.skills-subtitle {
  margin-bottom: var(--mb-2);
}

.skills-text {
  margin-bottom: var(--mb-4);
}

.skills-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-weight: var(--font-semi);
  padding: .5rem 1rem;
  margin-bottom: var(--mb-4);
  border-radius: .9rem;
  box-shadow: 0px 7px 25px rgba(14, 36, 49, 0.15);
}

.skills-icon {
  font-size: 2rem;
  margin-right: var(--mb-2);
  color: var(--first-color);
}

.skills-names {
  display: flex;
  align-items: center;
}

.skills-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgb(21, 6, 243);
  height: .50rem;
  border-radius: 1.90rem;
  z-index: var(--z-back);
}

.skills-Game {
  width: 95%;
  animation: game 3s;
}

.skills-html {
  width: 89%;
  animation: html 3s;
}

.skills-css {
  width: 85%;
  animation: css 3s;
}

.skills-js {
  width: 65%;
  animation: js 3s;
}

.skills-python {
  width: 50%;
  animation: python 3s;
}

@keyframes game {
  0% {
    width: 0%;
  }

  100% {
    width: 95%;
  }
}
@keyframes html {
  0% {
    width: 0%;
  }

  100% {
    width: 89%;
  }
}
@keyframes css {
  0% {
    width: 0%;
  }

  100% {
    width: 85%;
  }
}
@keyframes js {
  0% {
    width: 0%;
  }

  100% {
    width: 65%;
  }
}
@keyframes python {
  0% {
    width: 0%;
  }

  100% {
    width: 50%;
  }
}

.skills-img {
  border-radius: .5rem;
}

.work-container {
  row-gap: 2rem;
}

.work-img {
  box-shadow: 0px 4px 25px rgba(14, 36, 49, 0.15);
  border-radius: .5rem;
  overflow: hidden;
}

.work-img :hover {
  display: inline-block;
  animation: tada;
  animation-duration: 3s;
}

.work-img img {
  transition: 1s;
}

.work-img img:hover {
  transform: scale(1.1);
}

.contact-input {
  width: 100%;
  font-size: var(--normal-font-size);
  font-weight: var(--font-semi);
  padding: 1rem;
  border-radius: .5rem;
  border: 1.5px solid var(--second-color);
  outline: none;
  margin-bottom: var(--mb-4);
}

.contact-button {
  display: block;
  border: none;
  outline: none;
  font-size: var(--normal-font-size);
  cursor: pointer;
  margin-left: auto;
}

.footer {
  background-color: var(--first-color);
  color: rgb(255, 255, 255);
  text-align: center;
  font-weight: var(--font-semi);
  padding: 2rem 0;
  cursor: grab;
}

.footer-title {
  font-size: 2rem;
  margin-bottom: var(--mb-4);
}

.footer-social {
  margin-bottom: var(--mb-4);
}

.footer-icon {
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
  margin: 0 var(--mb-2);
}

.footer-icon:hover {
  animation: tada;
  animation-duration: 3s;
}

.footer-copy {
  font-size: var(--smaller-font-size);
}

.footer_logo {
  width: 200px;
  bottom: 25%;
  display: inline-block;
  align-items: center;
}

.footer_logo:hover {
  animation: tada;
  animation-duration: 3s;
}

@media screen and (max-width: 320px) {
  .home {
    row-gap: 2rem;
  }

  #home-img {
    width: 1000px;
  }

  .static-txt {
    margin-top: 20px;
  }

  .dynamic-txts li span::after {

    background: #ffffff;
    margin-top: 20px;
    border-left: 2px solid #ffffff;

  }
}

@media screen and (min-width: 576px) {
  .home {
    padding: 4rem 0 2rem;
  }

  .home-social {
    padding-top: 0;
    padding-bottom: 2.5rem;
    flex-direction: row;
    align-self: flex-end;
  }

  .home-social-icon {
    margin-bottom: 0;
    margin-right: var(--mb-4);
  }

  .home-social-icon:hover {
    animation: tada;
    animation-duration: 3s;
  }

  #home-img {
    width: 100px;
    bottom: 25%;
  }

  .about-container {
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    text-align: initial;
  }

  .skills-container {
    grid-template-columns: .7fr;
    justify-content: center;
    column-gap: 1rem;
  }

  .work-container {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
    padding-top: 2rem;
  }

  .contact-form {
    width: 360px;
    padding-top: 2rem;
  }

  .contact-container {
    justify-items: center;

  }
}

@media screen and (min-width: 768px) {
  body {
    margin: 0;
  }

  .section {
    padding-top: 4rem;
    padding-bottom: 3rem;
  }

  .section-title {
    margin-bottom: var(--mb-6);
  }

  .section-title::after {
    width: 80px;
    top: 3rem;
  }

  .nav {
    height: calc(var(--header-height) + 1.5rem);
  }

  .nav-list {
    display: flex;
    padding-top: 0;
  }

  .nav-item {
    margin-left: var(--mb-6);
    margin-bottom: 0;
  }

  .nav-toggle {
    display: none;
  }

  .nav-link {
    color: var(--first-color);
  }

  .home {
    padding: 8rem 0 2rem;
  }

  #home-img {
    width: 400px;
    bottom: 10%;
  }

  .about-container {
    padding-top: 2rem;
  }

  .about-img img {
    width: 300px;
  }

  .skills-container {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
    align-items: center;
    text-align: initial;
  }

  .work-container {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2rem;
  }
}

@media screen and (min-width: 992px) {
  .bd-grid {
    margin-left: auto;
    margin-right: auto;
  }

  .home {
    padding: 10rem 0 2rem;
  }

  #home-img {
    width: 450px;
  }

}

.container {
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.card {
  height: 280px;
  max-width: 350px;
  margin: 0 20px;
  background: white;
  transition: 0.4s;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

}

.card:hover {
  height: 470px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
}

.card .img {
  height: 200px;
  width: 100%;
}

.card .img img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10%;
}

.card .top-text {
  padding: 5px;
}

.card .top-text .name {
  font-size: 25px;
  font-weight: 600;
  color: #202020;
}

.card .top-text p {
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  line-height: 20px;
}

.card .bottom-text {
  padding: 0 20px 10px 20px;
  margin-top: 5px;
  background: white;
  opacity: 0;
  visibility: hidden;
  transition: 0.1s;
}

.card:hover .bottom-text {
  opacity: 1;
  visibility: visible;
}

.card .bottom-text .text {
  text-align: justify;
}

.card .bottom-text .btn {
  margin: 10px 0;
  text-align: left;
}

.card .bottom-text .btn a {
  text-decoration: none;
  background: #000000;
  color: #f2f2f2;
  padding: 5px 8px;
  border-radius: 3px;
  display: inline-flex;
  transition: 0.2s;
}

.card .bottom-text .btn a:hover {
  transform: scale(0.9);
}

@media screen and (max-width: 978px) {
  .container {
    flex-wrap: wrap;
    flex-direction: column;
  }

  .card {
    max-width: 700px;
    margin: 20px 0;
  }
}

body {
  font-family: Arial, sans-serif;
  transition: background-color 0.5s ease;
}

h1 {
  color: #333;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-bottom: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 14px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:checked+.slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.night-light-label #night-light-checkbox {
          position: absolute;
          visibility: hidden;

        }

        .night-light-label {
          display: block;
          margin: 20px 0;
          height: 31px;
          width: 60px;
          border: 2px solid #4672fe;
          border-radius: 30px;
          position: relative;
          cursor: pointer;
        }

        .night-light-label .night-light-ball {
          position: absolute;
          width: 25px;
          height: 25px;
          top: 1px;
          left: 1px;
          border-radius: 50%;
          background: #4672fe;
          z-index: 99;
          transition: 300ms;
        }

        .night-light-label #night-light-checkbox:checked+.night-light-ball {
          transform: translateX(28px);
        }

        .moon-svg,
        .sun-svg {
          width: 16px;
          height: 16px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

        .moon-svg {
          right: 5px;
        }

        .sun-svg {
          left: 5px;
        }

        .dark #moon-svg,
        .dark #sun-svg {
          fill: #e0e0e0 !important;
        }

        .dark {
          background-color: #111;
          color: #e0e0e0;
        }

        .dark .intro {
          background: #111;
        }

        .dark .animation-list,
        .dark .sidebar {
          background: #15151d;
        }

        .dark .button.button-animations,
        .dark .callout-hideList.button {
          color: #e0e0e0;
          border-color: rgba(255, 255, 255, 0.7);
          outline: none;
        }

        .dark .copy-icon,
        .dark .copy-icon:hover {
          background: #15151d;
          border-color: #e0e0e0;
        }

        .dark .copy-icon::before,
        .dark .copy-icon:hover::before {
          border-color: #e0e0e0;
        }

        .dark code {
          color: #111;
        }

        .dark h2,
        .dark h3,
        .dark h4,
        .dark a[title='Documentation'],
        .dark pre * {
          color: #e0e0e0;
        }

        .dark section {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .dark h1,
        .dark a {
          color: #4672fe;
        }

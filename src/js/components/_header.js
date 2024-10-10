const menuBtn = document.querySelector('#menuBtn');
const headerMenu = document.querySelector('#headerMenu');
const header = document.querySelector('header');

menuBtn.addEventListener('click', ()=>{
  console.log("CLICK")
  headerMenu.classList.toggle('openNav');
  menuBtn.classList.toggle('open')
  header.classList.toggle('headerCover')
  document.body.classList.toggle('noscroll')
})


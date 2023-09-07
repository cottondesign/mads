// The Space JS
const spaceSections = document.querySelectorAll(".space-section");
const spaceHeaders = document.querySelectorAll(".space-header");
const spaceHeaderTitles = document.querySelectorAll(".space-header-title");
const theSpaceSection = document.getElementById("theSpace");


const navSections = document.querySelectorAll("section.nav-item");
for (navSection of navSections) {
  // const sectionHeader = navSection.querySelector('.section-header');
  const sectionId = navSection.getAttribute('id');

  // sectionHeader.addEventListener("click", function(){
  navSection.addEventListener("click", function(){

    // TO DO: turn off sections that are visible other than current section
    

    if (sectionId == 'theSpace' && document.body.classList.contains("show-theSpace")) {
      closeAllSections()
    } else {
      openSection(spaceSections[0])
    }
    document.body.classList.toggle('show-' + sectionId);
  });
}


// click on headers and show the section
// for (spaceHeaderTitle of spaceHeaderTitles) {
//   spaceHeaderTitle.addEventListener("click", function() {
for (spaceSection of spaceSections) {
  spaceSection.addEventListener("click", function(e) {

    console.log(e.target);

    if (!e.target.classList.contains('space-body')) {
      const buttonSectionAncestor = this.closest(".space-section");
      if (buttonSectionAncestor.classList.contains("show")){
        buttonSectionAncestor.classList.remove("show");
      } else if (theSpaceSection.querySelector('.show') != null){
        theSpaceSection.querySelector('.show').classList.remove("show");
        buttonSectionAncestor.classList.add("show")
      } else {
        buttonSectionAncestor.classList.add("show");
      }
    }



  })
}

function closeAllSections(){
  for (spaceSection of spaceSections) {
    spaceSection.classList.remove("show")
  }
}

function openSection(section){
  if (!section.classList.contains("show")){
    if (theSpaceSection.querySelector(".show")){
      theSpaceSection.querySelector(".show").classList.remove("show");
    }
    section.classList.add("show");
  }
}



// receipt hover
theSpaceHeader = document.getElementById('theSpaceHeader');
receiptContainer = document.getElementById('receiptContainer')

theSpaceHeader.addEventListener("mouseover", function() {
  if (!document.body.classList.contains("show-theSpace")) {
    receiptContainer.classList.add('shift-left');
    carouselContainer.classList.add('hover-blur');
  }
})
theSpaceHeader.addEventListener("mouseleave", function() {
  receiptContainer.classList.remove('shift-left');
  carouselContainer.classList.remove('hover-blur');
})










// Food And Drinks JS
// TO DO: hide submenu on scroll?

const submenuOpenButtons = document.querySelectorAll('.submenu-open-button');
for (submenuOpenButton of submenuOpenButtons) {
  submenuOpenButton.addEventListener("click", function() {
    document.querySelector('.food-and-drinks-subnav').classList.add('open');
  
    submenuCloseButton.classList.add('show');
  })
}

const submenuCloseButton = document.querySelector('.submenu-close-button');
submenuCloseButton.addEventListener("click", function() {
  document.querySelector('.food-and-drinks-subnav').classList.remove('open');
  submenuCloseButton.classList.remove('show');
})



const foodAndDrinksHeaderBackButton = document.querySelector('.food-and-drinks-header-back');
foodAndDrinksHeaderBackButton.addEventListener("click", function() {
  document.body.classList.remove('show-foodAndDrinks');
  // document.querySelector('.food-and-drinks-subnav').style.height = 0;
})

const foodAndDrinksBackButtons = document.querySelectorAll('.food-and-drinks-back-button');
for (foodAndDrinksBackButton of foodAndDrinksBackButtons) {
  foodAndDrinksBackButton.addEventListener("click", function() {
    document.body.classList.remove('show-foodAndDrinks');
    // document.querySelector('.food-and-drinks-subnav').style.height = 0;
  })
}


const subheaders = document.querySelectorAll('.food-and-drinks-subheader');
window.onscroll = function() {
  for (subheader of subheaders) {
    showOnScroll(subheader);
  }
};

function showOnScroll(element) {
  let offset = element.getBoundingClientRect();
    console.log(offset);

    if (offset.y == 0) {
      element.classList.add('show');
    }
    else {
      element.classList.remove('show');;
    }
}
// END OF FOOD AND DRINKS JS












// CAROUSEL JS
// let numImages = 13;
let numImages = document.getElementById("carousel").childElementCount;
console.log(numImages);
let currentIndex = 1;
let prevIndex = numImages-1;
let nextIndex = 2;

let imageArray = document.querySelectorAll('.carousel-image img');


const carouselContainer = document.getElementById('carouselContainer');
const carousel = document.getElementById('carousel');
let carouselCounter = 0;

const theSpaceLeftArrows = document.querySelectorAll('.arrow-left');
const theSpaceRightArrows = document.querySelectorAll('.arrow-right');

for (theSpaceLeftArrow of theSpaceLeftArrows) {
  theSpaceLeftArrow.addEventListener("click", function() {

    // const buttonSectionAncestor = this.closest(".space-section");
    // openSection(buttonSectionAncestor)

    if (currentIndex == 1) {
      prevIndex = numImages-1;
    } else {
      prevIndex = currentIndex-1;
    }
    console.log(prevIndex);
    if (this.parentElement.parentElement.getAttribute('id') == imageArray[prevIndex-1].getAttribute('data')) {
      console.log('contains element');
      carouselCounter = prevIndex;
    } else {
      console.log("doesn't contain");
      for (let i = 0; i < imageArray.length-1; i++) {
        if (imageArray[i].getAttribute('data') == this.parentElement.parentElement.getAttribute('id')) {
          carouselCounter = i+1;
        }
      }
    }


    // if (this.parentElement.parentElement.classList.contains('show')) {


      if (carouselCounter == 0) {
        carouselCounter = numImages - 1;
        currentIndex = carouselCounter;
        carousel.style.transition = 'none';
        carousel.style.left = `calc(-100vw * ${carouselCounter})`;

        setTimeout(function() {
          carouselCounter--;
          carousel.style.transition = '300ms';
          carousel.style.left = carousel.style.left = `calc(-100vw * ${carouselCounter})`;
          // console.log('timeout300');
        }, 0)

      } else {
        carouselCounter--;
        currentIndex = carouselCounter + 1;
        carousel.style.transition = '300ms';
        carousel.style.left = `calc(-100vw * ${carouselCounter})`;
      }
      console.log('Current Index'+currentIndex);



    // }
  })
    console.log('showing');
}
for (theSpaceRightArrow of theSpaceRightArrows) {
  console.log(nextIndex);
  theSpaceRightArrow.addEventListener("click", function() {
    // open relevant section if not open
    // const buttonSectionAncestor = this.closest(".space-section");
    // openSection(buttonSectionAncestor)

    // if (!buttonSectionAncestor.classList.contains("show")){
    //   theSpaceSection.querySelector(".show").classList.remove("show");
    //   buttonSectionAncestor.classList.add("show");
    // }



    if (currentIndex == numImages-1) {
      nextIndex = 1;
    } else {
      nextIndex = currentIndex + 1;
    }

    if (this.parentElement.parentElement.getAttribute('id') == imageArray[nextIndex-1].getAttribute('data')) {
      console.log('contains element');
      carouselCounter = nextIndex-2;
    } else {
      console.log("doesn't contain");
      for (let i = 0; i < imageArray.length-1; i++) {
        if (imageArray[i].getAttribute('data') == this.parentElement.parentElement.getAttribute('id')) {
          carouselCounter = i-1;
          break
          console.log('testing testing');
          console.log(i);
        }
      }
    }


    // if (this.parentElement.parentElement.classList.contains('show')) {

      if (carouselCounter == numImages - 1) {
        carouselCounter = numImages;
        carousel.style.transition = 'none';
        carousel.style.left = 0;
        
        setTimeout(function() {
          carouselCounter = 1;
          carousel.style.transition = '300ms';
          carousel.style.left = `calc(-100vw * ${carouselCounter})`;
          // console.log('timeout300');
        }, 0)
        currentIndex = 2;

      } else {
        carouselCounter++;
        currentIndex = carouselCounter+1;
        if (currentIndex > numImages - 1) {
          currentIndex = 1;
        }

        carousel.style.transition = '300ms';
        carousel.style.left = `calc(-100vw * ${carouselCounter})`;
      }
      console.log('Current Index'+currentIndex);
      
    // }
  })
}







carouselContainer.addEventListener("mouseover", function() {
  if (!document.body.classList.contains("show-theSpace")) {
    receiptContainer.classList.add("shift-up");
    carouselContainer.classList.add("hover-blur");
    receiptContainer.classList.add('show-x');
  }
})
carouselContainer.addEventListener("mouseleave", function() {
  receiptContainer.classList.remove("shift-up");
  carouselContainer.classList.remove("hover-blur");
  receiptContainer.classList.remove('show-x');
})
carouselContainer.addEventListener("click", function() {
  if (!document.body.classList.contains("show-theSpace")) {
    carouselContainer.classList.toggle("no-blur");
    console.log(receiptContainer.offsetHeight);
    receiptContainer.style.top = -receiptContainer.offsetHeight + 37 + 'px';
    console.log(-receiptContainer.offsetHeight - 37);
  }
})
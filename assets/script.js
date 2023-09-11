// The Space JS
const spaceSections = document.querySelectorAll(".space-section");
const spaceHeaders = document.querySelectorAll(".space-header");
const spaceHeaderTitles = document.querySelectorAll(".space-header-title");
const theSpaceSection = document.getElementById("theSpace");

// MAIN NAV JS
const navSections = document.querySelectorAll("section.nav-item");
for (navSection of navSections) {
  const sectionId = navSection.getAttribute('id');

  navSection.addEventListener("click", function(e){

    // TO DO: turn off sections that are visible other than current section
    if (sectionId == 'foodAndDrinks' && document.body.classList.contains("show-foodAndDrinks")){
      // Close 'Food and Drinks' section only when clicking on header
      if (e.target.classList.contains('click')) {
        document.body.classList.toggle('show-' + sectionId);
      }
    } else if (sectionId == 'theSpace' && document.body.classList.contains("show-theSpace")) {
      // Close 'The Space' section only when clicking on header
      if (e.target.classList.contains('click')) {
        closeAllSections();
        document.body.classList.toggle('show-' + sectionId);
      }
    } else {
      // Close any open section other than the one you are clicking
      if (!document.body.classList.contains('show-' + sectionId)) {
        document.body.removeAttribute('class');
      }
      document.body.classList.toggle('show-' + sectionId);

      if (window.innerWidth > 430){ 
        openSection(spaceSections[0]);
      } else {
        // show only first space-area on mobile
        spaceSections[0].classList.add('show-mobile');
        for (spaceSection of spaceSections) {
          if (!spaceSection.classList.contains('show-mobile')) {
            spaceSection.classList.add('hide-mobile');
          }
        }
      }
    }
    console.log(e.target);
    // document.body.classList.toggle('show-' + sectionId);
  });
}

// click on headers and show the section
for (spaceSection of spaceSections) {
  spaceSection.addEventListener("click", function(e) {

    console.log(e.target);
      if (!e.target.classList.contains('space-body')) {
        const buttonSectionAncestor = this.closest(".space-section");
        
        if (buttonSectionAncestor.classList.contains("show-description")){
          buttonSectionAncestor.classList.remove("show-description");

          // hide other sections
          buttonSectionAncestor.parentElement.classList.add('test-hide-nav');

        } else if (theSpaceSection.querySelector('.show-description') != null){
          theSpaceSection.querySelector('.show-description').classList.remove("show-description");

          buttonSectionAncestor.classList.add("show-description")



          buttonSectionAncestor.parentElement.classList.remove('test-hide-nav');
          // test
          if (buttonSectionAncestor.getAttribute('id') != imageArray[currentIndex-1].getAttribute('data')) {
            console.log('go to section 1');

            for (let i = 0; i < imageArray.length; i++) {
              if (buttonSectionAncestor.getAttribute('id') == imageArray[i].getAttribute('data')) {
                carouselCounter = i;
                console.log(i);
                currentIndex = carouselCounter+1;
                // console.log(currentIndex);
                break;
              }
            }
            carousel.style.left = `calc(-100vw * ${carouselCounter})`;
          }
        } else {
          buttonSectionAncestor.classList.add("show-description");


          buttonSectionAncestor.parentElement.classList.remove('test-hide-nav');
          // test
          if (buttonSectionAncestor.getAttribute('id') != imageArray[currentIndex-1].getAttribute('data')) {
            console.log('go to section 2');
            
            for (let i = 0; i < imageArray.length; i++) {
              if (buttonSectionAncestor.getAttribute('id') == imageArray[i].getAttribute('data')) {
                carouselCounter = i;
                console.log(i);
                currentIndex = carouselCounter+1;
                break;
              }
            }
            carousel.style.left = `calc(-100vw * ${carouselCounter})`;
          }
        }

        let hiddenMobiles = document.querySelectorAll(".hide-mobile");
        console.log(hiddenMobiles);
        for (hiddenMobile of hiddenMobiles) {
          hiddenMobile.classList.remove("hide-mobile");
        }
      }
  })
}


function closeAllSections(){
  for (spaceSection of spaceSections) {
    spaceSection.classList.remove("show-description")
  }
}
function openSection(section){
  if (!section.classList.contains("show-description")){
    if (theSpaceSection.querySelector(".show-description")){
      theSpaceSection.querySelector(".show-description").classList.remove("show-description");
    }
    section.classList.add("show-description");
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
const submenuCloseButton = document.querySelector('.submenu-close-button');
const subMenu = document.querySelector('.food-and-drinks-subnav');

// open submenu
for (submenuOpenButton of submenuOpenButtons) {
  submenuOpenButton.addEventListener("click", function() {
    document.querySelector('.food-and-drinks-subnav').classList.add('open');
    submenuCloseButton.classList.add('show');
  })
}
subMenu.addEventListener("click", function(e) {
  // close submenu when clicking on anchor link or '-' button
  if(e.target.tagName == 'A' || e.target === submenuCloseButton) {
  document.querySelector('.food-and-drinks-subnav').classList.remove('open');
  submenuCloseButton.classList.remove('show');
  }
})

// show subheader nav buttons only when positioned at the top
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
const imageArray = document.querySelectorAll('.carousel-image img');
const carouselContainer = document.getElementById('carouselContainer');
const carousel = document.getElementById('carousel');

let currentIndex = 1;
let carouselCounter = 0;

const theSpaceLeftArrow = document.querySelector('.arrow-left');
const theSpaceRightArrow = document.querySelector('.arrow-right');

theSpaceLeftArrow.addEventListener("click", function() {
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
  // TEST
  toggleSpaceDescriptions();
  // END OF TEST
  console.log('Current Index'+currentIndex);
  })

theSpaceRightArrow.addEventListener("click", function() {
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
    // carousel.style.left = `calc(-100vw * ${carouselCounter})`;

    // carousel.scrollBy({
    //   left: window.innerWidth,
    //   behavior: "smooth",
    // });
    let left = window.innerWidth * carouselCounter;
    console.log(left);
    window.scrollTo({
      left: (left),
      behavior: "smooth",
    });

  }

  // TEST
  toggleSpaceDescriptions();
  // END OF TEST

  console.log('Current Index'+currentIndex);
  console.log('CarouselCounter'+carouselCounter);
})

function toggleSpaceDescriptions() {
  for (spaceSection of spaceSections) {
    if (window.innerWidth > 430) {
      if (spaceSection.getAttribute('id') == imageArray[currentIndex-1].getAttribute('data')) {
        spaceSection.classList.add('show-description');
      } else {
        spaceSection.classList.remove('show-description');
      }
    } else {
      if (spaceSection.getAttribute('id') == imageArray[currentIndex-1].getAttribute('data')) {
        spaceSection.classList.add('show-mobile');
        spaceSection.classList.remove('hide-mobile');
      } else {
        spaceSection.classList.remove('show-mobile');
        spaceSection.classList.add('hide-mobile');
      }
        spaceSection.classList.remove('show-description');
    }
  }
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






const foodAndDrinksText = document.querySelector('#foodAndDrinksText');
let counter = 0;
function foodAndDrinksHover() {
  const foodAndDrinksHoverArr = ['!! FOOD !!', '!! COCKTAILS !!', '!! BEER !!', '!! WINE !!'];

  foodAndDrinksText.innerHTML = foodAndDrinksHoverArr[counter];
  counter++;
  if (counter == foodAndDrinksHoverArr.length) {
    counter = 0;
  }
}

const foodAndDrinksHeader = document.querySelector('.food-and-drinks-header-default').addEventListener('mouseover', function() {
  console.log('testing testing');
  // setInterval(foodAndDrinksHover, 300);
})



// setInterval(foodAndDrinksHover, 1000);
// clearInterval(myInterval);

// const foodAndDrinksAnimation = setInterval(foodAndDrinksHover, 300);

// random table
const tableLetter = document.querySelector('.table-letter');
const tableNumber = document.querySelector('.table-number');
tableNumber.innerHTML = Math.floor(Math.random()*20) + 1;
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
tableLetter.innerHTML = alphabet[Math.floor(Math.random()*alphabet.length)];

// // dynamic header for hours
const currentDate = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let currentDayIndex = currentDate.getDay(); // getDay() returns 0 for Sunday, 1 for Monday, etc.

// Adjust index since schedule starts with Monday
currentDayIndex = (currentDayIndex === 0) ? 6 : currentDayIndex - 1; // Shift index so that 0 corresponds to Monday

let currentDecimalTime = currentDate.getHours() + (currentDate.getMinutes() / 60); // Combine hours and minutes as decimal time

// Parse your schedule here (replace with actual parsed schedule if needed)
let dayElements = document.querySelectorAll(".hours-day");
let hours = document.querySelectorAll(".hours");
const schedule = [];
for (let i = 0; i < dayElements.length; i++) {
  if (hours[i].classList.contains('hours-closed')) {
    schedule[i] = { day: dayElements[i].textContent, open: false, from: hours[i].textContent, to: hours[i].textContent };
  } else {
    schedule[i] = { day: dayElements[i].textContent, open: true, from: hours[i].querySelector('.hours-from').textContent, to: hours[i].querySelector('.hours-to').textContent };
  }
}

// test
// currentDayIndex = 1;
// currentDecimalTime = 3.5;
// console.log(schedule);
// console.log(schedule[currentDayIndex].day, currentDecimalTime);

// Ensure the storeStatus and storeClosingTime elements exist in your HTML
let storeStatus = document.querySelector('#storeStatus');
let storeClosingTime = document.querySelector('#storeClosingTime');

// Utility function to convert time like "5PM" to 24-hour decimal format
function convertTo24HourDecimal(timeStr) {
  const [time, modifier] = timeStr.match(/(\d+)(AM|PM)/).slice(1);
  let hours = parseInt(time);
  
  // Convert to 24-hour format
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0; // Midnight case

  // Return the correct hour between 0 and 23
  return hours;
}

// Utility function to convert 24-hour time to 12-hour format for display
function format12HourTime(decimalHour) {
  let hour = Math.floor(decimalHour);
  let minute = Math.round((decimalHour - hour) * 60);
  let period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12; // Handle 12 AM or 12 PM

  // If minutes are 0, omit them from the display
  if (minute === 0) {
    return `${hour}${period}`;
  }

  return `${hour}:${minute < 10 ? '0' : ''}${minute}${period}`;
}

// Check the previous day's schedule if it's before 7 AM
function checkPreviousDay(currentDayIndex, currentDecimalTime) {
  const prevDayIndex = (currentDayIndex === 0) ? 6 : currentDayIndex - 1; // Previous day
  const prevDaySchedule = schedule[prevDayIndex];

  // If previous day is marked as closed, ignore times
  if (!prevDaySchedule.open) {
    return { open: false };
  }

  // Convert the previous day's open/close times
  let prevDayOpenHour = convertTo24HourDecimal(prevDaySchedule.from);
  let prevDayCloseHour = convertTo24HourDecimal(prevDaySchedule.to);
  
  // Check if the previous day closes after midnight (i.e., prevDayCloseHour is earlier than prevDayOpenHour)
  if (prevDayCloseHour < prevDayOpenHour) {
    // If current time is before prevDayCloseHour (early morning), it's still open
    if (currentDecimalTime < prevDayCloseHour) {
      return { open: true, closingTime: prevDayCloseHour };
    }
  }

  // Store is closed by default if past closing time
  return { open: false };
}

// Check today's schedule if it's after 7 AM
function checkCurrentDay(currentDayIndex, currentDecimalTime) {
  const todaySchedule = schedule[currentDayIndex];

  // If today is marked as closed, ignore times and return closed status
  if (!todaySchedule.open) {
    return { open: false };
  }

  // Convert today's open/close times
  let todayOpenHour = convertTo24HourDecimal(todaySchedule.from);
  let todayCloseHour = convertTo24HourDecimal(todaySchedule.to);
  
  // Handle past-midnight closing times (e.g., closing at 4 AM next day)
  if (todayCloseHour < todayOpenHour) {
    todayCloseHour += 24; // Adjust to handle closing after midnight
  }

  // Check if the current time falls within today's open hours
  if (todaySchedule.open && currentDecimalTime >= todayOpenHour && currentDecimalTime < todayCloseHour) {
    return { open: true, closingTime: todayCloseHour % 24 }; // Wrap around to keep within 24-hour format
  }

  return { open: false };
}

// Determine if the store is open or closed
let statusX;
if (currentDecimalTime < 7) {
  // Before 7 AM, check the previous day's schedule
  statusX = checkPreviousDay(currentDayIndex, currentDecimalTime);
} else {
  // After 7 AM, check today's schedule
  statusX = checkCurrentDay(currentDayIndex, currentDecimalTime);
}

// Update the DOM based on whether the store is open or closed
if (statusX.open) {
  storeStatus.innerHTML = '* open now ';
  storeStatus.classList.add('store-open');
  storeClosingTime.innerHTML = `closes ${format12HourTime(statusX.closingTime)}`;
} else {
  storeStatus.innerHTML = '* closed ';
  let nextOpening = getNextOpening(currentDayIndex);
  if (nextOpening) {
    if (nextOpening.dayIndex === currentDayIndex) {
      // Only display the time if it's the same day
      storeClosingTime.innerHTML = `opens ${nextOpening.from}`;
    } else {
      // Display day and time if it's a different day
      storeClosingTime.innerHTML = `opens ${nextOpening.day} ${nextOpening.from}`;
    }
  } else {
    storeClosingTime.innerHTML = 'Closed for the rest of the week';
  }
}

// Get the next opening time (if the store is closed)
function getNextOpening(currentDayIndex) {
  for (let i = 0; i < 7; i++) {
    let dayIndex = (currentDayIndex + i) % 7;
    const daySchedule = schedule[dayIndex];

    if (daySchedule.open) {
      return { day: daySchedule.day, from: daySchedule.from, dayIndex };
    }
  }
  return null; // if all days are closed
}

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
    if (!document.body.classList.contains('receipt-moveUp')) {
      if (e.target.getAttribute("href") && e.target.getAttribute("href").includes("#")){
        return;
      }
      // console.log(e.target);
      if (sectionId == 'foodAndDrinks' && document.body.classList.contains("show-foodAndDrinks")){
        // Close 'Food and Drinks' section only when clicking on header
        if (e.target.classList.contains('click')) {

          if (document.body.classList.contains('show-' + sectionId)) {
            history.pushState(null, "", "/");
          } else {
            history.pushState(null, "", e.target.closest("[data-href]").getAttribute("data-href"));
          }
          document.body.classList.toggle('show-' + sectionId);

          window.addEventListener('popstate', function(event) {
            if (!window.location.href.includes("#")){
            closeCurrentSection(sectionId);
            openPreviousSection();
            }
          })

        }
      } else if (sectionId == 'theSpace' && document.body.classList.contains("show-theSpace")) {
        // Close 'The Space' section only when clicking on header
        if (e.target.classList.contains('click')) {
          closeAllSections();

          if (document.body.classList.contains('show-' + sectionId)) {
            history.pushState(null, "", "/");
          } else {
            history.pushState(null, "", e.target.closest("[data-href]").getAttribute("data-href"));
          }

          document.body.classList.toggle('show-' + sectionId);

          window.addEventListener('popstate', function(event) {
            closeCurrentSection(sectionId);
            openPreviousSection();
          })
        }
      } else {
        // Close any open section other than the one you are clicking
        if (!document.body.classList.contains('show-' + sectionId)) {
          document.body.removeAttribute('class');
          console.log(e.target);
          hideCloseButton();
        }
        // Open section
        if (!e.target.closest('.section-body')) {
          if (document.body.classList.contains('show-' + sectionId)) {
            history.pushState(null, "", "/");
          } else {
            history.pushState(null, "", e.target.closest("[data-href]").getAttribute("data-href"));
          }

          document.body.classList.toggle('show-' + sectionId);

          // Listen for popstate event
          window.addEventListener('popstate', function(event) {
            if (!window.location.href.includes("#")){
              closeCurrentSection(sectionId);
              hideCloseButton();
              openPreviousSection();
            }
          })

          this.classList.toggle('show-close-button');
        }

        // Open the first Space section on desktop
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
    // console.log(e.target);
    // document.body.classList.toggle('show-' + sectionId);
  }
  });
}
if (document.body.classList != '') {
  let currentId = document.body.classList.value.split('-')[1];
  document.querySelector(`#${currentId}`).classList.add('show-close-button');
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
            // carousel.style.left = `calc(-100vw * ${carouselCounter})`;
            moveByWidth(carouselCounter, 'left');
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
            // carousel.style.left = `calc(-100vw * ${carouselCounter})`;
            moveByWidth(carouselCounter, 'left');
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


function getCurrentSectionId() {
  let currentSection = document.body.getAttribute('class');
  let currentSectionIdArray = currentSection.split("-");
  let currentSectionId = currentSectionIdArray[1];
  return currentSectionId;
}
function hideCloseButton() {
  for (navSection of navSections) {
    navSection.classList.remove('show-close-button');
  }
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


// Food And Drinks JS

// set subnav position
const subMenu = document.querySelector('.food-and-drinks-subnav');
const subMenuItems = subMenu.querySelectorAll('a');
const root = document.documentElement;

const subMenuItemHeight = document.querySelector('.submenu-nav').getBoundingClientRect().height;
const menuSingleBarHeight = document.querySelector('.menu-single-bar').getBoundingClientRect().height;

const subMenuHeight = subMenuItems.length*subMenuItemHeight + ((subMenuItems.length + 1) * menuSingleBarHeight);
root.style.setProperty('--subNavTop', `-${subMenuHeight}px`);

const subheaderTitles = document.querySelectorAll('.food-and-drinks-subheader-title');
// const submenuOpenButtons = document.querySelectorAll('.submenu-open-button');
const submenuCloseButton = document.querySelector('.submenu-close-button');

// new open submenu 
for (subheaderTitle of subheaderTitles) {

  subheaderTitle.addEventListener("click", function(e) {
    // if (e.target.closest('.food-and-drinks-subheader-title')) {
    if (e.target.closest('.food-and-drinks-subheader').classList.contains('show')) {
      document.querySelector('.food-and-drinks-subnav').classList.add('open');
      submenuCloseButton.classList.add('show');
    }
  })
}

subMenu.addEventListener("click", function(e) {
  // close submenu when clicking on anchor link or '-' button
  if(e.target.closest('a') || e.target === submenuCloseButton) {
    console.log('true');
  document.querySelector('.food-and-drinks-subnav').classList.remove('open');
  submenuCloseButton.classList.remove('show');
  }
})

// show subheader nav buttons only when positioned at the top
const subheaders = document.querySelectorAll('.food-and-drinks-subheader');
function showOnScroll() {
  for (subheader of subheaders) {
    let offset = subheader.getBoundingClientRect();
    if (offset.y < 1) {
        subheader.classList.add('show');
        // console.log("show added");
    } else {
        subheader.classList.remove('show');
        // console.log("show removed")
    }
  }
  subMenu.classList.remove('open');
  submenuCloseButton.classList.remove('show');
}
window.addEventListener('scroll', showOnScroll);
// END OF FOOD AND DRINKS JS




// for the button and span on scroll in food and drinks section
document.addEventListener("scroll", function() {
  var subheaders = document.querySelectorAll(".food-and-drinks-subheader");

  subheaders.forEach(function(subheader) {
    if (isSticky(subheader)) {
      subheader.classList.add("is-sticky");
    } else {
      subheader.classList.remove("is-sticky");
    }
  });
});

function isSticky(element) {
  var rect = element.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom > 0;
}




// CAROUSEL JS
// let numImages = 13;

// external nav
const carouselRightClick = document.querySelector('.right-click');
const carouselLeftClick = document.querySelector('.left-click');
const externalRightArrow = document.querySelector('.external-right-arrow');
const externalLeftArrow = document.querySelector('.external-left-arrow');

carouselRightClick.addEventListener('mouseover', function() {
  if (!document.body.classList.contains('show-theSpace')) {
    externalRightArrow.classList.add('show');
  }
  if (document.body.classList.contains('show-theSpace')) {
    theSpaceRightArrow.classList.add('right-click-hover');
  }
})
carouselRightClick.addEventListener('mouseleave', function() {
  externalRightArrow.classList.remove('show');
  theSpaceRightArrow.classList.remove('right-click-hover');
})
carouselLeftClick.addEventListener('mouseover', function() {
  if (!document.body.classList.contains('show-theSpace')) {
    externalLeftArrow.classList.add('show');
  }
  if (document.body.classList.contains('show-theSpace')) {
    theSpaceLeftArrow.classList.add('left-click-hover');
  }
})
carouselLeftClick.addEventListener('mouseleave', function() {
  externalLeftArrow.classList.remove('show');
  theSpaceLeftArrow.classList.remove('left-click-hover');
})


// theSpaceRightArrow.addEventListener("click", moveCarouselRight);
// theSpaceLeftArrow.addEventListener("click", moveCarouselLeft);
// click functionality
carouselLeftClick.addEventListener("click", moveCarouselLeft);
carouselRightClick.addEventListener("click", moveCarouselRight);

const theSpaceLeftArrow = document.querySelector('.arrow-left');
const theSpaceRightArrow = document.querySelector('.arrow-right');
// end of external nav



let numImages = document.getElementById("carousel").childElementCount;
// console.log(numImages);
const imageArray = document.querySelectorAll('.carousel-image img');
const carouselContainer = document.getElementById('carouselContainer');
const carousel = document.getElementById('carousel');

let currentIndex = 1;
let carouselCounter = 0;

// console.log(carouselContainer.scrollLeft);
// console.log(carousel.scrollLeft);

// carousel.addEventListener("scroll", function() {
//   console.log(carouselContainer.scrollLeft);
// })


let carouselScroll;
let swipeCarouselCounter;
// document.addEventListener("scroll", (event) => {
//     // carouselScroll = window.scrollX;
//     let carouselRect = carousel.getBoundingClientRect();
//     // console.log(carouselRect.left);
//     if (carouselRect.left % window.innerWidth == 0) {
//       // console.log(carouselRect.left);
//       swipeCarouselCounter = carouselRect.left/window.innerWidth * -1;

//       // if (swipeCarouselCounter == 13) {
//         // document.body.style.color = 'red';
//         // carousel.style.left = 0;
//         // window.style.left = 0;
//         // document.documentElement.style.scrollBehavior = 'auto';
//         // window.scrollBy(-carouselRect.width, 0);
//       // }
//       carouselCounter = swipeCarouselCounter;
//       // console.log(carouselRect.left/window.innerWidth);
//     }
//     // let carouselRect = carousel.getBoundingClientRect();
//     // carouselCounter = Math.round(carouselRect.left/window.innerWidth * -1)

// });






// theSpaceLeftArrow.addEventListener("click", function() {
//   if (carouselCounter == 0) {
//     // carouselCounter = numImages - 1;
//     // currentIndex = carouselCounter;
//     carousel.style.transition = 'none';
//     // carousel.style.left = `calc(-100vw * ${carouselCounter})`;

//     setTimeout(function() {
//       // carouselCounter--;
//       // carousel.style.transition = '300ms';
//       // carousel.style.left = `calc(-100vw * ${carouselCounter})`;
//       if (window.innerWidth <= 430){
//       } else {
//         carousel.style.left = `calc(-100vw * ${carouselCounter})`;
//       }
//       // console.log('timeout300');
//     }, 0)
//   } else {
//     // carouselCounter--;
//     // currentIndex = carouselCounter + 1;
//     carousel.style.transition = '300ms';
//     carousel.style.left = `calc(-100vw * ${carouselCounter})`;

//   }
//   // TEST
//   toggleSpaceDescriptions();
//   // END OF TEST
//   console.log('Current Index'+currentIndex);
//   })

// theSpaceRightArrow.addEventListener("click", moveCarouselRight);

// function moveCarouselRight(){

//   console.log("current index:" + currentIndex, "carouselCounter:" + carouselCounter)
  
//   if (carouselCounter == numImages - 1) {
//     carouselCounter = numImages;
//     // carousel.style.transition = 'none';
//     // carousel.style.left = 0;

//     setTimeout(function() {
//       carouselCounter = 1;
//       carousel.style.transition = '300ms';
//       if (window.innerWidth <= 430){
//         carousel.scrollTo({
//           top: 0,
//           left: window.innerWidth * carouselCounter,
//           behavior: "smooth",
//         });
//       } else {
//         carousel.style.left = `calc(-100vw * ${carouselCounter})`;
//       }
//       // console.log('timeout300');
//     }, 0)
//     // currentIndex = 2;

//   } else {
//     // carouselCounter++;
//     carouselCounter = currentIndex+1;
//     // if (currentIndex > numImages - 1) {
//     //   currentIndex = 1;
//     // }

//     carousel.style.transition = '300ms';
//     if (window.innerWidth <= 430){
//       carousel.scrollTo({
//         top: 0,
//         left: window.innerWidth * carouselCounter,
//         behavior: "smooth",
//       });
//     } else {
//       carousel.style.left = `calc(-100vw * ${carouselCounter})`;
//     }

//   }

//   // TEST
//   toggleSpaceDescriptions();
//   // END OF TEST

//   console.log('Current Index'+currentIndex);
//   console.log('CarouselCounter'+carouselCounter);
// }



// // Custom "Scroll Snap" event to determine when the carousel has snapped
// let scrollTimer; // To detect when the scrolling has stopped

// carousel.addEventListener("scroll", function() {
//   console.log("scrolling");

//   // Clear the previous timeout if it exists
//   clearTimeout(scrollTimer);

//   // Set a timeout to detect when scrolling stops
//   scrollTimer = setTimeout(() => {
//       console.log("scrolling stopped");

//       // Here you can determine which item is currently in view
//       currentIndex = Math.round(carousel.scrollLeft / window.innerWidth);
//       console.log(`Snapped to item: ${currentIndex}`);

//       // Optionally, dispatch a custom event here if you need
//       // let snapEvent = new CustomEvent('snap', { 
//       //     detail: { index: currentIndex } 
//       // });
//       // carousel.dispatchEvent(snapEvent);
//   }, 100); // 100ms after the user stops scrolling, we'll consider it "stopped"
// });

// // carousel.addEventListener("snap", function(e) {
// //   console.log("Snapped to:", e.detail.index);
// // });


// let carousel = document.querySelector(".carousel");
// let theSpaceRightArrow = document.querySelector("#yourArrowSelector"); // replace with your actual selector
// let numImages = 5; // replace this with the actual number of images in the carousel
// let carouselCounter = 0;
// let currentIndex = 0;

let scrollTimer;

// theSpaceRightArrow.addEventListener("click", function() {
//   moveCarouselRight();
//   // You can increment the counter here if desired
//   // carouselCounter++;
// });






theSpaceRightArrow.addEventListener("click", moveCarouselRight);

theSpaceLeftArrow.addEventListener("click", moveCarouselLeft);



function moveCarouselRight() {

  // if (window.innerWidth <= 430){
    if (currentIndex !== 1) {
        carouselCounter++;
    } else {
        carouselCounter = 1;
    }
  // } 
  // else {
  //   if (currentIndex <= numImages) {
  //     carouselCounter++;
  // } else {
  //     carouselCounter = 0;
  // }
  // }
  console.log("carousel counter increased to: " + carouselCounter);
  moveByWidth(carouselCounter, "right");
  toggleSpaceDescriptions();
}

function moveCarouselLeft() {
  console.log(currentIndex);

  if (currentIndex < 2) {
      console.log("moved");
      carouselCounter = numImages - 1;
      moveByWidth(carouselCounter, "left");
      toggleSpaceDescriptions();
      return;  // return here to prevent further decrement
  }

  carouselCounter--;
  if(carouselCounter<0){
    carouselCounter=numImages-2
  }
  console.log("carousel counter decreased to: " + carouselCounter);
  moveByWidth(carouselCounter, "left");
  toggleSpaceDescriptions();
}


function moveByWidth(counter, direction) {
  let behavior = "smooth";
  let transition = "300ms";
  
  if ((counter == 0 && direction == "right") || 
      (counter == numImages - 1 && direction == "left")) {
    behavior = "auto";  // instant jump
    transition = "none"
  }

  // if (window.innerWidth <= 430) {
    carousel.scrollTo({
      top: 0,
      left: window.innerWidth * counter,
      behavior: behavior,
    });
  // } 
  // else {
  //   console.log("desktop")
  //   carousel.style.transition = transition;
  //   console.log(counter);
  //   carousel.style.left = `calc(-100vw * ${counter})`;
  // }
}


let stop = false;

carousel.addEventListener("scroll", function() {
  clearTimeout(scrollTimer);
  
  scrollTimer = setTimeout(() => {
    currentIndex = Math.round(carousel.scrollLeft / window.innerWidth)+1;
    console.log(`Snapped to item: ${currentIndex}`);
    
    toggleSpaceDescriptions()

    if (currentIndex == numImages && !stop){
      // reset carousel
      console.log("reset")
      moveByWidth(0, "right");
      stop = true;
    } else if (currentIndex == 1 && !stop){
      console.log("reset left")
      moveByWidth(numImages - 1, "left");
      stop = true;
    } else if (currentIndex >= 2 && currentIndex < numImages){
      stop = false;
    }

  }, 100);
});

// function resetCarousel(){

//   console.log("reset")
//     // carousel.style.transition = 'none';
//     moveByWidth(0);

//     setTimeout(function() {
//       // carouselCounter = 1;
//       // carousel.style.transition = '300ms';
//       // moveByWidth(carouselCounter);
//     }, 150); // Small delay to ensure the transition 'none' takes effect
// }



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

// THE SPACE
const theSpace = document.querySelector('#theSpace');
const receiptContainer = document.querySelector('#receiptContainer')
const theSpaceButton = document.querySelector('#theSpaceButton');

theSpace.addEventListener("mouseover", function() {
  if (!document.body.classList.contains("show-theSpace")) {
    receiptContainer.classList.add('shift-left');
    carouselContainer.classList.add('hover-blur');
  }
})
theSpace.addEventListener("mouseleave", function() {
  receiptContainer.classList.remove('shift-left');
  carouselContainer.classList.remove('hover-blur');
})

// RECEIPT / BACKGROUND INTERACTION
carouselContainer.addEventListener("mouseover", function() {
  if (!document.body.classList.contains("show-theSpace") && !document.body.classList.length == 0) {
    receiptContainer.classList.add("shift-up");
    carouselContainer.classList.add("hover-blur");
    receiptContainer.classList.add('show-x');
  } else if (document.body.classList.length == 0) {
    // if no section is open:
    receiptContainer.classList.add('shift-left');
    carouselContainer.classList.add('hover-blur');
  }
})
carouselContainer.addEventListener("mouseleave", function() {
  // if no section is open:
  if (document.body.classList.length == 0) {
    receiptContainer.classList.remove('shift-left');
    carouselContainer.classList.remove('hover-blur');
  } else {
    receiptContainer.classList.remove("shift-up");
    carouselContainer.classList.remove("hover-blur");
    receiptContainer.classList.remove('show-x');
  }
})

carouselContainer.addEventListener("click", function() {
  if (!document.body.classList.contains("show-theSpace") && !document.body.classList.length == 0) {
    carouselContainer.classList.add("no-blur");

    // 37 pixels from the bottom of the receipt
    console.log(receiptContainer.offsetHeight);

    if (document.body.classList.contains("show-foodAndDrinks")) {
      receiptContainer.style.top = -receiptContainer.offsetHeight + 46.5 + 'px';
    } else {
      receiptContainer.style.top = -receiptContainer.offsetHeight + 50 + 'px';
    }

    document.body.classList.add('receipt-moveUp');
    receiptContainer.classList.add('cursor-pointer');

    hideCloseButton();

  } else if (document.body.classList.length == 0) {
    // if no section is open:
    document.body.classList.add('show-theSpace');
    openSection(spaceSections[0]);
    receiptContainer.classList.remove('shift-left');

    history.pushState(null, "", '/space');
    window.addEventListener('popstate', function(event) {
          closeCurrentSection('theSpace');
          openPreviousSection();
      })
  }
})

// Once the receipt is up
receiptContainer.addEventListener("mouseover", function() {
  if (document.body.classList.contains("receipt-moveUp")) {
    receiptContainer.style.top = -receiptContainer.offsetHeight + 49 + 'px';
    carouselContainer.classList.remove("no-blur");
    carouselContainer.classList.add('hover-blur');

    document.body.classList.add('receipt-moveUp-hover');
  }
})

receiptContainer.addEventListener("mouseleave", function() {
  if (document.body.classList.contains("receipt-moveUp")) {
    if (document.body.classList.contains("show-foodAndDrinks")) {
      receiptContainer.style.top = -receiptContainer.offsetHeight + 39.5 + 'px';
    } else {
      receiptContainer.style.top = -receiptContainer.offsetHeight + 40 + 'px';
    }

    carouselContainer.classList.add("no-blur");
    carouselContainer.classList.remove('hover-blur');

    document.body.classList.remove('receipt-moveUp-hover');
  }
})

receiptContainer.addEventListener("click", function(e) {
  if (!document.body.classList.contains("show-theSpace")) {
    if (document.body.classList.contains('receipt-moveUp')) {
      document.body.classList.remove('receipt-moveUp');
      receiptContainer.removeAttribute('style');

      document.body.classList.remove('receipt-moveUp-hover');

      // test
      let currentSectionId = getCurrentSectionId();
      document.querySelector('#' + currentSectionId).classList.add('show-close-button');
    }
  }
})

function closeCurrentSection(sectionId) {
  document.body.classList.remove('show-' + sectionId);
}
function openPreviousSection() {
  let permalink = '/' + window.location.href.split("/")[3];
  if (permalink != '/' && document.querySelector(`[data-href="${permalink}"]`) != null) {
    let dataHref = '[data-href="' + permalink + '"]';
    let currentId = document.querySelector(dataHref).getAttribute('id');
    document.body.classList.add('show-' + currentId);
    document.getElementById(currentId).classList.add('show-close-button');
  }
}

receiptMoveUpOnLoad();
function receiptMoveUpOnLoad() {
  receiptContainer.classList.add('position-default');
}

// window.addEventListener('resize', function () {
//   receiptContainer.style.transition = '0s';
// })


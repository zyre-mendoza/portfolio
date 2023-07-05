/*--------------------
Vars
--------------------*/
let progress = 30;
let startX = 0;
let active = 0;
let isDown = false;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.1;
const speedDrag = -0.15;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

const $descriptionText = document.querySelector(".description-text");

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll(".carousel-item");
const $cursors = document.querySelectorAll(".cursor");

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);

  // Update the description text based on the active carousel item
  if (index === active) {
    const description = item.dataset.description || ""; // Use the data-description attribute as the description text
    $descriptionText.textContent = description;
    document.querySelector(".description-box").style.opacity = "1";

    // Enable the link for the active carousel item
    item.querySelector(".link").classList.remove("disabled");

    // Show the div for the active carousel item
    item.querySelector(".click-me").style.display = "block";
  } else {
    // Disable the link for non-active carousel items
    item.querySelector(".link").classList.add("disabled");

    // Hide the div for non-active carousel items
    item.querySelector(".click-me").style.display = "none";
  }
};

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 90));
  active = Math.floor((progress / 100) * $items.length);

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

/*--------------------
Handlers
--------------------*/
const handleWheel = (e) => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

const handleMouseMove = (e) => {
  if (e.type === "mousemove") {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

const handleArrowKeys = (e) => {
  if (e.key === "ArrowLeft") {
    progress -= 10;
  } else if (e.key === "ArrowRight") {
    progress += 10;
  }
  animate();
};

const cursor = document.querySelector(".custom-cursor");
const links = document.querySelectorAll("a");
let isCursorInited = false;

const initCursor = () => {
  cursor.classList.add("custom-cursor--init");
  isCursorInited = true;
};

const destroyCursor = () => {
  cursor.classList.remove("custom-cursor--init");
  isCursorInited = false;
};

links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    cursor.classList.add("custom-cursor--link");
  });

  link.addEventListener("mouseout", () => {
    cursor.classList.remove("custom-cursor--link");
  });
});

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  if (!isCursorInited) {
    initCursor();
  }

  cursor.style = `translate: ${mouseX}px ${mouseY}px`;
});

document.addEventListener("mouseout", destroyCursor);

/*--------------------
Listeners
--------------------*/
document.addEventListener("mousewheel", handleWheel);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("touchstart", handleMouseDown);
document.addEventListener("touchmove", handleMouseMove);
document.addEventListener("touchend", handleMouseUp);
//document.addEventListener('keydown', handleArrowKeys);


$(window).on('load', function() { // makes sure the whole site is loaded 

  $('#status').delay(5500).fadeOut(); // will first fade out the loading animation 
  $('#preloader').delay(6000).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(350).css({'overflow':'visible'},);
})




$(document).ready(function(){
  $('.popup-btn').click(function(){ 
    var popupBlock = $('#'+$(this).data('popup'));
    popupBlock.addClass('active')
      .find('.fade-out').click(function(){
        popupBlock.css('opacity','0').find('.popup-content').css('margin-top','350px');        
        setTimeout(function(){
          $('.popup').removeClass('active');
          popupBlock.css('opacity','').find('.popup-content').css('margin-top','');
        }, 600);
      });
 });
});




"use strict";

$(document).ready(() => {
  $(".booknow input[type=button]").button();
});

// this will hide the image by setting the opacity to 0 and the margin-left to -100px
$(".image1 img").css({ opacity: 0, marginLeft: "-500px" });

// then it will detect when the user has scrolled to the image and animate it
$(window).scroll(function () {
  // get the position of the image
  var imagePosition = $(".image1").offset().top;

  // then calculate the distance from the top of the window to the image
  var distance = $(window).scrollTop() - imagePosition;

  // checks if the user has scrolled to the image
  if (distance >= -$(window).height() && distance <= 0) {
    // if so, calculates the opacity based on the distance from the top of the image
    var opacity = 1 + distance / $(window).height();

    // calculate the margin-left based on the distance from the top of the image
    var marginLeft = distance / 10 - 10;

    // set the opacity and margin-left of the image
    $(".image1 img").css(
      { opacity: opacity, marginLeft: marginLeft + "px" },
      1000
    );
  }
});

$(".image2 img").css({ opacity: 0, marginRight: "-500px" });

// detect when the user has scrolled to the image and animate it
$(window).scroll(function () {
  // get the position of the image
  var imagePosition = $(".image2").offset().top;

  // calculate the distance from the top of the window to the image
  var distance = $(window).scrollTop() - imagePosition;

  // check if the user has scrolled to the image
  if (distance >= -$(window).height() && distance <= 0) {
    // calculate the opacity based on the distance from the top of the image
    var opacity = 1 + distance / $(window).height();

    // calculate the margin-left based on the distance from the top of the image
    var marginRight = distance / 10 - 10;

    // set the opacity and margin-left of the image
    $(".image2 img").css(
      { opacity: opacity, marginRight: marginRight + "px" },
      1000
    );
  }
});

const slideshowimages = document.querySelectorAll(`.container .swiper-slide`);
const nextimagedelay = 5000;
let currentimagecounter = 0;
slideshowimages[currentimagecounter].style.opacity = 1;

setInterval(nextimage, nextimagedelay);
function nextimage() {
  //slideshowimages[currentimagecounter].style.display= "none";
  slideshowimages[currentimagecounter].style.zIndex = -2;

  const tempcounter = currentimagecounter;

  setTimeout(() => {
    slideshowimages[tempcounter].style.opacity = 0;
  }, 1000);
  currentimagecounter = (currentimagecounter + 1) % slideshowimages.length;
  slideshowimages[currentimagecounter].style.opacity = 1;
  slideshowimages[currentimagecounter].style.zIndex = -1;
}

"use strict";

$(document).ready(() => {
  $(".booknow input[type=button]").button();
});
$(document).ready(() => {
  $(".shop_grid a").click((evt) => {
    evt.preventDefault(); //Remove default action from link
    const target = $(evt.currentTarget); //target will be used to store the clicked link
    const content = target.prev(); //get the content div

    if (content.is(":hidden")) {
      //if content is hidden, slide down and change link text
      content.slideDown(1000, "easeOutExpo");
      target.text("SHOW LESS");
    } else {
      //if content is visible, slide up and change link text
      content.slideUp(1000, "easeInExpo");
      target.text("SHOW MORE");
    }
  });
});

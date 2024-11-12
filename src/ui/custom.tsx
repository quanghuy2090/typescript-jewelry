// to get current year
// const getYear = () => {
//     var currentDate = new Date();
//     var currentYear = currentDate.getFullYear();

// }

// getYear();
import $ from 'jquery';
// overlay menu
export const openNav = () => {
  const myNav: HTMLElement | null = document.getElementById("myNav");
  const customMenuBtn: Element | null =
    document.querySelector(".custom_menu-btn");

  if (myNav) {
    myNav.classList.toggle("menu_width");
  }

  if (customMenuBtn) {
    customMenuBtn.classList.toggle("menu_btn-style");
  }
};

/** google_map js **/

// function myMap() {
//   var mapProp = {
//     center: new google.maps.LatLng(40.712775, -74.005973),
//     zoom: 18,
//   };
//   var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
// }

// // lightbox gallery


// $(document).on("click", '[data-toggle="lightbox"]', function (event: Event) {
//   event.preventDefault();
//   $(this).ekkoLightbox();
// });

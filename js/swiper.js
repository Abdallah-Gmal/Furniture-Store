document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    loop: false,
    slidesPerView: 4,
    slidesPerGroup: 2,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 23000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // ✅ هنا الإضافة المهمة
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      767: {
        slidesPerView: 3,
        slidesPerGroup: 2,
      },
      992: {
        slidesPerView: 4,
        slidesPerGroup: 2,
      },
    },
  });
});

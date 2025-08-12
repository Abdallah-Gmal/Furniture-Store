// --------------Sound btn ------------------

const sound_btn = document.querySelectorAll(".btn_sound");
const clickSound = new Audio("sounds/Click - Sound Effect (HD).m4a");

sound_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});
// --------------Sound btn -----------------

// --------------Switch Featcure product------------------

const feature_switch_links = document.querySelectorAll(".feature_switch_links");
const btn_switch_feature = document.querySelectorAll(".btn_switch_feature");
btn_switch_feature.forEach((button, index) => {
  button.addEventListener("click", () => {
    feature_switch_links.forEach((links) => {
      links.classList.add("active");
    });

    feature_switch_links.forEach((link, i) => {
      if (i !== index) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
});

// ------------Switch Featcure product------------------
// --------------3 img chosee one of them ------------------
// نجيب كل الصور اللي عليها الكلاس ده

const bgImages = document.querySelectorAll(".bg-option");
const targetDiv = document.querySelector(".main_img");
let currentIndex = 0;

// 1. أول ما الصفحة تفتح، لو فيه خلفية محفوظة في localStorage نعرضها
window.addEventListener("DOMContentLoaded", () => {
  const savedImage = localStorage.getItem("selectedBackground");
  if (savedImage) {
    if (targetDiv) {
      targetDiv.style.backgroundImage = `url(${savedImage})`;
    }
    currentIndex = [...bgImages].findIndex((img) =>
      img.src.includes(savedImage.split("/").pop())
    );
  } else {
    targetDiv.style.backgroundImage = `url(${bgImages[0].getAttribute("src")})`;
  }
});

if (bgImages.length > 0) {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % bgImages.length;
    const nextImagePath = bgImages[currentIndex].getAttribute("src");
    targetDiv.style.backgroundImage = `url(${nextImagePath})`;
    localStorage.setItem("selectedBackground", nextImagePath);
  }, 5000);
}

// لما المستخدم يضغط على صورة
bgImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    const imagePath = image.getAttribute("src");
    targetDiv.style.backgroundImage = `url(${imagePath})`;
    localStorage.setItem("selectedBackground", imagePath);
    currentIndex = index; // نحدّث المؤشر عشان التكملة تبقى من الصورة دي
  });
});
// -------------- [ Start  Furniture code ]------------------
// ---[ Start open_close  cart ]---

let close_cart_btn = document.querySelectorAll(".close_cart");
let addcart = document.querySelector(".addcart");
let open_cart_btn = document.querySelector(".open_cart");

document.querySelectorAll(".close_cart").forEach(function (button) {
  button.addEventListener("click", function () {
    addcart.classList.remove("display_none");
  });
});
open_cart_btn.onclick = function () {
  addcart.classList.add("display_none");
};

// --- [ End open_close  cart] ---
// ----------------------------------------------------------------------------------------------------------------------
// ---- start add remov cart ---
fetch("product.json")
  .then((response) => response.json())
  .then((data) => {
    const addtocartbuttons = document.querySelectorAll(".btn_add_cart");

    addtocartbuttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productid = event.target.getAttribute("data-id");
        const selectproduct = data.find((product) => product.id == productid);
        addtocart(selectproduct);

        const allmatchingbtn = document.querySelectorAll(
          `.btn_add_cart[data-id="${productid}"]`
        );

        allmatchingbtn.forEach((btn) => {
          btn.classList.add("active");
          btn.innerHTML = `
            <i class="fa-solid fa-cart-shopping"></i> item In Cart
           `;
        });
      });
    });
  });

function addtocart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // const alreadyInCart = cart.find((item) => item.id === product.id);

  cart.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));

  updatecart();
}

function updatecart() {
  const cartitemcontainer = document.getElementById("cart_items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  var total_price = 0;
  var total_count = 0;
  const check_out_item = document.getElementById("check_out_item");

  if (check_out_item) {
    check_out_item.innerHTML = ``;
  }
  cartitemcontainer.innerHTML = "";
  cart.forEach((item, index) => {
    const total_price_item = item.price * cart[index].quantity;

    total_price += total_price_item;
    total_count += item.quantity;

    cartitemcontainer.innerHTML += `
      <div class="item_incart">
          <div class="imge"><img src="${item.img}" alt="" /></div>
          <div class="content">
            <h4>${item.name}</h4>
            <p class="price_cart">${total_price_item} $</p>
            <div class="quantity_control">
              <button class="decrease_quantity" data-index="${index}">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="increase_quantity" data-index="${index}">+</button>
            </div>
          </div>
          <button class="delet_item" data-index="${index}">
            <i class="fa-solid fa-trash-can "></i>
          </button>
        </div>
  `;

    if (check_out_item) {
      check_out_item.innerHTML += `  <div class="item_cart">
                    <div class="image_name">
                      <img  src="${item.img}" alt="" />
                      <div class="content">
                        <h4>
                          Lorem ipsum dolor dolor dolor dorem ipsum dolor dolor
                          dolor dorem ipsum dolor dolor dolor dorem ipsum dolor
                          dolor dolor dolor dolor dolor sit.
                        </h4>

                        <p class="price_cart">${total_price_item}$</p>
                        <div class="quantity_control">
                          <button class="decrease_quantity" data-index="${index}">-</button>
                          <span class="quantity">${item.quantity}</span>
                          <button class="increase_quantity"  data-index="${index}">+</button>
                        </div>
                      </div>
                    </div>
                    <button class="delet_item" data-index="${index}">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
`;
    }
  });

  const count_item_header = document.querySelector(".count_item_header");
  const count_item_cart = document.querySelector(".count_item_cart");
  const price_cart_total = document.querySelector(".price_cart_total");

  price_cart_total.innerHTML = `${total_price}`;
  count_item_cart.innerHTML = total_count;
  count_item_header.innerHTML = total_count;

  if (check_out_item) {
    const subtotal_checkout = document.querySelector(".subtotal_checkout");
    const total_checkout = document.querySelector(".total_checkout");

    subtotal_checkout.innerHTML = `${total_price} $`;
    total_checkout.innerHTML = `${total_price + 20} $`;
  }

  const increase_quantity = document.querySelectorAll(".increase_quantity");
  const decrease_quantity = document.querySelectorAll(".decrease_quantity");

  increase_quantity.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemindex = event.target.getAttribute("data-index");
      increase_quantity_func(itemindex);
    });
  });

  decrease_quantity.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemindex = event.target.getAttribute("data-index");
      derease_quantity_func(itemindex);
    });
  });

  const delet_btn = document.querySelectorAll(".delet_item");
  delet_btn.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemindex = event.target
        .closest("button")
        .getAttribute("data-index");
      removefrom_cart(itemindex);
      btn.classList.remove("active");
    });
  });
}

function increase_quantity_func(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updatecart();
}

function derease_quantity_func(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity == 1) return;

  cart[index].quantity -= 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updatecart();
}

function removefrom_cart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const removproduct = cart.splice(index, 1)[0];
  localStorage.setItem("cart", JSON.stringify(cart));
  updatecart();
  updatebtn_add_to_cart(removproduct.id);
}

function updatebtn_add_to_cart(productid) {
  const allmatchingbtn = document.querySelectorAll(
    `.btn_add_cart[data-id="${productid}"]`
  );
  allmatchingbtn.forEach((button) => {
    button.classList.remove("active");
    button.innerHTML = `
      
                  <i class="fa-solid fa-cart-shopping"></i> add to cart
              
`;
  });
}
updatecart();

// ----  end add remov cart ---

// --- [ End cart content] ---
// // -------------- [ Start animation ]------------------
// window.addEventListener("scroll", () => {
//   const featureProduct = document.querySelector(".feature_product");

//   if (window.scrollY >= 250) {
//     featureProduct.classList.add("active");
//   }
// });

// window.addEventListener("scroll", () => {
//   const featureProduct = document.querySelector(".new_product");

//   if (window.scrollY >= 1250) {
//     featureProduct.classList.add("active");
//   }
// });

// window.addEventListener("scroll", () => {
//   const featureProduct = document.querySelector(".services_offer");

//   if (window.scrollY >= 1850) {
//     featureProduct.classList.add("active");
//   }
// });
// // -------------- [ End animation ]------------------
// -------------- [ Start Singe_page]------------------
const box_img = document.querySelectorAll(".box_img");

box_img.forEach((box) => {
  const bigImg = box.querySelector(".main_img_single_page");
  const smallImgs = box.querySelectorAll(".small_img");
  smallImgs.forEach((smallImg) => {
    smallImg.addEventListener("click", () => {
      bigImg.src = smallImg.src;
    });
  });
});

const single_page = document.querySelectorAll(".single_page");
single_page.forEach((page) => {
  const swap_one = page.querySelector(".swap_one");
  const swap_two = page.querySelector(".swap_two");
  const swap_three = page.querySelector(".swap_three");
  const swap_four = page.querySelector(".swap_four");

  const swap_btn_1 = page.querySelector(".swap_btn_1");
  const swap_btn_2 = page.querySelector(".swap_btn_2");
  const swap_btn_3 = page.querySelector(".swap_btn_3");
  const swap_btn_4 = page.querySelector(".swap_btn_4");

  swap_btn_1.onclick = function () {
    swap_one.classList.remove("active");
    swap_two.classList.add("active");
    swap_three.classList.add("active");
    swap_four.classList.add("active");
  };

  swap_btn_2.onclick = function () {
    swap_one.classList.add("active");
    swap_two.classList.remove("active");
    swap_three.classList.add("active");
    swap_four.classList.add("active");
  };

  swap_btn_3.onclick = function () {
    swap_one.classList.add("active");
    swap_two.classList.add("active");
    swap_three.classList.remove("active");
    swap_four.classList.add("active");
  };

  swap_btn_4.onclick = function () {
    swap_one.classList.add("active");
    swap_two.classList.add("active");
    swap_three.classList.add("active");
    swap_four.classList.remove("active");
  };

  const swapButtons = document.querySelectorAll(
    ".swap_btn_1, .swap_btn_2, .swap_btn_3, .swap_btn_4"
  );

  swapButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      swapButtons.forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
    });
  });
});
const swapButtons = document.querySelectorAll(
  ".swap_btn_1, .swap_btn_2, .swap_btn_3, .swap_btn_4"
);
// add to localStorage single page

swapButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    localStorage.setItem("activeBtn", btn.classList[0]);

    const bigImgs = document.querySelectorAll(
      ".main_img_single_page, .main_img_single_page_two, .main_img_single_page_three, .main_img_single_page_four"
    );

    bigImgs.forEach((img) => {
      if (img.src.includes("product")) {
        localStorage.setItem("selectedImg", img.src);
      }
    });
  });
});

// --------- start see one product ------

const part_1 = document.querySelector(".part_1");
const part_2 = document.querySelector(".part_2");
const part_3 = document.querySelector(".part_3");
const part_4 = document.querySelector(".part_4");
const part_5 = document.querySelector(".part_5");
const part_6 = document.querySelector(".part_6");
const urlparams = new URLSearchParams(window.location.search);
const web_link_id = urlparams.get("id");

if (web_link_id === "21") {
  part_1.classList.remove("active");
}
switch (web_link_id) {
  case "21":
    part_1.classList.remove("active");
    break;
  case "22":
    part_2.classList.remove("active");
    break;
  case "23":
    part_3.classList.remove("active");
    break;
  case "24":
    part_4.classList.remove("active");
    break;
  case "25":
    part_5.classList.remove("active");
    break;
  case "26":
    part_6.classList.remove("active");
    break;
}

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// جلب كل الأزرار
document.querySelectorAll(".btn_add_cart").forEach((btn) => {
  let btnId = btn.getAttribute("data-id");

  // لو الـ id موجود في localStorage
  if (cartItems.some((item) => item.id == btnId)) {
    btn.classList.add("active");
  }
});

// --------- end see one product ------
let btn_bar = document.querySelector(".bar");
let nav_links = document.querySelector(".nav_links");

if (btn_bar) {
  btn_bar.addEventListener("click", () => {
    nav_links.classList.toggle("chang_opcity");
  });
}
// --------------for nave at 575px------------------
// -------------- [ End Singe_page]------------------

// -------------- [Start Google Sheet ]------------------

document
  .getElementById("place_order_btn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    // جلب بيانات السلة من localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    fetch(
      "https://script.google.com/macros/s/AKfycbx6yRwx54bPf7-Wn9Adr6DvfgOGv1xDMWd3PEj2uBgjaQCK_gLHWHyTL5bc4obqoANU/exec",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          cart: cart,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("تم الإرسال بنجاح:", data);
        alert("تم إرسال الطلب بنجاح!");
      })
      .catch((error) => {
        console.error("خطأ في الإرسال:", error);
        alert("حدث خطأ أثناء إرسال الطلب");
      });
  });

// -------------- [End Google Sheet ]------------------

// -------------- [ End  Furniture code ]------------------
// --------------for nave at 575px------------------

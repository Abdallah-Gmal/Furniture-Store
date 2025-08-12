fetch("product.json")
  .then((response) => response.json())
  .then((data) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // ----------- [ Feature Product ]---------

    // علشان اضيف المنتجات في اكتر من  عنصر     // Top product
    const top_product = document.querySelectorAll(".top_product");

    top_product.forEach((feature_prod_top) => {
      feature_prod_top.innerHTML = "";

      data.forEach((product) => {
        if (product.category === "feature_product_top") {
          const incart = cart.some((cartitem) => cartitem.id === product.id);
          feature_prod_top.innerHTML += `
        <div class="box_1 product">
          <div class="img">
            <a href="https://abdallah-gmal.github.io/Furniture-Store/product.html?id=${product.id}" target="_blank">
              <img src="${product.img}" alt="${product.name}" />
            </a>
          </div>
   
        </div>
      `;
        }
      });
    });

    // علشان اضيف المنتجات في اكتر من  عنصر     // bottom product

    const bottom_product = document.querySelectorAll(".bottom_product");

    bottom_product.forEach((feature_prod_bot) => {
      feature_prod_bot.innerHTML = "";
      data.forEach((product) => {
        if (product.category === "feature_product_bottom") {
          const incart = cart.some((cartitem) => cartitem.id === product.id);

          feature_prod_bot.innerHTML += `
            <div class="box_1 product">
              <div class="img">
                <a href="https://abdallah-gmal.github.io/Furniture-Store/product.html?id=${product.id}" target="_blank">
                  <img src="${product.img}" alt="${product.name}" />
                </a>
              </div>
         
          `;
        }
      });
    });

    // -- feature_switch_links_one top and bottom ----------
    const top_product_one_pag = document.getElementById("top_product_one");

    if (top_product_one_pag) {
      top_product_one_pag.innerHTML = "";
    }
    window.addEventListener("DOMContentLoaded", () => {
      top_product_one_pag.innerHTML = "";
    });
    data.forEach((product) => {
      if (product.category === "top_product_one") {
        const incart = cart.some((cartitem) => cartitem.id === product.id);
        if (top_product_one_pag) {
          top_product_one_pag.innerHTML += `
      <div class="box_1 product">
                    <div class="img">
            <a href="http://127.0.0.1:5500/product.html#" target="_blank">
                    <img src="${product.img}" alt="${product.name}" /></a></div>
                  </div>
    `;
        }
      }
    });
    const bottom_product_one = document.getElementById("bottom_product_one");
    if (bottom_product_one) {
      bottom_product_one.innerHTML = "";

      data.forEach((product) => {
        if (product.category === "bottom_product_one") {
          const incart = cart.some((cartitem) => cartitem.id === product.id);

          bottom_product_one.innerHTML += `
      <div class="box_1 product">
                    <div class="img">
            <a href="http://127.0.0.1:5500/product.html#" target="_blank">
                    <img src="${product.img}" alt="${product.name}" /></a></div>
           
                  </div>
    `;
        }
      });
    }
    // -- feature_switch_links_one top and bottom ----------

    // ----------- [ new  product ]---------

    const swiper_new = document.getElementById("swiper_new");
    if (swiper_new) {
      swiper_new.innerHTML = "";

      data.forEach((product) => {
        if (product.category === "new") {
          const incart = cart.some((cartitem) => cartitem.id === product.id);

          swiper_new.innerHTML += `
         <div class="swiper-slide product">
                <div class="content_box">
                      <div class="img">
                        <img src="${product.img}" alt="${product.name}" />
                      </div>
                      <div class="text">
                        <div class="top">
                          <h4 class="name">${product.name}</h4>
                          <h4 class="price">${product.price}$</h4>
                        </div>
                        <div class="bottom btn_add_cart  ${
                          incart ? "active" : ""
                        } " data-id="${
            product.id
          }"> <i class="fa-solid fa-cart-shopping" data-id="2"></i>${
            incart ? "Item In Cart" : " Add To Cart"
          } </div>
                      </div>
                    </div>
                    </div>
       `;
        }
      });
    }

    // ----------- [ best saller  product ]---------
    const swiper_item_sale = document.getElementById("swiper_items_sale");
    if (swiper_item_sale) {
      swiper_item_sale.innerHTML = "";

      data.forEach((product) => {
        if (product.category === "best_Saller") {
          const incart = cart.some((cartitem) => cartitem.id === product.id);
          swiper_item_sale.innerHTML += `
              <div class="swiper-slide product">
                <div class="imge">
                  <a href="#"><img src="${product.img}" alt="${
            product.name
          }" /></a>
                </div>
                <p class="name_product">${product.name}</p>
                <div class="price">
                  <p><span>${product.price}$</span></p>
                </div>
                <div class="btn_add_cart ${
                  incart ? "active" : ""
                } right" data-id="${product.id}">
                  <i class="fa-solid fa-cart-shopping"></i> ${
                    incart ? "Item In Cart" : "Add To Cart"
                  }
                </div>
                </div>`;
        }
      });
    }
    // ----------- [ Our discount]---------

    const our_discount = document.getElementById("discount_img_4");
    if (our_discount) {
      our_discount.innerHTML = ``;
      data.forEach((product) => {
        if (product.category === "our_discount") {
          const incart = cart.some((cartitem) => cartitem.id === product.id);
          our_discount.innerHTML += `
              <div>
                <img src="${product.img}" alt="${product.name}"/>
           
            </div>`;
        }
      });

      const big_img_discount = document.getElementById("main_discount");
      big_img_discount.innerHTML = ``;

      data.forEach((product) => {
        if (product.category === "big_img_discount") {
          const incart = cart.some((cartitem) => cartitem.id === product.id);
          big_img_discount.innerHTML += ` 
       <img src="${product.img}" alt="${product.name}"/>
   
         `;
        }
      });
    }
  });
// --------end

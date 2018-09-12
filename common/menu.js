/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */

// Vue.component("common-menu", {
//   props: ["current"],
//   template: `
//     <div class="my_header">
//     <div class="upper-header">
//     <div class="ec_logo"><a href="index.html">LOGO</a></div>
//       <div class="cart_btn mybtn">cart</div>
//     <div class="login_btn mybtn">Login</div>
//
//     </div>
//
//     <div class="bottom-header">
//     <div class="header-item"><a href="list.html">Men</a></div>
//     <div class="header-item"><a href="list.html">Women</a></div>
//     <div class="header-item"><a href="list.html">Category</a></div>
//     <div class="header-item"><a href="list.html">Recommended</a></div>
//     <div class="header-item"><a href="search.html">Search</a></div>
//     </div>
//     </div>
//   `,
//   methods: {
//   }
// });

Vue.component("common-menu", {
  props: ["current"],
  template: `
    <div class="my_header">
    <div class="upper-header">
    <a href="index.html" class="ec_logo"><div>LOGO</div></a>
    <a href="cart.html" class="cart_btn mybtn"><div>cart</div></a>

    </div>

    <div class="bottom-header">
    <a href="list.html?gender=m" class="header-item"><div>Men</div></a>
    <a href="list.html?gender=f" class="header-item"><div>Women</div></a>
    <a href="category.html" class="header-item"><div>Category</div></a>
    <a href="list.html?category=recommended" class="header-item"><div>Recommended</div></a>
    <a href="search.html" class="header-item"><div>Search</div></a>
    </div>
    </div>
  `,
  methods: {
  }
});

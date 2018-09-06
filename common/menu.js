/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */

Vue.component("common-menu", {
  props: ["current"],
  template: `
    <div class="my_header">
    <div class="upper-header">
    <div class="ec_logo">LOGO</div>
      <div class="cart_btn mybtn">cart</div>
    <div class="login_btn mybtn">Login</div>

    </div>

    <div class="bottom-header">
    <div class="header-item">Men</div>
    <div class="header-item">Women</div>
    <div class="header-item">Category</div>
    <div class="header-item">Recommended</div>
    <div class="header-item">Search</div>
    </div>
    </div>
  `,
  methods: {
  }
});

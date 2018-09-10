/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */

var vm = new Vue({
  el: "#app",
  data: {
    H_text: "kjadlsf",
    link_to: "#"
  },
  computed: {

  },
  created: function() {
    console.log("lets start")
  },
  methods: {
    show_details: function(event){
      console.log(event.srcElement.innerText)
      link_to = event.srcElement.innerText + ".html"
    }
  }
});

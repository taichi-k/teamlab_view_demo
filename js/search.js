/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */
console.log("read");

var vm = new Vue({
  el: "#app",
  data: {
    items:[
      "https://semantic-ui.com/images/avatar/large/helen.jpg",
      "https://semantic-ui.com/images/avatar/large/elliot.jpg",
      "https://semantic-ui.com/images/avatar/large/elliot.jpg",
      "https://semantic-ui.com/images/avatar/large/elliot.jpg",
      "https://semantic-ui.com/images/avatar/large/elliot.jpg"
    ]
  },
  computed: {

  },
  created: function() {

  },
  methods: {
      // 投稿の取得リクエストの送信
  }
});

console.log("end")

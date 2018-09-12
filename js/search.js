/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */
console.log("read");

var vm = new Vue({
  el: "#app",
  data: {
    query_title:null,
    query_category:null,
    query_gender:null,
    query_start:null,
    query_end:null,
    items:[
      {
        id:1,
      image_url:"https://semantic-ui.com/images/avatar/large/helen.jpg",
      name:"aaa"
    },
    {
      id:2,
    image_url:"https://semantic-ui.com/images/avatar/large/helen.jpg",
    name:"nnn"
    }
    ]
  },
  computed: {

  },
  created: function() {
    for (var i=0;i<this.items.length;i++){
      this.items[i]["url"] = "details.html?id="+this.items[i].id;
      // console.log("list.html?"+this.genres_for_m[i].name)
    }
  },
  methods: {
      // 投稿の取得リクエストの送信
      query_search: function(){
        //ここで検索のfetchを行う
        console.log("pressed")
      },
      check_: function(){
        console.log(this.query_title, this.query_category, this.query_gender, this.query_start, this.query_end)
      }
  }
});

console.log("end")

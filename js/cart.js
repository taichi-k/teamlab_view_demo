/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */
console.log("read");

var vm = new Vue({
  el: "#app",
  data: {
    returned_list:[],
    price_tags:[],
    price_list:[],
    buy_list:[],
    if_buy_list:false,
    items:[
        {
          id:1,
        name: "title",
        price:1000,
        category_id:1,
        size:"M L",
        description:"lorem kasjdlkfj aksdj asdkf jak ksadf.",
        gender:"m",
        image_url:"https://semantic-ui.com/images/avatar/large/elliot.jpg",
        html_url:"details.html?id=1"
    }
]
  },
  //name, price, category_id, size, description, image_url
  computed: {

  },
  created: function() {
    if_buy_list = localStorage.getItem("buy_list")
    //fetchでリストを呼ぶ。その時にURLも作成することで、解決可能？
    for (var i=0;i<this.items.length;i++){
      this.items[i]["url"] = "details.html?id="+this.items[i].id;
      // console.log("list.html?"+this.genres_for_m[i].name)
    }
    if (if_buy_list){
    this.buy_list = JSON.parse(localStorage.getItem("buy_list"))
    }

  },
  methods: {
      // 投稿の取得リクエストの送
      // price_tags = document.getElementsByClassname("cinema");
      get_items: function(){
        fetch("http://18.223.55.169:3000/products", {
            method: 'GET',
            headers: new Headers({
                // "Authorization": localStorage.getItem('token')
            })
          })
          .then(function(response) {
            if (response.ok) {
              return response.json();
            }
            return response.json().then(function(json) {
              throw new Error(json.message);
            });
          }).then(function(json) {
            vm.returned_list = json;
          }).catch(function(err) {
            window.console.error(err.message);
          });
      }
  }
});

console.log("end")

/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */
console.log("read");

var vm = new Vue({
  el: "#app",
  data: {
    returned_list:[],
    price_tags:[],
    price_list:[],
    price_sum:0,
    size_list:[],
    name_list:[],
    image_url_list:[],
    description_list:[],
    buy_list:[],
    if_buy_list:false,
    tmp_item:{},
    items:[
    //     {
    //       id:1,
    //     name: "title",
    //     price:1000,
    //     category_id:1,
    //     size:"M L",
    //     description:"lorem kasjdlkfj aksdj asdkf jak ksadf.",
    //     gender:"m",
    //     image_url:"https://semantic-ui.com/images/avatar/large/helen.jpg",
    //     html_url:"details.html?id=1"
    // }
]
  },
  //name, price, category_id, size, description, image_url
  computed: {

  },
  created: function() {
    this.if_buy_list = localStorage.getItem("buy_list")
    //fetchでリストを呼ぶ。その時にURLも作成することで、解決可能？

    if (this.if_buy_list){
    this.buy_list = JSON.parse(localStorage.getItem("buy_list"))

    for (var i = 0;i<this.buy_list.length;i++){
      this.items.push({});

      console.log(i)
      this.size_list.push(this.buy_list[i].size)
      this.price_list.push(this.buy_list[i].price)
      this.name_list.push(this.buy_list[i].name)
      this.description_list.push(this.buy_list[i].description)
      this.image_url_list.push(this.buy_list[i].image_url)
    }
      //fetchでidを投げ、要素を取得

    for (var i=0;i<this.buy_list.length;i++){
      this.items[i]["size"] = this.size_list[i];
      this.items[i]["name"] = this.name_list[i];
      this.items[i]["description"] = this.description_list[i];
      this.items[i]["price"] = this.price_list[i];
      this.items[i]["image_url"] = this.image_url_list[i];

      // console.log("list.html?"+this.genres_for_m[i].name)
    }

    for (var i = 0;i < this.price_list.length;i++){
      this.price_sum　+= this.price_list[i];
    }

}

  },
  methods: {
      // 投稿の取得リクエストの送
      // price_tags = document.getElementsByClassname("cinema");
      get_items: function(){

        fetch("http://18.223.55.169:3000/products", {
            method: 'GET',
            headers: new Headers({
                'Access-Control-Allow-Origin': '*'
            })
          })
          // .then((res)=>{res.json()})
          // .then((json)=>{console.log(json)})
          .then(function(response) {
            console.log(response)
            if (response.ok) {
              console.log("ok")
              return response.json();
            }
            return response.json().then(function(json) {
              throw new Error(json.message);
            });
          })
          .then(function(json) {
            vm.returned_list = json;
            console.log("done!");
          })
          .catch(function(err) {
            console.log(err)
            window.console.error(err.message);
          });
      }
  }
});

console.log("end")

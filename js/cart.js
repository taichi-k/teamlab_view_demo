/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */
console.log("read");

var vm = new Vue({
  el: "#app",
  data: {
    query_params:{},
    tmp:[],
    tmp_key:null,
    tmp_value:null,
    delete_url_list:[],
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
    if (window.location.search){
      this.get_querystring(window.location.search.split("?")[1]);
    }
    this.if_buy_list = JSON.parse(localStorage.getItem("buy_list"))
    //fetchでリストを呼ぶ。その時にURLも作成することで、解決可能？

    if (this.if_buy_list){
    this.buy_list = JSON.parse(localStorage.getItem("buy_list"))
      if (this.query_params.deleting){
        console.log("deleted!!!!!")
        this.buy_list.splice(this.query_params["deleting"],1)
        localStorage.removeItem("buy_list");
        localStorage.setItem("buy_list", JSON.stringify(this.buy_list))
        // window.location.href = "cart.html"
      }

    for (var i = 0;i<this.buy_list.length;i++){
      this.items.push({});

      console.log(i)
      this.size_list.push(this.buy_list[i].size)
      this.price_list.push(this.buy_list[i].price)
      this.name_list.push(this.buy_list[i].name)
      this.description_list.push(this.buy_list[i].description)
      this.image_url_list.push(this.buy_list[i].image_url)
      this.delete_url_list.push("cart.html?deleting=" + i)
    }
      //fetchでidを投げ、要素を取得

    for (var i=0;i<this.buy_list.length;i++){
      this.items[i]["size"] = this.size_list[i];
      this.items[i]["name"] = this.name_list[i];
      this.items[i]["description"] = this.description_list[i];
      this.items[i]["price"] = this.price_list[i];
      this.items[i]["image_url"] = this.image_url_list[i];
      this.items[i]["delete_url"] = this.delete_url_list[i];

      // console.log("list.html?"+this.genres_for_m[i].name)
    }

    for (var i = 0;i < this.price_list.length;i++){
      this.price_sum　+= this.price_list[i];
    }

}

  },
  methods: {
      // 投稿の取得リクエストの送
      get_querystring: function(queryString){
        this.tmp = queryString.split("&");
        for (var i = 0;i < this.tmp.length;i++){
          this.tmp_key = this.tmp[i].split("=")[0];
          this.tmp_value = this.tmp[i].split("=")[1];
          this.query_params[this.tmp_key] = this.tmp_value;
        }
        console.log("Done")
      },
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

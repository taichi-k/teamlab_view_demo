/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */
console.log("read");

var vm = new Vue({
  el: "#app",
  data: {
    returned_list:[],
    price_tags:[],
    price_list:[],
    size_list:[],
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

      console.log(i)
      this.size_list.push(this.buy_list[i].size)
      //fetchでidを投げ、要素を取得
      this.tmp_item = fetch("http://18.223.55.169:3000/products/" + this.buy_list[i].id, {
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
          // this.tmp_item = json;
          return json;
          console.log("set tmp_item!");
        })
        .catch(function(err) {
          console.log(err)
          window.console.error(err.message);
        });

        console.log("pushed")
        this.items.push(this.tmp_item)

    }//forend
    console.log("for_e")
  }

    for (var i=0;i<this.items.length;i++){
      this.items[i]["url"] = "details.html?id="+this.items[i].id;
      // console.log("list.html?"+this.genres_for_m[i].name)
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

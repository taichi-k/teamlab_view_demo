/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */
console.log("read");

var vm = new Vue({
  el: "#app",
  data: {
    tmp:[],
    tmp_key:null,
    tmp_value:null,
    query_params:{},
    selected_size:null,
    selected_color:null,
    selected_amount:1,
    sizes:[],
    buy_list:[],
    items:[
        {
          id:1,
        name: "title",
        price:1000,
        category_id:1,
        size:"M L",
        description:"lorem kasjdlkfj aksdj asdkf jak ksadf.",
        gender:"m",
        image_url:"https://semantic-ui.com/images/avatar/large/helen.jpg",
        html_url:"details.html?id=1"
    }
]
  },
  //name, price, category_id, size, description, image_url
  computed: {

  },
  created: function() {
    //fetchでリストを呼ぶ。その時にURLも作成することで、解決可能？
    if (window.location.search){
      this.get_querystring(window.location.search.split("?")[1]);
    }
    //fetchで、商品idから情報を取ってくる

    this.sizes = this.items[0].size.split(" ");
    this.selected_size = this.sizes[0]

  },
  methods: {
      // 投稿の取得リクエストの送信
      get_querystring: function(queryString){
        this.tmp = queryString.split("&");
        for (var i = 0;i < this.tmp.length;i++){
          this.tmp_key = this.tmp[i].split("=")[0];
          this.tmp_value = this.tmp[i].split("=")[1];
          console.log(this.tmp_key, this.tmp_value)
          this.query_params[this.tmp_key] = this.tmp_value;
        }
        console.log(this.query_params)
        console.log("Done")
      },

    set_product: function(){
      if(localStorage.getItem("buy_list")){
      this.buy_list = JSON.parse(localStorage.getItem("buy_list"));
      this.buy_list.push({id:1,size:"L",amount:2})
    }else{
      this.buy_list.push({id:2,size:"M",amount:1})
    }
      localStorage.setItem("buy_list", JSON.stringify(this.buy_list))
      console.log("added")
    },

    clear_product: function(){
      localStorage.clear()
    }
  }
});

console.log("end")

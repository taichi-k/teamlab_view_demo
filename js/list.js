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
    for (var i=0;i<this.items.length;i++){
      this.items[i]["url"] = "details.html?id="+this.items[i].id;
      // console.log("list.html?"+this.genres_for_m[i].name)

    if (window.location.search){
      this.get_querystring(window.location.search.split("?")[1]);
    }
    }
  },
  methods: {
      // 投稿の取得リクエストの送信
      get_querystring: function(queryString){
        this.tmp = queryString.split("&");
        for (var i = 0;i < this.tmp.length;i++){
          this.tmp_key = this.tmp[i].split("=")[0];
          this.tmp_value = this.tmp[i].split("=")[1];
          this.query_params[this.tmp_key] = this.tmp_value;
        }
        console.log(this.query_params)
        console.log("Done")
      }
  }
});

console.log("end")

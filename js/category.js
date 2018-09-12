/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */
console.log("read");

var vm = new Vue({
  el: "#app",
  data: {
    param:null,
    genres_for_m:[
        {
          "id":1,
          "name":"Cap"
    },
    {
      "id":2,
      "name":"T-shirts"
    },
    {
        "id":3,
        "name":"Shoes"
    }
  ],
  genres_for_f:[
    {
      "id":1,
      "name":"Cap"
    },
    {
      "id":2,
      "name":"T-shirts"
    },
    {
      "id":3,
      "name":"Shoes"
    },
    {
      "id":4,
      "name":"Bags"
    }
  ]
  },
  //name, price, category_id, size, description, image_url
  computed: {

  },
  created: function() {
    if (window.location.href.split("?")[1]){
      this.param = window.location.href.split("?")[1].split("=")[1]
    }
    //fetchでリストを呼ぶ。その時にURLも作成することで、解決可能？
    for (var i=0;i<this.genres_for_m.length;i++){
      this.genres_for_m[i]["url"] = "list.html?category="+this.genres_for_m[i].name;
      // console.log("list.html?"+this.genres_for_m[i].name)
    }
    for (var i=0;i<this.genres_for_f.length;i++){
      this.genres_for_f[i]["url"] = "list.html?category="+this.genres_for_f[i].name;
      // console.log("list.html?"+this.genres_for_m[i].name)
    }
    console.log(this.genres_for_m)
    console.log(this.param)
  },
  methods: {
      // 投稿の取得リクエストの送信
      //まず、性別でdbからリストを取得
      //その後、カテゴリのリスト一覧を取得する。多分、column_namesとか
  }
});

console.log("end")

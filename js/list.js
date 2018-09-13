/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */
console.log("read");

var vm = new Vue({
  el: "#app",
  data: {
    category_id_list:[
      "Cap","T-shirts","Shoes","Bag"
    ],
    this_category:"",
    query_params:{},
    query_string: null,
    tmp_query_string:[],
    tmp:[],
    tmp_key:null,
    tmp_value:null,
    items:[
        {
        //   id:1,
        // name: "title",
        // price:1000,
        // category_id:1,
        // size:"M L",
        // description:"lorem kasjdlkfj aksdj asdkf jak ksadf.",
        // gender:"m",
        // image_url:"https://semantic-ui.com/images/avatar/large/helen.jpg",
        // html_url:"details.html?id=1"
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
    console.log(JSON.stringify(this.query_params))

    for (var key in this.query_params){
      this.tmp_query_string.push(key + "=" + this.query_params[key])
    }
    this.query_string = this.tmp_query_string.join("&")

    fetch("http://18.223.55.169:3000/search?"+this.query_string, {
        method: 'GET',
        headers: new Headers({
            'Access-Control-Allow-Origin': '*'
        }),

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
        vm.items = json;
        vm.aaaa()
        console.log("done!");
      })
      .catch(function(err) {
        console.log(err)
        window.console.error(err.message);
      });

  },
  methods: {
      // 投稿の取得リクエストの送信
      get_querystring: function(queryString){
        this.tmp = queryString.split("&");
        for (var i = 0;i < this.tmp.length;i++){
          this.tmp_key = this.tmp[i].split("=")[0];
          this.tmp_value = this.tmp[i].split("=")[1];
          this.query_params[this.tmp_key] = this.tmp_value;
          if(this.tmp_key === "category_id"){
            console.log("#")
            this.this_category = this.category_id_list[Number(this.tmp_value) - 1]
          }
        }
        console.log("Done")
      },
      aaaa: function(){
        for (var i=0;i<this.items.length;i++){
          this.items[i]["url"] = "details.html?id="+this.items[i].id;
          // console.log("list.html?"+this.genres_for_m[i].name)
        }
      }
  }
});

console.log("end")

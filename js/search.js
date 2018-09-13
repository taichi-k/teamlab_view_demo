/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */
console.log("read");

var vm = new Vue({
  el: "#app",
  data: {
    query_string:[],
    query_list:[],
    query_title:null,
    query_category:null,
    query_gender:null,
    query_start:null,
    query_end:null,
    items:[
    //   {
    //     id:1,
    //   image_url:"https://semantic-ui.com/images/avatar/large/helen.jpg",
    //   name:"aaa"
    // },
    // {
    //   id:2,
    // image_url:"https://semantic-ui.com/images/avatar/large/helen.jpg",
    // name:"nnn"
    // }
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

        if (this.query_title){
          this.query_list.push("name="+this.query_title)
        }
        if (this.query_gender){
          this.query_list.push("gender="+this.query_gender)
        }
        if (this.query_category){
          this.query_list.push("category_id="+this.query_category)
        }
        if (this.query_start){
          this.query_list.push("min="+this.query_start)
        }
        if (this.query_end){
          this.query_list.push("max="+this.query_end)
        }
        if(this.query_list){
          this.query_string = this.query_list.join("&")
        }
        //ここで検索のfetchを行う
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
          this.aaaa()
          this.check_()
        console.log("pressed")
      },
      check_: function(){
        console.log(this.query_title, this.query_category, this.query_gender, this.query_start, this.query_end)
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

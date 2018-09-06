/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */

var vm = new Vue({
  el: "#app",
  data: {
    userId: localStorage.getItem('userId'),
    postForm: {
      text: null,
      category: null
    },
    posts: [],
    query: {
      userId: null,
      category: null,
      start: null,
      end: null
    }
  },
  computed: {
    sortedPosts: function() {
      'use strict';
      return this.posts.sort(function(a, b) {
        return b.timestamp - a.timestamp;
      });
    }
  },
  created: function() {
    'use strict';
    fetch(url + "/posts", {
        method: 'GET',
        headers: new Headers({
          "Authorization": localStorage.getItem('token')
        })
      })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(function(json) {
          throw new Error(json.message);
        });
      })
      .then(function(json) {
        vm.posts = json.posts;
        vm.posts.forEach(function(e) {
          e.date = new Date(e.timestamp).toLocaleString();
        });
      })
      .catch(function(err) {
        window.console.error(err.message);
      });
  },
  methods: {
    post: function() {
      'use strict';
      fetch(url + "/post", {
          method: 'POST',
          headers: new Headers({
            "Authorization": localStorage.getItem('token')
          }),
          body: JSON.stringify({
            userId: vm.userId,
            text: vm.postForm.text,
            category: vm.postForm.category
          })
        })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
          return response.json().then(function(json) {
            throw new Error(json.message);
          });
        })
        .then(function(json) {
          json.date = new Date(json.timestamp).toLocaleString();
          vm.posts.unshift(json);
          vm.postForm.text = null;
          vm.postForm.category = null;
        })
        .catch(function(err) {
          window.console.error(err.message);
        });
    },
    search: function() {
      'use strict';
      // クエリストリングの生成
      var queryString = "userId=" + vm.userId;
      if (vm.query.userId) {
        queryString += "&userId=" + vm.query.userId;
      }
      if (vm.query.category) {
        queryString += "&category=" + vm.query.category;
      }
      if (vm.query.start) {
        queryString += "&start=" + new Date(vm.query.start.replace("-", "/")).getTime();
      }
      if (vm.query.end) {
        queryString += "&end=" + new Date(vm.query.end.replace("-", "/") + " 23:59:59").getTime();
      }
      // 投稿の取得リクエストの送信
      fetch(url + "/post?" + queryString, {
          method: 'GET',
          headers: new Headers({
            "Authorization": localStorage.getItem('token')
          })
        })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
          return response.json().then(function(json) {
            throw new Error(json.message);
          });
        })
        .then(function(json) {
          vm.posts = json.posts;
          vm.posts.forEach(function(e) {
            e.date = new Date(e.timestamp).toLocaleString();
          });
        })
        .catch(function(err) {
          window.console.error(err.message);
        });
    },
    deletePost: function(targetPost) {
      'use strict';
      fetch(url + "/post", {
          method: 'DELETE',
          headers: new Headers({
            "Authorization": localStorage.getItem('token')
          }),
          body: JSON.stringify({
            userId: vm.userId,
            timestamp: targetPost.timestamp
          })
        })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
          return response.json().then(function(json) {
            throw new Error(json.message);
          });
        })
        .then(function() {
          var targetIndex = vm.posts.indexOf(targetPost);
          vm.posts.splice(targetIndex, 1);
        })
        .catch(function(err) {
          window.console.error(err.message);
        });
    }
  }
});

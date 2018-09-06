/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */

var vm = new Vue({
  el: "#app",
  data: {
    user: {
      userId: null,
      password: null,
      nickname: null,
      age: null
    }
  },
  created: function() {
    'use strict';
    fetch(url + "/user?userId=" + localStorage.getItem('userId'), {
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
      }).then(function(json) {
        vm.user.userId = json.userId;
        vm.user.nickname = json.nickname;
        vm.user.age = json.age;
      }).catch(function(err) {
        window.console.error(err.message);
      });
  },
  methods: {
    submit: function() {
      'use strict';
      fetch(url + "/user", {
          method: 'PUT',
          headers: new Headers({
            "Authorization": localStorage.getItem('token')
          }),
          body: JSON.stringify({
            "userId": vm.user.userId,
            "password": vm.user.password,
            "nickname": vm.user.nickname,
            "age": Number(vm.user.age)
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
          var content = JSON.stringify(json, null, 2);
          window.console.log("User Updated\n" + content);
        })
        .catch(function(err) {
          window.console.error(err.message);
        });
    },
    deleteUser: function() {
      'use strict';
      fetch(url + "/user", {
          method: 'DELETE',
          headers: new Headers({
            "Authorization": localStorage.getItem('token')
          }),
          body: JSON.stringify({
            "userId": vm.user.userId
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
          localStorage.removeItem('token');
          location.href = "./login.html";
        })
        .catch(function(err) {
          window.console.error(err.message);
        });
    }
  }
});

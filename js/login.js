/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */

var vm = new Vue({
  el: "#app",
  data: {
    mode: "login",
    submitText: "ログイン",
    toggleText: "新規登録",
    user: {
      userId: null,
      password: null,
      nickname: null,
      age: null
    }
  },
  methods: {
    toggleMode: function() {
      'use strict';
      if (vm.mode === "login") {
        vm.mode = "signup";
        vm.submitText = "新規登録";
        vm.toggleText = "ログイン";
      } else if (vm.mode === "signup") {
        vm.mode = "login";
        vm.submitText = "ログイン";
        vm.toggleText = "新規登録";
      }
    },
    submit: function() {
      'use strict';
      if (vm.mode === "login") {
        fetch(url + "/user/login", {
            method: 'POST',
            body: JSON.stringify({
              "userId": vm.user.userId,
              "password": vm.user.password
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
            localStorage.setItem('token', json.token);
            localStorage.setItem('userId', vm.user.userId);
            location.href = "./index.html";
          })
          .catch(function(err) {
            window.console.error(err.message);
          });
      } else if (vm.mode === "signup") {
        fetch(url + "/user/signup", {
            method: 'POST',
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
            window.console.log(content);
            vm.toggleMode();
          })
          .catch(function(err) {
            window.console.error(err.message);
          });
      }
    }
  }
});

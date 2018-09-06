/*global Vue, url, fetch */
/*jslint white: true, browser: true, es5: true */

var vm = new Vue({
  el: "#app",
  data: {
    query: {
      nickname: null,
      start: null,
      end: null
    },
    users: []
  },
  created: function() {
    'use strict';
    fetch(url + "/users" , {
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
        vm.users = json.users;
      }).catch(function(err) {
        window.console.error(err.message);
      });
  },
  computed: {
    filteredUsers: function() {
      var result = this.users;
      if (this.query.nickname) {
        result = result.filter(function(target) {
          return target.nickname.match(vm.query.nickname);
        });
      }
      if (this.query.start) {
        result = result.filter(function(target) {
          return target.age >= vm.query.start;
        });
      }
      if (this.query.end) {
        result = result.filter(function(target) {
          return target.age <= vm.query.end;
        });
      }
      return result;
    }
  }
});

import Vue from 'vue'
Vue.directive('focus', function (el) {
    el.querySelector('input').focus()
  })
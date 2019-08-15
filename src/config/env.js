/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * baseImgPath: 图片存放地址
 */
import Vue from 'vue'

let baseUrl = ''; 
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'localhost:6100';
    baseImgPath = '@/assets/img/';
} else {
	baseUrl = Vue.prototype.$config.BASE_URL;
	baseImgPath = Vue.prototype.$config.BASE_IMG_URL + '/test/static/img/';
}

export default {
	baseUrl,
	baseImgPath
}
  
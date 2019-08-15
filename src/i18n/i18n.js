import Vue from 'vue'
import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import messages from './lang'
import config from '../../static/config'
 
Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
let lang = (navigator.systemLanguage ? navigator.systemLanguage : navigator.language).substr(0, 2);     // 获取lang字符串的前两位，区分是否是中文

let localLangs;
if (lang === 'zh') {
    localLangs = 'cn';  // 中文
} else {
    localLangs = 'en';  // 英文【不太准确，正常情况下应该是具体的语言，如繁体中文（中国台湾、中国香港等地使用），韩语、日语、英语、拉丁语等，此处将中文外的浏览器默认语言均设置为英语，是考虑到用户的使用语言主要是简体中文和英文】
}

const i18n = new VueI18n({
    locale: localStorage.lang || config.Lang || localLangs || 'cn',      // 语言设置首先读取本地存储中的数据，如果有就是用，没有就读取配置中的（static/config.js），还是没有就读浏览器默认的，再没有就默认用中文
    messages
})

locale.i18n((key, value) => i18n.t(key, value)) // 重点：为了实现element插件的多语言切换

export default i18n
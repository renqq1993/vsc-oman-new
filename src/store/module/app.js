import { localRead, localSave } from '@/libs/util'

export default {
    namespaced: true,
    state: {
        isCollapse: false,          // 导航栏
    },
    getters: {
        
    },
    mutations: {
        setLocal(state, lang) {
            localSave('local', lang)
            state.local = lang;
        },
        setCollapse(state, val) {
            state.isCollapse = val;
        }
    },
    actions: {
        
    }
}
  
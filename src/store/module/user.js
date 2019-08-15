import { login, signout } from '@/api/getData'
import { setStore, getStore, removeStore } from '@/utils/store'
export default {
    namespaced: true,
    state: {
        userName: '',
        userId: '',
        avatorImgPath: '',
        token: '',
        access: '',
        // isLock: getStore({name: 'isLock'}) || false,
        isLock: false,
        // lockPasswd: getStore({name: 'lockPasswd'}) || '',
        lockPasswd: '',
    },
    mutations: {
        setAvator (state, avatorPath) {
            state.avatorImgPath = avatorPath
        },
        setUserId (state, id) {
            state.userId = id
        },
        setUserName (state, name) {
            state.userName = name
            localStorage.setItem('userName', state.userName)
        },
        setAccess (state, access) {
            state.access = access
        },
        setLockPwd: (state, lockPasswd) => {
            state.lockPasswd = lockPasswd

            localStorage.setItem('lockPwd', state.lockPasswd)
            // setStore({
            //     name: 'lockPwd',
            //     content: state.lockPasswd,
            //     type: 'session'
            // })
        },
        setLock: (state, action) => {
            state.isLock = true
            localStorage.setItem('isLock', state.isLock)
            // setStore({
            //     name: 'isLock',
            //     content: state.isLock,
            //     type: 'session'
            // })
        },
        clearLock: (state, action) => {
            state.isLock = false
            state.lockPasswd = ''
            localStorage.removeItem('lockPwd')
            localStorage.removeItem('isLock')

            // removeStore({
            //     name: 'lockPwd'
            // })
            // removeStore({
            //     name: 'isLock'
            // })
        }
    },
    getters: {
        lockPasswd: state => state.lockPasswd,
        getUserName: state => state.userName,
        // messageReadedCount: state => state.messageReadedList.length,
        // messageTrashCount: state => state.messageTrashList.length
    },
    actions: {
        // 登录
        handleLogin ({ commit }, {userName, password}) {
            return login({userName, password})
        },
        // 退出登录
        handleLogOut ({ state, commit }) {
            return signout();
        }
    }
}
  
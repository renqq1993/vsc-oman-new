
export default {
    namespaced: true,
    state: {
        //上传目标文件数组
        targetList:[],
        //上传字典文件数组
        dictList:[],
        //上传文件个数
        uploadCount:0,
    },
    getters: {
        
    },
    mutations: {
        //设置上传目标文件
        setTargetList(state, val){
            state.targetList = val;
        },
        //设置上传字典文件
        setDictList(state, val){
            state.dictList = val;
        },
        //设置上传文件个数
        setCount(state, val){
            state.uploadCount = val;
        },
        //上传文件个数减一
        decreaseCount(state){
            state.uploadCount --;
        },
        //上传文件个数加一
        increaseCount(state){
            state.uploadCount ++;
        }
    },
    actions: {
        
    }
}
  
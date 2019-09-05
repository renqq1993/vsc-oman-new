<template>
    <!-- 全部模板树节点 -->
    <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{node,data}">
        <span><i :class="data.icon" class="node"></i>{{ node.label }}</span>
      </span>
    </el-tree>

</template>
<script>
import {getPwdMode} from '@/api/getData'
import {pwdMode} from '@/mock/mock.js'
export default {
    name:"ModeTree",
    props:{
        reset:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {
            data:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    watch:{
        reset(value){
            if(value){
                this.init();
                this.$emit("handleReset",false);
            }
        }
    },
    methods:{
        //点击树节点触发
        handleNodeClick(data) {
            this.$emit("nodeClick", data);
        },

        pwdModeInit(){
            // let res = await getPwdMode(submitData);
            let res = {
                message:"获取口令模板成功",
                data:pwdMode,
                status:1,
            };
           
            let originList = res.data;
            let pwdList = [];
            originList.forEach(mode => {
                if(mode.isParent){
                   let newMode = {...mode,children:[],icon:"el-icon-new-iconwenjianjia",label:mode.name};
                   pwdList.push(newMode);
                }
                else{
                    let newMode = {...mode,icon:"el-icon-new-iconwenjian1",label:mode.name};
                    pwdList.push(newMode);
                }
            })
            let root = pwdList.find(node => node.pid == -1);
            let newRoot = this.createTree(root,pwdList);
            console.log(newRoot);
            this.data = [newRoot];
        },

        createTree(parent, list){
            let sonList = list.filter(o => o.pid == parent.id);
            sonList.forEach(son => {
                 if(son.isParent){
                    let newSon = this.createTree(son, list);
                    parent.children.push(newSon);
                }
                else{
                    parent.children.push(son);
                }
            })
            return parent;
        }
    },
    created(){
        this.pwdModeInit();
    }
}
</script>
<style scoped>
    .node{
        color:#409EFF;
    }
</style>

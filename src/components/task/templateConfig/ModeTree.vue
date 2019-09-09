<template>
    <div>
        <div class="border">
        <el-button plain  @click="handleAdd()" type="primary" icon="el-icon-plus"  size="mini" :title="$t( prefix + 'btn.addType')"></el-button>
        <el-button plain @click="handleEdit()" type="primary" icon="el-icon-edit"  size="mini" :title="$t( prefix + 'btn.editType')"></el-button>
        <el-button plain  @click="handleDelete()" type="danger" icon="el-icon-delete"  size="mini" :title="$t( prefix + 'btn.delete')"></el-button>
            <br/><br/>
             <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{node,data}" @click="clickData(data)">
                <span><i :class="data.icon" class="node"></i>{{ node.label }}</span>
            </span>
        </el-tree>
        </div>
    </div>
            

</template>
<script>
import {getPwdMode,getTaskMode} from '@/api/getData'
import {pwdMode,TaskMode} from '@/mock/mock.js'
export default {
    name:"ModeTree",
    props:{
        reset:{
            type:Boolean,
            default:false,
        },
        type:{
            type:String,
            default:"type",
        },
        activeKey:{
            type:String,
            default:"tab1",
        }
    },
    data(){
        return {
            prefix:"app.table.task.templateConfig.",
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
                if(this.activeKey == "tab1"){
                    this.pwdModeInit();
                }
                else{
                    this.taskModeInit();
                }
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
        },

        clickData(data){
            console.log(data);
        },

        taskModeInit(){
              // let res = await getTaskMode(submitData);
            let res = {
                message:"获取任务模板成功",
                data:TaskMode,
                status:1,
            };
            console.log(res.data);
            let originList = res.data;
            let pwdList = [];
            originList.forEach(mode => {
                if(mode.isParent){
                    if(mode.icon == ""){
                        let newMode = {...mode,children:[],icon:"el-icon-new-iconwenjianjia",label:mode.name};
                        pwdList.push(newMode);
                    }
                    else{
                         let newMode = {...mode,children:[],label:mode.name};
                        pwdList.push(newMode);
                    }
                }
                else{
                    if(mode.icon == ""){
                        let newMode = {...mode,icon:"el-icon-new-iconwenjian1",label:mode.name};
                        pwdList.push(newMode);
                    }
                    else{
                        let newMode = {...mode,label:mode.name};
                        pwdList.push(newMode);
                    }
                }
            })
            let root = pwdList.find(node => node.pid == -1);
            let newRoot = this.createTree(root,pwdList);
            this.data = [newRoot];
        }
    },
    created(){
        if(this.activeKey == "tab1"){
             this.pwdModeInit();
        }
        else{
            this.taskModeInit();
        }
    }
}
</script>
<style scoped>
    .node{
       color:  #FFCD2C;
    }
    .border{
    border: 1px solid #EBEEF5;
    margin-top: 10px;
    height:400px;
    }
    .el-button+.el-button{
        margin-left: 0px !important;
    }
</style>

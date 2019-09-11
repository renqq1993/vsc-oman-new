
<!-- 口令模板/任务模板树 -->
<template>
    <div>
        <div class="border">
        <el-button :disabled="disable"  @click="handleAdd()" type="primary" icon="el-icon-plus"  size="mini" :title="addTitle"></el-button>
        <el-button :disabled="disable" @click="handleEdit()" type="primary" icon="el-icon-edit"  size="mini" :title="editTitle"></el-button>
        <el-button :disabled="disable"  @click="handleDelete()" type="danger" icon="el-icon-delete"  size="mini" :title="$t( prefix + 'btn.delete')"></el-button>
            <br/><br/>
             <el-tree :data="tree" node-key="id"  default-expand-all :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{node,data}" @click="handleNodeClick(node,data)">
                    <span><i :class="data.icon" class="node"></i>{{ node.label }}</span>
                </span>
            </el-tree>
        </div>
        <add-Edit-dialog :type="nodeType" :node="node" :visibleDialog="typeVision" @close="handleClose"></add-Edit-dialog>
    </div>
</template>
<script>
import {getPwdMode,getTaskMode} from '@/api/getData'
import {pwdMode,TaskMode} from '@/mock/mock.js'
import AddEditDialog   from "@/components/task/templateConfig/AddEditDialog";
import Bus from "@/assets/js/bus.js"
export default {
    name:"TaskTree",
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
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            mergeList:[],
            mergeDialogVision:false,
            clickType:{},
            clickMode:{},
            nodeType:"",
            node:{},
            typeVision:false,
            modeVision:false,
            disable:true,
            num:0,
            tree:[],
            addTitle:"",
            editTitle:"",
        }
    },
    watch:{
        reset(value){
            if(value){
                this.clickType = {};
                this.clickMode = {};
                this.nodeType  = "";
                this.disable = true;
                if(this.activeKey == "tab1"){
                    this.pwdModeInit();
                    this.addTitle = this.$t(this.prefix + "btn.addType");
                    this.editTitle = this.$t(this.prefix + "btn.editType");
                }
                else{
                    this.taskModeInit();
                    this.addTitle = this.$t(this.prefix + "btn.addModeName");
                    this.editTitle =  this.$t(this.prefix + "btn.renameModeName");
                }
                this.$emit("handleReset",false);
            }
        }
    },
    methods:{
        //点击树节点触发
        handleNodeClick(node,data) {
            if(this.activeKey == "tab1"){//选择类型
                this.clickType = {node:node, data:data};
                this.$emit("clickNode", true);
                Bus.$emit("clickType", this.clickType.data);
            }
            else{//选择任务模型
                this.clickMode = {node:node, data:data};
                 Bus.$emit("clickMode", this.clickType.data);
            }
            this.disable = false;
            this.$emit("nodeClick", data);
        },
        //递归创建树节点
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
          //创建任务模板树
        taskModeInit(){
            console.log("taskModeInit");
              // let res = await getTaskMode(submitData);
            let res = {
                message:"获取任务模板成功",
                data:TaskMode,
                status:1,
            };
            let originList = res.data;
            let pwdList = [];
            originList.forEach(mode => {
                if(mode.isParent){
                    if(mode.icon == ""){
                        let newMode = {...mode,children:[],icon:"el-icon-new-iconwenjianjia",nodeID: this.num,label:mode.name};
                        pwdList.push(newMode);
                    }
                    else{
                         let newMode = {...mode,children:[], nodeID: this.num,label:mode.name};
                        pwdList.push(newMode);
                    }
                }
                else{
                    if(mode.icon == ""){
                        let newMode = {...mode,icon:"el-icon-new-iconwenjian1",nodeID: this.num,label:mode.name};
                        pwdList.push(newMode);
                    }
                    else{
                        let newMode = {...mode,label:mode.name,nodeID: this.num};
                        pwdList.push(newMode);
                    }
                }
            })
            let root = pwdList.find(node => node.pid == -1);
            let newRoot = this.createTree(root,pwdList);
            this.tree =[newRoot];
        },
        //初始化口令模板树
        pwdModeInit(){
            console.log("pwdModeInit");
              // let res = await getpwdMode(submitData);
            let res = {
                message:"获取口令模板成功",
                data:pwdMode,
                status:1,
            };
            let originList = res.data;
            let pwdList = [];
            originList.forEach(mode => {
                if(mode.isParent){
                    let newMode = {...mode,children:[],icon:"el-icon-new-iconwenjianjia",nodeID: this.num,label:mode.name};
                    pwdList.push(newMode);
                }
                else{
                    let newMode = {...mode,icon:"el-icon-new-iconwenjian1",nodeID: this.num,label:mode.name};
                    pwdList.push(newMode);
            
                }
            })
            let root = pwdList.find(node => node.pid == -1);
            let newRoot = this.createTree(root,pwdList);
            this.tree =[newRoot];
        },
        //
        handleAdd(){
            if(this.activeKey == "tab1"){
                this.nodeType = "addType";
                this.node = this.clickType.data;
                this.typeVision = true;
            }
            else{
                if(this.clickMode.data.type == -1){
                    this.$message({
                        type: 'error',
                        message: this.$t(this.prefix + 'tips.addModel'),
                        duration: 2000,
                        showClose: true
                    });
                    return;
                }else{
                    this.nodeType ="addModeName";
                    this.node = this.clickMode.data;
                    this.typeVision = true;
                }
            }
        },
        handleEdit(){
             if(this.activeKey == "tab1"){
                this.nodeType = "editType";
                this.node = this.clickType.data;
                this.typeVision = true;
            }
            else{
                if(this.clickMode.data.type == -1 || this.clickMode.data.type == -2){
                     this.$message({
                        type: 'error',
                        message: this.$t(this.prefix + 'tips.addModel'),
                        duration: 2000,
                        showClose: true
                    });
                    return;
                }
                else{
                    this.nodeType ="editModeName";
                    this.node = this.clickMode.data;
                    this.typeVision = true;
                }
            }
        },
        handleDelete(){
            let data = {};
            let confirmMsg = "";
            if(this.activeKey == "tab1"){
               data = this.clickType;
               confirmMsg = this.$t(this.prefix + 'tips.deleteType');
               this.nodeType = "deleteType";
            }
            else{
                data = this.clickMode;
                if(data.data.isParent){
                     this.$message({
                        type: 'error',
                        message: this.$t(this.prefix + 'tips.deleteRootMode'),
                        duration: 2000,
                        showClose: true
                    });
                    return;
                }
                else{
                    this.nodeType = "deleteMode";
                    confirmMsg = this.$t(this.prefix + 'tips.deleteMode');
                }
            }
            this.$confirm(confirmMsg, this.$t(this.prefix + 'tips.title'), {
                confirmButtonText: this.$t(this.prefix + 'btn.confirm'),
                cancelButtonText: this.$t(this.prefix + 'btn.cancel'),
                type: 'warning'
            }).then(async () => {
                this.delete(data, this.nodeType);
            }).catch(e => {
                console.log(e);        
            });
        },
        delete(data, type){
            try {
                // let res = {};
                // if(type == "deleteType"){
                //     res = await deletePwdMode(data);
                // }
                // else{
                //     res = await deleteTaskMode(data);
                // }
                let res = {
                    message:"删除口令/任务模板成功",
                    status:1
                };
                if (res.status == 1) {
                    let parent = {};
                    if(type == "deleteType"){
                        this.$message({
                            type: 'success',
                            message: this.$t(this.prefix + 'tips.deleteTypeSuccess'),
                            duration: 2000,
                            showClose: true
                        });
                       this.pwdModeInit();
                    }
                    else{
                        this.$message({
                            type: 'success',
                            message: this.$t(this.prefix + 'tips.deleteModeSuccess'),
                            duration: 2000,
                            showClose: true
                        });
                        this.taskModeInit();
                    }
                } else {
                    throw new Error(res.message);
                }
            } catch(err) {
                this.$message({
                    type: 'error',
                    message: err.message,
                    duration: 2000,
                    showClose: true
                });
            }    
        },
        handleClose(value){
            if(value == "addType" || value == "editType"){
                this.pwdModeInit();
                this.typeVision = false;
            }
            else if(value == "addModeName" || value == "editModeName"){
                this.taskModeInit();
                this.typeVision = false;
            }
            else{
                this.typeVision = false;
            }
        },
    },
    created(){
        console.log("created");
        if(this.activeKey == "tab1"){
             this.pwdModeInit();
             this.addTitle = this.$t(this.prefix + "btn.addType");
             this.editTitle = this.$t(this.prefix + "btn.editType");
        }
        else{
             this.taskModeInit();
             this.addTitle = this.$t(this.prefix + "btn.addModeName");
             this.editTitle =  this.$t(this.prefix + "btn.renameModeName");
        }
        this.disable = true;
    },
    components:{
        AddEditDialog,
    }
}
</script>
<style scoped>
    .node{
       color:  #409EFF;
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

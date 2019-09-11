<template>
    <!-- 修改字典弹框 -->
    <el-dialog :title="title" :visible.sync="editDialog" :close-on-click-modal="false" width="40%" @close="handleClose('cancel')">
       <el-form :model="editForm" ref="editForm">
            <el-form-item :label="label" :label-width="labelWidth">
                 <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="small" plain @click="handleClose('cancel')">{{ $t(prefix + 'btn.cancel') }}</el-button>
            <el-button type="primary" size="small" plain @click="handleConfirm">{{ $t(prefix + 'btn.confirm') }}</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name:"AddEditDialog",
    props:{
        type:{
            type:String,
            default:""
        },
        node:{
            type:Object,
            default:{}
        },
        visibleDialog:{
            type:Boolean,
            default:false,
        },
    },
    data(){
        return {
            prefix:"app.table.task.templateConfig.",
            editForm:{name:""},
            labelWidth:"0px",
            title:"",
            label:""
        }
    },
    computed:{
        editDialog:{
            get(){
                if(this.visibleDialog){
                    if(this.$i18n.locale == "en"){
                        this.labelWidth = "130px";
                    }
                    else{
                        this.labelWidth = "80px";
                    };
                    this.handleOpen();
                }
                return this.visibleDialog;
            },
            set(val){
                return val;
            }
        },
    },
    methods:{
        handleOpen(){
            if(this.type == "addType"){
                this.title = this.$t(this.prefix + "addType.addTitle");
                this.label = this.$t(this.prefix + "addType.name") ;
                this.editForm = {name:""};
            }
            else if(this.type == "editType"){
                this.title = this.$t(this.prefix + "addType.editTitle");
                this.label = this.$t(this.prefix + "addType.name");
                this.editForm = {name:this.node.name};
            }
            else if(this.type == "addModeName"){
                this.title = this.$t(this.prefix + "addModeName.addTitle") + ":" + this.node.name + ")";
                this.label = this.$t(this.prefix + "addModeName.name");
                 this.editForm = {name:""};
            }
            else{
                this.title = this.$t(this.prefix + "addModeName.editTitle") + ":" + this.node.name + ")";
                this.label = this.$t(this.prefix + "addModeName.name");
                this.editForm = {name:this.node.name};
            }
        },
        handleClose(type){
            this.$emit("close", type);
        },
        //确认请求
        handleConfirm(){
            try {
                console.log({dictID:this.dictID, name:this.editForm.name});
                if(this.type == "addType"){
                      // let res = addType({dictID:this.dictID, name:this.editForm.name});
                    let res = {
                        message:"新增类型成功",
                        status:1,
                    };
                    this.handleResponse("addType",res);
                }
                else if(this.type == "editType"){
                       // let res = editType({dictID:this.dictID, name:this.editForm.name});
                    let res = {
                        message:"修改类型成功",
                        status:1,
                    };
                    this.handleResponse("editType",res);
                }
                else if(this.type == "addModeName"){
                      // let res = addModeName({dictID:this.dictID, name:this.editForm.name});
                    let res = {
                        message:"添加模板名成功",
                        status:1,
                    };
                    this.handleResponse("addModeName",res);
                }
                else{
                    // let res = editModeName({dictID:this.dictID, name:this.editForm.name});
                    let res = {
                        message:"重命名模板成功",
                        status:1,
                    };
                    this.handleClose("editModeType",res);
                }
            } catch(err) {
                this.$message({
                    type: 'error',
                    message: err.message,
                    duration: 2000,
                    showClose: true
                });
                this.handleClose("cancel");
            }    
        },
        handleResponse(type,res){
             if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: res.message,
                        duration: 2000,
                        showClose: true
                    });
                    this.handleClose(type);
                } else {
                    throw new Error(res.message);
                }
        }
    },
   
}
</script>
<style scoped>
    .form_inner {
            width:60%;
    }
</style>
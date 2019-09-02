<template>
    <!-- 修改字典弹框 -->
    <el-dialog :title="$t(prefix + 'addTitle')" :visible.sync="editDialog" :close-on-click-modal="false" width="30%" @close="handleClose(false)">
       <el-form :model="editForm" ref="editForm">
            <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="small" plain @click="handleClose(false)">{{ $t(prefix + 'btn.cancel') }}</el-button>
            <el-button type="primary" size="small" plain @click="handleConfirm">{{ $t(prefix + 'btn.confirm') }}</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name:"EditDialog",
    props:{
        //添加和修改分类ID
        classifyID:{
            type:Number,
            default:0
        },
        //添加和修改分类别名
        dictAlign:{
            type:String,
            default:""
        },
        //可见性
        visibleDialog:{
            type:Boolean,
            default:false,
        },
    },
    data(){
        return {
            prefix:"app.table.dictionary.dictClass.",
            editForm:{name:""},
        }
    },
    computed:{
        editDialog:{
            get(){
                if(this.visibleDialog){
                    if(this.dictAlign != ""){
                        this.editForm = {name:this.dictAlign};
                    }
                    else{
                        this.editForm = {name:""};
                    }
                }
                return this.visibleDialog;
            },
            set(val){
                return val;
            }
        },
    },
    methods:{
        //点击取消时关闭弹框
        handleClose(data){
            this.$emit("handleClose", {visible:false,reset:data});
        },
        //确定按钮触发
        handleConfirm(){
            try {
                let res = {};
                if(this.dictAlign == ""){
                     console.log({classifyID:this.classifyID, name:this.editForm.name});
                    //  let res = editClassification({dictID:this.dictID, name:this.editForm.name});
                    res = {
                        message:"新增字典分类成功",
                        status:1,
                    };
                }
                else{
                     console.log({classifyID:this.classifyID, name:this.editForm.name});
                    //  let res = editClassification({dictID:this.dictID, name:this.editForm.name});
                    res = {
                        message:"编辑字典分类成功",
                        status:1,
                    };
                }
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: res.message,
                        duration: 2000,
                        showClose: true
                    });
                    this.handleClose(true);
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
                this.handleClose(false);
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
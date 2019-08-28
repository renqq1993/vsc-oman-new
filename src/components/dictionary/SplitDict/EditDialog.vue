<template>
    <!-- 修改字典弹框 -->
    <el-dialog :title="$t(prefix + 'editTable')" :visible.sync="editDialog" :close-on-click-modal="false" width="30%" @close="handleClose">
       <el-form :model="editForm" ref="editForm">
            <el-form-item :label="$t(prefix + 'editColumn.name')" label-width="160px">
                 <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="small" plain @click="handleClose">{{ $t(prefix + 'btn.cancel') }}</el-button>
            <el-button type="primary" size="small" plain @click="handleEdit">{{ $t(prefix + 'btn.confirm') }}</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name:"EditDialog",
    props:{
        dictID:{
            type:Number,
            default:0
        },
        dictAlign:{
            type:String,
            default:""
        },
        visibleDialog:{
            type:Boolean,
            default:false,
        },
    },
    data(){
        return {
            prefix:"app.table.dictionary.splitDict.",
            editForm:{name:""},
        }
    },
    computed:{
        editDialog:{
            get(){
                if(this.visibleDialog){
                    this.editForm = {name:this.dictAlign};
                }
                return this.visibleDialog;
            },
            set(val){
                return val;
            }
        },
    },
    methods:{
        handleClose(){
            this.$emit("handleClose", false);
        },
        //修改请求
        handleEdit(){
            try {
                console.log({dictID:this.dictID, name:this.editForm.name});
                // let res = editSplitDict({dictID:this.dictID, name:this.editForm.name});
                let res = {
                    message:"编辑字典成功",
                    status:1,
                };
                if (res.status == 1) {
                    this.$message({
                        type: 'error',
                        message: res.message,
                        duration: 2000,
                        showClose: true
                    });
                    this.handleClose();
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
                this.handleClose();
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
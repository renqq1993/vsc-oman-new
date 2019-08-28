<template>
    <!-- 合并字典列表 -->
    <el-dialog :title="$t(prefix + 'mergeTable')" :visible.sync="mergeDialog" :close-on-click-modal="false" width="50%" @close="handleClose">
       <el-alert :title="$t(prefix + 'tips.mergeTip')" type="info" show-icon> </el-alert>
       <el-form :model="mergeForm" ref="mergeForm">
            <el-form-item :label="$t(prefix + 'mergeColumn.orginDict')" label-width="160px">
                 <el-select v-model="mergeForm.orginDict"  class="form_inner">
                    <el-option v-for="(dict,index) in selectDict" :key="index" :label="dict.name" :value="dict.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t(prefix + 'mergeColumn.targetDict')" label-width="160px">
            <el-select v-model="mergeForm.targetDict"  class="form_inner">
                <el-option v-for="(dict,index) in selectDict" :key="index" :label="dict.name" :value="dict.id"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="small" plain @click="handleClose">{{ $t(prefix + 'btn.cancel') }}</el-button>
            <el-button type="primary" size="small" plain @click="handleMerge">{{ $t(prefix + 'btn.merge') }}</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name:"MergeDialog",
    props:{
        selectDict:{
            type:Array,
            default:[]
        },
        visibleDialog:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {
            prefix:"app.table.dictionary.splitDict.",
        }
    },
    computed:{
        mergeForm(){
            if(this.selectDict.length == 2){
                return {
                    orginDict:this.selectDict[0].name,
                    targetDict:this.selectDict[1].name
                }
            }
            else{
                 return {
                    orginDict:"",
                    targetDict:""
                }
            }
        },
        mergeDialog:{
            get(){
                return this.visibleDialog;
            },
            set(val){
                return val;
            }
        }
    },
    methods:{
        handleClose(){
            this.$emit("handleClose", false);
        },
        // 合并请求
        handleMerge(){
            try {
                // let res = mergeDict(this.mergeForm.orginDict, this.mergeForm.targetDict);
                let res = {
                    message:"合并字典成功",
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
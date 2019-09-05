<template>
    <!-- 合并字典列表 -->
    <el-dialog :title="$t(prefix + 'mergeTable')" :visible.sync="mergeDialog" :close-on-click-modal="false" width="50%" @close="handleClose">
       <el-alert :title="$t(prefix + 'tips.mergeTip')" type="warning" show-icon> </el-alert>
       <el-form :model="mergeForm" ref="mergeForm">
            <el-form-item :label="$t(prefix + 'mergeColumn.orginDict')" label-width="160px">
                 <el-select v-model="mergeForm.orginDict"  class="form_inner" @change="handleOrginDictChange">
                    <el-option v-for="(dict,index) in selectDict" :key="index" :label="dict.name" :value="dict.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t(prefix + 'mergeColumn.targetDict')" label-width="160px">
            <el-select v-model="mergeForm.targetDict"  class="form_inner" @change="handleTargetDictChange">
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
            mergeForm:{
                orginDict:"",
                targetDict:""
            },
        }
    },
    computed:{
        mergeDialog:{
            get(){
                if(this.visibleDialog){
                    this.mergeForm = {
                        orginDict:this.selectDict[0].name,
                        targetDict:this.selectDict[1].name
                    };
                }
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
                let originDictID = 0;
                let targetDictID = 0;

                if(typeof(this.mergeForm.orginDict) !='number'){
                    let orginDict = this.selectDict.find(dict => dict.name == this.mergeForm.orginDict);
                    originDictID = orginDict.id;
                }
                else{
                    originDictID = this.mergeForm.orginDict;
                }
                if(typeof(this.mergeForm.targetDict) !='number'){
                    let targetDict = this.selectDict.find(dict => dict.name == this.mergeForm.targetDict);
                    targetDictID = targetDict.id;
                }
                else{
                    targetDictID = this.mergeForm.targetDict;
                }
                console.log({origin:originDictID, target:targetDictID});
                // let res = mergeDict(this.mergeForm.orginDict, this.mergeForm.targetDict);
                let res = {
                    message:"合并字典成功",
                    status:1,
                };
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
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
        },
        //选择原始字典触发
        handleOrginDictChange(value){
            if(value == this.selectDict[0].id||value == this.selectDict[0].name){
                this.mergeForm.targetDict = this.selectDict[1].name;
            }
            else if(value == this.selectDict[1].name || value == this.selectDict[1].id){
                this.mergeForm.targetDict = this.selectDict[0].name;
            }
        },
        //选择目的字典触发
        handleTargetDictChange(value){
            if(value == this.selectDict[0].name || value == this.selectDict[0].id){
                this.mergeForm.orginDict = this.selectDict[1].name;
            }
            else if(value == this.selectDict[1].name || value == this.selectDict[1].id){
                this.mergeForm.orginDict = this.selectDict[0].name;
            }
        },
    },
   
}
</script>
<style scoped>
    .form_inner {
            width:60%;
    }
</style>
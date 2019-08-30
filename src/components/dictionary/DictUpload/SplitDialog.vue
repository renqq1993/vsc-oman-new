<template>
    <div>
        <!-- 提交字典切分 -->
        <el-dialog :title="$t(prefix + 'splitTitle')" :visible.sync="splitDialog" :close-on-click-modal="false" width="50%" @close="handleClose">
            <el-form :model="ruleForm"  ref="ruleForm" :rules="rules" label-width="180px" class="demo-ruleForm">
                <el-form-item :label="$t(prefix + 'splitForm.filename')" prop="name">
                   <span>{{dict.name}}</span>
                </el-form-item>
                <el-form-item :label="$t(prefix + 'splitForm.filepath')" prop="region">
                   <span>{{dict.path}}</span>
                </el-form-item>
                <el-form-item :label="$t(prefix + 'splitForm.dictAlign')" required prop="align">
                    <el-input v-model="ruleForm.align"></el-input>
                </el-form-item>
                <el-form-item :label="$t(prefix + 'splitForm.splitSize')" prop="size">
                    <el-input v-model="ruleForm.size">
                        <template slot="append">MB</template>
                    </el-input>
                    <div class="tips">
                        {{$t(prefix + 'tips.splitTip')}}
                    </div>
                </el-form-item>
                <el-form-item :label="$t(prefix + 'splitForm.classify')" prop="classification">
                    <div class="classify">
                        <el-tag v-for="tag in tags" :key="tag.label"  effect="plain" closable :disable-transitions="false" @close="handleCloseTag(tag)">
                            {{ tag.label }}
                        </el-tag>
                        <el-button plain @click="handleAdd()" type="primary" icon="el-icon-plus" size="mini" :title="$t(prefix + 'btn.add')"></el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.checked">{{$t(prefix + 'tips.deleteFile')}}</el-checkbox>
                </el-form-item>
             </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" size="small" plain @click="handleClose">{{ $t(prefix + 'btn.cancel') }}</el-button>
                <el-button type="success"  size="small" plain @click="handleConfirm">{{ $t(prefix + 'btn.confirm') }}</el-button>
            </div>
        </el-dialog>
         <classfication-dialog type="split" :visibleModal="classifyVision" @TreeNodeClose="handleDialogClose" @addClassification="addClassify"></classfication-dialog>
    </div>
</template>
<script>
import ClassficationDialog from '@/components/dictionary/SplitDict/ClassficationDialog'
import {submitSplit} from '@/api/getData'
import $ from 'jquery'
export default {
    name:"SplitDialog",
    props:{
        visibleDialog:{
            type:Boolean,
            default:false,
        },
        dict:{
            type:Object,
            default:{},
        }
    },
    data(){
        var checksize = (rule, value, callback) => {
            if (!value) {
                $(".tips").hide()
                return callback(new Error(this.$t('app.table.dictionary.dictUpload.tips.emptyTip')));
            }
            setTimeout(() => {
                let pattern = /^\d+$/;
                if(!pattern.test(value)){
                    $(".tips").hide()
                    return callback(new Error(this.$t('app.table.dictionary.dictUpload.tips.numberTip')));
                }
                else{
                    $(".tips").show();
                    return callback();
                } 
            }, 50);
        };
        var checkAlign = (rule, value, callback) =>{
             if (!value) {
                return callback(new Error(this.$t('app.table.dictionary.dictUpload.tips.alignTip')));
            }
        }
        return {
            prefix:"app.table.dictionary.dictUpload.",
            classifyVision:false,
            ruleForm:{
                align:"",
                size:"20",
                checked:""
            },
            type:"split",
            tags:[],
            rules: {
                align: [
                    { validator: checkAlign, trigger: 'blur' },
                ],
                size:[
                    { validator: checksize, trigger: 'blur' }
                ]
            }
        };
    },
    computed:{
        splitDialog:{
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
            this.$emit("dialogClose", false);
        }, 
        handleCloseTag(tag){
            let index = this.tags.indexOf(tag);
            this.tags.splice(index,1);
        },

        //添加
        handleAdd(){
            this.type = "add";
            this.classifyVision = true;
        },

        handleConfirm(){
            let submitData = {};
            let that = this;
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                     try {
                        // let res = await submitSplit(data);
                        let res = {
                            message:"删除指定历史字典成功",
                            status:1,
                            data:HistoryDict
                        };
                        if (res.status == 1) {
                            that.handleClose();
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
                        that.handleClose();
                    }    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        handleDialogClose(value){
            this.classifyVision = value;
        },

        addClassify(value){
            this.tags.push(value);
        }
    },
    components:{
        ClassficationDialog
    }
}
</script>
<style scoped>
    /deep/ .el-icon-new-iconreplace{
        font-size: 12px;
    }
    .tips{
        color:#67C23A;
        font-size:12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
    }
    .classify{
        border: 1px solid #DCDFE6;
        height:100px;
        width:100%;
    }
    
</style>
<template>
    <div>
        <!-- 提交字典切分 -->
        <el-dialog :title="$t(prefix + 'splitTitle')" :visible.sync="splitDialog" :close-on-click-modal="false" width="50%" @close="handleClose">
            <el-form :model="ruleForm"  ref="ruleForm" :rules="rules" :label-width="labelWidth" class="demo-ruleForm">
                <el-form-item :label="$t(prefix + 'splitForm.filename')" prop="name">
                   <span class="text">{{dict.name}}</span>
                </el-form-item>
                <el-form-item :label="$t(prefix + 'splitForm.filepath')" prop="region">
                   <span class="text">{{dict.path}}</span>
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
        //切分大小表单验证
        var checksize = (rule, value, callback) => {
            if (!value) {
                this.ruleForm.size = 0;
                $(".tips").show();
                return callback();
            }
            else{
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
            }
        };
        //字典别名表单验证
        var checkAlign = (rule, value, callback) =>{
             if (!value) {
                return callback(new Error(this.$t('app.table.dictionary.dictUpload.tips.alignTip')));
            }
            else{
                return callback();
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
            },
            labelWidth:"0px",
        };
    },
    computed:{
        splitDialog:{
            get(){
                if(this.visibleDialog){
                    if(this.$i18n.locale == "en"){
                        this.labelWidth = "175px";
                    }
                    else{
                        this.labelWidth = "100px";
                    };
                    this.tags = [];
                    this.$nextTick(() =>{
                         this.$refs['ruleForm'].resetFields();
                    })
                }
                return this.visibleDialog;
            },
            set(val){
                return val;
            }
        }
    },
    methods:{
        //关闭弹框
        handleClose(){
            this.$emit("dialogClose", false);
        }, 
        //删除字典分类tag
        handleCloseTag(tag){
            let index = this.tags.indexOf(tag);
            this.tags.splice(index,1);
        },

        //显示全部分类
        handleAdd(){
            this.type = "add";
            this.classifyVision = true;
        },
        //确定
        handleConfirm(){
            let submitData = {};
            let that = this;
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    try {
                        // let res = await submitSplit(submitData);
                        let res = {
                            message:"切分历史字典成功",
                            status:1,
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
                    this.$message({
                        type: 'error',
                        message: this.$t(this.prefix + 'tips.formTip'),
                        duration: 2000,
                        showClose: true
                    });
                    return false;
                }
            });
        },

        // 处理全部字典分类弹框关闭 
        handleDialogClose(value){
            this.classifyVision = value.open;
        },
        //添加字典分类
        addClassify(value){
            if(this.tags.indexOf(value) == -1){
                 this.tags.push(value);
            }
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
        margin-top: 13px;
    }
    .text{
        display:inline-block;
        width:100%;
        white-space:nowrap; 
        text-overflow:ellipsis; 
        overflow: hidden;
    }
    
</style>
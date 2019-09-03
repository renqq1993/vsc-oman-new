<template>
    <!-- 全部字典分类弹框 -->
    <el-dialog :title="$t(prefix + 'dictClassificationTable')" width="50%" :visible.sync="classifiedVisiable" :close-on-click-modal="false"  @close="handleClose(false)">
        <div class="vsc-target-choose">
            <el-alert :title="$t(prefix + 'tips.emptyTip')" type="success"></el-alert>
            <el-row>
                <el-col :span="11">
                    <div class="border">
                         <classification-tree @nodeClick="handleClick"></classification-tree>
                    </div>
                </el-col>
                <el-col :span="11" :offset="2">
                    <el-row>
                        <el-table border ref="simpleTable" :data="targetList" tooltip-effect="dark" style="margin-top: 10px; width: 100%;" height="300">
                            <el-table-column prop="label" :label="$t(prefix + 'dictClassificationColumn.name')" align="center" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button size="small"  @click="handleClose(false)">{{$t(prefix + 'btn.cancel')}}</el-button>
             <el-button size="small" type="primary" @click="confirm()">{{$t(prefix + 'btn.confirm')}}</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import ClassificationTree from '@/components/dictionary/SplitDict/ClassificationTree'
    export default {
        name: 'ClassficationDialog',
        props:{
            visibleModal:{
                type:Boolean,
                default:false,
            },
            id:{
                type:Number,
                default:0,
            },
            oldID:{
                type:Number,
                default:0
            },
            type:{
                type:String,
                default:"replace"
            }
        },
        data(){
            return {
                prefix:"app.table.dictionary.splitDict.",
                targetList:[]
            };
        },
        computed:{
            classifiedVisiable:{
                get(){
                    if(this.visibleModal){
                        this.targetList = [];
                    }
                    return this.visibleModal;
                },
                set(val){
                    return val;
                }
            }
        },
        methods:{
            //关闭弹框
            // reset:判断关闭弹框后是否需要刷新字典分类列表
            //true刷新，false:不刷新
            handleClose(reset){
                this.$emit("TreeNodeClose", {open:false, reset:reset});
            },
            //点击树节点触发
            handleClick(value){
                this.targetList = [value];
            },

            //确定按钮触发
            async confirm(){
                this.loading = true;
                console.log(this.type);
                if(this.targetList.length > 0){
                    try {
                        //替换字典分类
                        if(this.type == "replace"){
                               // const res = await  replaceDictClassification({
                            //     dictId: this.id, 
                            //     oldNodeId: this.oldID,
                            //     newNodeId:this.targetList[0]
                            // });	
                        }
                        //字典上传中，切分字典弹框的添加字典分类
                        else if(this.type == "split"){
                            this.$emit("addClassification", this.targetList[0]);
                            this.handleClose(false);
                            return;
                        }
                        //添加字典分类
                        else{
                                // const res = await  addDictClassification({
                            //     dictId: this.id, 
                            //     newNodeId:this.targetList[0]
                            // });	
                        }
                        console.log({
                             dictId: this.id, 
                             oldNodeId: this.oldID,
                             newNodeId:this.targetList[0].NodeId });
                        let res = {
                            message:"加载切分字典列表成功",
                            status:1
                        };
                        if (res.status == 1) {
                            this.loading = false;
                            this.total = res.total;
                            let num = 0;

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
                        this.loading = false;
                        this.$message({
                            type: 'error',
                            message: err.message,
                            duration: 2000,
                            showClose: true
                        });
                        this.handleClose(false);
                    }
                 }
                else{
                    this.$message({
                            type: 'info',
                            message: this.$t(this.prefix + 'tips.chooseClassifyTip'),
                            duration: 2000,
                            showClose: true
                    });
                }
            },
        },
        components:{
            ClassificationTree
        }
    }
</script>
<style scoped>
    .border{
        border: 1px solid #EBEEF5;
        margin-top: 10px;
        height:300px;
    }
</style>

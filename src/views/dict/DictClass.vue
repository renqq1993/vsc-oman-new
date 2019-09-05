<template>
    <el-card class="dict-upload-list-card" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-new-icon-RectangleCopy7"></i>
                    <span class="item-ml-5">{{ $t( prefix + 'title') }}</span>
                </p>
            </div>
            <div class="dict-upload-main clear" v-loading="loading" :element-loading-text="$t('app.table.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <div class="vsc-target-choose">
                    <el-row>
                        <el-col :span="5">
                            <div class="border">
                                <classification-tree :reset="reset" @nodeClick="handleClick" @handleReset="handleReset"></classification-tree>
                            </div>
                        </el-col>
                        <el-col :span="17" :offset="2">
                            <el-row>
                                <el-table border ref="simpleTable" :data="targetList" tooltip-effect="dark" :empty-text="$t( prefix + 'tips.emptyTip')" style="margin-top: 10px; width: 100%;" height="300">
                                    <el-table-column prop="label" :label="$t( prefix + 'column.name')" align="center" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="ope" :label="$t( prefix + 'column.ope')" align="center" show-overflow-tooltip>
                                         <template slot-scope="scope">
                                             <el-button plain @click="handleAdd(scope.row)" type="primary" icon="el-icon-plus"  size="mini" :title="$t( prefix + 'btn.add')"></el-button>
                                             <el-button plain @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit"  size="mini" :title="$t( prefix + 'btn.edit')"></el-button>
                                            <el-button plain @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete"  size="mini" :title="$t( prefix + 'btn.delete')"></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
        <dict-class-dialog :visibleDialog="dialogVision" :classifyID="classifyId" :dictAlign="classifyAlias" @handleClose="handleClose"></dict-class-dialog>
        </el-card>
</template>
<script>
 import ClassificationTree from '@/components/dictionary/SplitDict/ClassificationTree'
 import DictClassDialog from '@/components/dictionary/DictClass/DictClassDialog'

    export default {
        name: 'DictClass',
        data(){
            return {
                prefix:"app.table.dictionary.dictClass.",
                //表格数据list
                targetList:[],
                loading:false,
                dialogVision:false,
                //添加和修改分类ID
                classifyId:0,
                //修改分类name
                classifyAlias:"",
                //对树节点init
                reset:false, //true:节点树init
            };
        },
        methods:{
            handleClose(value){
                //是否init节点
                this.reset = value.reset;
                this.dialogVision = value.visible;
            },
            //点击树节点触发
            handleClick(value){
                this.targetList = [value];
            },
            //添加树节点
            handleAdd(dict){
                this.classifyId = dict.id;
                this.classifyAlias = "";
                this.dialogVision = true;
            },
            //修改树节点
            handleEdit(dict){
                this.classifyId = dict.id;
                this.classifyAlias = dict.label;
                this.dialogVision = true;
            },
            //删除树节点操作
            async deleteDictClass(data){
                try {
                    //  res = await deleteHisDict(data);
                    let res = {
                        message:"删除字典分类成功",
                        status:1,
                    };
                    if (res.status == 1) {
                        this.reset = true;
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
            // 删除树节点
            handleDelete(classification){
                this.$confirm(this.$t(this.prefix + 'tips.deleteTip'), this.$t(this.prefix + 'tips.tipTitle'), {
                    confirmButtonText: this.$t(this.prefix + 'btn.confirm'),
                    cancelButtonText: this.$t(this.prefix + 'btn.cancel'),
                    type: 'warning'
                }).then(async () => {
                    this.deleteDictClass(classification);
                    return;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t(this.prefix + 'tips.cancelTip'),
                        duration: 2000,
                        customClass: 'message_zIndex',
                        showClose: true
                    });          
                });
            },
            //节点树init后返回处理
            handleReset(value){
                this.reset = value;
            }
        },
        components:{
            //节点树组件
            ClassificationTree,
            //添加和修改树弹框
            DictClassDialog,
        }
    }
    </script>
    <<style scoped>
    .border{
        border: 1px solid #EBEEF5;
        margin-top: 10px;
        height:400px;
    }
    </style>
<template>
    <div>
        <!-- 字典分类弹框 -->
        <el-dialog :title="$t(prefix + 'dictClassificationTable')" :visible.sync="ClassifyDialog" :close-on-click-modal="false" width="40%" @close="handleClose">
            <el-table :data="tableData" ref="multipleTable" border  style="width: 100%">
                        <el-table-column fixed prop="name"  :label="$t( prefix + 'dictClassificationColumn.name')" width="200" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="operation"  :label="$t(prefix + 'dictClassificationColumn.operation')" width="390" align="center" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button size="mini" plain icon="el-icon-delete" :title="$t(prefix + 'btn.delete')" type="danger" @click="handleDelete(scope.row)"></el-button>
                                <el-button size="mini" plain icon="el-icon-new-iconreplace" :title="$t(prefix + 'btn.replace')" type="primary" @click="handleReplace(scope.row)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page">
                        <el-pagination
                            class="item-mt-20"
                            @size-change="handlePageSizeChange"
                            @current-change="handleCurrentPageChange"
                            :current-page="currentPage"
                            :page-sizes="pageRange"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                    </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="success"  size="small" plain @click="handleAdd">{{ $t(prefix + 'btn.add') }}</el-button>
                <el-button type="success"  size="small" plain @click="handleClear">{{ $t(prefix + 'btn.clear') }}</el-button>
                <el-button type="danger" size="small" plain @click="handleClose">{{ $t(prefix + 'btn.close') }}</el-button>
            </div>
        </el-dialog>
        <classfication-dialog :id="id" :oldID="oldNodeId" :type="type" :visibleModal="dialogVision" @TreeNodeClose="handleDialogClose"></classfication-dialog>
    </div>
</template>
<script>
import {classification} from '@/mock/mock.js'
import ClassficationDialog from '@/components/dictionary/SplitDict/ClassficationDialog'
export default {
    name:"DictClassificationDetail",
    props:{
        visibleDialog:{
            type:Boolean,
            default:false,
        },
        id:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            prefix:"app.table.dictionary.splitDict.",
            pageRange: this.$config.PageRange,
            pageSize: this.$config.PageRange[0],
            total:0,
            currentPage:1,
            loading:false,
            dialogVision:false,
            oldNodeId:0,
            type:"",
        }
    },
    computed:{
        ClassifyDialog:{
            get(){
                return this.visibleDialog;
            },
            set(val){
                return val;
            }
        },
        tableData:{
            get(){
                if(this.id == 0){
                    return [];
                }
                else{
                    return this.init(this.id);
                }
            },
            set(val){
                this.tableData = val;
            }
        }
    },
    methods:{
        handleClose(){
            this.$emit("dialogClose", false);
        }, 
        init(id){
            this.loading = true;
            try {
                // const res = await  getSpliteDictList({
                // 	curPage: this.currentPage, 
                // 	pageSize: this.pageSize,
                //  id:this.id
                // });	

                let res = {
                    message:"加载切分字典列表成功",
                    status:1,
                    data:classification,
                    total:2,
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
                    return res.data;
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
                return [];
            }
        },
        handlePageSizeChange(val){
            this.pageSize = val;
            this.init(this.id);
        },
        handleCurrentPageChange(val){
            this.currentPage = val;
            this.init(this.id);
        },
        // 替换
        handleReplace(value){
            this.type = "replace";
            this.oldNodeId = parseInt(value.NodeId);
            this.dialogVision = true;
        },

        //添加
        handleAdd(){
            this.type = "add";
            this.dialogVision = true;
        },

        //操作
        handleOperation(requestData, confirmMsg, type){
             this.$confirm(confirmMsg , '提示', {
					confirmButtonText: this.$t(this.prefix + 'btn.confirm'),
					cancelButtonText: this.$t(this.prefix + 'btn.cancel'),
					type: 'warning'
				}).then(async () => {
                     try {
                         if(type == 'delete'){
                              // const res = await  deleteDictClassification(requestData);	
                         }
                         else{
                              // const res = await  clearDictClassification(requestData);	
                         }
                       
                        let res = {
                            message:"加载切分字典列表成功",
                            status:1,
                        };
                        if (res.status == 1) {
                            this.init(this.id);
                            this.$message({
                                type: 'success',
                                message: res.message,
                                duration: 2000,
                                showClose: true
                            });
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
				});
        },
        //删除
        handleDelete(value){
            let requestData = {
                id:value.id,
                dictId:this.id
            };
            let confirmMsg = this.$t(this.prefix + 'tips.deleteClassifyTip');
            this.handleOperation(requestData, confirmMsg, 'delete');
        },
        //清空
        handleClear(value){
            let requestData = {
                dictId:this.id
            };
            let confirmMsg = this.$t(this.prefix + 'tips.clearClassifyTip');
            this.handleOperation(requestData, confirmMsg, 'clear');
        },

       handleDialogClose(data){
           this.init(this.id);
           this.dialogVision = data;
       }
    },
    components:{
        ClassficationDialog
    }
}
</script>
<style scoped>
     .page{
        text-align: center;
    }
    /deep/ .el-icon-new-iconreplace{
        font-size: 12px;
    }
</style>
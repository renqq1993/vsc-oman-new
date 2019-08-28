<template>
    <!-- 切分字典详情弹框 -->
    <el-dialog :title="$t(prefix + 'splitDictTable')" :visible.sync="splitDialog" :close-on-click-modal="false" width="70%" @close="handleClose">
        <el-table :data="tableData" ref="multipleTable" border  style="width: 100%">
                    <el-table-column fixed  prop="ID"  :label="$t( prefix + 'splitDictColumn.ID')" width="100" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="name" fixed :label="$t(prefix + 'splitDictColumn.name')" width="100" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="path" :label="$t(prefix + 'splitDictColumn.path')" width="280" align="center"  show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="size" :label="$t(prefix + 'splitDictColumn.size')" width="100" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="pwdNum" :label="$t(prefix + 'splitDictColumn.pwdNum')" width="160" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="pwdLength" :label="$t(prefix + 'splitDictColumn.pwdLength')" width="160" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="encodingStyle" :label="$t(prefix + 'splitDictColumn.encodingStyle')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="createTime" :label="$t(prefix + 'splitDictColumn.createTime')" width="200" align="center" show-overflow-tooltip>
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
            <el-button type="danger" size="small" plain @click="handleClose">{{ $t(prefix + 'btn.close') }}</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {SplitDictList} from '@/mock/mock.js'
export default {
    name:"SplitDialog",
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
        }
    },
    computed:{
        splitDialog:{
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
            this.$emit("handleClose", false);
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
                    data:SplitDictList,
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
        }
    }
}
</script>
<style scoped>
    .page{
        text-align: center;
    }
</style>
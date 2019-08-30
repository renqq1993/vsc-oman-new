<template>
    <div class="app-config-main-wrapper">
        <!-- 历史字典任务列表 -->
        <el-card class="app-config-list-card" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-new-icon-icon_renwujincheng"></i>
                    <span class="item-ml-5">{{ $t(prefix + 'title') }}</span>
                </p>
                <el-button-group class="item-right">
                    <el-button @click="handleDeleteMulti" type="danger" :disabled="disable" icon="el-icon-delete"  size="mini" :title="$t( prefix + 'btn.deleteSelection')"></el-button>
                </el-button-group>
            </div>
            <div class="app-config-main clear" v-loading="loading" :element-loading-text="$t('app.table.loading')" style="width: 100%" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table :data="tableData" ref="multipleTable" border @selection-change="handleSelectionChange" style="width: 100%">
                    <el-table-column type="selection" width="50" align="center" fixed></el-table-column>
                    <el-table-column prop="ID" fixed :label="$t( prefix + 'columns.ID')" width="50" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="dictMenu" fixed :label="$t(prefix + 'columns.dictMenu')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taskStatus" fixed :label="$t(prefix + 'columns.taskStatus')" width="150" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div v-if="scope.row.taskStatus == '执行成功'" class="task_status_column" style="background: #19be6b;">{{ scope.row.taskStatus }}</div>
                            <div v-else class="task_status_column" style="background: #f00;">{{ scope.row.taskStatus }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dictFilename" :label="$t(prefix + 'columns.dictFilename')" width="200" align="center"  show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="dictAlign" :label="$t(prefix + 'columns.dictAlign')" width="150" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="dictFileSize" :label="$t(prefix + 'columns.dictFileSize')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="splitSize" :label="$t(prefix + 'columns.splitSize')" width="100" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="commitTime" :label="$t(prefix + 'columns.commitTime')" width="150" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="remark" :label="$t(prefix + 'columns.remark')" width="100" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column fixed="right" prop="operation" :label="$t(prefix + 'columns.operation')" width="100" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-button plain @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete"  size="mini" :title="$t( prefix + 'btn.delete')"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    class="item-right item-mt-20"
                    @size-change="handlePageSizeChange"
                    @current-change="handleCurrentPageChange"
                    :current-page="currentPage"
                    :page-sizes="pageRange"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
import Vue from 'vue'
import $ from 'jquery'
import { getHisOptLists, deleteHisOpt } from '@/api/getData'
import {HistoryDict} from '@/mock/mock.js'
export default {
    name: 'AppConfig',
    data() {
        return {
            prefix:"app.table.dictionary.history.",
            loading:false,
            multipleSelection: [],
            currentPage:1,
            pageRange: this.$config.PageRange,
            pageSize: this.$config.PageRange[0],
            total:0,
            tableData:[],
            //设置多选删除按钮禁用
            disable:true,
        }
    },
    methods: {
        // 初始化表格
        async initData(message) {
            this.loading = true;
            try {
                // const res = await  getHisDictLists({
                // 	curPage: this.currentPage, 
                // 	pageSize: this.pageSize
                // });	

                let res = {
                    message:"加载历史字典成功",
                    status:1,
                    data:HistoryDict,
                    total:6,
                };
                if (res.status == 1) {
                    this.loading = false;
                    this.total = res.total;
                    this.tableData = res.data;		// 加载历史字典列表，填充表格数据
                    let num = 0;
                    if(this.multipleSelection.length > 0){
                        let that = this;
                        this.multipleSelection.forEach(function(row){
                            let selectedindex =  that.tableData.findIndex(dict => dict.id == row.id);
                            if(selectedindex != undefined){
                                num ++;
                                that.$refs.multipleTable.toggleRowSelection(that.tableData[selectedindex],true);
                            }
                        });
                        if(num == 0){
                            this.$nextTick(() => {
                                this.$refs.multipleTable.clearSelection();
                            });
                        }
                    }
                    else{
                        this.$nextTick(() => {
                            this.$refs.multipleTable.clearSelection();
                        })
                    }

                        if(message == undefined){
                        message = res.message;
                    }
                    this.$message({
                        type: 'success',
                        message: message,
                        duration: 2000,
                        showClose: true
                    });
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
            }
        },

        async deleteDict(msg,data){
            try {
                // let res = {};
                // if(msg == "deleteSelection"){
                //     res = deleteSelectionDict(data);
                // }
                // else{
                //     res = deleteHisDict(data);
                // }
                let res = {
                    message:"删除指定历史字典成功",
                    status:1,
                    data:HistoryDict
                };
                if (res.status == 1) {
                    this.initData(res.message);
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

        //删除选中
        handleDeleteMulti(){
            if(this.multipleSelection.length > 0){
                this.$confirm(this.$t(this.prefix + 'tips.deleteSelection'), this.$t(this.prefix + 'tips.title'), {
                    confirmButtonText: this.$t(this.prefix + 'tips.confirm'),
                    cancelButtonText: this.$t(this.prefix + 'tips.cancel'),
                    type: 'warning'
                }).then(async () => {
                    let deleteIDs  = [];
                    this.multipleSelection.forEach(function(row){
                        deleteIDs.push(row.ID);
                    });
                    deleteDict("deleteSelection",data);
                    this.multipleSelection = [];
                }).catch(() => {
                    console.log("catch");
                    this.$message({
                        type: 'info',
                        message: this.$t(this.prefix + 'tips.cancelTip'),
                        duration: 2000,
                        customClass: 'message_zIndex',
                        showClose: true
                    });          
                });
            }
            else{
                    this.$message({
                        type: 'error',
                        message: this.$t(this.prefix + 'tips.selection'),
                        duration: 2000,
                        customClass: 'message_zIndex',
                        showClose: true
                    });    
            }
            
        },

            //删除
        handleDelete(val){
            this.$confirm(this.$t(this.prefix + 'tips.delete'), this.$t(this.prefix + 'tips.title'), {
                confirmButtonText: this.$t(this.prefix + 'tips.confirm'),
                cancelButtonText: this.$t(this.prefix + 'tips.cancel'),
                type: 'warning'
            }).then(async () => {
                deleteDict("deleteSelection",{ID:val.id});
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

        handleSelectionChange(val){
            this.multipleSelection = val;
            if(this.multipleSelection.length > 0){
                this.disable = false;
            }
            else{
                thi.disable = true;
            }
        },

        handlePageSizeChange(){
            this.initData();
        },

        handleCurrentPageChange(){
            this.initData();
        },

    },
    created(){
        this.initData();
    }
}
</script>




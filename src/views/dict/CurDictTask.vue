<template>
    <div class="cur-dict-main-wrapper">
        <!-- 历史字典任务列表 -->
        <el-card class="cur-dict-list-card" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-loading"></i>
                    <span class="item-ml-5">{{ $t(prefix + 'title') }}</span>
                </p>
            </div>
            <div class="app-config-main clear" v-loading="loading" :element-loading-text="$t('app.table.loading')" style="width: 100%" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table :data="tableData" ref="multipleTable" border  style="width: 100%">
                    <el-table-column prop="ID" fixed :label="$t( prefix + 'columns.ID')" width="50" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="direction" fixed :label="$t(prefix + 'columns.direction')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="condition" fixed :label="$t(prefix + 'columns.condition')" width="200" align="center" show-overflow-tooltip>
                         <template slot-scope="scope">
                             <!-- 待执行 -->
                            <div v-if="scope.row.condition == 0" class="task_status_column" style="background: #E6A23C;">{{  $t(prefix + 'status.wait') }}</div>
                            <!-- 正在执行 -->
                            <div v-else-if="scope.row.condition == 1" class="task_status_column"  style="background: #409EFF;">{{  $t(prefix + 'status.process') }}</div>
                            <!-- 执行成功 -->
                            <div v-else-if="scope.row.condition == 2" class="task_status_column"  style="background: #67C23A;">{{  $t(prefix + 'status.success') }}</div>
                            <!-- 执行失败 -->
                            <div v-else-if="scope.row.condition == 3" class="task_status_column"  style="background: #F56C6C;">{{  $t(prefix + 'status.failure') }}</div>
                            <!-- 被删除 -->
                            <div v-else class="task_status_column"  style="background: #909399;">{{  $t(prefix + 'status.delete') }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="progress" :label="$t(prefix + 'columns.progress')" width="200" align="center"  show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-progress :text-inside="true" :stroke-width="22" :percentage="scope.row.progress"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column prop="speed" :label="$t(prefix + 'columns.speed')" width="150" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="filename" :label="$t(prefix + 'columns.filename')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="align" :label="$t(prefix + 'columns.align')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="filesize" :label="$t(prefix + 'columns.filesize')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="splitSize" :label="$t(prefix + 'columns.splitSize')" width="160" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="commitTime" :label="$t(prefix + 'columns.commitTime')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column fixed="right" prop="operation" :label="$t(prefix + 'columns.ope')" width="150" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                           <el-button plain @click="handleStop(scope.row)" type="danger" icon="el-icon-vpn-pause"  size="mini" :title="$t( prefix + 'btn.stop')"></el-button>
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
import { getCurDictTask, stopCurDictTask, deleteCurDictTask} from '@/api/getData'
import {curDictTask} from '@/mock/mock.js'
export default {
    name: 'CurDictTask',
    data() {
        return {
            prefix:"app.table.dictionary.CurDict.",
            loading:false,
            currentPage:1,
            pageRange: this.$config.PageRange,
            pageSize: this.$config.PageRange[0],
            total:0,
            tableData:[],
            timer:0,
            //是否显示加载成功message
            flag:false,
        }
    },
    methods: {
        // 初始化表格
        async initData(message) {
            this.loading = true;
            try {
                // const res = await  getCurDictTask({
                // 	curPage: this.currentPage, 
                // 	pageSize: this.pageSize
                // });	

                let res = {
                    message:"加载当前字典任务成功",
                    status:1,
                    data:curDictTask,
                    total:5,
                };
                if (res.status == 1) {
                    this.loading = false;
                    this.total = res.total;
                    this.tableData = res.data;		// 加载历史字典列表，填充表格数据
                    if(this.flag){
                        if(message == undefined){
                            message = res.message;
                        }
                        this.$message({
                            type: 'success',
                            message: message,
                            duration: 2000,
                            showClose: true
                        });
                        this.flag = false;
                    }
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

        //删除当前任务
        handleDelete(dict){
            this.$confirm(this.$t(this.prefix + 'tips.deleteTip'), this.$t(this.prefix + 'tips.title'), {
                confirmButtonText: this.$t(this.prefix + 'btn.confirm'),
                cancelButtonText: this.$t(this.prefix + 'btn.cancel'),
                type: 'warning'
            }).then(async () => {
                // const res = await  deleteCurDictTask(dict.ID);
                let res = {
                    message:"删除当前任务成功",
                    status:1,
                };
                if (res.status == 1) {
                    this.flag = true;
                    this.initData(this.$t(prefix + 'tips.deleteSuccess'))

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
                        this.$message({
                        type: 'error',
                        message: res.message,
                        duration: 2000,
                        showClose: true
                    });
                }
            }).catch(() => {     
            });    
        },

         //停止当前任务
        handleStop(dict){
            this.$confirm(this.$t(this.prefix + 'tips.stopTip'), this.$t(this.prefix + 'tips.title'), {
                confirmButtonText: this.$t(this.prefix + 'btn.confirm'),
                cancelButtonText: this.$t(this.prefix + 'btn.cancel'),
                type: 'warning'
            }).then(async () => {
                // const res = await  stopCurDictTask(dict.ID);
                let res = {
                    message:"停止当前任务成功",
                    status:1,
                };
                if (res.status == 1) {
                    this.flag = true;
                    this.initData(this.$t(prefix + 'tips.stopSuccess'))

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
                        this.$message({
                        type: 'error',
                        message: res.message,
                        duration: 2000,
                        showClose: true
                    });
                }
            }).catch(() => {     
            });    
        },

        handlePageSizeChange(value){
            this.pageSize = value;
            this.initData();
        },

        handleCurrentPageChange(value){
            this.currentPage = value;
            this.initData();
        },

    },
    created(){
            let that = this;
            this.flag = true;
            this.initData();
            this.timer = window.setInterval(function fn(){
            that.initData();
            },this.$config.currentDictTIme);
        },
    destroyed(){
        window.clearInterval(this.timer);
    },
}
</script>
<style scoped>
/deep/ .el-icon-vpn-pause{
        font-size: 12px;
    }
</style>





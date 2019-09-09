<template>
    <div class="task-table-main-wrapper">
        <el-card class="type-table-search-card item-mb-20" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-upload2"></i>
                    <span class="item-ml-5">任务模板内容</span>
                </p>
            </div>
            <el-button-group class="item-right">
                <el-button @click="handleUpload" type="primary" icon="el-icon-new-icon-shebeiguanli3

" size="mini" :title="$t( prefix + 'btn.setTaskMode')"></el-button>
            </el-button-group>
            <div class="task-table-main clear" v-loading="loading" :element-loading-text="$t('app.table.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table :data="tableData" ref="multipleTable" border>
                    <el-table-column prop="name" align="center"  fixed :label="$t( prefix + 'taskTable.name')" width="160" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="targetFile" align="center"  fixed :label="$t( prefix + 'taskTable.targetFile')" width="160" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="resource" align="center" :label="$t( prefix + 'taskTable.resource')" width="240" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="pwdConfig" align="center" :label="$t( prefix + 'taskTable.pwdConfig')" width="240" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="parameter"   align="center" :label="$t( prefix + 'taskTable.parameter')" width="200" show-overflow-tooltip>
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
        <!-- <pwd-space-config :table="handleSet"></pwd-space-config> -->
    </div>
</template>
<script>
import Vue from 'vue'
import Bus from "@/assets/js/bus.js"
import { deleteUploadDict, getUploadDict} from '@/api/getData'
import {dictUpload} from '@/mock/mock.js'
import PwdSpaceConfig  from "@/components/task/templateConfig/PwdSpaceConfig"
export default {
    name: 'TypeTable',
    data() {
        return {
            prefix:"app.table.task.templateConfig.",
            loading: false,
            currentPage: 1,
            pageRange: this.$config.PageRange,
            pageSize: this.$config.PageRange[0],
            total: 0,
            multipleSelection: [],
            deleteDisabled: true,
            tableData:[],
            splitVision:false,
            splitDict:{},
            test:false,
        }
    },
    methods: {
       init(message, type){
            this.loading = true;
            try {
                if(this.type =="search"){
                    // const res = await  getHisDictLists({
                    // 	curPage: this.currentPage, 
                    // 	pageSize: this.pageSize,
                     //   data: this.formInline.name,
                    // });
                }
                else{
                    // const res = await  getHisDictLists({
                    // 	curPage: this.currentPage, 
                    // 	pageSize: this.pageSize,
                    // });
                }
                let res = {
                    message:"加载上传字典成功",
                    status:1,
                    data:dictUpload,
                    total:1,
                };
                if (res.status == 1) {
                    this.loading = false;
                    this.total = res.total;
                    this.tableData = res.data;		// 加载历史字典列表，填充表格数据
                    if(type == "search" || type == "delete"){
                        this.formInline.name = "";
                        this.$refs.multipleTable.clearSelection();
                    }
                    else{
                        this.handleSelection();
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
                this.formInline.name = "";
                this.$message({
                    type: 'error',
                    message: err.message,
                    duration: 2000,
                    showClose: true
                });
            }
       },
       handleSelection(){
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
       },
       onReset(form){
           this.$refs[form].resetFields();
       },
       handleDeleteMulti(){
           let deleteRow = [];
           this.multipleSelection.forEach(dict =>{
               deleteRow.push(dict.id);
           });
            this.$confirm(this.$t(this.prefix + 'tips.deleteTip') , this.$t(this.prefix + 'tips.title'), {
					confirmButtonText: this.$t(this.prefix + 'btn.confirm'),
					cancelButtonText: this.$t(this.prefix + 'btn.cancel'),
					type: 'warning'
				}).then(async () => {
                    try {
                            // const res = await  deleteUploadDict(deleteRow);	
                            let res = {
                                message:"删除上传字典列表成功",
                                status:1,
                            };
                            if (res.status == 1) {
                                this.init(res.message, 'delete');
                            } else {
                                throw new Error(res.message);
                            }
                    } catch(err) {
                        this.$refs.multipleTable.clearSelection();
                        this.$message({
                            type: 'error',
                            message: err.message,
                            duration: 2000,
                            showClose: true
                        });
                    }
				}).catch(() => {
                    this.$refs.multipleTable.clearSelection();    
                });
       },
       handleSelectionChange(val){
           this.multipleSelection = val;
           if(this.multipleSelection.length > 0){
               this.deleteDisabled = false;
           }else{
               this.deleteDisabled = true;
           }
       },
       handlePageSizeChange(val){
           this.pageSize = val;
           this.init();
       },
       handleCurrentPageChange(val){
           this.currentPage = val;
           this.init();
       },
       handleSet(){
           this.test = true;
       }
    },
    components:{
        PwdSpaceConfig
    },
    created(){
        console.log("sese");
        this.init();
    }
}
</script>
<style lang="less" scoped>
    /deep/ .el-icon-new-icon-shebeiguanli3{
        font-size: 12px;
    }
    .search{
        text-align: center;
    }
</style>



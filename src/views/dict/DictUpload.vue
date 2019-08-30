<template>
    <div class="dict-upload-main-wrapper">
        <!-- 搜索 -->
        <el-card class="dict-upload-search-card item-mb-20" shadow="hover">
            <el-form :inline="true" :model="formInline"  class="search" ref="formInline">
                <el-form-item :label="$t( prefix + 'column.dictName')" prop="name">
                    <el-input v-model="formInline.name" size="small"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" size="small" type="primary" @click="init(searchMsg,'search')" :title="$t( prefix + 'btn.search')"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-refresh" size="small" type="primary" @click="onReset('formInline')" :title="$t( prefix + 'btn.reset')"></el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 已上传文件列表列表 -->
        <el-card class="dict-upload-list-card" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-new-icon-yingyongpeizhi"></i>
                    <span class="item-ml-5">{{ $t( prefix + 'title') }}</span>
                </p>
                <el-button-group class="item-right">
                    <el-button @click="handleDeleteMulti" type="danger" icon="el-icon-delete" :disabled="deleteDisabled" size="mini" :title="$t( prefix + 'btn.deleteSel')"></el-button>
                    <el-button @click="handleUpload" type="primary" icon="el-icon-upload" size="mini" :title="$t( prefix + 'btn.upload')"></el-button>
                </el-button-group>
            </div>
            <div class="dict-upload-main clear" v-loading="loading" :element-loading-text="$t('app.table.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table :data="tableData" ref="multipleTable" border @selection-change="handleSelectionChange">
                    <el-table-column align="center" type="selection" width="100" fixed></el-table-column>
                    <el-table-column prop="ID" align="center"  :label="$t( prefix + 'column.ID')" width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="name" align="center" :label="$t( prefix + 'column.name')" width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="path" align="center" :label="$t( prefix + 'column.path')" width="600" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="operation" align="center" :label="$t( prefix + 'column.ope')" width="200" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-button plain @click="handleSplit(scope.row)" type="success" icon="el-icon-new-icon-qiefen"  size="mini" :title="$t( prefix + 'btn.split')"></el-button>
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
        <split-dialog :dict="splitDict" :visibleDialog="splitVision"  @dialogClose="handleSplitClose"></split-dialog>
    </div>
</template>
<script>
import Vue from 'vue'
import Bus from "@/assets/js/bus.js"
import { deleteUploadDict, getUploadDict} from '@/api/getData'
import {dictUpload} from '@/mock/mock.js'
import SplitDialog  from '@/components/dictionary/DictUpload/SplitDialog'
export default {
    name: 'AppConfig',
    data() {
        return {
            prefix:"app.table.dictionary.dictUpload.",
            formInline: {
                name: '',
            },
            loading: false,
            currentPage: 1,
            pageRange: this.$config.PageRange,
            pageSize: this.$config.PageRange[0],
            total: 0,
            multipleSelection: [],
            deleteDisabled: true,
            tableData:[],
            searchMsg:this.$t(this.prefix + 'tips.searchSuccess'),
            splitVision:false,
            splitDict:{}
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
                    if(type == "search"){
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
            this.$confirm(this.$t(this.prefix + 'tips.deleteTip') , '提示', {
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
                                this.init();
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
       handleUpload(){
           Bus.$emit("openDictUploader");
       },
       handleSelectionChange(val){
           this.multipleSelection = val;
           if(this.multipleSelection.length > 0){
               this.deleteDisabled = false;
           }else{
               this.deleteDisabled = true;
           }
       },
       handleSplit(dict){
           this.splitDict = dict;
           this.splitVision = true;
       },
       handlePageSizeChange(val){
           this.pageSize = val;
           this.init();
       },
       handleCurrentPageChange(val){
           this.currentPage = val;
           this.init();
       },
       handleSplitClose(value){
           this.splitVision = value;
       }
    },
    components:{
        SplitDialog
    },
    created(){
        this.init();
    }
}
</script>
<style lang="less" scoped>
    /deep/ .el-icon-new-icon-qiefen{
        font-size: 12px;
    }
</style>



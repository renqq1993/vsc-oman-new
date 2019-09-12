<template>
    <div class="type-table-main-wrapper">
        <el-card class="type-table-search-card item-mb-20" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-upload2"></i>
                    <span class="item-ml-5">口令模板内容</span>
                </p>
            </div>
            <el-form :inline="true" :model="formInline"  class="search" ref="formInline">
                <el-form-item :label="$t( prefix + 'searchTab.modeID')" prop="modeID">
                    <el-input v-model="formInline.modeID" size="small"  clearable></el-input>
                </el-form-item>
                <el-form-item :label="$t( prefix + 'searchTab.name')" prop="name">
                    <el-input v-model="formInline.name" size="small"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" size="small" type="primary" @click="init(searchMsg,'search')" :title="$t( prefix + 'btn.search')"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-refresh" size="small" type="primary" @click="onReset('formInline')" :title="$t( prefix + 'btn.reset')"></el-button>
                </el-form-item>
            </el-form>
            <br><br>
            <el-button-group class="item-right">
                <el-button @click="handleDeleteMulti" type="primary" icon="el-icon-plus" :disabled="deleteDisabled" size="mini" :title="$t( prefix + 'btn.addMode')"></el-button>
                <el-button @click="handleDeleteMulti" type="danger" icon="el-icon-delete" :disabled="deleteDisabled" size="mini" :title="$t( prefix + 'btn.deleteMode')"></el-button>
            </el-button-group>
            <div class="type-table-main clear" v-loading="loading" :element-loading-text="$t('app.table.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table :data="tableData" ref="multipleTable" border @selection-change="handleSelectionChange">
                    <el-table-column align="center" type="selection" width="50" fixed></el-table-column>
                    <el-table-column prop="TempID" align="center"  fixed :label="$t( prefix + 'typeTable.id')" width="160" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="TempName" align="center"  fixed :label="$t( prefix + 'typeTable.name')" width="160" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="EleMax" align="center" :label="$t( prefix + 'typeTable.maxLen')" width="240" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="EleMin" align="center" :label="$t( prefix + 'typeTable.minLen')" width="240" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="TempCharSize" align="center" :label="$t( prefix + 'typeTable.num')" width="240" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="ope"  fixed="right" align="center" :label="$t( prefix + 'typeTable.ope')" width="160" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-button plain @click="handleRename(scope.row)" type="primary" icon="el-icon-edit"  size="mini" :title="$t( prefix + 'btn.renameMode')"></el-button>
                          <el-button plain @click="handleSet(scope.row)" type="primary" icon="el-icon-new-icon-shebeiguanli3
"  size="mini" :title="$t( prefix + 'btn.setPwd')"></el-button>
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
        <add-Edit-dialog :type="nodeType" :node="node" :visibleDialog="typeVision" @close="handleClose"></add-Edit-dialog>
        <pwd-space-config :table="test"></pwd-space-config>
    </div>
</template>
<script>
import Bus from "@/assets/js/bus.js"
import {showPwdMode} from '@/api/getData'
import {typeTableData} from '@/mock/mock.js'
import PwdSpaceConfig  from "@/components/task/templateConfig/PwdSpaceConfig"
import AddEditDialog  from '@/components/task/templateConfig/AddEditDialog.vue'


export default {
    name: 'TypeTable',
    data() {
        return {
            prefix:"app.table.task.templateConfig.",
            formInline: {
                modeID:'',
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
            splitVision:false,
            splitDict:{},
            test:false,
            nodeType:"editMode",
            node:{},
            typeVision:false,
        }
    },
    mounted(){
        Bus.$on("clickType", data => {
            let sendData = {
                id:data.id,
                page:this.currentPage,
                size:this.pageSize
            };
            // let res = await showPwdMode(sendData);
            let res = {
                status:1,
                message:"获取口令模板内容成功",
                data:typeTableData,
                total:4
            };
            this.total = res.total;
            this.tableData = res.data;

        });
    },
    methods: {
        init(message, type){
            this.loading = true;
            try {
                if(this.type =="search"){
                //    let res = await showPwdMode(sendData);
                }
                else{
                //    let res = await showPwdMode(sendData);
                }
                let res = {
                    message:"加载上传字典成功",
                    status:1,
                    data:typeTableData,
                    total:4
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
       },
       handleRename(data){
           console.log("handleRename");
           this.node = data;
           this.typeVision = true;
       },
       handleClose(){
           this.typeVision = false;
           this.init();
       }
    },
    components:{
        PwdSpaceConfig,
        AddEditDialog
    },
    created(){
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



<template>
    <div class="app-config-main-wrapper">
        <!-- 切分字典列表 -->
        <el-card class="app-config-list-card" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-new-icon-qiefen"></i>
                    <span class="item-ml-5">{{ $t(prefix + 'title') }}</span>
                </p>
                <el-button-group class="item-right">
                    <el-button type="primary"  @click="mergeDict()" :disabled="disabled" size="mini">{{ $t(prefix + 'btn.mergeDict') }}</el-button>
                </el-button-group>
            </div>
            <div class="app-config-main clear" v-loading="loading" :element-loading-text="$t('app.table.loading')" style="width: 100%" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table :data="tableData" ref="multipleTable" border @selection-change="handleSelectionChange" style="width: 100%">
                    <el-table-column type="selection" width="50" align="center" fixed></el-table-column>
                    <el-table-column fixed prop="ID"  :label="$t( prefix + 'columns.ID')" width="50" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="originFilename" fixed :label="$t(prefix + 'columns.originFilename')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column fixed prop="dictAlign" :label="$t(prefix + 'columns.dictAlign')" width="150" align="center"  show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="filesize" :label="$t(prefix + 'columns.filesize')" width="150" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="passwordNum" :label="$t(prefix + 'columns.passwordNum')" width="180" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="splitDict" :label="$t(prefix + 'columns.splitDict')" width="200" align="center" show-overflow-tooltip>
                         <template slot-scope="scope">
                          <el-button @click="splitDict(scope.row)" type="info" plain size="mini">{{ $t(prefix + 'btn.detail') }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dictClassification" :label="$t(prefix + 'columns.dictClassification')" width="200" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-button @click="dictClassification(scope.row)" type="info" plain  size="mini" >{{ $t(prefix + 'btn.detail') }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="encodingStyle" :label="$t(prefix + 'columns.encodingStyle')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                     <el-table-column prop="createTime" :label="$t(prefix + 'columns.createTime')" width="200" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column fixed="right" prop="operation" :label="$t(prefix + 'columns.operation')" width="200" align="center">
                        <template slot-scope="scope">
                             <el-button size="mini" plain icon="el-icon-delete" :title="$t(prefix + 'btn.delete')" type="danger" @click="handleDelete(scope.row)"></el-button>
                            <el-button size="mini" plain icon="el-icon-edit" :title="$t(prefix + 'btn.edit')" type="primary" @click="editDict(scope.row)"></el-button>
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
        <!-- 合并弹框 -->
        <merge-dialog :selectDict="mergeList" :visibleDialog="mergeDialogVision" @handleClose="handleMergeClose"></merge-dialog>
        <!-- 切分字典详情弹框 -->
        <split-dialog :id="splitDictID" :visibleDialog="splitDialogVision" @handleClose="handleSplitClose"></split-dialog>
        <!-- 字典分类详情 -->
        <dict-classification-detail :id="classifyID" :visibleDialog="classifyDialogVision"  @dialogClose="handleClassifyClose"></dict-classification-detail>
        <!-- 编辑字典 -->
        <edit-dialog :dictID="editDictID" :dictAlign="editDictalign" :visibleDialog="editDialogVision" @handleClose="handleEditClose"></edit-dialog>
    </div>
</template>
<script>
import Vue from 'vue'
import $ from 'jquery'
import { getHisOptLists, deleteHisOpt } from '@/api/getData'
import {SplitHistory} from '@/mock/mock.js'
import MergeDialog from '@/components/dictionary/SplitDict/MergeDialog.vue'
import SplitDialog from '@/components/dictionary/SplitDict/splitDictDetail.vue'
import DictClassificationDetail from '@/components/dictionary/SplitDict/DictClassificationDetail.vue'
import EditDialog from '@/components/dictionary/SplitDict/EditDialog.vue'
import { clearInterval } from 'timers';
export default {
    data(){
        return{
            prefix:"app.table.dictionary.splitDict.",
            tableData:[],
            pageRange: this.$config.PageRange,
            pageSize:this.$config.PageRange[0],
            total:0,
            currentPage:1,
            loading:false,
            multipleSelection: [],
            mergeList:[],
            //合并弹框可见性判断
            mergeDialogVision:false,
            //切分字典详情弹框可见性判断
            splitDialogVision:false,
            //字典分类详情弹框可见性判断
            classifyDialogVision:false,
            //修改字典详情弹框可见性判断
            editDialogVision:false,
            splitDictID:0,
            classifyID:0,
            editDictID:0,
            editDictalign:"",
            //定时器返回
            timer:0,
            //是否显示加载成功message
            flag:false,
            // 禁用合并按钮
            disabled:true
        }
    },
    methods:{
        init(message){
           this.loading = true;
            try {
                // const res = await  getHisDictLists({
                // 	curPage: this.currentPage, 
                // 	pageSize: this.pageSize
                // });	

                let res = {
                    message:"加载历史字典成功",
                    status:1,
                    data:SplitHistory,
                    total:2,
                };
                if (res.status == 1) {
                    this.loading = false;
                    this.total = res.total;
                    this.tableData = res.data;		// 加载历史字典列表，填充表格数据
                    //处理翻页后多选框问题
                    let num = 0;
                    if(this.multipleSelection.length > 0){
                         let that = this;
                        this.multipleSelection.forEach(function(row){
                            let selectedIndex =  that.tableData.findIndex(dict => dict.id == row.id);
                            if(selectedIndex != undefined){
                                num ++;
                                that.$refs.multipleTable.toggleRowSelection(that.tableData[selectedIndex],true);
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

                    this.num ++;
                    //判断是否显示message
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
        //处理每页显示个数变化
        handlePageSizeChange(val){
            this.pageSize = val;
            this.init();
        },
        //处理页数变化
        handleCurrentPageChange(val){
            this.currentPage = val;
            this.init();
        },
        //删除字典
        handleDelete(val){
            this.$confirm(this.$t(this.prefix + 'tips.deleteTip') , this.$t(this.prefix + 'tips.title') , {
					confirmButtonText: this.$t(this.prefix + 'btn.confirm'),
					cancelButtonText: this.$t(this.prefix + 'btn.cancel'),
					type: 'warning'
				}).then(async () => {
                    try {
                            console.log(val);
                            // const res = await  deleteSplitDict(requestData);	
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
        //显示合并字典弹框
        mergeDict(){
            if(this.multipleSelection.length != 2){
                 this.$message({
                    type: 'error',
                    message: this.$t(this.prefix + 'tips.selectTip'),
                    duration: 2000,
                    showClose: true
                });
            }else{
                let that = this;
                this.multipleSelection.forEach(dict =>{
                    that.mergeList.push({
                        name:dict.originFilename+"("+dict.dictAlign + ")",
                        id:dict.ID,
                    })
                });
                this.mergeDialogVision = true;
            }
        },
        //显示切分字典弹框
        splitDict(dict){
            this.splitDictID = dict.ID;
            this.splitDialogVision = true;
        },
        //显示字典详情弹框
        dictClassification(dict){
            this.classifyID = dict.ID;
            this.classifyDialogVision = true;
        },
        //显示编辑字典详情
        editDict(dict){
            this.editDictID = dict.ID;
            this.editDictalign = dict.dictAlign;
            this.editDialogVision = true;
        },
        //选中多选框触发
        handleSelectionChange(val){
             this.multipleSelection = val;
             if(this.multipleSelection.length == 2){
                 this.disabled = false;
             }else{
                 this.disabled = true;
             }
        },
        //合并弹框关闭触发
        handleMergeClose(data){
            this.mergeDialogVision = data;
            this.init();
        },
        //切分字典详情弹框关闭
        handleSplitClose(data){
            this.splitDialogVision = data;
        },
        //字典分类弹框关闭
        handleClassifyClose(data){
            this.classifyDialogVision = data;
        },
        //编辑弹框关闭
        handleEditClose(data){
            this.editDialogVision = data;
            this.init();
        }
        
    },
    //创建组件时开启定时器
    created(){
        let that = this;
        this.flag = true;
        this.init();
        this.timer = window.setInterval(function fn(){
           that.init();
        },this.$config.splitDictTime);
    },
    destroyed(){
        window.clearInterval(this.timer);
    },
    components:{
        MergeDialog,
        SplitDialog,
        DictClassificationDetail,
        EditDialog
    }
}
</script>




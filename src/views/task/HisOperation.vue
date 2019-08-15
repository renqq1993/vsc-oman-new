<template>
    <div class="his-main-wrapper">
        <!-- 搜索 -->
        <el-card class="history-operation-search-card item-mb-20" shadow="hover">
            <el-form :inline="true" :model="formInline" :rules="rules" class="search" ref="formInline">
                <el-form-item :label="$t('app.table.task.history.searchColumn.userName')" prop="userName">
                    <el-input v-model="formInline.userName" size="small" @keyup.enter.native="onSearch" :placeholder="$t('app.table.task.history.searchColumn.userName')" clearable></el-input>
                </el-form-item>
                <el-form-item :label="$t('app.table.task.history.searchColumn.optTime')" prop="value">
                    <el-date-picker v-model="formInline.value" size="small" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="~" :start-placeholder="$t('app.table.task.history.searchColumn.startTime')" :end-placeholder="$t('app.table.task.history.searchColumn.endTime')"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" type="primary" size="small" @click="onSearch" :title="$t('app.table.task.history.btnTips.search')"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-refresh" type="primary" size="small" @click="onReset('formInline')" :title="$t('app.table.task.history.btnTips.reset')"></el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 历史操作列表 -->
        <el-card class="history-operation-list-card" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-new-icon-renjijiaohu"></i>
                    <span class="item-ml-5">{{ $t('app.table.task.history.cardTitle') }}</span>
                </p>
                <el-button @click="handleDeleteMulti" :disabled="deleteDisabled" class="item-right" type="danger" icon="el-icon-delete" size="mini" :title="$t('app.table.task.history.btnTips.deleteMulti')"></el-button>
            </div>
            <div class="history-operation-main clear" 
                v-loading="loading" 
                :element-loading-text="$t('app.table.loading')" 
                element-loading-spinner="el-icon-loading" 
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table :data="tableData" border @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="userName" :label="$t('app.table.task.history.columns.userName')" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="OperationType" :label="$t('app.table.task.history.columns.operationType')" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="OperationTime" :label="$t('app.table.task.history.columns.operationTime')" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="OperationDesc" :label="$t('app.table.task.history.columns.operationDesc')" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="extraDesc" :label="$t('app.table.task.history.columns.remark')" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column :label="$t('app.table.task.history.columns.operation')" align="center" width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" plain icon="el-icon-delete" :title="$t('app.table.task.history.btnTips.delete')" type="danger" @click="handleDelete(scope.$index, scope.row)"></el-button>
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
import { constants } from 'fs';
export default {
    name: 'HisOperation',
    data() {
        return {
            formInline: {
                userName: '',
                value: ['', '']
            },
            loading: false,
            currentPage: 1,
            pageRange: Vue.prototype.$config.PageRange,
            pageSize: Vue.prototype.$config.PageRange[0],
            total: 0,
            tableData: [
                {   
                    id: 1,
                    userName: '王小虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'admin 删除用户 asd',
                    extraDesc: 'admin123'
                },
                 {   
                    id: 2,
                    userName: '王虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'admin 创建用户 asd',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 3,
                    userName: '王小虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'admin 删除用户 asd',
                    extraDesc: 'admin123'
                },
                {   
                    id: 4,
                    userName: '王虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'admin 创建用户 asd',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 5,
                    userName: '王小虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'admin 删除用户 asd',
                    extraDesc: 'admin123'
                },
                {   
                    id: 6,
                    userName: '王虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'admin 创建用户 asd',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 7,
                    userName: '王小虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'admin 删除用户 asd',
                    extraDesc: 'admin123'
                },
                {   
                    id: 8,
                    userName: '王虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'admin 创建用户 asd',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 9,
                    userName: '王小虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'admin 删除用户 asd',
                    extraDesc: 'admin123'
                },
                {   
                    id: 10,
                    userName: '王虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'admin 创建用户 asd',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 11,
                    userName: '王小虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'admin 删除用户 asd',
                    extraDesc: 'admin123'
                },
                {   
                    id: 12,
                    userName: '王虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'admin 创建用户 asd',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 13,
                    userName: '王虎',
                    OperationType: '系统管理操作',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'admin 创建用户 asd',
                    extraDesc: 'admin1234566789'
                },
            ],
            tableData1: [
                {   
                    id: 1,
                    userName: 'Small Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'asd had been deleted by admin',
                    extraDesc: 'admin123'
                },
                {   
                    id: 2,
                    userName: 'Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'asd had been Created by admin',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 3,
                    userName: 'Small Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'asd had been deleted by admin',
                    extraDesc: 'admin123'
                },
                {   
                    id: 4,
                    userName: 'Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'asd had been Created by admin',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 5,
                    userName: 'Small Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'asd had been deleted by admin',
                    extraDesc: 'admin123'
                },
                {   
                    id: 6,
                    userName: 'Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'asd had been Created by admin',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 7,
                    userName: 'Small Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'asd had been deleted by admin',
                    extraDesc: 'admin123'
                },
                {   
                    id: 8,
                    userName: 'Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'asd had been Created by admin',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 7,
                    userName: 'Small Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'asd had been deleted by admin',
                    extraDesc: 'admin123'
                },
                {   
                    id: 10,
                    userName: 'Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'asd had been Created by admin',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 11,
                    userName: 'Small Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'asd had been deleted by admin',
                    extraDesc: 'admin123'
                },
                {   
                    id: 12,
                    userName: 'Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 12:31:15',
                    OperationDesc: 'asd had been Created by admin',
                    extraDesc: 'admin1234566789'
                },
                {   
                    id: 13,
                    userName: 'Small Tiger Wang',
                    OperationType: 'System Management Operation',
                    OperationTime: '2019-08-10 17:31:15',
                    OperationDesc: 'asd had been deleted by admin',
                    extraDesc: 'admin123'
                }
            ],
            multipleSelection: [],
            rules: {
                userName: [{required: false}],
                value: [{required: false}]
            },
            deleteDisabled: true,
        }
    },
    mounted() {
        this.initData(this.currentPage, this.pageSize, this.formInline.userName, this.formInline.value[0], this.formInline.value[1]);
    },
    methods: {
        // 初始化表格，获取用户列表
        async initData(curPage, pageSize, userName, start, end) {
            this.loading = true;

            try {
                // const res = await getUsers({ 
                //     curPage: curPage, 
                //     pageSize: pageSize,
                //     userName: userName,
                //     start: start,
                //     end: end,
                // });	

                let res = {
                    status: 1,
                    message: 'query history operation ok!',
                    total: 13,
                    data: this.$i18n.locale === 'en' ? this.tableData1.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize) : this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
                }

                if (res.status == 1) {
                    this.loading = false;

                    this.total     = res.total;
                    this.tableData = res.data;		// 加载用户列表，填充表格数据

                    // 修改表格和右侧屏幕可视区域宽度
                    if (this.tableData.length > 4) {
                        $(".itme-mr-10 section").css({'margin-right': 0});
                    } else {
                        $(".itme-mr-10 section").css({'margin-right': '15px'});
                    }
                    
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
                this.loading = false;

                this.$message({
                    type: 'error',
                    message: err.message,
                    duration: 2000,
                    showClose: true
                });
            }
        },
        // 触发搜索
        onSearch() {
            console.log(this.formInline);
            this.initData(this.currentPage, this.pageSize, this.formInline.userName, this.formInline.value[0], this.formInline.value[1]);
        },
        // 重置搜索框输入
        onReset(searchForm) {
            this.$refs[searchForm].resetFields();
        },
        // 切换每页显示条数
        handlePageSizeChange(val) {
            this.pageSize = val;
            this.initData(this.currentPage, this.pageSize, this.formInline.userName, this.formInline.value[0], this.formInline.value[1]);
        },
        // 切换当前页码
        handleCurrentPageChange(val) {
            this.currentPage = val;
            this.initData(this.currentPage, this.pageSize, this.formInline.userName, this.formInline.value[0], this.formInline.value[1]);
        },
        // 点击删除按钮
        handleDelete(index, row) {
            let _this = this;
            this.$confirm(this.$t('app.table.task.history.operation.delete.confirm'), this.$t('app.table.task.history.operation.delete.tipType'), {
                confirmButtonText: this.$t('app.table.task.history.operation.delete.sure'),
                cancelButtonText: this.$t('app.table.task.history.operation.delete.cancle'),
                type: 'warning'
            }).then(async () => {
                try {
                    // const res = await deleteHisOpt({
                    //     id: row.id
                    // });	

                    if (res.status == 1) {
                        // 重新加载用户信息表格
                        this.initData(this.currentPage, this.pageSize, this.formInline.userName, this.formInline.value[0], this.formInline.value[1]);

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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: this.$t('app.table.task.history.operation.delete.cancleTips'),
                    duration: 2000,
                    showClose: true
                });          
            });
        },
        // 点击删除选中按钮
        handleDeleteMulti() {
            if (this.multipleSelection.length == 0) {
                return this.$message({
                    type: 'info',
                    message: this.$t('app.table.task.history.operation.deleteAllError'),
                    duration: 2000,
                    showClose: true
                });
            }

            let _this = this;
            this.$confirm(this.$t('app.table.task.history.operation.deleteAll.confirm'), this.$t('app.table.task.history.operation.deleteAll.tipType'), {
                confirmButtonText: this.$t('app.table.task.history.operation.deleteAll.sure'),
                cancelButtonText: this.$t('app.table.task.history.operation.deleteAll.cancle'),
                type: 'warning'
            }).then(async () => {
                try {
                    // const res = await deleteHisOpt({
                    //     id: row.id
                    // });	

                    console.log(this.multipleSelection, '123');

                    let res = {
                        status: 1,
                        message: 'delete selected records successfully.'
                    }

                    if (res.status == 1) {
                        // 重新加载用户信息表格
                        this.initData(this.currentPage, this.pageSize, this.formInline.userName, this.formInline.value[0], this.formInline.value[1]);

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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: this.$t('app.table.task.history.operation.deleteAll.cancleTips'),
                    duration: 2000,
                    showClose: true
                });          
            });
        },
        // 表格复选框选择变化事件
        handleSelectionChange(val) {
            this.multipleSelection = val;

            if (this.multipleSelection.length > 0) {
                this.deleteDisabled = false;
            } else {
                this.deleteDisabled = true;
            }
        }
    }
}
</script>


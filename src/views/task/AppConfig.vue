<template>
    <div class="app-config-main-wrapper">
        <!-- 搜索 -->
        <el-card class="app-config-search-card item-mb-20" shadow="hover">
            <el-form :inline="true" :model="formInline" :rules="rules" class="search" ref="formInline">
                <el-form-item :label="$t('app.table.task.appConfig.searchColumn.appID')" prop="appID">
                    <el-input v-model="formInline.appID" size="small" @keyup.enter.native="onSearch" :placeholder="$t('app.table.task.appConfig.searchColumn.appID')" clearable></el-input>
                </el-form-item>
                <el-form-item :label="$t('app.table.task.appConfig.searchColumn.appName')" prop="appName">
                    <el-input v-model="formInline.appName" size="small" @keyup.enter.native="onSearch" :placeholder="$t('app.table.task.appConfig.searchColumn.appName')" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" size="small" type="primary" @click="onSearch" :title="$t('app.table.task.appConfig.btnTips.search')"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-refresh" size="small" type="primary" @click="onReset('formInline')" :title="$t('app.table.task.appConfig.btnTips.reset')"></el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 应用文件列表 -->
        <el-card class="app-config-list-card" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-new-icon-yingyongpeizhi"></i>
                    <span class="item-ml-5">{{ $t('app.table.task.appConfig.cardTitle') }}</span>
                </p>
                <el-button-group class="item-right">
                    <el-button @click="handleDeleteMulti" type="danger" icon="el-icon-delete" v-if="!deleteDisabled" size="mini" :title="$t('app.table.task.appConfig.btnTips.deleteMulti')"></el-button>
                    <el-button @click="handleCreate" type="primary" icon="el-icon-plus" size="mini" :title="$t('app.table.task.appConfig.btnTips.add')"></el-button>
                </el-button-group>
            </div>
            <div class="app-config-main clear" v-loading="loading" :element-loading-text="$t('app.table.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table :data="tableData" border @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="35" fixed></el-table-column>
                    <el-table-column prop="iAppID" fixed :label="$t('app.table.task.appConfig.columns.appID')" width="125" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sAppName" fixed :label="$t('app.table.task.appConfig.columns.appName')" width="150" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sAppType" fixed :label="$t('app.table.task.appConfig.columns.appDesc')" width="150" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="iResValiType" :label="$t('app.table.task.appConfig.columns.resultVerType')" width="190" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sCommandLine" :label="$t('app.table.task.appConfig.columns.commandLine')" width="130" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sTargetType" :label="$t('app.table.task.appConfig.columns.targetType')" width="110" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="iPlanModeType" :label="$t('app.table.task.appConfig.columns.decrypMode')" width="150" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sWorkDir" :label="$t('app.table.task.appConfig.columns.workingDir')" width="160" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="lOps" :label="$t('app.table.task.appConfig.columns.ops')" width="190" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sVerLib" :label="$t('app.table.task.appConfig.columns.VerLib')" width="160" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="iPwdMaxLen" :label="$t('app.table.task.appConfig.columns.pwdMax')" width="160" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="iPwdMinLen" :label="$t('app.table.task.appConfig.columns.pwdMin')" width="160" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sInitialRes" :label="$t('app.table.task.appConfig.columns.isResInit')" width="170" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="iDeepVerify" :label="$t('app.table.task.appConfig.columns.isDeepVer')" width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="iMultStr" :label="$t('app.table.task.appConfig.columns.isMultTarget')" width="170" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="iSort" :label="$t('app.table.task.appConfig.columns.willSort')" width="90" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column :label="$t('app.table.task.appConfig.columns.appFile')" align="center" width="135">
                        <template slot-scope="scope">
                            <el-button size="mini" plain icon="el-icon-new-icon-ceshishenqing" class="tableBtn" :title="$t('app.table.task.appConfig.btnTips.configFile')" type="primary" @click="handleConfigure(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" :label="$t('app.table.task.appConfig.columns.operation')" align="center" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" plain icon="el-icon-delete" :title="$t('app.table.task.appConfig.btnTips.delete')" type="danger" @click="handleDelete(scope.$index, scope.row)"></el-button>
                            <el-button size="mini" plain icon="el-icon-edit" :title="$t('app.table.task.appConfig.btnTips.edit')" type="primary" @click="handleEdit(scope.$index, scope.row)"></el-button>
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

        <!-- 保存新建的应用 -->
        <apps-config-dialog v-if="add.addDialogVisible" @handle-save="handleSave" @handle-close="handleClose" :title="add.addConfigTitle" :dialogVisible="add.addDialogVisible" :formInit="add.addForm" :dialogType="add.dialogType"></apps-config-dialog>
    </div>
</template>
<script>
import Vue from 'vue'
import $ from 'jquery'
import { getHisOptLists, deleteHisOpt } from '@/api/getData'
import AppsConfigDialog from '@/views/task/appconfig/AppsConfigDialog';
export default {
    name: 'AppConfig',
    components: {
        AppsConfigDialog
    },
    data() {
        return {
            formInline: {
                appName: '',
                appID: ''
            },
            loading: false,
            currentPage: 1,
            pageRange: Vue.prototype.$config.PageRange,
            pageSize: Vue.prototype.$config.PageRange[0],
            total: 0,
            tableData: [
                {   
                    iAppID: 28,
                    sAppName: 'IPMD4',
                    sAppType: 'MD4',
                    iResValiType: 'Verify only correct result',
                    sCommandLine: './sp -c/app/PwdSearch.ini',
                    sTargetType: 'Cipher Text',
                    iPlanModeType: 'PS Password Generation',
                    sWorkDir: '/root/PwdSearch',
                    lOps: '357,943',
                    sVerLib: '/root/ServiceMng/sp/libspVerify.so',
                    iPwdMaxLen: 255,
                    iPwdMinLen: 1,
                    sInitialRes: 'NO',
                    iDeepVerify: 'NO',
                    iMultStr: 'NO',
                    iSort: 'NO',
                    sAppVersion: ''
                },
                {   
                    iAppID: 34,
                    sAppName: 'IPSHA0',
                    sAppType: 'SHA0',
                    iResValiType: 'Verify only correct result',
                    sCommandLine: './sp -c/app/PwdSearch.ini',
                    sTargetType: 'Cipher Text',
                    iPlanModeType: 'PS Password Generation',
                    sWorkDir: '/root/PwdSearch',
                    lOps: '357,497',
                    sVerLib: '/root/ServiceMng/sp/libspVerify.so',
                    iPwdMaxLen: 255,
                    iPwdMinLen: 1,
                    sInitialRes: 'NO',
                    iDeepVerify: 'NO',
                    iMultStr: 'NO',
                    iSort: 'NO',
                    sAppVersion: ''
                },
                {   
                    iAppID: 35,
                    sAppName: 'IPSHA3',
                    sAppType: 'SHA3',
                    iResValiType: 'Verify only correct result',
                    sCommandLine: './sp -c/app/PwdSearch.ini',
                    sTargetType: 'Cipher Text',
                    iPlanModeType: 'PS Password Generation',
                    sWorkDir: '/root/PwdSearch',
                    lOps: '295,671',
                    sVerLib: '/root/ServiceMng/sp/libspVerify.so',
                    iPwdMaxLen: 32,
                    iPwdMinLen: 1,
                    sInitialRes: 'NO',
                    iDeepVerify: 'NO',
                    iMultStr: 'NO',
                    iSort: 'NO',
                    sAppVersion: ''
                }
            ],
            tableData1: [
                {   
                    iAppID: 28,
                    sAppName: 'IPMD4',
                    sAppType: 'MD4',
                    iResValiType: 'Verify only correct result',
                    sCommandLine: './sp -c/app/PwdSearch.ini',
                    sTargetType: 'Cipher Text',
                    iPlanModeType: 'PS Password Generation',
                    sWorkDir: '/root/PwdSearch',
                    lOps: '357,943',
                    sVerLib: '/root/ServiceMng/sp/libspVerify.so',
                    iPwdMaxLen: 255,
                    iPwdMinLen: 1,
                    sInitialRes: 'NO',
                    iDeepVerify: 'NO',
                    iMultStr: 'NO',
                    iSort: 'NO',
                    sAppVersion: ''
                },
                {   
                    iAppID: 34,
                    sAppName: 'IPSHA0',
                    sAppType: 'SHA0',
                    iResValiType: 'Verify only correct result',
                    sCommandLine: './sp -c/app/PwdSearch.ini',
                    sTargetType: 'Cipher Text',
                    iPlanModeType: 'PS Password Generation',
                    sWorkDir: '/root/PwdSearch',
                    lOps: '357,497',
                    sVerLib: '/root/ServiceMng/sp/libspVerify.so',
                    iPwdMaxLen: 255,
                    iPwdMinLen: 1,
                    sInitialRes: 'NO',
                    iDeepVerify: 'NO',
                    iMultStr: 'NO',
                    iSort: 'NO',
                    sAppVersion: ''
                },
                {   
                    iAppID: 35,
                    sAppName: 'IPSHA3',
                    sAppType: 'SHA3',
                    iResValiType: 'Verify only correct result',
                    sCommandLine: './sp -c/app/PwdSearch.ini',
                    sTargetType: 'Cipher Text',
                    iPlanModeType: 'PS Password Generation',
                    sWorkDir: '/root/PwdSearch',
                    lOps: '295,671',
                    sVerLib: '/root/ServiceMng/sp/libspVerify.so',
                    iPwdMaxLen: 32,
                    iPwdMinLen: 1,
                    sInitialRes: 'NO',
                    iDeepVerify: 'NO',
                    iMultStr: 'NO',
                    iSort: 'NO',
                    sAppVersion: ''
                }
            ],
            multipleSelection: [],
            rules: {
                appName: [{required: false}],
                appID: [{required: false}]
            },
            deleteDisabled: true,

            add: {
                addConfigTitle: '',
                addDialogVisible: false,
                dialogType: 0,
                addForm: {
                    appName: '',
                    appType: '',
                    appVersion: '',
                    targetType: '',
                    appPwdMax: '',
                    appPwdMin: '',
                    commandLine: Vue.prototype.$config.TaskModule.Application_Config.App_Config_Commad_Line || './sp -c/app/PwdSearch/PwdSearch.ini',
                    verifyLib: Vue.prototype.$config.TaskModule.Application_Config.App_Config_Verify_Lib || '/root/ServiceMng/sp/libspVerify.so',
                    workingDir: Vue.prototype.$config.TaskModule.Application_Config.App_Config_Working_Dir || '/root/PwdSearch',
                    ops: '',
                    planMode: '',
                    resValidateType: '',
                    isSort: '',
                    isMultStr: '',
                    isConfigIni: '',
                    isConfigDeepVerify: ''
                }
            }
        }
    },
    mounted() {
        this.initData(this.currentPage, this.pageSize, this.formInline.appID, this.formInline.appName);
    },
    methods: {
        // 初始化表格，获取用户列表
        async initData(curPage, pageSize, appID, appName) {
            this.loading = true;

            try {
                // const res = await getUsers({ 
                //     curPage: curPage, 
                //     pageSize: pageSize,
                //     appID: appID,
                //     appName: appName,
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
            this.initData(this.currentPage, this.pageSize, this.formInline.appID, this.formInline.appName);
        },
        // 重置搜索框输入
        onReset(searchForm) {
            this.$refs[searchForm].resetFields();
        },
        // 切换每页显示条数
        handlePageSizeChange(val) {
            this.pageSize = val;
            this.initData(this.currentPage, this.pageSize, this.formInline.appID, this.formInline.appName);
        },
        // 切换当前页码
        handleCurrentPageChange(val) {
            this.currentPage = val;
            this.initData(this.currentPage, this.pageSize, this.formInline.appID, this.formInline.appName);
        },
        // 点击删除按钮
        handleConfigure(index, row) {
            console.log('添加啦');
        },
        // 点击删除选中按钮
        handleDeleteMulti() {
            if (this.multipleSelection.length == 0) {
                return this.$message({
                    type: 'info',
                    message: this.$t('app.table.task.appConfig.operation.deleteAllError'),
                    duration: 2000,
                    showClose: true
                });
            }

            let _this = this;
            this.$confirm(this.$t('app.table.task.appConfig.operation.deleteAll.confirm'), this.$t('app.table.task.appConfig.operation.deleteAll.tipType'), {
                confirmButtonText: this.$t('app.table.task.appConfig.operation.deleteAll.sure'),
                cancelButtonText: this.$t('app.table.task.appConfig.operation.deleteAll.cancle'),
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
                        this.initData(this.currentPage, this.pageSize, this.formInline.appID, this.formInline.appName);

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
                    message: this.$t('app.table.task.appConfig.operation.deleteAll.cancleTips'),
                    duration: 2000,
                    showClose: true
                });          
            });
        },
        // 点击删除单条记录按钮，也即点击表格中的删除按钮的事件
        handleDelete(index, row) {

            let _this = this;
            this.$confirm(this.$t('app.table.task.appConfig.operation.delete'), this.$t('app.table.task.appConfig.operation.deleteAll.tipType'), {
                confirmButtonText: this.$t('app.table.task.appConfig.operation.deleteAll.sure'),
                cancelButtonText: this.$t('app.table.task.appConfig.operation.deleteAll.cancle'),
                type: 'warning'
            }).then(async () => {
                try {
                    // const res = await deleteHisOpt({
                    //     id: row.id
                    // });	

                    let res = {
                        status: 1,
                        message: 'delete single record successfully'
                    }

                    if (res.status == 1) {
                        // 重新加载用户信息表格
                        this.initData(this.currentPage, this.pageSize, this.formInline.appID, this.formInline.appName);

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
                    message: this.$t('app.table.task.appConfig.operation.deleteAll.cancleTips'),
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
        },
        // 增加应用配置
        handleCreate() {
            this.add.addDialogVisible = true;

            this.add.dialogType = 0;    // 表示是新增配置
            this.add.addConfigTitle = this.$t('app.table.task.appConfig.addAndEdit.title.add');
        },
        // 修改选中的某个应用的配置
        handleEdit(index, row) {
            console.log(row);

            this.add.addForm.appName            = row.sAppName;
            this.add.addForm.appType            = row.sAppType;
            this.add.addForm.appVersion         = row.sAppVersion;
            this.add.addForm.targetType         = row.sTargetType;
            this.add.addForm.appPwdMax          = row.iPwdMaxLen;
            this.add.addForm.appPwdMin          = row.iPwdMinLen;
            this.add.addForm.commandLine        = row.sCommandLine;
            this.add.addForm.verifyLib          = row.sVerLib;
            this.add.addForm.workingDir         = row.sWorkDir;
            this.add.addForm.ops                = row.lOps;
            this.add.addForm.planMode           = row.iPlanModeType;
            this.add.addForm.resValidateType    = row.iResValiType;
            this.add.addForm.isSort             = row.iSort;
            this.add.addForm.isMultStr          = row.iMultStr;
            this.add.addForm.isConfigIni        = row.sInitialRes;
            this.add.addForm.isConfigDeepVerify = row.iDeepVerify;

            this.add.dialogType = 1;    // 表示是修改配置
            this.add.addConfigTitle = this.$t('app.table.task.appConfig.addAndEdit.title.edit') + '(' + this.$t('app.table.task.appConfig.columns.appID') + ': ' + row.iAppID + ', ' + this.$t('app.table.task.appConfig.columns.appName') + ': ' + row.sAppName + ')';
            
            this.$nextTick(() => {
                this.add.addDialogVisible = true;
            });
        },
        // 保存新增的或者修改后的应用的配置，type：0表示新增，1表示修改
        handleSave(e) {
            console.log(e);

            this.add.addDialogVisible = false;
            this.add.dialogType = 0;
        },
        // 关闭新增或者编辑弹框
        handleClose() {
            this.add.addDialogVisible = false;
            this.add.dialogType = 0;
        }
    }
}
</script>
<style lang="less" scoped>

</style>



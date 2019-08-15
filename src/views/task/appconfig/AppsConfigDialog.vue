<template>
    <el-dialog :title="title" :visible.sync="visibleDialog" append-to-body :close-on-click-modal="false" width="70%" @close="handleClose">
        <el-form :model="form" :label-width="formLabelWidth" :label-position="labelPosition" class="appConfigForm">
            <el-row :gutter="20">
                <el-col :span="12" v-if="dialogType == 0">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.appName')">
                        <el-input v-model="form.appName" size="small" autocomplete="off" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.appName')" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.appType')">
                        <el-select v-model="form.appType" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.appType')" size="small" clearable>
                            <el-option :label="item.label" :value="item.value" v-for="(item, index) in appTypeLists" :key="index+'apptype'"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.appVersion')">
                        <el-select v-model="form.appVersion" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.appVersion')" size="small" clearable>
                            <el-option :label="item.label" :value="item.value" v-for="(item, index) in versionLists" :key="index+'version'"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.targetType')">
                        <el-select v-model="form.targetType" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.targetType')" size="small" clearable>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.targets.target1')" value="0"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.targets.target2')" value="1"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.targets.target3')" value="2"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.targets.target4')" value="3"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.targets.target5')" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.appPwdMax')">
                        <el-input-number v-model="form.appPwdMax" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.appPwdMax')" size="small" controls-position="right" @change="handleChangeMax" :min="1" :max="255"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.appPwdMin')">
                        <el-input-number v-model="form.appPwdMin" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.appPwdMin')" size="small" controls-position="right" @change="handleChangeMin" :min="1" :max="255"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.commandLine')">
                        <el-input v-model="form.commandLine" size="small" autocomplete="off" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.commandLine')" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.verifyLib')">
                        <el-input v-model="form.verifyLib" size="small" autocomplete="off" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.verifyLib')" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.workingDir')">
                        <el-input v-model="form.workingDir" size="small" autocomplete="off" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.workingDir')" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.ops')">
                        <el-input v-model="form.ops" size="small" autocomplete="off" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.ops')" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.planMode')">
                        <el-select v-model="form.planMode" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.planMode')" size="small" clearable>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.planMode.p1')" value="0"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.planMode.p2')" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.resValidateType')">
                        <el-select v-model="form.resValidateType" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.resValidateType')" size="small" clearable>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.resValidate.v1')" value="0"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.resValidate.v2')" value="1"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.resValidate.v3')" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.isSort')">
                        <el-select v-model="form.isSort" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.isSort')" size="small" clearable>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.setChoose.choose')" value="1"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.setChoose.unChoose')" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.isMultStr')">
                        <el-select v-model="form.isMultStr" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.isMultStr')" size="small" clearable>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.setChoose.choose')" value="1"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.setChoose.unChoose')" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.isConfigIni')">
                        <el-select v-model="form.isConfigIni" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.isConfigIni')" size="small" clearable>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.setChoose.choose')" value="1"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.setChoose.unChoose')" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('app.table.task.appConfig.addAndEdit.label.isConfigDeepVerify')">
                        <el-select v-model="form.isConfigDeepVerify" :placeholder="$t('app.table.task.appConfig.addAndEdit.tips.isConfigDeepVerify')" size="small" clearable>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.setChoose.choose')" value="1"></el-option>
                            <el-option :label="$t('app.table.task.appConfig.addAndEdit.setChoose.unChoose')" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="small" plain @click="handleClose">{{ $t('app.table.task.appConfig.addAndEdit.btns.cancle') }}</el-button>
            <el-button type="primary" size="small" plain @click="handleSave">{{ $t('app.table.task.appConfig.addAndEdit.btns.save') }}</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        name: 'AppsConfigDialog',
        data() {
            return {
                form: {
                    appName: '',
                    appType: '',
                    appVersion: '',
                    targetType: '',
                    appPwdMax: '',
                    appPwdMin: '',
                    commandLine: '',
                    verifyLib: '',
                    workingDir: '',
                    ops: '',
                    planMode: '0',
                    resValidateType: '0',
                    isSort: '0',
                    isMultStr: '0',
                    isConfigIni: '0',
                    isConfigDeepVerify: '0'
                },
                versionLists: [
                    {
                        label: "PDFR2/PDFR4/PDFR5" ,
                        value: 0
                    },
                    {
                        label: "PDFR2/PDFR5" ,
                        value: 1
                    }
                ],
                appTypeLists: [
                    {
                        label: "RAR" ,
                        value: 1
                    },
                    {
                        label: "Office" ,
                        value: 2
                    },
                    {
                        label: "PDF" ,
                        value: 3
                    },
                    {
                        label: "ZIP20" ,
                        value: 4
                    }
                ],
                formLabelWidth: '185px',
                labelPosition: 'right',
                visibleDialog: false
            }
        },
        props: {
            title: {            // true弹框的名字
                type: String,
                default: ''
            },
            dialogVisible: {    // true表示显示，false表示隐藏
                type: Boolean,
                default: ''
            },
            formInit: {             // 初始化表单数据
                type: Object,
                default: () => {}
            },
            dialogType: {       // 0表示新增，1表示编辑
                type: Number,
                default: 0
            }
        },
        mounted() {
            this.form.appName = this.formInit.appName;
            this.form.appType = this.formInit.appType;
            this.form.appVersion = this.formInit.appVersion;
            this.form.targetType = this.formInit.targetType;
            this.form.appPwdMax = this.formInit.appPwdMax;
            this.form.appPwdMin = this.formInit.appPwdMin;
            this.form.commandLine = this.formInit.commandLine;
            this.form.verifyLib = this.formInit.verifyLib;
            this.form.workingDir = this.formInit.workingDir;
            this.form.ops = this.formInit.ops;
            this.form.planMode = this.formInit.planMode;
            this.form.resValidateType = this.formInit.resValidateType;
            this.form.isSort = this.formInit.isSort;
            this.form.isMultStr = this.formInit.isMultStr;
            this.form.isConfigIni = this.formInit.isConfigIni;
            this.form.isConfigDeepVerify = this.formInit.isConfigDeepVerify;

            this.visibleDialog = this.dialogVisible;
        },
        methods: {
            handleSave() {  // 保存表单数据，并发射事件(handle-save)到调用此组件的父组件上，进行前后台数据交互
                this.$emit('handle-save', {
                    form: this.form,
                    type: this.dialogType
                })
            },
            handleChangeMax(val) {
                console.log(val, 'max');
            },
            handleChangeMin(val) {
                console.log(val, 'min');
            },
            handleClose() {
                this.$emit('handle-close');
                this.visibleDialog = false;
            }
        }
    }
</script>

<style lang="less">
    .appConfigForm {
        
        .el-input-number--small {
            width: 200px !important;
        }

        .el-form-item__content {
            width: 200px !important;
        }
    }
</style>
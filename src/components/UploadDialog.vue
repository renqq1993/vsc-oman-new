<template>
    <el-dialog :title="$t(prefix + 'uploadTitle')" :visible="tabVision" :before-close="closeDialog" :close-on-click-modal="false" v-dialogDrag>
        <span slot="title">
            <span class="tabTitle">{{$t(prefix + 'uploadTitle')}}</span>
            <a class="el-icon-minus" @click="tabVision=false"></a>
        </span>
        <el-alert :title="$t(prefix + 'tips.warnTip')" type="warning"  show-icon></el-alert>
        <el-table max-height="300" :data="fileList" style="width: 100%">
            <el-table-column property="file.name" :label="$t(prefix + 'uploadColumn.filename')" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :label="$t(prefix + 'uploadColumn.progress')" align="center">
                <template property="percent" slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>
                </template>
            </el-table-column>
            <el-table-column :label="$t(prefix + 'uploadColumn.status')" property="status" align="center"></el-table-column>
            <el-table-column  :label="$t(prefix + 'uploadColumn.ope')" align="center">
                <template slot-scope="scope">
                    <p v-if="scope.row.percent != 100">
                        <el-button plain type="primary" v-if="scope.row.status == $t(prefix + 'uploadStatus.pause')" class="uploadSelfBtn" :title="$t(prefix + 'btn.restore')" size="mini" icon="el-icon-vpn-play" @click="resume(scope.row)"></el-button>
                        <el-button plain type="warning" v-else class="uploadSelfBtn" :title="$t(prefix + 'btn.pause')" size="mini" icon="el-icon-vpn-pause" @click="stop(scope.row)"></el-button>
                        <el-button plain type="danger"  class="uploadSelfBtn" :title="$t(prefix + 'btn.cancelUpload')" size="mini" icon="el-icon-close" @click="remove(scope.row)"></el-button>
                    </p>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>
<script>
import Bus from "@/assets/js/bus.js"
import { mapMutations, mapState } from "vuex"
import { delTempFileInfoForWeb } from '@/api/getData'
import VueCookies from 'vue-cookies'
import $ from 'jquery'

export default {
    name: "UploadDialog",
    data() {
        return {
            prefix:"app.table.dictionary.dictUpload.",
            tabVision: false,
            fileList: [],
            treeList: [],
            count: 0,
        }
    },
    mounted() {
        // 文件选择后的回调
        Bus.$on("fileAdded", convertData => {
            let data = {
                file: convertData.file,
                percent: 0,
                status: this.$t(this.prefix + 'uploadStatus.wait'),
                fileType:convertData.fileType
            };

            if (this.fileList.indexOf(data) == -1) {
                this.fileList.push(data);
                this.increaseCount();
            }
            this.tabVision = true;
        });
        // 文件上传成功的回调
        Bus.$on("fileSuccess", (response) => {

            let data = this.fileList.find(data => data.file.uniqueIdentifier == response.identifier);

            if (data != undefined) {

                if (response.status == 0) {
                    this.fileList.splice(this.fileList.indexOf(data), 1);
                    this.decreaseCount();

                    if (this.fileList.length == 0) {
                        this.closeTab(true);
                    }
                    
                    return this.$message({
                        type: 'error',
                        message: res.message,
                        customClass: 'message_zIndex',
                        duration: 2000
                    });
                }
                else{
                    this.$message({
                        message: this.$t(this.prefix + 'tips.uploadSuccess'),
                        type: "success"
                    });

                    data.status = this.$t(this.prefix + 'uploadStatus.Success');
                    data.percent = 100;
                    let tree = { 
                        name: response.name,
                        fullPath: response.fullPath,
                        type: response.type,
                    }
                    if(tree.type == "target"){
                         this.targetList = this.$store.state.targetList;
                         if (this.targetList.indexOf(tree) == -1) {
                            this.targetList.push(tree);
                         }
                    }
                    else{
                        this.dictList = this.$store.state.dictList;
                         if (this.dictList.indexOf(tree) == -1) {
                            this.dictList.push(tree);
                         }
                    }
                    this.decreaseCount();
                    let unfinishArray = this.fileList.filter(data => data.percent != 100);
                    if (unfinishArray.length == 0){
                        this.closeTab(false);
                    }
                }
            }
        });

        Bus.$on("fileProgress", file => {
            let data = this.fileList.find(data => data.file.uniqueIdentifier == file.uniqueIdentifier);

            if (data != undefined) {
                let percent = Math.round(file.progress() * 100);

                if (percent == 100) {
                    percent = 99;
                }

                data.percent = percent;

                if (data.file.isUploading()) {
                    data.status = this.$t(this.prefix + 'uploadStatus.upload');
                }
            }
        });

        Bus.$on("showUpload", query =>{
            this.tabVision = true;
        });
        //添加监听，当关闭浏览器和刷新后调用beforeunloadHandler
        window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    },
    methods: {
        ...mapMutations(["setCount","decreaseCount","increaseCount"]),
        stop(data) {
            let file = data.file;
            file.pause();
            data.status = this.$t(this.prefix + 'uploadStatus.pause');
        },
        resume(data) {
            let file = data.file;
            file.resume();
            data.status = this.$t(this.prefix + 'uploadStatus.upload');
        },
        //取消上传时关闭服务器临时文件
        async delTmpFile_remove(requestData){
             let response = await delTempFileInfoForWeb(requestData);
               if(response.status == 1){
                this.$message({
                    type: 'success',
                    message: this.$t(this.prefix + 'tips.cancelUpload'),
                    duration: 2000,
                    customClass: 'message_zIndex',
                    showClose: true
                });
            }
            else{
                this.$message({
                    type: 'error',
                    message: this.$t(this.prefix + 'tips.deleteFail') + response.message,
                    duration: 2000,
                    customClass: 'message_zIndex',
                    showClose: true
                });
            }
        },
        //关闭弹框时删除服务器中临时文件
        async delTmpFile_close(deleteList){
             let identifierTargetArr = [];
             let identifierDictArr = [];
             deleteList.forEach(item => {
                if (item.percent != 100 && item.fileType == "target") {
                    identifierTargetArr.push(item.file.uniqueIdentifier);
                }
                if (item.percent != 100 && item.fileType == "dict") {
                    identifierDictArr.push(item.file.uniqueIdentifier);
                }
            });
            let targetRes = {};
            let dictRes = {};
            if(identifierTargetArr.length > 0){
                targetRes = await delTempFileInfoForWeb({type: 0,identifier: identifierTargetArr});
            }
            if(identifierDictArr.length > 0){
                dictRes = await delTempFileInfoForWeb({type: 1,identifier: identifierDictArr});
            }      
            if (targetRes.status == 0 || dictRes.status == 0) {	
                this.$message({
                    type: 'error',
                    message: this.$t(this.prefix + 'tips.deleteFail'),
                    duration: 2000,
                    customClass: 'message_zIndex',
                    showClose: true
                });
            } 
            else {
                this.$message({
                    type: 'success',
                    message: this.$t(this.prefix + 'tips.cancelUpload'),
                    duration: 2000,
                    customClass: 'message_zIndex',
                    showClose: true
                });
            }
        },
        //取消上传
        remove(data) {
            let file = data.file;
            file.cancel();
            this.fileList.splice(this.fileList.indexOf(data), 1);
            this.decreaseCount();
            let requestData = {};
            if(data.fileType == 'target'){
                requestData = {
                     type: 0,
                     identifier: [data.file.uniqueIdentifier]
                }
            }
            else{
                requestData = {
                     type: 1,
                     identifier: [data.file.uniqueIdentifier]
                }
            }
            let that = this;
            setTimeout(
                function(){
                    that.delTmpFile_remove(requestData);
                },500);
        },
        closeTab(flag) {
            if (this.fileList.length > 0 && flag) {

                this.fileList.forEach(data => {

                    if (data.file.isUploading()){
                        data.file.cancel();
                    }
                });
            }
            this.fileList = [];
            this.setCount(0);
            this.tabVision = false;
        },
        closeDialog() {
            let that = this;

            if (this.fileList.length > 0) {
                this.$confirm(this.$t(this.prefix + 'tips.closeTip'), '提示', {
					confirmButtonText: this.$t(this.prefix + 'btn.confirm'),
					cancelButtonText: this.$t(this.prefix + 'btn.cancel'),
					type: 'warning'
				}).then(async () => {
                    let deleteFileList = [...this.fileList];
                    that.closeTab(true);
                    let _this = that;
					setTimeout(
                        function(){
                            _this.delTmpFile_close(deleteFileList);
                        },500);
				}).catch(() => {
					this.$message({
						type: 'info',
                        message: this.$t(this.prefix + 'tips.calcelClose'),
                        duration: 2000,
                        customClass: 'message_zIndex',
                        showClose: true
					});          
				});
            } else {
                this.tabVision = false;
            }
        },
        //在刷新和关闭浏览器时将未上传完的文件的identifier存入cookie中
        beforeunloadHandler (e) {
            let identifierTargetArr = [];
            let identifierDictArr = [];

            this.fileList.forEach(item => {

                if (item.percent != 100 && item.fileType == "target") {
                    identifierTargetArr.push(item.file.uniqueIdentifier);
                }
                if (item.percent != 100 && item.fileType == "dict") {
                    identifierDictArr.push(item.file.uniqueIdentifier);
                }
            });
           this.$cookies.set("targetArr", identifierTargetArr);
           this.$cookies.set("dictArr", identifierDictArr);
        }
    },
    //在创建组件时先销毁之前残余的临时文件
    created(){
        let targetArr =  this.$cookies.get("targetArr");
        let dictArr =   this.$cookies.get("dictArr");
        this.$cookies.remove("targetArr");
        this.$cookies.remove("dictArr");
        if(targetArr != '' && targetArr!=null){
            let targetList = targetArr.split(",");
            let targetRes = delTempFileInfoForWeb({type: 0,identifier: targetList});
        }
        if(dictArr != '' && dictArr != null){
            let dictList = dictArr.split(",");
            let dictRes = delTempFileInfoForWeb({type: 1,identifier: dictList});
        }
    },
    //销毁时解除刷新和关闭浏览器监听
    destroyed() {
        window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    }
}
</script>
<style lang="less" scoped>
    .el-icon-minus {
        top: 16px;
        position: absolute;
        right: 60px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
        color: #909399;
    }
    .tabTitle{
        line-height: 24px;
        font-size: 18px;
        color: #303133;
    }

    .uploadSelfBtn {
        padding: 6.5px 12px !important;
        position: relative;
        top: 2px;
    }
    /deep/ .el-icon-vpn-play{
        font-size: 12px;
    }
    /deep/ .el-icon-vpn-pause{
        font-size: 12px;
    }
</style>

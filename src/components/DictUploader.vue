<template>
    <div id="global-uploader">
        <!-- 上传 -->
        <uploader 
            ref="uploader"
            :options="options"
            :autoStart="false"
            @file-added="onFileAdded"
            @file-success="onFileSuccess"
            @file-progress="onFileProgress"
            @file-error="onFileError"
            class="uploader-app">
            <uploader-unsupport></uploader-unsupport>
            <uploader-btn id="dict-uploader-btn" :attr="attrs" ref="uploadBtn">选择文件</uploader-btn>
        </uploader>
    </div>
</template>
<script>
import { ACCEPT_CONFIG } from "../assets/js/config"
import Bus from "../assets/js/bus"
import SparkMD5 from "spark-md5"
import Vue from 'vue'

export default {
    name: "DictUploader",
    data() {
        return {
            options: {
                prefix:"app.table.dictionary.dictUpload.",
                target: Vue.prototype.BASE_URL + "/webapp/index.php/home/DataService/uploadFileToServer",
                chunkSize: "2048000",
                maxChunkRetries: 3,
                testChunks: true, // 是否开启服务器分片校验
                allowDuplicateUploads: false,
                headers: {
                    token_type: 1
                },
                checkChunkUploadedByResponse: function(chunk, message) {
                    let objMessage = JSON.parse(message);
                    return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0;
                }
            },
            attrs: {
                accept: ACCEPT_CONFIG.getAll()
            },
            test: this.$store.state.openUploader
        }
    },
    mounted() {
        Bus.$on("openDictUploader", data => {
            if (this.$refs.uploadBtn) {
                $("#dict-uploader-btn").click();
            }
        });
    },
    computed: {
        //Uploader实例
        uploader() {
            return this.$refs.uploader.uploader;
        }
    },
    methods: {
        onFileAdded(file) {
            let convertData = {
                file:file,
                fileType:"dict"
            }
            Bus.$emit("fileAdded", convertData);
            this.computerMD5(file);
        },
        onFileProgress(rootFile, file, chunk) {
            Bus.$emit("fileProgress", file);
        },
        
        onFileError(rootFile, file, response, chunk) {
            this.$message({
                message: this.$t(this.prefix + 'tips.uploadFailure'),
                type: "error"
            });
        },
          onFileSuccess(rootFile, file, response, chunk) {
            let res = JSON.parse(response);
            if(res.status == 1){
                let data = { identifier:res.data.identifier, filename: file.file.name, name:file.file.name, totalChunks:file.chunks.length};
            
                //如果服务器返回需要合并
                if (res.data.needMerge) {
                    this.mergeResponse(data);
                } else {
                    let responseData = {...data, name:res.data.name, fullPath:res.data.fullPath, type:"dict"}
                    Bus.$emit("fileSuccess",responseData);
                }
            }
            else{
                 this.$message({
                    message: this.$t(this.prefix + 'tips.uploadFailure')+res.message,
                    type: "error"
                });
            }
         },
         //大文件上传合并
         async mergeResponse(data) {
             let requestConfig = {
                credentials: 'include',
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "token_type":1,
                },
                mode: "cors",
                cache: "force-cache",
                body:JSON.stringify(data),
            }
            try {
                    const response = await fetch(Vue.prototype.BASE_URL + "/webapp/index.php/home/DataService/mergeUploadFile", requestConfig);
                    const responseJson = await response.json();
                    if (response.status == 200) {
                         let responseData = {...responseJson.data, type:"dict"}
                        Bus.$emit("fileSuccess", responseData);
                    } 
                    else {
                           throw new Error(error) 
                    }
                } catch (error) {
                     this.$message({
                                message: this.$t(this.prefix + 'tips.uploadFailure'),
                                type: "error"
                            });
                   
                }
        },
        /**
         * 计算md5,实现断点续传及妙传
         * @param file
         */
        computerMD5(file) {
            let fileReader = new FileReader();
            let time = new Date().getTime();
            let md5 = "";
            file.pause();
            let string = file.name + new Date() + Math.random;
            var blob = new Blob([string], { type: "text/plain;charset=utf-8" });
            fileReader.readAsArrayBuffer(blob);
            fileReader.onload = e => {
                let array = new Uint8Array(e.target.result);
                md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
                //添加额外的参数
                this.uploader.opts.query = {...this.params};
                file.uniqueIdentifier = md5;
                file.resume();
            };
            fileReader.onerror = function() {
                this.error("FileReader onerror was triggered, maybe the browser aborted due to high memory usage");
            };
        },
    },
    destroyed() {
        Bus.$off("openUploader");
    }
}
</script>
<style lang="less" scoped>
    #global-uploader {
        position: fixed;
        z-index: 20;
        right: 15px;
        bottom: 15px;
    }
    /* 隐藏上传按钮 */
    #dict-uploader-btn {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }
</style>


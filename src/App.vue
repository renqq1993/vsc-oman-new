<template>
  <div id="app">
    <router-view/>
     <!-- 将上传组件全局注册 -->
    <dict-uploader></dict-uploader>
    <global-uploader></global-uploader>
    <upload-dialog></upload-dialog>
  </div>
</template>

<script>
import GlobalUploader from '@/components/GlobalUploader'
import DictUploader from '@/components/DictUploader'
import UploadDialog from '@/components/UploadDialog'
export default {
  name: 'App',
  components:{
      GlobalUploader,
      DictUploader,
      UploadDialog
  }
}
</script>

<style lang="less">
  @import './style/common';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
</style>

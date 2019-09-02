<template>
    <!-- 全部字典分类树节点 -->
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>
<script>
import {dictClassificationDetail} from '@/mock/mock.js'
export default {
    name:"ClassificationTree",
    props:{
        reset:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {
            data:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    watch:{
        reset(value){
            if(value){
                console.log(value);
                this.init();
                this.$emit("handleReset",false);
            }
        }
    },
    methods:{
        //点击树节点触发
        handleNodeClick(data) {
            this.$emit("nodeClick", data);
        },
        init(){
            try {
                // let res = await getDictClassification();
                let res = {
                    message:"获取字典分类成功",
                    data:dictClassificationDetail,
                    status:1,
                };
                if (res.status == 1) {
                    this.data = res.data;
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
        }
    },
    created(){
        this.init();
    }
}
</script>

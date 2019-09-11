<template>
   <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :label="$t(prefix + 'tab1')" name="tab1">
                <el-row>
                    <el-col :span="5">
                        <mode-tree :reset="reset" activeKey="tab1" @handleReset="handleReset"  @clickNode="clickNode"></mode-tree>
                    </el-col>
                    <el-col :span="17" :offset="2">
                        <el-row>
                            <type-table v-show="showTable"></type-table>
                            <div v-if="!showTable">
                                <div class="title">{{$t(prefix + 'tips.title')}}</div>
                                <div class="content">{{$t(prefix + 'tips.setPwd')}}</div>
                            </div>
                        </el-row>
                    </el-col>
                </el-row>
        </el-tab-pane>
        <el-tab-pane :label="$t(prefix + 'tab2')" name="tab2">
                <el-row>
                    <el-col :span="5">
                         <mode-tree :reset="reset" activeKey="tab2"  @handleReset="handleReset"></mode-tree>
                    </el-col>
                    <el-col :span="17" :offset="2">
                        <task-table></task-table>
                    </el-col>
                </el-row>
        </el-tab-pane>
    </el-tabs>  
</template>
<script>
 
 import DictClassDialog from '@/components/dictionary/DictClass/DictClassDialog'
 import ModeTree from '@/components/task/templateConfig/ModeTree'
 import TypeTable from "@/components/task/templateConfig/TypeTable"
 import TaskTable  from "@/components/task/templateConfig/TaskTable.vue"
    export default {
        name: 'TemplateConfig',
        data(){
            return {
                prefix:"app.table.task.templateConfig.",
                activeName:"tab1",
                reset:false,
                showTable:false,
            };
        },
        methods:{
            handleClose(value){
                //是否init节点
                this.reset = value.reset;
                this.dialogVision = value.visible;
            },
            //节点树init后返回处理
            handleReset(value){
                this.reset = value;
            },
            handleClick(){
               this.reset = true;
            },
            clickNode(){
                this.showTable = true;
            }
        },
        components:{
            //节点树组件
             ModeTree,
           TypeTable,
           TaskTable
        }
    }
    </script>
    <style scoped>
    .border{
        border: 1px solid #EBEEF5;
        margin-top: 10px;
        height:400px;
    }
    .el-col-offset-2{
        margin-left: 4.3333% !important;
    }
    .title{
        padding-top: 40px;
        color: red;
        font-size: 30px;
    }
    .content{
        font-size: 25px;
        padding-top: 20px;
        font-family: inherit;
        text-align: center;
    }
    </style>
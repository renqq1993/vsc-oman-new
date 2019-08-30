<template>
    <el-card class="dict-upload-list-card" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-new-icon-yingyongpeizhi"></i>
                    <span class="item-ml-5">{{ $t( prefix + 'title') }}</span>
                </p>
            </div>
            <div class="dict-upload-main clear" v-loading="loading" :element-loading-text="$t('app.table.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <div class="vsc-target-choose">
                    <el-row>
                        <el-col :span="7">
                            <div class="border">
                                <classification-tree @nodeClick="handleClick"></classification-tree>
                            </div>
                        </el-col>
                        <el-col :span="15" :offset="2">
                            <el-row>
                                <el-table border ref="simpleTable" :data="targetList" tooltip-effect="dark" style="margin-top: 10px; width: 100%;" height="300">
                                    <el-table-column prop="label" label="名称" align="center" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="ope" label="操作" align="center" show-overflow-tooltip>
                                         <template slot-scope="scope">
                                             <el-button plain @click="handleDelete(scope.row)" type="danger" icon="el-icon-add"  size="mini" :title="$t( prefix + 'btn.delete')"></el-button>
                                             <el-button plain @click="handleDelete(scope.row)" type="danger" icon="el-icon-edit"  size="mini" :title="$t( prefix + 'btn.delete')"></el-button>
                                            <el-button plain @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete"  size="mini" :title="$t( prefix + 'btn.delete')"></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-card>
</template>
<script>
 import ClassificationTree from '@/components/dictionary/SplitDict/ClassificationTree'
    export default {
        name: 'DictClass',
        data(){
            return {
                prefix:"app.table.dictionary.splitDict.",
                targetList:[]
            };
        },
        computed:{
            classifiedVisiable:{
                get(){
                    if(this.visibleModal){
                        this.targetList = [];
                    }
                    return this.visibleModal;
                },
                set(val){
                    return val;
                }
            }
        },
        methods:{
            handleClose(){
                this.$emit("TreeNodeClose", false);
            },
            //点击树节点触发
            handleClick(value){
                this.targetList = [value];
            },
            async confirm(){
                 this.loading = true;
                 console.log(this.type);
                 if(this.targetList.length > 0){
                     try {
                          if(this.type == "replace"){
                               // const res = await  replaceDictClassification({
                            //     dictId: this.id, 
                            //     oldNodeId: this.oldID,
                            //     newNodeId:this.targetList[0]
                            // });	
                          }
                          else if(this.type == "split"){
                              this.$emit("addClassification", this.targetList[0]);
                               this.handleClose();
                              return;
                          }
                          else{
                                 // const res = await  addDictClassification({
                                //     dictId: this.id, 
                                //     newNodeId:this.targetList[0]
                                // });	
                          }
                        console.log({
                             dictId: this.id, 
                             oldNodeId: this.oldID,
                             newNodeId:this.targetList[0].NodeId });
                        let res = {
                            message:"加载切分字典列表成功",
                            status:1
                        };
                        if (res.status == 1) {
                            this.loading = false;
                            this.total = res.total;
                            let num = 0;

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
                 }
                 else{
                     this.$message({
                                type: 'info',
                                message: "请选择字典类型",
                                duration: 2000,
                                showClose: true
                        });
                 }
                 this.handleClose();
            },
            cancel(){
                this.handleClose();
            }
        },
        components:{
            ClassificationTree
        }
    }
    </script>
    <<style scoped>
    .border{
        border: 1px solid #EBEEF5;
        margin-top: 10px;
        height:400px;
    }
    </style>
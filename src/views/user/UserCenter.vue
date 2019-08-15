<template>
    <el-card class="user-info-card" shadow="hover">
        <div slot="header" class="clearfix">
            <p class="card-title-adjust">
                <i class="el-icon-new-icon-yonghuliebiao"></i>
                <span class="item-ml-5">{{ $t('app.table.user.cardTitle') }}</span>
            </p>
            <el-button @click="handleCreate" class="item-right" type="primary" icon="el-icon-plus" size="mini" :title="$t('app.table.user.btnTips.add')"></el-button>
        </div>
        <div class="user-info-main clear" 
            v-loading="loading" 
            :element-loading-text="$t('app.table.loading')" 
            element-loading-spinner="el-icon-loading" 
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table :data="tableData" border>
                <el-table-column prop="name" :label="$t('app.table.user.columns.userName')" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="author" :label="$t('app.table.user.columns.author')" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="remark" :label="$t('app.table.user.columns.remark')" show-overflow-tooltip>
                </el-table-column>
                <el-table-column :label="$t('app.table.user.columns.operation')" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" plain class="user-info-more" icon="el-icon-new-icon-zhanghaoquanxianguanli" :title="$t('app.table.user.btnTips.detail')" type="primary" @click="handleGoIntoDetails(scope.$index, scope.row)"></el-button>
                        <el-button size="mini" plain icon="el-icon-edit" :title="$t('app.table.user.btnTips.edit')" type="primary" @click="handleEdit(scope.$index, scope.row)"></el-button>
                        <el-button size="mini" plain icon="el-icon-delete" :title="$t('app.table.user.btnTips.delete')" type="danger" @click="handleDelete(scope.$index, scope.row)"></el-button>
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
</template>
<script>
import SearchCard from '@/components/search/SearchCard'
import Vue from 'vue'
import { getUsers, deleteUser, editUser, createUser } from '@/api/getData'
import $ from 'jquery'
export default {
    name: 'Usercenter',
    data() {
        return {
            tableData: [
                {   
                    id: 1,
                    name: '王小虎',
                    author: '管理员',
                    remark: '系统固有管理员'
                }, 
                {
                    id: 2,
                    name: '王虎',
                    author: '一般用户',
                    remark: '新建用户'
                }, 
                {
                    id: 3,
                    name: '王小小',
                    author: '一般用户',
                    remark: '管理员新建'
                }, 
                {
                    id: 4,
                    name: '小虎',
                    author: '一般用户',
                    remark: '管理员创建'
                },
                {
                    id: 5,
                    name: '王虎',
                    author: '一般用户',
                    remark: '新建用户'
                }, 
                {
                    id: 6,
                    name: '王小小',
                    author: '一般用户',
                    remark: '管理员新建'
                }, 
                {
                    id: 7,
                    name: '小虎',
                    author: '一般用户',
                    remark: '管理员创建'
                },
                 {
                    id: 8,
                    name: '王虎',
                    author: '一般用户',
                    remark: '新建用户'
                }, 
                {
                    id: 9,
                    name: '王小小',
                    author: '一般用户',
                    remark: '管理员新建'
                }, 
                {
                    id: 10,
                    name: '小虎',
                    author: '一般用户',
                    remark: '管理员创建'
                },
                {
                    id: 11,
                    name: '王虎',
                    author: '一般用户',
                    remark: '新建用户'
                }, 
                {
                    id: 12,
                    name: '王小小',
                    author: '一般用户',
                    remark: '管理员新建'
                }, 
                {
                    id: 13,
                    name: '小虎',
                    author: '一般用户',
                    remark: '管理员创建'
                }
            ],
            tableData1: [
                {   
                    id: 1,
                    name: 'small tiger Wang',
                    author: 'administrator',
                    remark: 'administrator'
                }, 
                {
                    id: 2,
                    name: 'tiger Wang',
                    author: 'user',
                    remark: 'new created'
                }, 
                {
                    id: 3,
                    name: 'double small Wang',
                    author: 'user',
                    remark: 'created by administrator'
                }, 
                {
                    id: 4,
                    name: 'samll tiger',
                    author: 'user',
                    remark: 'created by administrator'
                },
                {
                    id: 5,
                    name: 'tiger Wang',
                    author: 'user',
                    remark: 'new created'
                }, 
                {
                    id: 6,
                    name: 'double small Wang',
                    author: 'user',
                    remark: 'created by administrator'
                }, 
                {
                    id: 7,
                    name: 'samll tiger',
                    author: 'user',
                    remark: 'created by administrator'
                },
                {
                    id: 8,
                    name: 'tiger Wang',
                    author: 'user',
                    remark: 'new created'
                }, 
                {
                    id: 9,
                    name: 'double small Wang',
                    author: 'user',
                    remark: 'created by administrator'
                }, 
                {
                    id: 10,
                    name: 'samll tiger',
                    author: 'user',
                    remark: 'created by administrator'
                },
                {
                    id: 11,
                    name: 'tiger Wang',
                    author: 'user',
                    remark: 'new created'
                }, 
                {
                    id: 12,
                    name: 'double small Wang',
                    author: 'user',
                    remark: 'created by administrator'
                }, 
                {
                    id: 13,
                    name: 'samll tiger',
                    author: 'user',
                    remark: 'created by administrator'
                }
            ],
            currentPage: 1,
            pageRange: Vue.prototype.$config.PageRange,
            pageSize: Vue.prototype.$config.PageRange[0],
            total: 0,
            loading: false
        }
    },
    mounted() {
        this.initData(this.currentPage, this.pageSize);
    },
    methods: {
        // 初始化表格，获取用户列表
        async initData(curPage, pageSize) {
            this.loading = true;

            try {
                // const res = await getUsers({ 
                //     curPage: curPage, 
                //     pageSize: pageSize
                // });	

                let res = {
                    status: 1,
                    message: 'query users ok!',
                    total: 13,
                    data: this.$i18n.locale === 'en' ? this.tableData1.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize) : this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
                }

                if (res.status == 1) {
                    this.loading = false;

                    this.total     = res.total;
                    this.tableData = res.data;		// 加载用户列表，填充表格数据
                    
                    // 修改表格和右侧屏幕可视区域宽度
                    if (this.tableData.length > 5) {
                        console.log('admin');
                        $(".itme-mr-10 section").css({'margin-right': 0});
                    } else {
                        console.log('admin122');
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
        // 切换每页显示条数
        handlePageSizeChange(val) {
            this.pageSize = val;
            this.initData(this.currentPage, this.pageSize);
        },
        // 切换当前页码
        handleCurrentPageChange(val) {
            this.currentPage = val;
            this.initData(this.currentPage, this.pageSize);
        },
        // 点击编辑按钮
        handleEdit(index, row) {
            console.log(index, row);
        },
        // 点击删除按钮
        handleDelete(index, row) {
            let _this = this;
            this.$confirm(this.$t('app.table.user.operation.delete.confirm'), this.$t('app.table.user.operation.delete.tipType'), {
                confirmButtonText: this.$t('app.table.user.operation.delete.sure'),
                cancelButtonText: this.$t('app.table.user.operation.delete.cancle'),
                type: 'warning'
            }).then(async () => {
                try {
                    const res = await deleteUser({
                        id: row.id
                    });	

                    if (res.status == 1) {
                        // 重新加载用户信息表格
                        this.initData(this.currentPage, this.pageSize);

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
                    message: this.$t('app.table.user.operation.delete.cancleTips'),
                    duration: 2000,
                    showClose: true
                });          
            });
        },
        // 点击详情按钮
        handleGoIntoDetails(index, row) {
            console.log(index, row);
        },
        // 点击新建按钮
        // 用户名、密码、角色、备注
        handleCreate() {

        }
    }
}
</script>
<style lang="less" scoped>
    .user-info-car-title {
        margin-left: 5px;
    }
</style>



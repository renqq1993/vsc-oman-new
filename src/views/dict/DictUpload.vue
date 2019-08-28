<template>
    <div class="dict-upload-main-wrapper">
        <!-- 搜索 -->
        <el-card class="dict-upload-search-card item-mb-20" shadow="hover">
            <el-form :inline="true" :model="formInline"  class="search" ref="formInline">
                <el-form-item :label="$t( prefix + 'column.dictName')" prop="name">
                    <el-input v-model="formInline.name" size="small"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" size="small" type="primary" @click="onSearch" :title="$t( prefix + 'btn.search')"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-refresh" size="small" type="primary" @click="onReset('formInline')" :title="$t( prefix + 'btn.reset')"></el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 应用文件列表 -->
        <el-card class="dict-upload-list-card" shadow="hover">
            <div slot="header" class="clearfix">
                <p class="card-title-adjust">
                    <i class="el-icon-new-icon-yingyongpeizhi"></i>
                    <span class="item-ml-5">{{ $t( prefix + 'title') }}</span>
                </p>
                <el-button-group class="item-right">
                    <el-button @click="handleDeleteMulti" type="danger" icon="el-icon-delete" v-if="!deleteDisabled" size="mini" :title="$t( prefix + 'btn.deleteSel')"></el-button>
                    <el-button @click="handleUpload" type="primary" icon="el-icon-upload" size="mini" :title="$t( prefix + 'btn.upload')"></el-button>
                </el-button-group>
            </div>
            <div class="dict-upload-main clear" v-loading="loading" :element-loading-text="$t('app.table.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table :data="tableData" border @selection-change="handleSelectionChange">
                    <el-table-column align="center" type="selection" width="100" fixed></el-table-column>
                    <el-table-column prop="ID" align="center"  :label="$t( prefix + 'column.ID')" width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="name" align="center" :label="$t( prefix + 'column.name')" width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="path" align="center" :label="$t( prefix + 'column.path')" width="600" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="operation" align="center" :label="$t( prefix + 'column.ope')" width="200" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-button plain @click="handleSplit(scope.row)" type="success" icon="el-icon-new-icon-qiefen"  size="mini" :title="$t( prefix + 'btn.split')"></el-button>
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
import AppsConfigDialog from '@/views/task/appconfig/AppsConfigDialog';
export default {
    name: 'AppConfig',
    components: {
        AppsConfigDialog
    },
    data() {
        return {
            prefix:"app.table.dictionary.dictUpload.",
            formInline: {
                name: '',
            },
            loading: false,
            currentPage: 1,
            pageRange: Vue.prototype.$config.PageRange,
            pageSize: Vue.prototype.$config.PageRange[0],
            total: 0,
            multipleSelection: [],
            deleteDisabled: true,
            tableData:[],
        }
    },
    methods: {
       onSearch(){},
       onReset(form){},
       handleDeleteMulti(){},
       handleUpload(){},
       handleSelectionChange(){},
       handleSplit(dict){},
       handlePageSizeChange(){},
       handleCurrentPageChange(){}

    }
}
</script>
<style lang="less" scoped>

</style>



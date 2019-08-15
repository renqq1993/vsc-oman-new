<template>
    <div class="home-wrapper" v-loading="loading" :element-loading-text="$t('app.table.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-card shadow="hover">
            <el-row class="headerTotalInfo">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <i>{{ $t('app.table.home.columns.ChassisNum') }}</i>
                    <count-to :end="total.ChassisNum" count-class="count-style"/>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <i>{{ $t('app.table.home.columns.BladeNum') }}</i>
                    <count-to :end="total.BladeNum" count-class="count-style"/>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <i>{{ $t('app.table.home.columns.NodeNum') }}</i>
                    <count-to :end="total.NodeNum" count-class="count-style"/>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <i>{{ $t('app.table.home.columns.OnlineNodeNum') }}</i>
                    <count-to :end="total.OnlineNodeNum" count-class="count-style"/>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="user-info-card" shadow="never">
            <div slot="header">
                <i class="el-icon-new-icon-tubiao-zhuzhuangtu"></i>
                <span class="item-ml-5">{{ $t('app.table.home.cardTitle') }}</span>
            </div>
            <div class="user-info-main clear">
                <el-row :gutter="15">
                    <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="3" v-for="(item, index) in listData" :key="index" style="margin-top: 20px;">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div slot="header">
                                <p>{{ $t('app.table.home.columns.ChassisID') }} <span>{{ item.ChassisID }}</span></p>
                            </div>
                            <div>
                                <el-row class="chassisInfo">
                                    <el-col :xs="10" :sm="8" :md="7" :lg="24" :xl="24">
                                        <img :src="deviceImgPath" class="image">
                                    </el-col>
                                    <el-col :xs="14" :sm="16" :md="17" :lg="24" :xl="24">
                                        <p>
                                            <i>{{ $t('app.table.home.columns.ChassisNum') }}</i>
                                            <count-to :end="item.ChassisNum" count-class="count-style"/>
                                        </p>
                                        <p>
                                            <i>{{ $t('app.table.home.columns.BladeNum') }}</i>
                                            <count-to :end="item.BladeNum" count-class="count-style"/>
                                        </p>
                                        <p>
                                            <i>{{ $t('app.table.home.columns.NodeNum') }}</i>
                                            <count-to :end="item.NodeNum" count-class="count-style"/>
                                        </p>
                                        <p>
                                            <i>{{ $t('app.table.home.columns.OnlineNodeNum') }}</i>
                                            <count-to :end="item.OnlineNodeNum" count-class="count-style"/>
                                        </p>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getSysDeviceData } from '@/api/getData'
import Vue from 'vue'
import $ from 'jquery'
import CountTo from '@/components/smallFunc/countTo/CountTo'
export default {
    name: "Home",
    data() {
        return {
            loading: false,
            deviceImgPath: require('@/assets/img/device_small.png'),
            total: {
                ChassisNum: 0,
                BladeNum: 0,
                NodeNum: 0,
                OnlineNodeNum: 0
            },
            listData: []
        }
    },
    components: {
        CountTo
    },
    methods: {
        async initData() {
            this.loading = true;

            try {
                // const res = await getSysDeviceData();	

                let res = {
                    status: 1,
                    message: 'query home data ok!',
                    total: {
                        ChassisNum: 6,
                        BladeNum: 1460,
                        NodeNum: 1380,
                        OnlineNodeNum: 1624
                    },
                    data: [
                        {
                            ChassisNum: 1,
                            BladeNum: 20,
                            NodeNum: 20,
                            OnlineNodeNum: 20,
                            ChassisID: 0
                        },
                        {
                            ChassisNum: 1,
                            BladeNum: 520,
                            NodeNum: 520,
                            OnlineNodeNum: 520,
                            ChassisID: 1
                        },
                        {
                            ChassisNum: 1,
                            BladeNum: 420,
                            NodeNum: 240,
                            OnlineNodeNum: 204,
                            ChassisID: 2
                        },
                        {
                            ChassisNum: 1,
                            BladeNum: 240,
                            NodeNum: 240,
                            OnlineNodeNum: 420,
                            ChassisID: 3
                        },
                        {
                            ChassisNum: 1,
                            BladeNum: 120,
                            NodeNum: 120,
                            OnlineNodeNum: 120,
                            ChassisID: 4
                        },
                        {
                            ChassisNum: 1,
                            BladeNum: 120,
                            NodeNum: 220,
                            OnlineNodeNum: 220,
                            ChassisID: 5
                        },
                        {
                            ChassisNum: 1,
                            BladeNum: 20,
                            NodeNum: 120,
                            OnlineNodeNum: 120,
                            ChassisID: 6
                        }
                    ]
                }

                if (res.status == 1) {
                    this.loading = false;

                    // 总体数据
                    this.total.ChassisNum = res.total.ChassisNum;
                    this.total.BladeNum = res.total.BladeNum;
                    this.total.NodeNum = res.total.NodeNum;
                    this.total.OnlineNodeNum = res.total.OnlineNodeNum;

                    // 单个机箱信息集合
                    this.listData = res.data;		// 加载用户列表，填充表格数据
                    
                    // 修改表格和右侧屏幕可视区域宽度
                    if (this.listData.length > 5) {
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
        }
    },
    mounted() {
        this.initData();
    }
}
</script>
<style lang="less" scoped>
    .headerTotalInfo {
        .el-col {
            margin: 5px 0;
        }
    }

    .user-info-card {
        margin-top: 20px;

        .totalInfo {
            .el-col {
                padding: 20px 0 0;
            }
        }

        .user-info-main {
            margin-top: -20px;

            .image {
                width: 80%;
                display: block;
                margin: 10px auto;
            }

            .chassisInfo {
                font-size: 14px;
                text-align: center;

                .el-col {
                    padding: 3px;
                }
            }
        }
    }
</style>

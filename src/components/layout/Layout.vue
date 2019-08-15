<template>
    <el-container class="sys-layout">
        <!-- 系统整体布局：左右结构，左边为侧边导航栏，右边为上下结构（由头部和主体部分构成），其中主题部分内容会根据侧边栏的路由动态切换内容 -->
        <el-aside :class="!isCollapse ? 'largeWidth sideWrapper' : 'smallWidth sideWrapper'" :style="{'height': sideHeight}">
            <!-- logo -->
            <h1>
                <img :src="bigLogo" alt="big logo picture" width="210" height="95" v-show="!isCollapse">
                <img :src="smallLogo" alt="small logo picture" width="64" height="45" v-show="isCollapse">
            </h1>
            <!-- 侧边导航 -->
            <el-scrollbar class="pageScroll2">
                <side-bar></side-bar>
            </el-scrollbar>
        </el-aside>
        <el-container class="pageRightPartten" :style="{'height': sysHeight, 'width': calcWidth}">
            <el-header>
                <header-bar></header-bar>
            </el-header>
            <el-scrollbar class="pageScroll">
                <el-main class="itme-mr-10">
                    <section>
                        <transition name="fade" mode="out-in">
                            <router-view :key="key"></router-view>
                        </transition>
                        <back-top :target="target"></back-top>
                    </section>
                </el-main>
            </el-scrollbar>
            <!-- 右侧边栏展开触发按钮 -->
            <div class="rightDrawer" @click="drawerShow = true">
                <i class="el-icon-setting"></i>
            </div>
            <!-- 右侧边栏 -->
            <el-drawer :visible.sync="drawerShow" size="350px" direction="rtl" class="right-drawer">
                <el-divider content-position="left"><i class="el-icon-new-icon-icon_bangzhuwendang"></i> <i>{{ $t('app.sysSetting.version') }}</i></el-divider>
                <el-row>
                    <el-col>
                        <p class="drawer-columns">
                            <strong>{{ currentVersion }}</strong>
                        </p>
                    </el-col>
                </el-row>
                <el-divider content-position="left"><i class="el-icon-question"></i> <i>{{ $t('app.sysSetting.help') }}</i></el-divider>
                <el-row>
                    <el-col>
                        <p class="drawer-columns">
                            <el-button type="primary" size="small" @click="getSysHelp">{{ $t('app.sysSetting.getHelp') }}</el-button>
                        </p>
                    </el-col>
                </el-row>
                <el-divider content-position="left"><i class="el-icon-s-check"></i> <i>{{ $t('app.sysSetting.copyrightStatement') }}</i></el-divider>
                <el-row class="copyrightStatement">
                    <el-col :class="isEn ? 'en-scroll' : ''">
                        <el-scrollbar class="pageScroll1">
                            <blockquote class="layui-elem-quote">
                                {{ $t('app.sysSetting.copyrightStatementContent') }}
                            </blockquote>
                        </el-scrollbar>
                    </el-col>
                    <el-col>
                        <p class="copyLine" v-if="hasCompany">{{ isEn ? companyEn : companyCn }}</p>
                        <p class="copyLine" v-else>{{ $t('app.sysSetting.company') }}</p>
                        <p class="copyLine" v-if="hasCopyright">{{ isEn ? copyRightEn : copyRightCn }}</p>
                        <p class="copyLine" v-else>Copyright &copy; {{ new Date().getFullYear() }} {{ $t('app.sysSetting.copyrightReserve') }}</p>
                    </el-col>
                </el-row>
                
            </el-drawer>
        </el-container>
    </el-container>
</template>

<script>
import SideBar from '@/components/layout/sideBar/SideBar'
import HeaderBar from '@/components/layout/header/HeaderBar'
import BackTop from '@/components/layout/back2top/BackTop'
import Vue from 'vue'
import { mapState } from 'vuex'
export default {
    name: 'LayoutComponent',
    data() {
        return {
            target: '',
            drawerShow: false,
            logoShow: true,
            sysColor: '#409EFF',
            predefineColors:  [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ],
            currentVersion: Vue.prototype.$config.VERSION,
            companyEn: Vue.prototype.$config.CompanyName_En,
            companyCn: Vue.prototype.$config.CompanyName_Cn,
            copyRightEn: Vue.prototype.$config.COPYRIGHT_En,
            copyRightCn: Vue.prototype.$config.COPYRIGHT_Cn,
            bigLogo: '',
            smallLogo: ''
        }
    },
    mounted() {
        if (process.env.NODE_ENV == 'development') {
            this.bigLogo = '/static/img/' + Vue.prototype.$config.BIG_LOGO_NAME,
            this.smallLogo = '/static/img/' + Vue.prototype.$config.SMALL_LOGO_NAME
        } else {
            this.bigLogo = Vue.prototype.$config.BASE_IMG_URL + '/static/img/' + Vue.prototype.$config.BIG_LOGO_NAME,
            this.smallLogo = Vue.prototype.$config.BASE_IMG_URL + '/static/img/' + Vue.prototype.$config.SMALL_LOGO_NAME
        }
    },
    components: {
        SideBar,
        HeaderBar,
        BackTop
    },
    computed: {
        ...mapState({
            isCollapse: state => state.app.isCollapse
        }),
        key() {
            return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
        },
        sysHeight() {
            return document.body.clientHeight + 'px';
        },
        sideHeight() {
            return (document.body.clientHeight) + 'px';
        },
        calcWidth() {
            return this.isCollapse ? 'calc(100% - 64px)' : 'calc(100% - 210px)'
        },
        isEn() {
            return (this.$i18n.locale === 'en') ? true : false;
        },
        hasCompany() {
            return (Vue.prototype.$config.CompanyName_Cn && Vue.prototype.$config.CompanyName_En) ? true : false;
        },
        hasCopyright() {
            return (Vue.prototype.$config.COPYRIGHT_Cn && Vue.prototype.$config.COPYRIGHT_En) ? true : false;
        }
    },
    methods: {
        changeLogoStatus(e) {
            this.logoShow = e;
        },
        getSysHelp() {
            this.$message({
                type: 'success',
                message: '成功了哟',
                offset: 20,
                duration: 3000,
                customClass: 'message_zIndex'
            }); 
        }
    }
}
</script>
<style lang="less">
    ul.el-menu.el-menu--popup.el-menu--popup-right-start {
        max-height: 336px;
        overflow-y: auto;
    }

    .sys-layout {
        overflow-y: hidden;

        .sideWrapper {
            overflow-y: hidden;

            .pageScroll2 {
                // height: 100%;
                height: 90%;    // 使得侧边导航出现滚动条时将滚动条拉到最底部时能显示最低栏内容

                .el-scrollbar__wrap{
                    overflow: auto;
                    overflow-x: hidden;
                }
            }
        }

        .pageScroll {
            height: 100%;

            .el-scrollbar__wrap{
                overflow: auto;
                overflow-x: hidden;

                // .el-main {
                    // background: #ccc;
                    // margin-right: 15px;
                // }
            }
        }

        .rightDrawer {
            width: 35px;
            height: 35px;
            position: fixed;
            right: 0;
            text-align: center;
            font-size: 24px;
            border-radius: 6px 0 0 6px !important;
            z-index: 5;
            pointer-events: auto;
            color: #fff;
            line-height: 35px;
            top: 250px;
            background-color: rgb(24, 144, 255);
            cursor: pointer;
        }
    }

    .right-drawer {

        header#el-drawer__title {
            margin-bottom: 0;
            padding-bottom: 0;
            padding-top: 10px;
        }

        section {

            .el-row {
                min-height: 60px;

                .copyLine {
                    color: #999;
                    text-indent: 5px;
                    font-size: 14px;
                    text-align: center;
                    padding: 5px 0;
                }

                .drawer-columns {
                    padding: 15px 25px 0;

                    & > span {
                        color: #999;
                        margin-right: 25px;
                    }
                }

                .layui-elem-quote {
                    padding: 15px;
                    line-height: 22px;
                    border-radius: 0 2px 2px 0;
                    background-color: #f2f2f2;
                    margin: 8px 20px 15px 25px;
                    text-indent: 2em;
                    color: #666;
                }
            }

            .el-row.copyrightStatement {
                
                .el-col.en-scroll {
                    height: 200px;
                    margin-bottom: 10px;
                    overflow-y: hidden;

                    .pageScroll1 {
                        height: 100%;

                        .el-scrollbar__wrap{
                            overflow: auto;
                            overflow-x: hidden;
                        }
                    }
                }
            }

            .el-divider {

                i.el-icon-new-icon-icon_bangzhuwendang {
                    font-size: 12px;
                }

                &:first-child {
                    margin: 12px 0 24px;
                }
            }
        }
    }
</style>
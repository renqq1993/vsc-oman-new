<template>
    <el-menu class="navbar nav-outer" mode="horizontal"> 
        <!-- 查看全局上传数据，如目标文件、字典文件等(about upload components, such as target files or dictionary files) -->
        <div class="uploadBtn nav-inner-item" :title="$t('app.headerBtn.uploadListTips')" @click="showUpload">
            <el-badge :value="uploadCount" :hidden="hidden">
                <i class="el-icon-upload" ></i>
            </el-badge>
        </div> 
        <!-- 锁屏 -->
        <lock-screen></lock-screen>
        <!-- 切换语言（switch language） -->
        <el-dropdown @command="handleLangChange" class="lang-icon nav-inner-item">
            <div class="language-change-wrapper">
                <i class="el-icon-new-icon-language"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="cn">
                    <span>{{ $t('app.lang.chinese') }}</span>
                </el-dropdown-item>
                <el-dropdown-item command="en">
                    <span>{{ $t('app.lang.english') }}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- 用户信息：用户头像、用户名、下拉（退出登录、进入个人中心）(user infomation: such as "user avatar" , "user name" , also a dropdown list) -->
        <el-dropdown class="avatar-container nav-inner-item" @command="handleCommand">
            <div class="avatar-wrapper">
                <el-row>
                    <el-col>
                        <el-avatar :src="avatarImg" class="userAvatar" fit="cover"></el-avatar>
                        <i class="el-icon-caret-bottom"></i>
                    </el-col>
                </el-row>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user" command="userCenter">
                    <span>{{ $t('app.userInfo.user') }}</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-new-icon-GroupCopy" command="signout" divided>
                    <span>{{ $t('app.userInfo.logout') }}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
</template>
<script>
import Vue from 'vue'
import LockScreen from '@/components/smallFunc/lockPage/LockScreen'
import { mapActions, mapMutations } from 'vuex'
import Bus from '@/assets/js/bus'
export default {
    name: 'NavBar',
    data() {
        return {
            avatarImg: require("@/assets/logo.png"),
            //隐藏上传按钮上的数字
            hidden:true,
        }
    },
    components: {
        LockScreen
    },
    mounted() {

        // 根据默认语言设置浏览器标题
        if (this.$i18n.locale == 'cn') {
            document.title = Vue.prototype.$config.SYS_TITLE_Cn;
        } else {
            document.title = Vue.prototype.$config.SYS_TITLE_En;
        }
    },
    computed:{
        //监听上传按钮上的数字
          uploadCount:function(){
                if(this.$store.state.upload.uploadCount > 0){
                    this.hidden = false;
                    return this.$store.state.upload.uploadCount;
                }
                else{
                    this.hidden = true;
                }
            }
    },
    methods: {
        ...mapActions('user', ['handleLogOut']),
        ...mapMutations('user', ['clearLock', 'setUserName'],'upload'),
        handleLangChange(command) {     // 切换语言

            if (this.$i18n.locale === command) {
                return this.$message({
                    type: 'info',
                    message: this.$t('app.lang.exist'),
                    duration: 3000,
                    customClass: 'message_zIndex'
                }); 
            } else {
                this.$i18n.locale = command;

                if (this.$i18n.locale == 'cn') {
                    document.title = Vue.prototype.$config.SYS_TITLE_Cn;
                } else {
                    document.title = Vue.prototype.$config.SYS_TITLE_En;
                }

                this.$message({
                    type: 'success',
                    message: this.$t('app.lang.tips'),
                    duration: 3000,
                    customClass: 'message_zIndex'
                }); 
            }
        },
        async handleCommand(command) {

            if (command == 'userCenter') {                  // 导航到用户中心界面     
                // this.dialogFormVisible = true;
                console.log('userCenter');
            } else if (command == 'signout') {              // 退出登录
                this.$confirm(this.$t('app.userOperation.logout.comfirmContent'), this.$t('app.userOperation.logout.typeName'), {
                    confirmButtonText: this.$t('app.userOperation.logout.sure'),
                    cancelButtonText: this.$t('app.userOperation.logout.cancle'),
                    type: 'warning'
                }).then(async () => {
                    // const res = await this.handleLogOut();            // 判断session是否存在

                    let res = {
                        status: 1,
                        message: 'logout ok'
                    };

                    if (res.status != 0) {
                        this.$message({
                            type: 'success',
                            message: res.message,
                            duration: 2000
                        });

                        this.clearLock();
                        this.setUserName('');
                        
                        this.$router.push('/login');
                    } else {
                        throw new Error(res.message);
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('app.userOperation.logout.cancleTips'),
                        duration: 2000
                    });          
                });
            } 
        },
        // 显示上传进度弹框
        showUpload(){
            Bus.$emit('showUpload');
        },
    }
}
</script>
<style lang="less" scoped>
    .nav-outer {
        float: right;
        overflow: hidden;
        border-bottom: 0 none;

        .nav-inner-item {
            float: left;
            padding: 0 .75em;

            .userAvatar {
                position: relative;
                top: 5px;
            }
        }

        .avatar-container {
            cursor: pointer;
        }

        .lang-icon {
            position: relative;
            top: 10px;
            right: 5px;
            cursor: pointer;

            &:hover {
                color: #409EFF;
            }

            i {
                font-size: 2em;
            }
        }

        .uploadBtn {
            font-size: 2em;
            color: #606266;
            cursor: pointer;

            &:hover {
                color: #409EFF;
            }
        }

        .lockScreen {
            font-size: 2em;
            margin-left: -16px;

            &:hover {
                color: #409EFF; 
            }

            i.el-icon-new-icon-lock {
                font-size: 25px;
            }
        }
    }
</style>


<template>
    <div class="lock-container pull-height">
        <div class="lock-form animated bounceInDown">
            <div class="animated" :class="{'shake': passwdError, 'bounceOut': pass}">
                <h3>
                    <el-avatar :src="userAvatar"></el-avatar>
                    <span class="userName">{{ getUserName }}</span> 
                </h3>
                <section>
                    <el-input show-password :placeholder="$t('app.userOperation.unlock.placeholder')" type="password" class="pwdLeft" v-model="passwd" @keyup.enter.native="handleLogin">
                        <el-button slot="append" type="primary" :title="$t('app.userOperation.unlock.tips.unlock')" class="unlock" @click="handleLogin" icon="el-icon-new-icon-lockunlock"></el-button>
                    </el-input>
                    <el-button type="primary" :title="$t('app.userOperation.unlock.tips.logout')" class="logout" @click="logout" icon="el-icon-new-icon-GroupCopy"></el-button>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'Lock',
    data() {
        return {
            passwd: '',
            passwdError: false,
            pass: false,
            userAvatar: require("@/assets/logo.png")
        }
    },
    computed: {
        ...mapGetters('user', ['lockPasswd', 'getUserName'])
    },
    methods: {
        ...mapMutations('user', ['clearLock', 'setUserName']),
        ...mapActions('user', ['handleLogOut']),
        logout() {
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
                return this.$message({
                    type: 'info',
                    message: this.$t('app.userOperation.logout.cancleTips'),
                    duration: 2000
                });          
            });
        },
        handleLogin() {
            if (this.passwd !== this.lockPasswd) {
                this.passwd = '';
                this.passwdError = true;

                this.$message({
                    message: this.$t('app.userOperation.unlock.errorPwd'),
                    type: 'error'
                });

                setTimeout(() => {
                    this.passwdError = false;
                }, 1000);

                return;
            }

            this.pass = true;

            setTimeout(() => {
                this.clearLock();
                this.$router.push('sys/home')
            }, 1000);
        }
    }
}
</script>

<style lang="less">
    .lock-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        &::before {
            z-index: -999;
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: url("../../assets/img/lockLogin.png");
            background-size: cover;
        }

        .lock-form {
            width: 400px;
            background: #2b587166;
            padding: 1em;
            border-radius: 5px;
            box-shadow: 0 1px 4px rgba(0,21,41,.08);

            h3 {
                text-align: center;
                color: #fff;
                font-size: 18px;
                padding: 15px 0;

                .userName {
                    position: relative;
                    top: -10px;
                }
            }

            section {
                padding: 10px 0;

                .pwdLeft.el-input {
                    width: 85%;
                }

                .el-input-group__append {
                    background: #999;
                    color: #fff;

                    &:hover {
                        background: #409EFF;
                    }
                }
            }
        }
    }
</style>
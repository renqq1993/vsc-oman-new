<template>
    <div class="login-container">
        <p class="changeLang">
            <el-select v-model="value" :placeholder="$t('select.lang')" @change="change">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </p>
        <!-- system title -->
        <h2>{{ isEn ? sysTitleEn : sysTitleCn }}</h2>
        <!-- login form -->
        <login-form @handle-login="handleSubmit"></login-form>
        <!-- version、copyright -->
        <div class="login-footer">
            <p>{{ currentVersion }}</p>
            <p>&copy; {{ new Date().getFullYear() }} {{ isEn ? companyEn : companyCn }} {{ $t('app.sysSetting.copyrightReserve') }}</p>
        </div>
    </div>
</template>
<script>
import LoginForm from '@/components/loginForm/LoginForm'
import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'
export default {
    name: 'Login',
    data() {
        return {
            options: [
                {
                    value: 'cn',
                    label: '中文'
                }, 
                {
                    value: 'en',
                    label: 'English'
                }
            ],
            value: '',
            currentVersion: Vue.prototype.$config.VERSION,          // current system version
            companyEn: Vue.prototype.$config.CompanyName_En,        // company name of english
            companyCn: Vue.prototype.$config.CompanyName_Cn,        // company name of chinese
            sysTitleCn: Vue.prototype.$config.SYS_TITLE_Cn,         // system name of chinese
            sysTitleEn: Vue.prototype.$config.SYS_TITLE_En          // system name of english
        }
    },
    mounted() {
        this.value = this.$i18n.locale;
    },
    computed: {
        isEn() {                // current locale language，using it as a flag to switch between chinese and english
            return (this.$i18n.locale === 'en') ? true : false;
        }
    },
    methods: {
        ...mapMutations('user', ['setUserName']),
        ...mapActions('user', ['handleLogin']),
        async handleSubmit(e) {        // login query and using Vuex to management the login operation
            // let res = await this.handleLogin({userName: e.userName, password: e.password});
            let res = {
                status: 1,
                message: 'login successful!',
                avatar: '',
                role: '1',
                access: ''
            }

            if (res.status == 1) {
                this.$message({
                    type: 'success',
                    message: res.message,
                    duration: 2000
                });

                // localStorage.setItem('userName', e.userName);
                this.setUserName(e.userName);
                
                this.$router.push('sys/home');
            } else {
                this.$message({
                    type: 'error',
                    message: res.message,
                    duration: 3000,
                    showClose: true
                });
            }
        },
        change(e) {
            this.$i18n.locale = e;
            this.value = e;
        },
    },
    components: {
        LoginForm
    }
}
</script>

<style lang="less" scoped>
    .login-container {
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
            background-image: url("../../assets/img/bg_login.png");
            background-size: cover;
        }

        h2, p {
            text-align: center;
            color: #fff;
        }

        h2 {
            position: absolute;
            top: 25%;
        }

        .login-footer {
            position: absolute;
            top: 70%;
        }

        .changeLang {
            position: absolute;
            top: 5px;
            right: 5px;
            
            .el-select {
                width: 100px;
            }
        }
    }
</style>

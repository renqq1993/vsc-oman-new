<template>
    <section>
        <el-form :model="form" status-icon :rules="rules" ref="form">
            <el-form-item prop="name">
                <el-input v-model="form.name" prefix-icon="el-icon-user"  @keyup.enter.native="handleLogin('form')" :placeholder="$t('app.userOperation.login.userName')"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
                <el-input v-model="form.pwd" prefix-icon="el-icon-unlock"  @keyup.enter.native="handleLogin('form')" :placeholder="$t('app.userOperation.login.password')" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin('form')" class="login-btn">{{ $t('app.userOperation.login.btn') }}</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            form: {
                name: '',
                pwd: ''
            }
        }
    },
    computed: {
        rules() {
            // var validateName = (rule, value, callback) => {   // username inputs type tips
            //     let reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;

            //     if (value != null && value != "") {

            //         if (!reg.test(value)) {
            //             callback(new Error(this.$t('app.sysCheck.login.userName.invalidateTips')));
            //         } else {
            //             callback();
            //         }
            //     } else {
            //         callback();
            //     }
            // };
            return {
                name: [
                    // { validator: validateName, trigger: 'blur' },
                    { required: true, message: this.$t('app.sysCheck.login.userName.requiredTips'), trigger: 'blur' },
                    // { max: 10, message: this.$t('app.sysCheck.login.userName.maxInputTips') + 10, trigger: 'blur' },
                    // { min: 5, message: this.$t('app.sysCheck.login.userName.minInputTips') + 5, trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: this.$t('app.sysCheck.login.password.requiredTips'), trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleLogin(formName) {     // if validate, emit login event
            this.$refs[formName].validate(valid => {
                if (valid) {        // validate inputs
                    this.$emit('handle-login', {
                        userName: (this.form.name).trim(),
                        password: this.form.pwd
                    });
                } else {            // invalidate inputs

                    if (this.form.name.length == 0 && this.form.pwd.length != 0) {              // only username is empty
                        this.$message({
                            type: 'error',
                            message: this.$t('app.sysCheck.login.userName.notEmpty'),
                            duration: 3000,
                            showClose: true
                        });
                    } else if (this.form.name.length != 0 && this.form.pwd.length == 0) {       // only password is empty
                        this.$message({
                            type: 'error',
                            message: this.$t('app.sysCheck.login.password.notEmpty'),
                            duration: 3000,
                            showClose: true
                        });
                    } else {                                                                    // both username and password are empty
                        this.$message({
                            type: 'error',
                            message: this.$t('app.sysCheck.login.allTips'),
                            duration: 3000,
                            showClose: true
                        });
                    }

                    return false;
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
    section {
        width: 25%;
        background: rgba(28, 103, 136, 0.8);
        padding: 1em;
        border-radius: 5px;
        
        // 当用户名有特殊要求时，特殊输入格式提示，提示信息栏高度可能不足的问题
        // .el-form .el-form-item {
        //     margin-bottom: 30px;
        // }

        .el-form .el-form-item:last-child {
            margin-bottom: 0;
        }

        .login-btn {
            display: block;
            width: 100%;
            font-size: 18px;
        }
    }
</style>



<template>
    <div class="lockScreen nav-inner-item" :title="$t('app.headerBtn.lockScreen')">
        <i class="el-icon-new-icon-lock" @click="handleLock"></i>
        <el-dialog v-if="lockScreenVisible" :title="$t('app.userOperation.lockScreen.title')" :visible.sync="lockScreenVisible" append-to-body :close-on-click-modal="false" width="450px">
            <el-form status-icon :model="form" :rules="formRules" ref="form" @submit.native.prevent>
                <el-form-item :label="$t('app.userOperation.lockScreen.lable')" prop="pwd" label-position="left" label-width="90px">
                    <el-input @keyup.enter.native="handleSubmit('form')" show-password type="password" class="pwdInput" prefix-icon="el-icon-new-icon-lock" :placeholder="$t('app.userOperation.lockScreen.placeholder')" v-model="form.pwd"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="resetForm('form')">{{ $t('app.userOperation.lockScreen.btn.reset') }}</el-button>
                <el-button size="small" type="primary" @click="handleSubmit('form')">{{ $t('app.userOperation.lockScreen.btn.submit') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'LockScreen',
    data() {
        return {
            lockScreenVisible: false,
            form: {
                pwd: ''
            }
        }
    },
    computed: {
        formRules() {   // 国际化切换的表单验证规则需要写在computed计算属性中，这样验证消息就不会因为切换而不改变
            return {
                pwd: [{ required: true, message: this.$t('app.userOperation.lockScreen.errorType'), trigger: 'blur' }]
            }
        }
    },
    methods: {
        ...mapMutations('user', ['setLockPwd', 'setLock']),
        resetForm(passwordForm) {
            this.$refs[passwordForm].resetFields();
        },
        handleSubmit(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.lockScreenVisible = false;

                    this.setLockPwd(this.form.pwd);
                    this.setLock();

                    setTimeout(() => {
                        this.$router.push({ path: '/lock' })
                    }, 100);
                } else {

                    return  this.lockScreenVisible = true;
                }
            })
        },
        handleLock() {
            this.lockScreenVisible = true;
            this.form.pwd = '';
        }
    }
}
</script>
<style lang="less">
    i.el-icon-new-icon-lock {
        font-size: 24px;
        color: #606266;
        cursor: pointer;

        &:hover {
            color: #409eff;
        }
    }

    i.el-input__icon.el-icon-new-icon-lock {
        font-size: 16px;
    }
</style>


<template>
    <div class="ftp-wrapper">
        <el-card class="ftp-card" shadow="hover">
            <div slot="header">
                <i class="el-icon-new-icon-st-to-ftp"></i>
                <span class="item-ml-5">{{ $t('app.table.device.ftp.cardTitle') }}</span>
            </div>
            <div class="ftp-main clear" :style="{height: cmpHeight}" v-loading="loading" :element-loading-text="$t('app.table.loading')" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-row v-show="!willShow" class="now-ftp-info">
                    <el-col>
                        <i>{{ $t('app.table.device.ftp.normalShow.ipTitle') }}</i> <span>{{ form.ip }}</span>
                    </el-col>
                    <el-col>
                        <i>{{ $t('app.table.device.ftp.normalShow.portTitle') }}</i> <span>{{ form.port }}</span>
                    </el-col>
                    <el-col>
                        <i>{{ $t('app.table.device.ftp.normalShow.userTitle') }}</i> <span>{{ form.user }}</span>
                    </el-col>
                    <el-col>
                        <el-button type="primary" size="small" @click="willShow = !willShow">{{ $t('app.table.device.ftp.btns.changeConfiguration') }}</el-button>
                    </el-col>
                </el-row>
                <el-card class="box-card" shadow="hover" v-show="willShow" :style="{width: cmpWidth}">
                    <el-form label-position="right" :label-width="cmpLableWidth" :model="form">
                        <el-form-item :label="$t('app.table.device.ftp.columns.ip')">
                            <el-input v-model="form.ip" size="small"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('app.table.device.ftp.columns.port')">
                            <el-select v-model="form.port" size="small">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('app.table.device.ftp.columns.user')">
                            <el-input v-model="form.user" size="small"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('app.table.device.ftp.columns.pwd')">
                            <el-input v-model="form.pwd" type="password" show-password size="small"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('app.table.device.ftp.columns.rePwd')">
                            <el-input v-model="form.rePwd" type="password" show-password size="small"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" plain @click="willShow = false" size="small">{{ $t('app.table.device.ftp.btns.cancle') }}</el-button>
                            <el-button type="primary" plain @click="handleSave" size="small">{{ $t('app.table.device.ftp.btns.sure') }}</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </el-card>
        <p class="ftp-tips">{{ $t('app.table.device.ftp.tips') }}</p>
    </div>
</template>
<script>
import $ from 'jquery'
import Vue from 'vue'
export default {
    name: 'FTPMng',
    data() {
        return {
            loading: false,
            form: {
                ip: '0.0.0.0',
                port: '21',
                user: 'root',
                pwd: '111111',
                rePwd: '111111'
            },
            options: [
                {
                    value: '21',
                    label: '21'
                }, 
                {
                    value: '22',
                    label: '22'
                }
            ],
            willShow: false,
            lableWidth: '',
            interval: Vue.prototype.$config.FtpTips_Interval  || 50
        }
    },
    mounted() {
        // 修改card和右侧屏幕可视区域宽度
        $(".itme-mr-10 section").css({'margin-right': '15px'});

        String.prototype.oncePrint = function(obj) {
			var index = 0,
				length = this.length,
				timer = null,
				that = this;

			if (timer) {
				clearInterval(timer)
			}

			obj.container.text('');

			timer = setInterval(function() {
			    obj.container.append(that.charAt(index));

			    if(index++ === length){
				    clearInterval(timer);
			    }
			}, obj.interval);
		}

        // 打字机效果
        this.$t('app.table.device.ftp.tips').oncePrint({interval: this.interval, container: $('.ftp-tips')});
    },
    computed: {
        cmpLableWidth() {
            return this.isEn ? '140px' : '85px';
        },
        cmpWidth() {
            return this.isEn ? '400px' : '345px';
        },
        cmpHeight() {
            return this.willShow ? '380px' : '';
        },
        isEn() {
            return this.$i18n.locale === 'en' ? true : false;
        }
    },
    methods: {
        handleSave() {
            this.willShow = false;
        }
    }
}
</script>
<style lang="less" scoped>

    .box-card {

        .el-form-item {
            margin-bottom: 12px;
        }
    }

    .ftp-card {
        margin-bottom: 20px;

        .now-ftp-info .el-col {
            padding: 15px 0;
        }
    }
</style>



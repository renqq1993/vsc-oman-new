<template>
    <div class="collapseBtn" @click="toggle" :title="!isCollapse ? $t('app.headerBtn.collapseTipsFold') : $t('app.headerBtn.collapseTipsUnFold')">
        <i :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'CollapseBtn',
    computed: {
        ...mapState({
            isCollapse: state => state.app.isCollapse
        }),
        // isCollapse: function () {
        //     return this.$store.state.app.isCollapse;
        // }
    },
    methods: {
        ...mapMutations('app', ['setCollapse']),
        toggle() {
            
            this.setCollapse(!this.isCollapse);
        }
    }
}
</script>
<style lang="less" scoped>
    .collapseBtn {
        display: inline-block;
        margin-right: .5em;
        font-size: 1.5em;
        border-radius: 3px;
        position: relative;
        top: 6px;

        i {
            display: block;
            padding: 5px 7px;
            color: #1890ff;
        }

        &:hover {
            background-color: rgba(0, 0, 0, .2);
        }
    }


</style>


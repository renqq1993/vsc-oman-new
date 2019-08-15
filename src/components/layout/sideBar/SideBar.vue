<template>
    <div class="sys-aside">
        <el-menu :default-active="$route.path" :backgroundColor="bgColor" :textColor="textColor" :activeTextColor="activeTextColor" router unique-opened :collapse="isCollapse">
            <template v-for="(item, index) in sideFromRoute">
                <el-submenu :index="index+''" v-if="!item.single">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ $t(item.name) }}</span>
                    </template>
                    <el-menu-item v-for="(child, i) in item.children" :index="item.path + '/' + child.path" :key="child.path + '_' + i">
                        <i :class="child.meta.icon"></i>
                        <span slot="title">{{ $t(child.name) }}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="item.path + '/' + item.children[0].path" class="singleNav">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ $t(item.name) }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'SideBar',
    data() {
        return {
            sideFromRoute: []
        }
    },
    props: {
        bgColor: {
            type: String,
            default: '#545c64'
        },
        textColor: {
            type: String,
            default: '#fff'
        },
        activeTextColor: {
            type: String,
            default: '#1890ff'
        }
    },
    computed: {
        ...mapState({
            isCollapse: state => state.app.isCollapse
        }),
    },
    mounted() {
        // console.log(this.$route);
        // console.log(this.$router.options.routes);   // 路由数组

        this.$router.options.routes.forEach(item => {

            if (item.name) {
                this.sideFromRoute.push(item)
            }
        });
    }
}
</script>
<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 210px;
        min-height: 400px;
    }
</style>

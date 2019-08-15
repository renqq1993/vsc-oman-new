<template>
    <div class="header-wrapper">
        <!-- 侧边栏展开、收缩按钮 -->
        <collapse-btn></collapse-btn>
        <!-- 面包屑导航 -->
        <bread-crumb></bread-crumb>
        <!-- 上传、语言切换、用户信息组件 -->
        <nav-bar></nav-bar>
    </div>
</template>
<script>
import CollapseBtn from '@/components/smallFunc/collapseBtn/CollapseBtn'
import BreadCrumb from '@/components/layout/header/breadCrumb/BreadCrumb'
import NavBar from '@/components/layout/header/navBar/NavBar'
export default {
    name: 'Header',
    components: {
        CollapseBtn,
        BreadCrumb,
        NavBar
    },
}
</script>
<style lang="less" scoped>
    .header-wrapper {
        padding: 6px .25em;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);

        &::after {
            content: '.';
            display: block;
            visibility: hidden;
            width: 0;
            height: 0;
            clear: both;
        }
    }
</style>


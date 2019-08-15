<template>
    <el-breadcrumb separator="/" class="breadListWrapper">
        <template v-if="$route.matched[0].name == $route.matched[1].name">
            <el-breadcrumb-item>{{ $t($route.matched[0].name) }}</el-breadcrumb-item>
        </template>
        <template v-else>
            <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">{{ $t(item.name) }}</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>
<script>
export default {
    name: 'BreadCrumb'
}
</script>
<style lang="less" scoped>
    .breadListWrapper {
        display: inline-block;
        position: relative;
        top: 4px;
    }
</style>


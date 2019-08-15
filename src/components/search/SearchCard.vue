<template>
    <el-card :shadow="shadow">
        <el-row :gutter="5">
            <el-col :span="8">
                鼠标悬浮时显示
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
export default {
    name: 'SearchCard',
    props: {
        shadow: {
            type: String,
            default: 'hover'    // always: 总是显示，hover：鼠标悬浮时显示，never：从不显示 
        }
    }
}
</script>


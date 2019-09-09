<template>
    <el-drawer title="我嵌套了表格!" :visible.sync="table" direction="rtl" size="50%" height="100%">
        <div style="height:400px">
            <el-slider v-model="value"  range show-stops :max="256" height="333px"  vertical> </el-slider>
        </div>
    </el-drawer>
</template>
<script>
export default {
    name:"PwdSpaceConfig",
    props:{
        table:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {
            value:[1,7],
        }
    }
}
</script>
<style scoped>

</style>
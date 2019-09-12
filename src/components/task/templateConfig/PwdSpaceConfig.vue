<template>
    <el-drawer title="我嵌套了表格!" :visible.sync="vision" direction="rtl" size="50%" height="100%">
        <div class="sliderDiv">
             <el-slider class="sliderClass" v-model="value" range show-stops :max="256" vertical height="10240px">
    </el-slider>
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
    computed:{
        vision:{
            get(){
                return this.table;
            },
            set(val){
                return val;
            }
        },
    },
    data(){
        return {
            value:[1,7],
        }
    }
}
</script>
<style scoped>
    .sliderClass{
        position:absolute;
        bottom: 0px;
    }
    .sliderDiv{
        width:100%;
        height:100%;
        OVERFLOW-Y: auto; 
        OVERFLOW-X:hidden;
        position:relative
    }
</style>
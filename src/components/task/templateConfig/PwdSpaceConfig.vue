<template>
    <el-drawer title="我嵌套了表格!" :visible.sync="vision" direction="rtl" size="90%" height="100%">
        <div class="sliderDiv">
        <vue-slider v-model="value" direction= 'ttb' height="15400px" width="10px" style="display: inline-block; margin-left: 30px; margin-top:50px;  position:relative;
        float: left;color: #409EFF;" :max="256" :min="1">
            <template v-slot:dot="{ value, focus }">
                <div :class="['custom-dot', { focus }]"></div>
            </template>
        </vue-slider>
            <ul class="infinite-list" style="overflow:auto">
                <li v-for="i in charsetList" :key="i.num"  class="infinite-list-item">
                    <span class="count">
                        <span class="count-font">{{i.num}}</span>
                    </span>
                    <span>{{i.charset.CharsetDesc}}<i class="el-icon-arrow-down el-icon--right" @click="openDropMenu($event)"></i></span> 
                </li>
            </ul>
            <div class="allCharset" ref="allCharset">
                 <ul style="overflow:auto">
                <li v-for="i in allCharset" :key="i.num">
                    <span  @mouseenter="showCharsetDiv($event, i)">{{i.CharsetDesc}}</span> 
                </li>
            </ul>
            </div>
            <div  ref="charsetDiv" class="charsetDiv" :visible.sync="dialogFormVisible">
                 <el-form :label-position="'top'" label-width="80px" :model="formLabelAlign" style="margin:40px;">
                    <el-form-item :label=" $t(prefix + 'charsetTable.content')">
                        <el-input v-model="formLabelAlign.CharsetContent"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t(prefix + 'charsetTable.desc')">
                        <el-input v-model="formLabelAlign.CharsetDesc"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t(prefix + 'charsetTable.bit')">
                        <el-input v-model="formLabelAlign.CharByteLen"></el-input>
                    </el-form-item>
                     <el-form-item :label="$t(prefix + 'charsetTable.encode')">
                        <el-input v-model="formLabelAlign.Encoding"></el-input>
                    </el-form-item>
                </el-form>
                <el-button size="mini" @click="handleConcel">{{$t(prefix + 'btn.cancel')}}</el-button>
                <el-button size="mini" type="primary" @click="handleConfirm">{{$t(prefix + 'btn.confirm')}}</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script>
import mySlider from "@/components/task/templateConfig/MySlider.vue"
import vueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import {selectCharset, allCharset} from '@/mock/mock.js'
import $ from 'jquery'
export default {
    name:"PwdSpaceConfig",
    props:{
        table:{
            type:Boolean,
            default:false,
        },
        max:{
            type:Number,
            default:0,
        },
        min:{
            type:Number,
            default:0,
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
            value:[1,3],
            count:256,
            prefix:"app.table.task.templateConfig.",
            myDefault:null,
            charsetList:[],
            allCharset:[],
            formLabelAlign:{
                CharByteLen:"",
                CharsetContent:"",
                CharsetDesc:"",
                CharsetType:"",
                Encoding:""
            },
           dialogFormVisible:false

        }
    },
    methods:{
        initSlider(){
            // let res = await getTaskMode(submitData);
            let res = selectCharset;
            this.value = [parseInt(res.EleMin), parseInt(res.EleMax)];
            let charsetArray = res.res;
            let that = this;
            charsetArray.forEach(charset =>{
                var ar = this.charsetList.find(function(elem){
                    return elem.num == parseInt(charset.PwdElementNo);
                });
                ar.charset = charset;
            })
        },
        initAllCharset(){
            // let res = await getTaskMode(submitData);
            let res = allCharset;
            this.allCharset = res.rs;
        },
        openDropMenu(e){
            let charsetMenu = this.$refs.allCharset;
            console.log(e);
            charsetMenu.style.top = e.clientY - 50 +"px";
            charsetMenu.style.left = e.clientX - 200+"px" ;
            charsetMenu.style.display = "block";
        },
        showCharsetDiv(e, charset){
            let charsetDiv = this.$refs.charsetDiv;
            this.formLabelAlign = {
                CharByteLen:charset.CharByteLen,
                CharsetContent:charset.CharsetContent,
                CharsetDesc:charset.CharsetDesc,
                CharsetType:charset.CharsetType,
                Encoding:charset.Encoding,
            };
            console.log($(".allCharset"));
            console.log(e);
            charsetDiv.style.top = e.clientY - 50 + "px";
            let left = $(".allCharset").position().left;
            console.log(left);
            charsetDiv.style.left = left + 150 + "px";
            console.log(charsetDiv.style.left);
            this.dialogFormVisible = true;
        },
        handleConcel(){
             let charsetDiv = this.$refs.charsetDiv;
             charsetDiv.style.display = "none"; 
        },
        handleConfirm(){

        }
        
    },
    created(){
        for(let t = 1; t<=256; t++){
            this.charsetList.push({num:t, charset:{}});
        }
        this.initSlider();
        this.initAllCharset();
    },
    components:{
        mySlider,
        vueSlider
    }
}
</script>
<style scoped>
    .sliderDiv{
        width:100%;
        height:500px;
        OVERFLOW-Y: auto; 
        OVERFLOW-X:hidden;
        position:relative;
    }
    .allCharset{
        width:40px;
        height:100px;
        OVERFLOW-Y: auto; 
        OVERFLOW-X:hidden;
        position:relative;
    }
    .infinite-list .infinite-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        background: #e8f3fe;
        margin-bottom: 10px;
        margin-top:0px;
        color: #7dbcfc;
    }
    .infinite-list{
        margin-top:30px;
    }
    .custom-dot {
        width: 20px;
        height: 20px;
        border-radius: 0;
        left:40%;
        background-color:#9cd5ff;
        transition: all .3s;
    }
    .custom-dot:hover {
        transform: rotateZ(45deg);
    }
    .count{
        left: 50px;
        position: absolute;
        height: 50px;
        width: 50px;
        text-align: center;
        display:block;
        background-color:#9cd5ff;
        color:black;
    }
    .count-font{
       position:absolute;
       top:15px;
       left:20px;
    }
    .menu-item{
        list-style: none;
        line-height: 36px;
        padding: 0 20px;
        margin: 0;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        outline: none;
    }
    .menu__item:focus, .menu__item:not(.is-disabled):hover {
        background-color: #ecf5ff;
        color: #66b1ff;
    }
    .allCharset{
        display:none;
        width:150px;
        height:300px;
        position: absolute;
        top:0px;
        left:0px;
        z-index: 2016;
        padding: 10px 0;
        margin: 5px 0;
        background-color: #fff;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .allCharset li{
        list-style: none;
        line-height: 36px;
        padding: 0 20px;
        margin: 0;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        outline: none;
    }
    .charsetDiv{
        width:400px;
        height:600px;
        position:absolute;
        top:0px;
        left:0px;
        z-index: 2016;
        padding: 10px 0;
        margin: 5px 0;
        background-color: #fff;
        border: 1px solid #ebeef5;
       border-radius: 4px;
       box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
</style>
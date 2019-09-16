<template>
    <el-drawer title="我嵌套了表格!" :visible.sync="vision" direction="rtl" size="50%" height="100%">
        <div class="sliderDiv">
           <mySlider></mySlider>
             <ul class="infinite-list" style="overflow:auto">
                <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
            </ul>
        </div>
        
    </el-drawer>
</template>
<script>
import mySlider from "@/components/task/templateConfig/MySlider.vue"
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
            value:[1,7],
            count:256,
            myPosition:{
                top:0,
                bottom:0,
                now:0,
                isBtn:0,
                propoHeight:0
            },
            myDefault:null
        }
    },
    // mounted(){
    //         //滑块
    //         let sliderBar = $("#slideBar");
    //         let bottomBtn = $("#bottomBtn");
    //         let topBtn = $("#topBtn");
    //         let mySlider = $("#myslider");
    //         let myHeight = 0

    //         const elementBottom = (e) => { //计算y坐标
    //             var offset = e.offsetBottom;
    //             if(e.offsetParent != null) offset += elementBottom(e.offsetParent);
    //             return offset;
    //         }

    //         const myCount = () => { //计算滑动
    //             if(this.myPosition.bottom>this.myPosition.top){ //判断滑动范围
    //                 this.myPosition.propoHeight = this.myPosition.bottom - this.myPosition.top
    //                 sliderBar.style.height = this.myPosition.propoHeight+'%'
    //                 sliderBar.style.top = this.myPosition.top + '%'
    //             }else if(this.myPosition.bottom<=this.myPosition.top){
    //                 this.myPosition.propoHeight = 0 + "px";
    //                 sliderBar.style.height = 0;
    //                 sliderBar.style.top = this.myPosition.top+'%'

    //             }
    //         }

    //         this.myDefault = () => {//初始化
    //             this.myPosition.top = this.min
    //             this.myPosition.bottom = this.max

    //             if(this.max > this.min){
    //                 this.myPosition.propoHeight = this.max - this.min
    //                 sliderBar.style.top = this.myPosition.top + '%'
    //             }else{
    //                 this.myPosition.propoHeight = 0;
    //                 sliderBar.style.left = this.myPosition.right + '%'
    //             }

    //             sliderBar.style.height = this.myPosition.propoHeight+'%'
    //             topBtn.style.top = this.myPosition.top + '%'
    //             bottomBtn.style.top = this.myPosition.bottom + '%'
    //         }

    //         let mySliderY = elementBottom(mySlider) //滑动块y坐标

    //         mySlider.addEventListener('touchmove',(e)=>{ //屏幕滑动事件
    //             let pageY = e.touches[0].pageY-mySliderY //获取滑动Y坐标
    //             myHeight = (pageY/mySlider.offsetHeight)*100 //计算百分比
    //             if(myHeight>100){ //判断不超出范围
    //                 myHeight=100
    //             }else if(myHeight<0){
    //                 myHeight=0
    //             }

    //             if(this.myPosition.isBtn == 1){//判断焦点
    //                 this.myPosition.top = myHeight
    //                 topBtn.style.top = myHeight+'%' 
    //             }else if(this.myPosition.isBtn == 2){
    //                 this.myPosition.bottom = myHeight
    //                 leftBtn.style.top = myHeight+'%' 
    //             }

    //             myCount()
    //             e.preventDefault()

    //         })

    //         mySlider.addEventListener('touchstart',(e)=>{//屏幕触摸事件
    //             let touchY = e.touches[0].pageX-mySliderY
    //             let btnHeight = (leftBtn.offsetHeight/mySlider.offsetHeight)/2*100 //计算按钮宽度
    //             this.myPosition.now = (touchY/mySlider.offsetHeight)*100
    //             mySliderY = elementBottom(mySlider) //滑动块x坐标
    //             if(this.myPosition.now <= this.myPosition.top+btnHeight&&this.myPosition.now >= this.myPosition.top-btnHeight){ //计算区间 获取焦点
    //                 this.myPosition.isBtn = 1
    //             }else if(this.myPosition.now <= this.myPosition.bottom+btnHeight&&this.myPosition.now >= this.myPosition.bottom-btnHeight){
    //                 this.myPosition.isBtn = 2
    //             }else{
    //                 this.myPosition.isBtn = 0
    //             }
    //         })

    //         this.myDefault()
    //     },
    //     watch:{
    //         min(New,old){
    //             this.myDefault()
    //         },
    //         max(New,old){
    //             this.myDefault()
    //         }
    //     },
        components:{
            mySlider
        }
}
</script>
<style scoped>
    .sliderClass{
      width:6px;
      height:15360px;
      margin:0 16px;
      background-color: #e4e7ed;
      border-radius: 3px;
      position: relative;
      cursor: pointer;
      display: block;
      float: left;
    }
    .sliderDiv{
        width:100%;
        height:500px;
        OVERFLOW-Y: auto; 
        OVERFLOW-X:hidden;
        position:relative
    }
    .infinite-list .infinite-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        background: #e8f3fe;
        margin: 10px;
        color: #7dbcfc;
    }
    .slideBtn{
        width: 16px;
        height: 16px;
        border: 2px solid #409eff;
        background-color: #fff;
        border-radius: 50%;
        top: auto;
        margin-left:10px;
        transform: translateY(50%);
        cursor: pointer;
    }
    .slideBar{
        top:0%;
        height: 0px;
        width:6px;
        background-color: #409eff;
        position: absolute;
        cursor: pointer;
    }
</style>
<template>
     <div ref="mySlider" class="mySlider">
        <div class="top-btn slideBtn" id="topBtn"></div>
        <div class="sliderClass">
        </div>
        <div class="slideBar" id="slideBar"></div>
        <div class="bottom-btn slideBtn" id="bottomBtn"></div>
    </div>
</template>
<script>
import $ from 'jquery'
    export default {
        name: 'MySlider',
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
            isBottomDown:false,
            isTopDown:false,
            top:0,
            myDefault:null,
        }
    },
    mounted(){
      //  滑块
         let mySlider = this.$refs.mySlider;
         let sliderBar =  mySlider.children[2];
         let bottomBtn = mySlider.children[3];
         let sliderClass = mySlider.children[1];
         let topBtn = mySlider.children[0];
         let myHeight = 0

         const parseNumber = (e) => {
             if(typeof(e) == "string"){
                  let numStr = e.substring(0, e.length-2);
                  return parseInt(numStr);
             }
             else{
                 return e;
             }
         }

         const myCount = () => {//计算滑动
             if(this.myPosition.bottom>this.myPosition.top){//判断滑动范围
                 this.myPosition.propoHeight = this.myPosition.bottom - this.myPosition.top
                 sliderBar.style.height = this.myPosition.propoHeight+'%'
                 sliderBar.style.top = this.myPosition.top + '%'
             }else if(this.myPosition.bottom<=this.myPosition.top){
                 this.myPosition.propoHeight = 0 + "px";
                 sliderBar.style.height = 0;
                 sliderBar.style.top = this.myPosition.top+'%'

             }
         }

         this.myDefault = () =>{// 初始化
             this.myPosition.top = this.min
             this.myPosition.bottom = this.max

             if(this.max > this.min){
                 this.myPosition.propoHeight = this.max - this.min
                 sliderBar.style.top = this.myPosition.top + '%'
             }else{
                 this.myPosition.propoHeight = 0;
                 sliderBar.style.top = this.myPosition.top + '%'
             }

             sliderBar.style.height = this.myPosition.propoHeight+'%'
             topBtn.style.top = this.myPosition.top + '%'
             bottomBtn.style.top = this.myPosition.bottom + '%'
         }

        //  let mySliderY = elementBottom(mySlider)//滑动块y坐标
         console.log(bottomBtn);

         mySlider.addEventListener('mousedown',(e)=>{//鼠标按下事件
             this.top = sliderClass.getBoundingClientRect().top;
             if(e.srcElement.className == "bottom-btn slideBtn"){
                  this.isBottomDown = true;
                  this.myPosition.bottom = e.clientY;
             }
             else if(e.srcElement.className == "top-btn slideBtn"){
                 this.isTopDown = true;
                 this.myPosition.top = e.clientY;
             }
         })

         mySlider.addEventListener('mouseup',(e)=>{//鼠标移动事件
            console.log("mouseup");
             this.isTopDown = false;
             this.isBottomDown = false;
             if(e.srcElement.className == "bottom-btn slideBtn"){
                this.myPosition.bottom = parseNumber(bottomBtn.style.top);
                this.myPosition.propoHeight = parseNumber(sliderBar.style.height);
             }
             else if(e.srcElement.className == "top-btn slideBtn"){
                this.myPosition.top = parseNumber(topBtn.style.top);
                this.myPosition.propoHeight = parseNumber(sliderBar.style.height);
             }

         });

        mySlider.addEventListener('mousemove',(e)=>{//屏幕触摸事件
            console.log("mousemove");
            if(this.isBottomDown){
                 let height = e.clientY - this.myPosition.bottom;
                 sliderBar.style.height = this.myPosition.propoHeight + height + "px";
                 bottomBtn.style.top = e.clientY - this.top + "px";
             }
             else if(this.isTopDown){
                 let height = e.clientY - this.myPosition.top;
                 sliderBar.style.top = e.clientY - this.top + "px";
                 sliderBar.style.height = this.myPosition.propoHeight - height + "px";
                 topBtn.style.top = e.clientY - this.top + "px";
             }
        });

         this.myDefault()
        },
     watch:{
         min(New,old){
             this.myDefault()
         },
         max(New,old){
             this.myDefault()
            }
         }
}
</script>
<style scoped>
    .mySlider{
        height:15400px;
        width:40px;
        display: block;
        position:relative;
        float: left;
    }
    .sliderClass{
      width:10px;
      height:15360px;
      margin:16px 16px;
      background-color: #e4e7ed;
      border-radius: 3px;
      cursor: pointer;
      display: block;
      z-index: 0;
    }
   
    .slideBtn{
        width: 16px;
        height: 16px;
        border: 2px solid #409eff;
        background-color: #fff;
        border-radius: 50%;
        top: 0;
        margin-left:10px;
        transform: translateY(50%);
        cursor: pointer;
        position:absolute;
        z-index: 1;
    }
    .slideBar{
        top:0%;
        height: 0px;
        width:10px;
        background-color: #409eff;
        position: absolute;
        cursor: pointer;
        margin-top:16px;
        margin-left: 16px;
        margin-right: 16px;
        margin-bottom: 0px;
    }
   
</style>
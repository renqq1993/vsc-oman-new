<template>
    <el-card class="user-avatar-card" shadow="hover">
        <div slot="header" class="avatar-header">
            <span class="item-ml-5">头像设置</span>
        </div>
        <div class="avatar-wrapper">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="自定义头像" name="self-avatar">

                </el-tab-pane>
                <el-tab-pane label="热门推荐头像" name="hot-avatar">
                    <div class="pass-portrait-tabcontent" id="portraitHotrecom">
                        <ul class="pass-portrait-hotrecommend" id="passPortraitHotrecommend" data-hotpor="wildkid-1">
                            <li id="hot-wildkid-1" class="visiHot">
                                <img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/1" data-serie="wildkid" data-num="1">
                                <span class="recommendSpan"></span>
                            </li>
                            <li id="hot-wildkid-2" class="">
                                <img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/2" data-serie="wildkid" data-num="2">
                                <span class="recommendSpan"></span>
                            </li><li id="hot-wildkid-3" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/3" data-serie="wildkid" data-num="3"><span class="recommendSpan"></span></li><li id="hot-wildkid-4" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/4" data-serie="wildkid" data-num="4"><span class="recommendSpan"></span></li><li id="hot-wildkid-5" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/5" data-serie="wildkid" data-num="5"><span class="recommendSpan"></span></li><li id="hot-wildkid-6" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/6" data-serie="wildkid" data-num="6"><span class="recommendSpan"></span></li><li id="hot-wildkid-7" class="pass-portrait-clearmr "><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/7" data-serie="wildkid" data-num="7"><span class="recommendSpan"></span></li><li id="hot-wildkid-8" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/8" data-serie="wildkid" data-num="8"><span class="recommendSpan"></span></li><li id="hot-wildkid-9" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/9" data-serie="wildkid" data-num="9"><span class="recommendSpan"></span></li><li id="hot-wildkid-10" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/10" data-serie="wildkid" data-num="10"><span class="recommendSpan"></span></li><li id="hot-wildkid-11" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/11" data-serie="wildkid" data-num="11"><span class="recommendSpan"></span></li><li id="hot-wildkid-12" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/12" data-serie="wildkid" data-num="12"><span class="recommendSpan"></span></li><li id="hot-wildkid-13" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/13" data-serie="wildkid" data-num="13"><span class="recommendSpan"></span></li><li id="hot-wildkid-14" class="pass-portrait-clearmr "><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/14" data-serie="wildkid" data-num="14"><span class="recommendSpan"></span></li><li id="hot-wildkid-15" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/15" data-serie="wildkid" data-num="15"><span class="recommendSpan"></span></li><li id="hot-wildkid-16" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/16" data-serie="wildkid" data-num="16"><span class="recommendSpan"></span></li><li id="hot-wildkid-17" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/17" data-serie="wildkid" data-num="17"><span class="recommendSpan"></span></li><li id="hot-wildkid-18" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/18" data-serie="wildkid" data-num="18"><span class="recommendSpan"></span></li><li id="hot-wildkid-19" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/19" data-serie="wildkid" data-num="19"><span class="recommendSpan"></span></li><li id="hot-wildkid-20" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/20" data-serie="wildkid" data-num="20"><span class="recommendSpan"></span></li><li id="hot-wildkid-21" class="pass-portrait-clearmr "><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/21" data-serie="wildkid" data-num="21"><span class="recommendSpan"></span></li><li id="hot-wildkid-22" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/22" data-serie="wildkid" data-num="22"><span class="recommendSpan"></span></li><li id="hot-wildkid-23" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/23" data-serie="wildkid" data-num="23"><span class="recommendSpan"></span></li><li id="hot-wildkid-24" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/24" data-serie="wildkid" data-num="24"><span class="recommendSpan"></span></li><li id="hot-wildkid-25" class=""><img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/25" data-serie="wildkid" data-num="25"><span class="recommendSpan"></span></li>
                        </ul>
                        <div class="pass-portrait-save">
                            <input type="button" value="保存头像" class="pass-portrait-savebtn" id="savePortrait">
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="pass-portrait-right">
                <p class="pass-portrain-commonp">头像预览</p>
                <p id="previewBoxBig" class="pass-portrait-previewboxbig">
                    <img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/1" class="pass-portrait-previewbig" id="previewImgBig" style="">
                </p>
                <p class="pass-portrain-commonp pass-portrain-previewp">
                    <span>大头像100*100</span>
                </p>
                <p id="previewBoxSmall" class="pass-portrait-previewboxbigsmall">
                    <img src="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/hotitem/wildkid/1" class="pass-portrait-previewsmall" id="previewImgSmall" style="">
                </p>
                <p class="pass-portrain-commonp pass-portrain-previewp">
                    <span>小头像55*55</span>
                </p>
            </div>
        </div>
    </el-card>
</template>
<script>
export default {
    name: 'Avatar',
    data() {
        return {
            activeName: 'first'
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style lang="less">
    .user-avatar-card {
        .el-card__header {
            padding: 0;

            .avatar-header {
                height: 46px;
                padding-left: 20px;
                font-size: 22px;
                line-height: 46px;
                background: -webkit-linear-gradient(#fff,#f7f7f7);
            }
        }
    }
    
    .avatar-wrapper {
        width: 100%;

        .el-tabs {
            float: left;
            width: 75%;
        }
    } 

    .pass-portrait-tabcontent {
        height: 400px;
        overflow: auto;
        text-align: left;
        color: #666;
        font-size: 12px;
        margin: 0 auto;

        ul {
            overflow: hidden;
            margin: 0;
            padding-bottom: 10px;
            color: #666;

            li {
                margin: 0;
                padding: 0;
                cursor: pointer;
                float: left;
                margin-top: 10px;
                margin-right: 10px;
                height: 51px;
                width: 51px;

                img {
                    height: 50px;
                    width: 50px;
                }

                span {
                    background: url(https://passport.baidu.com/passApi/img/curhot.png);
                    display: inline-block;
                    height: 51px;
                    width: 51px;
                    position: relative;
                    top: -54px;
                    zoom: 1;
                    visibility: hidden;
                }
            }

            li.visiHot span {
                visibility: visible;
            }
        }

        .pass-portrait-save {
            padding-top: 40px;
            position: relative;

            .pass-portrait-savebtn {
                border: 0;
                background: url(https://passport.baidu.com/passApi/img/setportrait_btn.png);
                background-repeat: no-repeat;
                cursor: pointer;
                height: 38px;
                line-height: 38px;
                text-align: center;
                width: 130px;
                background-position: 0 -38px;
                color: #fff;
                margin: 0;
                outline: 0;
                padding: 0;
            }
        }
    }

    .pass-portrait-right {
        border-left: 1px solid #e5e5e5;
        float: right;
        height: 380px;
        margin-left: 20px;
        padding-left: 36px;
        width: 180px;
        margin-top: 55px;

        .pass-portrain-commonp {
            font-size: 18px;
            margin: 0;
            padding: 0 0 18px;
        }

        .pass-portrait-previewboxbig {
            height: 100px;
            width: 100px;
            overflow: hidden;
            margin: 0;
            padding: 0;

            .pass-portrait-previewbig {
                height: 100px;
                width: 100px;
            }
        }

        .pass-portrain-previewp {
            font-size: 12px;
            margin: 6px 0 18px;
            padding: 0 0 18px;
        }

        .pass-portrait-previewboxbigsmall {
            height: 55px;
            width: 55px;
            overflow: hidden;
            margin: 0;
            padding: 0;

            .pass-portrait-previewsmall {
                height: 55px;
                width: 55px;
            }
        }

        .pass-portrain-previewp {
            font-size: 12px;
            margin: 6px 0 18px;
            padding: 0 0 18px;
        }
    }


</style>

<template>
    <el-backtop :target="target" :right="right" :bottom="bottom"></el-backtop>
</template>
<script>
import { StringDecoder } from 'string_decoder';
export default {
    name: "BackTop",
    props: {
        right: {
            type: Number,
            default: 40
        },
        bottom: {
            type: Number,
            default: 40
        },
        target: {
            type: String,
            default: ''
        }
    }
}
</script>



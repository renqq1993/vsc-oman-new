// 用户名为大小写字母、数字、下划线的任意组合 
const isValidateUserName = (rule, value, callback) => {
    let reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;

    if (value != null && value != "") {

        if (!reg.test(value)) {
            callback(new Error('用户名为中文、大小写字母、数字和下划线的任意组合！'));
        } else {
            callback();
        }
    } else {
        callback();
    }
};


export const Validate =  {

    /**
     * 函数名：validateUserName
     * 功能：用户名输入合法性验证
     * 参数: item，为验证规则对象
     * required   该项是否必填，值为true表示必填，为false表示选填
     * maxLength  最大输入字符个数 
     * min        最小输入字符长度
     * max        最大输入字符长度 
     * */
    validateUserName: (item) => {
        let rules = [];

        if (item.required) {
            rules.push({ required: true, message: '用户名为必填项，请填写!', trigger: 'blur' });
        }

        if (item.maxLength) {
            rules.push({ min: 1, max: item.maxLength, message: '最多输入' + item.maxLength + '个字符!', trigger: 'blur' });
        }

        if (item.min && item.max) {
            rules.push({ min: item.min, max: item.max, message: '字符长度在' + item.min + '至' + item.max + '之间!', trigger: 'blur' });
        }

        rules.push({ validator: isValidateUserName, trigger: 'blur' });
        
        return rules;
    }
}
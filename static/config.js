const config = {
    BASE_URL: "http://192.168.2.245",                                   // 项目地址

    BASE_IMG_URL: "http://192.168.2.245",                               // 项目图片地址

    BASE_Interface: '/webapp/index.php/home/',                          // 后台接口中的公共部分，此项需要同后台开发人员协商配置，此处以PHP语言为例进行设置              

    BIG_LOGO_NAME: "big_logo.svg",                                      // 项目logo（侧边栏展开时显示）

    SMALL_LOGO_NAME: "small_log.svg",                                   // 项目logo（侧边栏收缩时显示）

    SYS_TITLE_En: "VSC Heterogeneous Management Platform",              // 系统名称

    SYS_TITLE_Cn: "VSC异构管理平台", 

    COPYRIGHT_En: "",                                                   // 版权声明，如果有一项未设置，则默认使用江苏微锐的版权声明（中英文），设置了则使用设置的内容，需要注意必须中英文都必须设置

    COPYRIGHT_Cn: "",                                    

    VERSION: "V2.5.20190726",                                           // 系统版本

    Home_Interval: 10000,                                               // 首页数据刷新间隔

    Lang: 'en',                                                         // 设置系统默认语言， cn: 中文， en: 英文

    CompanyName_En: 'Jiangsu Variable Supercomputer Tech Co., Ltd.',    // 设置公司的中英文名称，如果有一项未设置，则默认使用江苏微锐的公司名称（中英文），设置了则使用设置的内容，需要注意必须中英文都设置

    CompanyName_Cn: '江苏微锐超算科技有限公司',

    PageRange: [5, 10, 15, 20],                                          // 分页每页显示条数选项配置，每项为数字且必填，且建议至少填两个元素，一个元素起不到修改每页显示条数的目的

    FtpTips_Interval: '',                                                // 单位毫秒，表示每50ms有一个打字输入效果，建议设置范围（20-100），可以不设置值，但必须给空字符串，不设置时，默认50ms

    currentDictTIme:2000,                                                 //当前字典定时器间隔
    
    splitDictTime:2000,                                                   //切分字典定时器间隔

    TaskModule: {                                                        // 任务管理模块中的相关配置
        Application_Config: {
            App_Config_Commad_Line: './sp -c/app/PwdSearch/PwdSearch.ini',        // 应用配置中默认的命令行内容，为空字符串时系统默认该字段为：'./sp -c/app/PwdSearch/PwdSearch.ini'
    
            App_Config_Working_Dir: '/root/PwdSearch',                            // 应用配置中默认的工作目录，为空字符串时系统默认该字段为：'/root/PwdSearch'
        
            App_Config_Verify_Lib: '/root/ServiceMng/sp/libspVerify.so',          // 应用配置中默认的验证库，为空字符串时系统默认该字段为：'/root/ServiceMng/sp/libspVerify.so'
        }
    }
}

export default config
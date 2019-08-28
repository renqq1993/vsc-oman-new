
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
    ...zhLocale,
    message: {
        'hello': '你好，世界',
    },
    table: {
        'date': '日期',
        'name': '姓名',
        'addr': '地址'
    },
    select: {
        'lang': '请选择语言'
    },
    tips: {
        perPage: '每页',
        page: '页'
    },
    app: {
        headerBtn: {
            collapseTipsUnFold: '侧边栏展开',
            collapseTipsFold: '侧边栏收缩',
            uploadListTips: '查看文件上传列表',
            lockScreen: '锁屏'
        },
        lang: {
            chinese: '中文',
            english: 'English',
            tips: '语言切换成功',
            exist: '请选择其他语言！'
        },
        userInfo: {
            logout: '退出登录',
            user: '个人中心'
        },
        sysSetting: {
            version: '系统版本',
            help: '系统帮助',
            getHelp: '获取帮助',
            copyrightStatement: '版权声明',
            copyrightReserve: '版权所有',
            company: '江苏微锐超算科技有限公司',
            copyrightStatementContent: '在没有得到本公司书面许可时，任何单位和个人不得擅自使用或复制本软件的一部分或者全部内容，不得以任何形式（包括资料和出版物）进行传播。版权所有，侵权必究。内容如有改动，恕不另行通知。'
        },
        sideBar: {
            home: {
                name: '首页'
            },
            task: {
                moduleName: '任务管理',
                CreateTaskName: '创建任务',
                curTaskName: '当前任务',
                HisTaskName: '历史任务',
                HisOperationName: '历史操作',
                appConfigName: '应用配置',
                templateConfigName: '模板配置'
            },
            device: {
                moduleName: '设备管理',
                deviceCenterName: '设备中心',
                nodeOperationName: '节点操作',
                ftpManageName: 'FTP管理'
            },
            user: {
                moduleName: '用户管理',
                userCenterName: '用户中心',
                avatar: '用户头像'
            },
            dict: {
                moduleName: '字典管理',
                dictUploadName: '字典上传管理',
                curDictTaskName: '当前字典处理',
                hisDictTaskName: '历史字典处理',
                splitDictTaskName: '切分字典管理',
                dictClassName: '字典分类管理'
            }
        },
        userOperation: {
            logout: {
                comfirmContent: '确定退出登录吗?',
                typeName: '提 示',
                sure: '确 定',
                cancle: '取 消',
                cancleTips: '已取消退出登录操作！'
            },
            lockScreen: {
                comfirmContent: '确定锁定屏幕吗?',
                typeName: '提 示',
                sure: '确 定',
                cancle: '取 消',
                cancleTips: '已取消锁屏操作！',
                title: '设置锁屏密码',
                lable: '锁屏密码',
                placeholder: '请输入锁屏密码',
                btn: {
                    reset: '重 置',
                    submit: '确 定'
                },
                errorType: '锁屏密码不能为空'
            },
            unlock: {
                placeholder: '请输入解锁密码',
                tips: {
                    unlock: '解锁',
                    logout: '退出登录'
                },
                errorPwd: '解锁密码错误,请重新输入！'
            },
            login: {
                userName: '用户名',
                password: '密码',
                btn: '登 录'
            }
        },
        sysCheck: {
            login: {
                userName: {
                    invalidateTips: '用户名为中文、大小写字母、数字和下划线的任意组合！',
                    requiredTips: '用户名为必填项，请填写!',
                    maxInputTips: '最大输入字符长度为：',
                    minInputTips: '最小输入字符长度为：',
                    notEmpty: '用户名不能为空'
                },
                password: {
                    requiredTips: '密码为必填项，请填写!',
                    notEmpty: '密码不能为空'
                },
                allTips: '请输入正确的用户名和密码'
            }
        },
        table: {
            loading: '数据加载中，请稍后...',
            user: {
                columns: {
                    userName: '用户名',
                    author: '角色',
                    remark: '备注',
                    operation: '操作'
                },
                btnTips: {
                    add: '添加',
                    delete: '删除',
                    edit: '编辑',
                    detail: '详情'
                },
                cardTitle: '用户统计列表',
                operation: {
                    delete: {
                        confirm: '此操作将永久删除该用户, 是否继续?',
                        tipType: '提示',
                        sure: '确 定',
                        cancle: '取 消',
                        cancleTips: '已取消删除操作！',
                    },
                    create: {

                    },
                    edit: {

                    }
                }
            },
            task: {
                history: {
                    columns: {
                        userName: '用户名',
                        operationType: '操作类型',
                        operationTime: '操作时间',
                        operationDesc: '操作描述',
                        remark: '备注',
                        operation: '操作'
                    },
                    btnTips: {
                        search: '搜索',
                        delete: '删除',
                        deleteMulti: '删除选中',
                        reset: '重置'
                    },
                    cardTitle: '历史操作列表',
                    searchColumn: {
                        userName: '用户名',
                        optTime: '操作时间',
                        startTime: '开始时间',
                        endTime: '结束时间'
                    },
                    operation: {
                        delete: {
                            confirm: '此操作将永久删除该历史操作记录, 是否继续?',
                            tipType: '提示',
                            sure: '确 定',
                            cancle: '取 消',
                            cancleTips: '已取消删除操作！',
                        },
                        deleteAllError: '请至少选择一条记录，再点击该按钮！',
                        deleteAll: {
                            confirm: '此操作将永久删除选中的历史操作记录, 是否继续?',
                            tipType: '提示',
                            sure: '确 定',
                            cancle: '取 消',
                            cancleTips: '已取消删除操作！',
                        }
                    }
                },
                appConfig: {
                    columns: {
                        appID: '应用ID',
                        appName: '应用名称',
                        appDesc: '应用描述',
                        resultVerType: '结果验证类型',
                        commandLine: '命令行',
                        targetType: '目标类型',
                        decrypMode: '破解模式',
                        workingDir: '工作目录',
                        ops: '计算速度',
                        VerLib: '验证库',
                        pwdMax: '应用最大口令',
                        pwdMin: '应用最小口令',
                        isResInit: '初筛选项配置与否',
                        isDeepVer: '深度验证配置与否',
                        isMultTarget: '是否多串',
                        willSort: '是否排序',
                        appFile: '应用文件',
                        operation: '操作'
                    },
                    btnTips: {
                        search: '搜索',
                        deleteMulti: '删除选中',
                        delete: '删除',
                        reset: '重置',
                        add: '添加',
                        edit: '编辑',
                        configFile: '配置应用文件'
                    },
                    cardTitle: '应用及配置列表',
                    searchColumn: {
                        appName: '应用名称',
                        appID: '应用ID'
                    },
                    operation: {
                        delete: '此操作将永久删除该记录, 是否继续?',
                        deleteAllError: '请至少选择一条记录，再点击该按钮！',
                        deleteAll: {
                            confirm: '此操作将永久删除选中的记录, 是否继续?',
                            tipType: '提示',
                            sure: '确 定',
                            cancle: '取 消',
                            cancleTips: '已取消删除操作！',
                        }
                    },
                    addAndEdit: {
                        label: {
                            appName: '应用名称',
                            appType: '应用类型',
                            appVersion: '应用版本',
                            targetType: '目标类型',
                            appPwdMax: '应用最大口令',
                            appPwdMin: '应用最小口令',
                            commandLine: '命令行',
                            verifyLib: '验证库',
                            workingDir: '工作目录',
                            ops: '计算速度（OPS）',
                            planMode: '破解模式',
                            resValidateType: '结果验证类型',
                            isSort: '是否排序',
                            isMultStr: '是否多串',
                            isConfigIni: '是否配置出筛选项',
                            isConfigDeepVerify: '是否配置深度验证'
                        },
                        btns: {
                            save: '保存',
                            cancle: '取消'
                        },
                        title: {
                            add: '添加新应用',
                            edit: '编辑应用参数'
                        },
                        setChoose: {
                            choose: '是',
                            unChoose: '否'
                        },
                        tips: {
                            appName: '请输入应用名称',
                            appType: '请选择应用类型',
                            appVersion: '请选择应用版本',
                            targetType: '请选择目标类型',
                            appPwdMax: '请输入应用最大口令',
                            appPwdMin: '请输入应用最小口令',
                            commandLine: '请输入命令行',
                            verifyLib: '请输入验证库',
                            workingDir: '请输入工作目录',
                            ops: '请输入计算速度（OPS）',
                            planMode: '请选择破解模式',
                            resValidateType: '请选择结果验证类型',
                            isSort: '请选择是否排序',
                            isMultStr: '请选择是否多串',
                            isConfigIni: '请选择是否配置出筛选项',
                            isConfigDeepVerify: '请选择是否配置深度验证'
                        },
                        targets: {
                            target1: '文件',
                            target2: '密文 + 明文',
                            target3: '密文',
                            target4: '密文 + 盐值',
                            target5: '密文 + 盐值 + 用户名'
                        },
                        planMode: {
                            p1: 'PS口令生成',
                            p2: 'PL口令生成'
                        },
                        resValidate: {
                            v1: '唯一正确结果的验证',
                            v2: '多个结果且正确结果唯一的验证',
                            v3: '多个结果且正确结果多个的验证'
                        }
                    },
                    tableConfigBtn: {
                        columns: {
                            appIndex: '序号',
                            appFileName: '应用文件名',
                            delivery: '分发方式',
                            type: '类型',
                            serverPath: '服务器上路径',
                            nodePath: '节点上路径'
                        },
                        other: {
                            fileName: '文件名',
                            titleAdd: '添加应用文件',
                            titleEdit: '修改应用文件参数',
                            uploadBtn: '选择文件',
                            delivery: {
                                copy: '复制分发',
                                split: '切分分发'
                            },
                            typeList: {
                                processFile: '进程文件',
                                soFile: 'SO文件',
                                configFile: '配置文件',
                                dataFile: '数据文件',
                                dictFile: '字典文件',
                                targetFile: '目标文件',
                                zipFile: '压缩文件'
                            }
                        }
                    }
                }
            },
            device: {
                ftp: {
                    cardTitle: 'FTP信息',
                    columns: {
                        ip: 'IP地址',
                        port: '端口',
                        user: '用户',
                        pwd: '密码',
                        rePwd: '确认密码'
                    },
                    btns: {
                        sure: '确定',
                        cancle: '取消',
                        changeConfiguration: '更改FTP配置'
                    },
                    normalShow: {
                        ipTitle: '应用文件下载地址：',
                        portTitle: '端口：',
                        userTitle: '用户：'
                    },
                    tips: '注：FTP（File Transfer Protocol）用于下载应用、目标文件、以及字典文件到节点端'
                }
            },
            dictionary: {
                history:{
                    title:'历史字典任务列表',
                    columns:{
                        ID: 'ID',
                        dictMenu:'字典目录',
                        taskStatus:'任务状态',
                        dictFilename:'字典文件名',
                        dictAlign:'字典别名',
                        dictFileSize:'字典文件大小',
                        splitSize:'切分大小',
                        commitTime:'提交时间',
                        operation:'操作',
                        remark:'备注'
                    },
                    dictCondition:{
                        failure:'执行失败',
                        success:'执行成功',
                    },
                    btn:{
                        delete:'删除',
                        deleteSelection:'删除选中'
                    },
                    tips:{
                        title:'提示',
                        deleteSelection:'是否删除所有选中历史字典',
                        delete:'是否删除选中历史字典',
                        confirm:'确认',
                        cancel:'取消',
                        cancelTip:'已取消所有历史操作',
                        selection:'请选择字典后，再进行删除'
                    }
                },
                splitDict:{
                    title:"字典列表",
                    splitDictTable:"切分字典列表",
                    dictClassificationTable:'字典分类',
                    mergeTable:'字典合并',
                    editTable:'字典别名',
                    columns:{
                        ID:'ID',
                        originFilename:'原始文件名',
                        dictAlign:'字典别名',
                        filesize:'文件大小',
                        passwordNum:'口令个数',
                        splitDict:'切分字典',
                        dictClassification:'字典分类',
                        encodingStyle:"编码方式",
                        createTime:"创建时间",
                        operation:"操作",
                    },
                    splitDictColumn:{
                        ID:'ID',
                        name:'名称',
                        path:'路径',
                        size:'大小',
                        pwdNum:'口令个数',
                        pwdLength:'口令长度',
                        encodingStyle:'编码方式',
                        createTime:'创建时间',
                    },
                    dictClassificationColumn:{
                        name:'分类名称',
                        operation:'操作'
                    },
                    mergeColumn:{
                        orginDict:'源字典',
                        targetDict:'目标字典',
                    },
                    editColumn:{
                        name:'字典别名'
                    },
                    btn:{
                        clear:'清空',
                        add:'添加',
                        close:'关闭',
                        delete:'删除',
                        replace:'替换',
                        edit:'编辑',
                        merge:'合并',
                        confirm:'确定',
                        cancel:'取消',
                        detail:'详情',
                        mergeDict:'合并字典'
                    },
                    tips:{
                        mergeTip:'合并后，源字典将合并到目的字典中，并且源字典将被删除',
                        deleteTip:'是否确定删除该字典',
                        selectTip:"请选择两条字典数据进行合并",
                        emptyTip:"请点击左边的树节点选择字典分类",
                        deleteClassifyTip:'是否确定删除该字典分类',
                        clearClassifyTip:'是否确定删除该字典分类',
                    }
                }
            },
            home: {
                cardTitle: '系统设备信息总览',
                columns: {
                    ChassisNum: '机箱总数：',
                    BladeNum: '刀片总数：',
                    NodeNum: '节点总数：',
                    OnlineNodeNum: '在线节点总数：',
                    ChassisID: '机箱号：'
                }
            }
        }
    }
}
 
export default cn
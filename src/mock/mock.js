export const HistoryDict = [
    {ID:1, 
    dictMenu:"/api/menu",
    taskStatus:"执行成功",
    dictFilename:"dict1",
    dictAlign:"别名1",
    dictFileSize:"500Mb",
    splitSize:"20Mb",
    commitTime:"2019-08-15 16:21:22",
    remark:"33"},
    {ID:2, 
    dictMenu:"/api/menu",
    taskStatus:"执行失败",
    dictFilename:"dict1",
    dictAlign:"别名1",
    dictFileSize:"500Mb",
    splitSize:"20Mb",
    commitTime:"2019-08-15 16:21:22",
    remark:"33"}
]
export const SplitHistory = [
    {
        ID:1,
        originFilename:"1.txt",
        dictMenu:"1.txt",
        dictAlign:"aa",
        filesize:"23Mb",
        passwordNum:"23",
        encodingStyle:"UTF-8",
        createTime:"2019-08-15 16:21:22"
    },
    {
        ID:2,
        originFilename:"1.txt",
        dictMenu:"1.txt",
        dictAlign:"aa",
        filesize:"23Mb",
        passwordNum:"23",
        encodingStyle:"UTF-8",
        createTime:"2019-08-15 16:21:22"
    },
]
export const SplitDictList = [
    {
        ID:40693,
        name:"1_0",
        path:"/home/SubDict",
        size:"92Bytes",
        filesize:"23Mb",
        pwdNum:"23",
        pwdLength:"1",
        encodingStyle:"UTF-8",
        createTime:"2019-08-15 16:21:22"
    },
    {
        ID:40693,
        name:"1_0",
        path:"/home/SubDict",
        size:"92Bytes",
        filesize:"23Mb",
        pwdNum:"23",
        pwdLength:"1",
        encodingStyle:"UTF-8",
        createTime:"2019-08-15 16:21:22"
    },
]

export const classification=[
    {name:"分类1", NodeId:'66', DictId:307},
    {name:"分类2", NodeId:'67', DictId:307},
]

export const dictClassificationDetail = [
   {
       NodeId:12,
       label:'parent1',
       children:[
           {label:'children1',NodeId:13},
           {label:'children2',NodeId:14},
       ]
   },
   {
        label:'parent2',
        NodeId:15,
        children:[
            {label:'children3', NodeId:16},
            {label:'children4', NodeId:17},
        ]
    }
]
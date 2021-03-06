import fetch from '@/config/fetch'

/**
 * 登陆   ok
 */
export const login = data => fetch('/webapp/index.php/home/index/login', data, 'POST');

/**
 * 退出    ok
 */
export const signout = () => fetch('/webapp/index.php/home/user/singout');

/*************************  用户管理  *************************/ 
/**
 * 获取用户列表信息（包含生成数据列表以及查询功能） 
 */
export const getUsers = data => fetch('/webapp/index.php/home/user/getUsers', data);

/**
 * 删除选中的用户 
 */
export const deleteUser = data => fetch('/webapp/index.php/home/user/deleteUser', data);

/**
 * 提交编辑的用户信息(包含修改当前用户密码)
 */
export const editUser = data => fetch('/webapp/index.php/home/user/editUser', data, 'POST');

/**
 * 新建用户 ok
 */
export const createUser = data => fetch('/webapp/index.php/home/user/createUser', data, 'POST');


/***************************  任务管理  **********************************/
/**
 * 获取历史操作信息（包含生成数据列表以及查询功能） 
 */
export const getHisOptLists = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);


/***************************  首页展示  **********************************/
/**
 * 获取系统设备信息总览，即展示在首页中的内容
 */
export const getSysDeviceData = () => fetch('/webapp/index.php/home/Operation/getHsOperation');

















/**
 * 删除选中的历史操作信息
 */
export const deleteHisOpt = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 获取logo图片地址
 */
export const getLogoInfo = () => fetch('/webapp/logoInfo');


export const getAbstractInfo = () => fetch('/webapp/index.php/home/VPNInt/getAbstractInfo');


/**
 * 获取上传未提交离线包列表（包括搜索功能）
 */
export const getUploadFileList = data => fetch('/webapp/index.php/home/VPNInt/getUploadFileList', data)

/**
 * 删除上传未提交离线包
 */
export const delSingleUploadedFile = data => fetch('/webapp/index.php/home/VPNInt/delSingleUploadedFile', data)

/**
 * 获取服务器上文件列表
 */ 
export const getUploadDirOnServer = data => fetch('/webapp/index.php/home/VPNInt/getUploadDirOnServer', data)

/**
 *  从服务器上获取的文件的提交
 */ 
export const singleSubmitServerFile = data => fetch('/webapp/index.php/home/VPNInt/singleSubmitServerFile', data)

/**
 *  从服务器上获取的文件的删除
 */ 
export const delSingleServerUploadedFile = data => fetch('/webapp/index.php/home/VPNInt/delSingleServerUploadedFile', data)

/**
 *  删除服务器上已经提交的文件
 */ 
export const delSingleMultiUploadFile = data => fetch('/webapp/index.php/home/VPNInt/delSingleMultiUploadFile', data)

/**
 *  获取服务器上已经提交的文件
 */ 
export const getUploadedFileList = data  => fetch('/webapp/index.php/home/VPNInt/getUploadedFileList', data)


/****************************  创建任务  *********************************/ 
/**
 * 创建任务时自动校验文件应用类别
 */
export const getHomeData = () => fetch('/webapp/index.php/home/index/homePage');

/****************************  创建任务  *********************************/ 
/**
 * 创建任务时自动校验文件应用类别
 */
export const IdentifyAppFormTargetInfo = data => fetch('/webapp/index.php/home/AppVerInt/IdentifyAppFromTargetInfo', data, 'POST');

/**
 * 目标文件树
 */
export const getTargetTree = () => fetch('/webapp/index.php/home/DataService/getServerFile');

/**
 * 删除上传的文件
 */
export const delTempFileInfoForWeb = (data) => fetch('/webapp/index.php/home/DataService/delTempFileInfoForWeb', data, "POST");

/**
 * 规则树加载
 */
export const getRule = () => fetch('/webapp/index.php/home/Rule/getRule');

/**
 * 字符集获取
 */
export const getCharset = () => fetch('/webapp/index.php/home/Rule/getCharset');

/**
 * 字符集添加
 */
export const addCharset = data => fetch('/webapp/index.php/home/Rule/addCharset', data, 'POST');

/**
 * 字符集编辑
 */
export const editCharset = data => fetch('/webapp/index.php/home/Rule/editCharset', data, 'POST');

/**
 * 字符集删除
 */
export const delCharset = data => fetch('/webapp/index.php/home/Rule/delCharset', data);

/**
 * 计算资源树加载
 */
export const getResource = data => fetch('/webapp/index.php/home/TaskInt/GetAvailableCmptResource', data, 'POST');

/**
 * 计算资源选择后的目标策略筛选
 */
export const chooseCmptResourceForSubmit = data => fetch('/webapp/index.php/home/TaskInt/chooseCmptResourceForSubmit', data, 'POST');

/**
 * 计算预计运行时间
 */
export const getEstimateFinishedTime = data => fetch('/webapp/index.php/home/TaskInt/GetEstimateFinishedTime', data, 'POST');

/**
 * 提交任务
 */
export const SubmitMultiTask = data => fetch('/webapp/index.php/home/TaskInt/SubmitMultiTask', data, 'POST');

/*************************  任务管理  *************************/ 
/**
 * 获取当前任务信息（包含生成数据列表以及查询功能）
 */
export const getCurTaskLists = data => fetch('/webapp/index.php/home/TaskInt/QueryAllSubmmittedTask', data);

/**
 * 获取当前任务结果信息
 */
export const getResultLists = data => fetch('/webapp/index.php/home/TaskInt/getTaskResult', data);

/**
 * 获取当前、待提交任务计算资源
 */
export const getTaskCmptResource = data => fetch('/webapp/index.php/home/TaskInt/getTaskCmptResource', data);

/**
 * 获取当前、待提交目标 
 */
export const getTaskTarget = data => fetch('/webapp/index.php/home/TaskInt/getTaskTarget', data);

/**
 * 获取当前、待提交策略
 */
export const getTaskPolicy = data => fetch('/webapp/index.php/home/TaskInt/getTaskPolicy', data);

/**
 * 停止当前任务
 */
export const stopCurTask = data => fetch('/webapp/index.php/home/TaskInt/StopTask', data);

/**
 * 暂停当前任务
 */
export const pauseCurTask = data => fetch('/webapp/index.php/home/TaskInt/PauseTask', data);

/**
 * 恢复执行当前任务
 */
export const restartCurTask = data => fetch('/webapp/index.php/home/TaskInt/ResumeTask', data);

/**
 * 获取待提交任务信息（包含生成数据列表以及查询功能）
 */
export const getQueueTaskLists = data => fetch('/webapp/index.php/home/TaskInt/QueryAllSubmmittingTask', data);

/**
 * 删除待提交任务
 */
export const ModifyTask = data => fetch('/webapp/index.php/home/TaskInt/ModifyTask', data, 'POST');

/**
 * 编辑待提交任务
 */
export const deleteQueueTask = data => fetch('/webapp/index.php/home/TaskInt/DelAllSubmmittingTask', data);

/**
 * 获取历史任务信息（包含生成数据列表以及查询功能）
 */
export const getHisTaskLists = data => fetch('/webapp/index.php/home/hsTask/getHsTaskInfo', data);

/**
 * 删除历史任务信息
 */
export const deleteHisTasks = data => fetch('/webapp/index.php/home/HsTask/deleteHsTask', data, 'POST');

/**
 * 删除所有历史任务信息
 */
export const deleteAllHisTasks = data => fetch('/webapp/index.php/home/TaskInt/deleteAllHisTasks', data);

/**
 * 获取历史任务告警信息
 */
export const getHisTaskAlarms = data => fetch('./webapp/index.php/home/TaskInt/getHisTaskAlarms', data);

/**
 * 获取历史任务结果信息、计算资源、目标和策略
 */
export const getHisTaskResults = data => fetch('./webapp/index.php/home/HsTask/getHsTask', data);

/**
 * 停止当前任务中的某个子任务
 */
export const stopCurSonTask = data => fetch('/webapp/index.php/home/TaskInt/StopTask', data);

/**
 * 暂停当前任务中的某个子任务
 */
export const pauseCurSonTask = data => fetch('/webapp/index.php/home/TaskInt/PauseTask', data);

/**
 * 恢复执行当前任务中的某个子任务
 */
export const restartCurSonTask = data => fetch('/webapp/index.php/home/TaskInt/ResumeTask', data);



/*************************  规则管理  *************************/ 
/**
 * 增加规则
 */
export const addRule = data => fetch('/webapp/index.php/home/Rule/addRule', data, 'POST');

/**
 * 修改规则
 */
export const editRule = data => fetch('/webapp/index.php/home/Rule/editRule', data, 'POST');

/**
 * 删除规则 ok
 */
export const delRule = data => fetch('/webapp/index.php/home/Rule/delRule', data);

/**
 * 增加规则类型
 */
export const addRuleType = data => fetch('/webapp/index.php/home/Rule/addRuleType', data);

/**
 * 修改规则类型
 */
export const editRuleType = data => fetch('/webapp/index.php/home/Rule/editRuleType', data);

/**
 * 删除规则类型
 */
export const delRuleType = data => fetch('/webapp/index.php/home/Rule/delRuleType', data);

/**
 * 字典文件树
 */
export const getDictTree = data => fetch('/webapp/index.php/home/DataService/getServerFile', data);


/*************************  设备管理  *************************/ 
/**
 * 加载设备树
 */
export const getDevResourceInfo = () => fetch('/webapp/index.php/home/DeviceInt/getDevResourceInfo');

/**
 * 获取设备信息
 */
export const getDevResourceLoadInfo = data => fetch('/webapp/index.php/home/DeviceInt/getDevResourceLoadInfo', data);

/**
 * 设备操作（上电、下电、重启、注册，其中当data中的optType字段为4表示上电，为3表示下电，为2表示重启，为1表示注册）
 */
export const exeDevCtrlCmd = data => fetch('/webapp/index.php/home/DeviceInt/ExeDevCtrlCmd', data, 'POST');



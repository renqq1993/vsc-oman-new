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

/**
 * 获取口令模板树配置 
 */
export const getPwdMode = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 获取任务模板树配置 
 */
export const getTaskMode = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 删除任务模板配置 
 */
export const deleteTaskMode = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 删除口令模板配置 
 */
export const deletePwdMode = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 添加类型 
 */
export const addType = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 修改类型 
 */
export const editType = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 添加模板名
 */
export const addModeName = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 重命名模板名
 */
export const editModeName = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 显示口令模版内容
 */
export const showPwdMode = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 显示口令模板配置
 */
export const getPwdConfig = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 显示
 */
export const getAllPwdConfig = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);


/***************************  字典管理  **********************************/
/**
 * 获取历史字典信息（包含生成数据列表） 
 */
export const getHisDictLists = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data, 'Post');

/**
 * 删除选中历史字典信息
 */
export const deleteSelectionDict = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data, 'Post');

/**
 * 删除历史字典 
 */
export const deleteHisDict = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 合并切分字典 
 */
export const mergeDict = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 获取切分字典列表
 */
export const getSpliteDictList = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 获取字典分类
 */
export const getDictClassification = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 获取特定字典分类
 */
export const getDictClassificationById = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 替换特定字典分类
 */
export const replaceDictClassification = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 删除特定字典分类
 */
export const deleteDictClassification = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 清空特定字典分类
 */
export const clearDictClassification = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 添加字典分类
 */
export const addDictClassification = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 删除切分字典
 */
export const deleteSplitDict = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 修改切分字典
 */
export const editSplitDict = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 删除上传字典
 */
export const deleteUploadDict = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 加载上传字典
 */
export const getUploadDict = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 提交切分
 */
export const submitSplit = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 添加字典分类
 */
export const addClassification = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 修改字典分类
 */
export const editClassification = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 获取当前字典
 */
export const getCurDictTask = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 停止当前字典任务
 */
export const stopCurDictTask = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);

/**
 * 删除当前字典任务
 */
export const deleteCurDictTask = data => fetch('/webapp/index.php/home/Operation/getHsOperation', data);



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



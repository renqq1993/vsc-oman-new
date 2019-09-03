import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
    ...enLocale,
    message: {
        'hello': 'hello, world',
    },
    table: {
        'date': 'Date',
        'name': 'Name',
        'addr': 'Address'
    },
    select: {
        'lang': 'please choose the lang'
    },
    tips: {
        perPage: 'perPage',
        page: 'page'
    },
    app: {
        headerBtn: {
            collapseTipsUnFold: 'Side Bar Expansion',
            collapseTipsFold: 'Side Bar Shrinkage',
            uploadListTips: 'View file upload list',
            lockScreen: 'Lock Screen'
        },
        lang: {
            chinese: '中文',
            english: 'English',
            tips: 'Switch Language Success',
            exist: 'Please choose another language!'
        },
        userInfo: {
            logout: 'Log out',
            user: 'Personal Center'
        },
        sysSetting: {
            version: 'Version',
            help: 'Help',
            getHelp: 'More',
            copyrightStatement: 'Copyright Statement',
            copyrightReserve: 'All Right Reserved',
            company: 'Jiangsu Variable Supercomputer Tech Co., Ltd.',
            copyrightStatementContent: 'The infomation in this software is subject to change without notice. No part of this software may in any form or by any means (electronic, mechanical, photocopying, recording or otherwise) be reproduced or stored in a retrieval system transmitted without prior written permission from Jiangsu Variable Supercomputer Tech Co., Ltd.'
        },
        sideBar: {
            home: {
                name: 'Home'
            },
            task: {
                moduleName: 'Task',
                CreateTaskName: 'Create Task',
                curTaskName: 'Current Tasks',
                HisTaskName: 'History Tasks',
                HisOperationName: 'History Operation',
                appConfigName: 'Application Config',
                templateConfigName: 'Template Config'
            },
            device: {
                moduleName: 'Device',
                deviceCenterName: 'Device Center',
                nodeOperationName: 'Node Operation',
                ftpManageName: 'FTP Config'
            },
            user: {
                moduleName: 'User',
                userCenterName: 'User Center',
                avatar: 'User Avatar'
            },
            dict: {
                moduleName: 'Dictionary',
                dictUploadName: 'Dict Upload',
                curDictTaskName: 'Current Dict Tasks',
                hisDictTaskName: 'History Dict Tasks',
                splitDictTaskName: 'Dict Segmentation',
                dictClassName: 'Dict Classification'
            }
        },
        userOperation: {
            logout: {
                comfirmContent: 'Are you sure you want to log out?',
                typeName: 'Tips',
                sure: 'Yes',
                cancle: 'No',
                cancleTips: 'Log out operation cancelled!'
            },
            lockScreen: {
                comfirmContent: 'Are you sure you want to lock the screen?',
                typeName: 'Tips',
                sure: 'Yes',
                cancle: 'No',
                cancleTips: 'Lock screen operation cancelled!',
                title: 'Setting Lock Screen Password',
                lable: 'Password',
                placeholder: 'Please enter the lock screen password',
                btn: {
                    reset: 'Reset',
                    submit: 'Lock'
                },
                errorType: 'Lock screen password cannot be empty'
            },
            unlock: {
                placeholder: 'Please enter the unlock password',
                tips: {
                    unlock: 'Unlock',
                    logout: 'Log out'
                },
                errorPwd: 'Error unlocking password, please re-enter!'
            },
            login: {
                userName: 'Username',
                password: 'Password',
                btn: 'Login'
            }
        },
        sysCheck: {
            login: {
                userName: {
                    invalidateTips: 'Any combination of user names in Chinese, upper and lower case letters, numbers and underscores!',
                    requiredTips: 'User name must be filled in, please fill in!',
                    maxInputTips: 'The maximum input character length is: ',
                    minInputTips: 'The minimum input character length is: ',
                    notEmpty: 'Username cannot be empty'
                },
                password: {
                    requiredTips: 'Password must be filled in, please fill in!',
                    notEmpty: 'Password cannot be empty'
                },
                allTips: 'Please enter the correct username and password!'
            }
        },
        table: {
            loading: 'The data is loading, please wait a minute...',
            user: {
                columns: {
                    userName: 'User Name',
                    author: 'Role',
                    remark: 'Remark',
                    operation: 'Operation'
                },
                btnTips: {
                    add: 'Create',
                    delete: 'Delete',
                    edit: 'Edit',
                    detail: 'Details'
                },
                cardTitle: 'User Statistics List',
                operation: {
                    delete: {
                        confirm: 'This action will permanently delete the user. Do you want to continue?',
                        tipType: 'Tips',
                        sure: 'Yes',
                        cancle: 'No',
                        cancleTips: 'Delete operation cancelled!',
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
                        userName: 'User Name',
                        operationType: 'Operation Type',
                        operationTime: 'Operation Time',
                        operationDesc: 'Operation Description',
                        remark: 'Note',
                        operation: 'Operation'
                    },
                    btnTips: {
                        search: 'Search',
                        delete: 'Delete',
                        deleteMulti: 'Delete Selected Records',
                        reset: 'Reset'
                    },
                    cardTitle: 'History Operation Statistics List',
                    searchColumn: {
                        userName: 'User Name',
                        optTime: 'Operation Time',
                        startTime: 'Start',
                        endTime: 'End'
                    },
                    operation: {
                        delete: {
                            confirm: 'This action will permanently delete this record. Do you want to continue?',
                            tipType: 'Tips',
                            sure: 'Yes',
                            cancle: 'No',
                            cancleTips: 'Delete operation cancelled!',
                        },
                        deleteAllError: 'Please select at least one record and click the button again!',
                        deleteAll: {
                            confirm: 'This action will permanently delete the selected records. Do you want to continue?',
                            tipType: 'Tips',
                            sure: 'Yes',
                            cancle: 'No',
                            cancleTips: 'Delete operation cancelled!',
                        }
                    }
                },
                appConfig: {
                    columns: {
                        appID: 'Application ID',
                        appName: 'Application Name',
                        appDesc: 'Application Type',
                        resultVerType: 'Results validation type',
                        commandLine: 'Command Line',
                        targetType: 'Object Type',
                        decrypMode: 'Decryption Mode',
                        workingDir: 'Working Directory',
                        ops: 'Calculate Speed(ops/s)',
                        VerLib: 'Verification Library',
                        pwdMax: 'App max password',
                        pwdMin: 'App min password',
                        isResInit: 'Results are Selected?',
                        isDeepVer: 'Deep Verify are selected?',
                        isMultTarget: 'Targets are multiple?',
                        willSort: 'Sequence',
                        appFile: 'Application File',
                        operation: 'Operations'
                    },
                    btnTips: {
                        search: 'Search',
                        deleteMulti: 'Delete Selected Records',
                        delete: 'Delete',
                        reset: 'Reset',
                        add: 'Create',
                        edit: 'Edit',
                        configFile: 'Configure Application File'
                    },
                    cardTitle: 'Application and Configuration List',
                    searchColumn: {
                        appID: 'Application ID',
                        appName: 'Application Name'
                    },
                    operation: {
                        delete: 'This action will permanently delete this record. Do you want to continue?',
                        deleteAllError: 'Please select at least one record and click the button again!',
                        deleteAll: {
                            confirm: 'This action will permanently delete the selected records. Do you want to continue?',
                            tipType: 'Tips',
                            sure: 'Yes',
                            cancle: 'No',
                            cancleTips: 'Delete operation cancelled!',
                        }
                    },
                    addAndEdit: {
                        label: {
                            appName: 'Application Name',
                            appType: 'Application Type',
                            appVersion: 'Application Version',
                            targetType: 'Object Type',
                            appPwdMax: 'App max password',
                            appPwdMin: 'App min password',
                            commandLine: 'Command Line',
                            verifyLib: 'Verification Library',
                            workingDir: 'Working Directory',
                            ops: 'Calculate Speed（OPS）',
                            planMode: 'Decryption Mode',
                            resValidateType: 'Results validation type',
                            isSort: 'Sequence',
                            isMultStr: 'Targets are multiple?',
                            isConfigIni: 'Results are selected',
                            isConfigDeepVerify: 'Deep Verify are selected?'
                        },
                        btns: {
                            save: 'Confirm',
                            cancle: 'Cancle'
                        },
                        title: {
                            add: 'Add New Application',
                            edit: 'Edit Application Parameters'
                        },
                        setChoose: {
                            choose: 'Yes',
                            unChoose: 'No'
                        },
                        tips: {
                            appName: 'Application Name',
                            appType: 'Application Type',
                            appVersion: 'Application Version',
                            targetType: 'Object Type',
                            appPwdMax: 'App max password',
                            appPwdMin: 'App min password',
                            commandLine: 'Command Line',
                            verifyLib: 'Verification Library',
                            workingDir: 'Working Directory',
                            ops: 'Calculate Speed（OPS）',
                            planMode: 'Decryption Mode',
                            resValidateType: 'Results validation type',
                            isSort: 'Sequence',
                            isMultStr: 'Targets are multiple?',
                            isConfigIni: 'Results are selected',
                            isConfigDeepVerify: 'Deep Verify are selected?'
                        },
                        targets: {
                            target1: 'File',
                            target2: 'Cipher Text + Plain Text',
                            target3: 'Cipher Text',
                            target4: 'Cipher Text + Salt Value',
                            target5: 'Cipher Text + Salt Value + User Name'
                        },
                        planMode: {
                            p1: 'PS Password Generation',
                            p2: 'PL Password Generation'
                        },
                        resValidate: {
                            v1: 'Verification of the Only Correct Results',
                            v2: 'Verification of multiple results with unique correct results',
                            v3: 'Verification of multiple results and multiple correct results'
                        }
                    },
                    tableConfigBtn: {
                        columns: {
                            appIndex: 'No.',
                            appFileName: 'Application File Name',
                            delivery: 'Distribution Pattern',
                            type: 'Type',
                            serverPath: 'Path of Server',
                            nodePath: 'Path of Node'
                        },
                        other: {
                            fileName: 'File Name',
                            titleAdd: 'Add Application File',
                            titleEdit: 'Edit Application File Parameters',
                            uploadBtn: 'Select File',
                            delivery: {
                                copy: 'Copy Distribution',
                                split: 'Segmentation Distribution'
                            },
                            typeList: {
                                processFile: 'Process File',
                                soFile: 'SO File',
                                configFile: 'Configuration File',
                                dataFile: 'Data File',
                                dictFile: 'Dictionary File',
                                targetFile: 'Object File',
                                zipFile: 'Compress File'
                            }
                        }
                    }
                }
            },
            device: {
                ftp: {
                    cardTitle: 'FTP Information',
                    columns: {
                        ip: 'IP Address',
                        port: 'Port',
                        user: 'User',
                        pwd: 'Password',
                        rePwd: 'Confirm Password'
                    },
                    btns: {
                        sure: 'Save',
                        cancle: 'Cancle',
                        changeConfiguration: 'Change FTP Configuration'
                    },
                    normalShow: {
                        ipTitle: 'Application File Download Address: ',
                        portTitle: 'Port: ',
                        userTitle: 'User: '
                    },
                    tips: 'Note：FTP（File Transfer Protocol）is used to transfer download application file, object file and dictionary file to node end.'
                }
            },
            dictionary: {
                history:{
                    title:'Historical Dictionary Task List',
                    columns:{
                        ID: 'ID',
                        dictMenu:'Dicttionary Menu',
                        taskStatus:'Task Status',
                        dictFilename:'Dictionary Filename',
                        dictAlign:'Dictionary Align',
                        dictFileSize:'Dicttionary FileSize',
                        splitSize:'Split Size',
                        commitTime:'Commit Time',
                        operation:'Operation',
                        remark:'Remark'
                    },
                    dictCondition:{
                        failure:'Exec Failure',
                        success:'Exec Success',
                    },
                    btn:{
                        delete:'Delete',
                        deleteSelection:'Delete Selection'
                    },
                    tips:{
                        title:'Tips',
                        deleteSelection:'Are you sure to delete all selected dictionary',
                        delete:'Are you sure to delete this dictionary',
                        confirm:'confirm',
                        cancel:'cancel',
                        cancelTip:'Cancel all deletion',
                        selection:'Please select the dictionary you want to delete, then click the button'
                    }
                },
                splitDict:{
                    title:"Dictionary List",
                    splitDictTable:"Segmentation Dictionary List",
                    dictClassificationTable:'Dictionary Classification',
                    mergeTable:'Dictionary Merging',
                    editTable:'Dictionary aliases',
                    columns:{
                        ID:'ID',
                        originFilename:'Origin Filename',
                        dictAlign:'Dictionary aliases',
                        filesize:'File Size',
                        passwordNum:'Password Number',
                        splitDict:'Segmentation Dictionary',
                        dictClassification:'Dictionary Classification',
                        encodingStyle:"Encoding Style",
                        createTime:"Create Time",
                        operation:"Operation",
                    },
                    splitDictColumn:{
                        ID:'ID',
                        name:'Name',
                        path:'Path',
                        size:'Size',
                        pwdNum:'Password Number',
                        pwdLength:'Password Length',
                        encodingStyle:'Encoding Style',
                        createTime:'create Time',
                    },
                    dictClassificationColumn:{
                        name:'Name',
                        operation:'Operation'
                    },
                    mergeColumn:{
                        orginDict:'Origin Dictionary',
                        targetDict:'Target Dictionary',
                    },
                    editColumn:{
                        name:'Dictionary aliases'
                    },
                    btn:{
                        clear:'Clear',
                        add:'Add',
                        close:'Close',
                        delete:'Delete',
                        replace:'Replace',
                        edit:'Edit',
                        merge:'Merge',
                        confirm:'Confirm',
                        cancel:'Cancel',
                        detail:'Detail',
                        mergeDict:'Merge Dictionary'
                    },
                    tips:{
                        title:"Tips",
                        mergeTip:'After merging, the source dictionary will be merged into the destination dictionary and deleted.',
                        deleteTip:'Are you sure to delete this dictionary',
                        selectTip:'Please select two dictionary data to merge',
                        emptyTip:"Click on the tree node on the left to select the dictionary classification",
                        deleteClassifyTip:'Are you sure to delete this dictionary Classification',
                        clearClassifyTip:'Are you sure to delete the dictionary Classification',
                        chooseClassifyTip:"Please select dictionary classification",
                    }
                },
                dictUpload:{
                    title:"Uploaded Dictionary File List",
                    column:{
                        ID:"ID",
                        name:"Name",
                        path:"Path",
                        ope:"Operation",
                        dictName:"Dictionary Name"
                    },
                    btn:{
                        search:"Search",
                        upload:"Upload Dictionary",
                        deleteSel:"Delete Selection",
                        split:"Dictionary Segmentation",
                        submit:"Submit",
                        cancel:"Cancel",
                        add:"Add",
                        confirm:"Confirm",
                        reset:"Reset",
                        restore:"Upload",
                        pause:"Pause",
                        cancelUpload:"Cancel",
                        close:"Close"
                    },
                    splitTitle:"Submit Dictionary Segmentation",
                    splitForm:{
                        filename:"File Name",
                        filepath:"File Path",
                        dictAlign:"Dictionary Aliases",
                        splitSize:"Segmentation size",
                        classify:"Dictionary Classification",
                    },
                    tips:{
                        title:"Tips",
                        alignTip:"Please input a dictionary alias",
                        splitTip:"Tips:System default segmentation is used when the value is 0",
                        deleteFile:"Delete submitted dictionary files after segmentation",
                        deleteTip:"Are you sure to delete this dictionary",
                        uploadSuccess:"Upload Success",
                        uploadFailure:"Upload Failed",
                        cancelUpload:"Cancel upload successfully",
                        deleteFail:"Failed to delete temporary files in server",
                        closeTip:"This operation will give up uploading all files. Do you want to continue?",
                        calcelClose:"The upload operation will continue",
                        searchSuccess:"Search upload dictionary successfully",
                        warnTip:"Tip: Refreshing or closing the browser will give up uploading all files",
                        emptyTip:"Please enter a segmentation size",
                        numberTip:"Segmentation size must be non-negative integers",
                        formTip:"Submitted content does not conform to specifications"
                    },
                    uploadTitle:"Upload List",
                    uploadColumn:{
                        filename:"File Name",
                        progress:"File Progress",
                        status:"File Status",
                        ope:"Operation"
                    },
                    uploadStatus:{
                        wait:"Wait",
                        upload:"Uploading",
                        pause:"Pause",
                        Success:"Success"
                    }
                },
                dictClass:{
                    title:"Dictionary Classification Statistics",
                    column:{
                        name:"Name",
                        ope:"Operation",
                    },
                    btn:{
                        delete:"Delete",
                        add:"Add",
                        edit:"Edit",
                        confirm:"Confirm",
                        cancel:"Cancel",
                    },
                    addTitle:"Dictionary Classification Name",
                    tips:{
                        emptyTip:"Click the dictionary classification tree on the left to view the contents",
                        deleteTip:"Are you sure to delete this dictionary classification",
                        tipTitle:"Tips",
                        cancelTip:"Canceled deletion operation"
                    }
                },
                CurDict:{
                    title:"Current Dictionary Task List",
                    columns:{
                        ID:"ID",
                        direction:"Dictionary Catalogue",
                        condition:"Dictionary Condition",
                        progress:"Dictionary Progress",
                        speed:"Processing Speed",
                        filename:"Dictionary File Name",
                        align:"Dictionary Alias",
                        filesize:"Dictionary File Size",
                        splitSize:"Segmentation Size",
                        commitTime:"Submission Time",
                        ope:"Operation"
                    },
                    btn:{
                        delete:"Delete",
                        stop:"Stop",
                        confirm:"Confirm",
                        cancel:"Cancel",
                    },
                    tips:{
                        deleteTip:"Are you sure to delete this current dictionary task?",
                        stopTip:"Are you sure to stop this current dictionary task?",
                        title:"Tips",
                        deleteSuccess:"Delete current dictionary Task Successful",
                        stopSuccess:"Stop current dictionary Task Successful",
                    },
                    status:{
                        wait:"Wait",
                        process:"Performing",
                        success:"Success",
                        failure:"Failure",
                        delete:"Deleted"
                    }
                }
            },
            home: {
                cardTitle: 'Overview of System Equipment Information',
                columns: {
                    ChassisNum: 'Chassis Num: ',
                    BladeNum: 'Blade Num: ',
                    NodeNum: 'Node Num: ',
                    OnlineNodeNum: 'Online Node Num: ',
                    ChassisID: 'Chassis ID: '
                }
            }
        }
    }
}
 
export default en
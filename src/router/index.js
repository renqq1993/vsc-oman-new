import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 按需加载组件
// 公共模块
const Layout = r => require.ensure([], () => r(require('@/components/layout/Layout')), 'Layout');
// 登录组件
const Login = r => require.ensure([], () => r(require('@/views/login/Login')), 'Login');
// 首页
const Home = r => require.ensure([], () => r(require('@/views/home/Home')), 'Home');

// 锁屏
const Lock = r => require.ensure([], () => r(require('@/views/lock/Lock')), 'Lock');

// 任务管理
const CreateTask = r => require.ensure([], () => r(require('@/views/task/CreateTask')), 'CreateTask');
const CurTask = r => require.ensure([], () => r(require('@/views/task/CurTask')), 'CurTask');
const HisTask = r => require.ensure([], () => r(require('@/views/task/HisTask')), 'HisTask');
const HisOperation = r => require.ensure([], () => r(require('@/views/task/HisOperation')), 'HisOperation');
const AppConfig = r => require.ensure([], () => r(require('@/views/task/AppConfig')), 'AppConfig');
const TemplateConfig = r => require.ensure([], () => r(require('@/views/task/TemplateConfig')), 'TemplateConfig');

// 设备管理
const DeviceCenter = r => require.ensure([], () => r(require('@/views/device/DeviceCenter')), 'DeviceCenter');
const NodeOpt = r => require.ensure([], () => r(require('@/views/device/NodeOpt')), 'NodeOpt');
const FTPMng = r => require.ensure([], () => r(require('@/views/device/FTPMng')), 'FTPMng');

// 用户管理
const UserCenter = r => require.ensure([], () => r(require('@/views/user/UserCenter')), 'UserCenter');
const Avatar = r => require.ensure([], () => r(require('@/components/smallFunc/avatar/Avatar')), 'Avatar');

// 字典管理
const DictUpload = r => require.ensure([], () => r(require('@/views/dict/DictUpload')), 'DictUpload');
const CurDictTask = r => require.ensure([], () => r(require('@/views/dict/CurDictTask')), 'CurDictTask');
const HisDictTask = r => require.ensure([], () => r(require('@/views/dict/HisDictTask')), 'HisDictTask');
const SplitDictTask = r => require.ensure([], () => r(require('@/views/dict/SplitDictTask')), 'SplitDictTask');
const DictClass = r => require.ensure([], () => r(require('@/views/dict/DictClass')), 'DictClass');

/**
 *  路由规则书写说明
 * 
 *  1、不希望在侧边栏展示的路由，不能加name属性，如登录页等，需要展示的name属性必须加上，如首页、任务管理模块等，考虑到国际化问题，需要在i18n模块的en.js和cn.js中将对应的模块和子模块的名称写好，然后路由的时候直接使用name对应的字符串即可
 *  2、侧边栏中只有一个子路由的，single属性值为true，否则为false，并且需要保证模块的name同子路由的那么属性是相同的，参考首页处的设置即可
 *  3、侧边栏模块前的icon，需要在single的同级icon属性中添加icon对应的类名即可，子级别的icon需要设置子路由的meta的icon属性为对应的icon类名即可
 *  4、Layout组件是公共组件，侧边栏新增模块时，需要保证一级模块的component为Layout组件，参考任务管理模块的设置即可
 *  5、组件是按需加载的，只有用到的时候才加载，因此，组件的写法类似：const Home = r => require.ensure([], () => r(require('@/views/home/Home')), 'Home');
 * 	6、根据用户权限显示对应的路由（权限功能未添加，暂时不作说明，子路由已经预设字段：requireAuth，等需求确定了再作具体规划） 
 * */
const routes = [
	{
		path: '/login',
		component: Login,
		meta: {
			requireAuth: false
		}
	},
	{
		path: '/',
		redirect: '/login',				// 重定向到登录页
		meta: {
			requireAuth: false
		}
	},
	{
		path: '/lock',
		component: Lock,
		meta: {
			requireAuth: false
		}
	},
	{
		path: '/sys',
		component: Layout,
		name: 'app.sideBar.home.name', // i18n中首页名称对应的字段
		icon: 'el-icon-new-icon-home',
		single: true,
		children: [
			{ path: 'home', component: Home, name: 'app.sideBar.home.name', meta: { requireAuth: true, icon: ''} }
		]
	},
	{
		path: '/taskMng',
		component: Layout,
		redirect: 'noredirect',
		name: 'app.sideBar.task.moduleName',
		icon: 'el-icon-new-icon-guize2',
		single: false,
		children: [
			{ path: 'createTask', component: CreateTask, name: 'app.sideBar.task.CreateTaskName', meta: { requireAuth: true, icon: 'el-icon-new-icon-chuangjianrenwu'} },
			{ path: 'curTasks', component: CurTask, name: 'app.sideBar.task.curTaskName', meta: { requireAuth: true, icon: 'el-icon-loading'} },
			{ path: 'hisTasks', component: HisTask, name: 'app.sideBar.task.HisTaskName', meta: { requireAuth: true, icon: 'el-icon-new-icon-zhihangfankui'} },
			{ path: 'hisOperations', component: HisOperation, name: 'app.sideBar.task.HisOperationName', meta: { requireAuth: true, icon: 'el-icon-new-icon-renjijiaohu'} },
			{ path: 'appConfig', component: AppConfig, name: 'app.sideBar.task.appConfigName', meta: { requireAuth: true, icon: 'el-icon-new-icon-yingyongpeizhi'} },
			{ path: 'templateConfig', component: TemplateConfig, name: 'app.sideBar.task.templateConfigName', meta: { requireAuth: true, icon: 'el-icon-new-icon-changjingguanli'} }
		]
	},
	{
		path: '/dictMng',
		component: Layout,
		redirect: 'noredirect',
		name: 'app.sideBar.dict.moduleName',
		icon: 'el-icon-new-icon-zidianguanli',
		single: false,
		children: [
			{ path: 'dictUpload', component: DictUpload, name: 'app.sideBar.dict.dictUploadName', meta: { requireAuth: true, icon: 'el-icon-upload2'} },
			{ path: 'curDictTask', component: CurDictTask, name: 'app.sideBar.dict.curDictTaskName', meta: { requireAuth: true, icon: 'el-icon-loading'} },
			{ path: 'hisDictTask', component: HisDictTask, name: 'app.sideBar.dict.hisDictTaskName', meta: { requireAuth: true, icon: 'el-icon-new-icon-icon_renwujincheng'} },
			{ path: 'splitDictTask', component: SplitDictTask, name: 'app.sideBar.dict.splitDictTaskName', meta: { requireAuth: true, icon: 'el-icon-new-icon-qiefen'} },
			{ path: 'dictClass', component: DictClass, name: 'app.sideBar.dict.dictClassName', meta: { requireAuth: true, icon: 'el-icon-new-icon-RectangleCopy7'} }
		]
	},
	{
		path: '/deviceMng',
		component: Layout,
		redirect: 'noredirect',
		name: 'app.sideBar.device.moduleName',
		icon: 'el-icon-new-icon-shebeiguanli3',
		single: false,
		children: [
			{ path: 'ftpMng', component: FTPMng, name: 'app.sideBar.device.ftpManageName', meta: { requireAuth: true, icon: 'el-icon-new-icon-st-to-ftp'} },
			{ path: 'nodeOperation', component: NodeOpt, name: 'app.sideBar.device.nodeOperationName', meta: { requireAuth: true, icon: 'el-icon-new-icon-jiedian'} },
			{ path: 'deviceCenter', component: DeviceCenter, name: 'app.sideBar.device.deviceCenterName', meta: { requireAuth: true, icon: 'el-icon-new-icon-ziyuanxhdpi'} },
		]
	},
	{
		path: '/userMng',
		component: Layout,
		redirect: 'noredirect',
		name: 'app.sideBar.user.moduleName',
		icon: 'el-icon-new-icon-nav-users',
		single: false,
		children: [
			{ path: 'userCenter', component: UserCenter, name: 'app.sideBar.user.userCenterName', meta: { requireAuth: true, icon: 'el-icon-new-icon-yonghuliebiao'} },
			{ path: 'personalCenter', component: Avatar, name: 'app.sideBar.user.avatar', meta: { requireAuth: true, icon: 'el-icon-user'} }
		]
	},
	{ path: '*', redirect: '/login', hidden: true }
]

export default new Router({
	mode: 'history',
	base: '/',	// 将要部署的服务器文件夹下的路径，服务器 www/html/test
	routes,
	strict: process.env.NODE_ENV !== 'production',
})


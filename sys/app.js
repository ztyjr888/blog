//引入app框架
var app_factory = require('../sys/core/index.js');

//创建app
var app = new app_factory();

/**
 * 选择静态、动态视图版本
 *
 */
var singlePage = require('./controller/singlePage.js');
function views_select(connect,callback){
	//cookie有相应字段
	if(connect.cookie('ui_version') == 'js'){
		singlePage.render(connect,app);
	}else{
		//无cookie标识，执行回调默认视图
		callback && callback();
	}
}

//首页
var index = require('./controller/index.js');
app.get('/', function(data,connect){
	views_select(connect,function(){
		index.deal(connect,app);
	});
});
//留言
app.get('/bless', function(data,connect){
	views_select(connect,function(){
		connect.write('define',307,{
			location:'/'
 		});
	});
});
//友情链接
var links = require('./controller/links.js');
app.get('/links', function(data,connect){
	links.render(connect,app);
});

//博客
var blog = require('./controller/blog.js');
app.get('/blog', function(data,connect){
	views_select(connect,function(){
		blog.list(connect,app);
	});
});
app.get('/blog/{id}', function(data,connect){
	views_select(connect,function(){
		blog.detail(connect,app,data.id);
	});
});


//实验室
var labs = require('./controller/labs.js');
app.get('/labs', function(data,connect){
	views_select(connect,function(){
		labs.list(connect,app);
	});
});
app.get('/labs/{name}', function(data,connect){
	labs.detail(connect,app,data.name);
});

//后台
var admin = require('./controller/admin.js');
app.get('/admin/*', function(data,connect){
	admin.render(connect,app);
});

//用户登录认证
var snsLogin = require('./controller/snsLogin.js');
app.get('/snsLogin/{from}', function(data,connect){
	if(data.from == 'github'){
		snsLogin.github(connect,app);
	}else{
		connect.write('json',{
			'code' : 500
		});
	}
});


//验证码
var verifycode = require('./controller/verifycode.js');
app.get('/verifycode', function(data,connect){
  verifycode.render(connect,app);
});

/**
 * ajax
 *
 */
var ajax_user = require('./ajax/user/index'),
    ajax_add_edit = require('./ajax/add&edit.js'),
    ajax_comments = require('./ajax/comments/index.js'),
    ajax_links = require('./ajax/links/index.js'),
    ajax_del = require('./ajax/del'),
    ajax_user_group = require('./ajax/user/user_group_add&edit'),
    ajax_power = require('./ajax/user/power'),
    ajax_demo = require('./ajax/demo/index'),
    ajax_tag =  require('./ajax/tag/index.js');

//通用增加&编辑
app.get('/ajax/add_edit', function(data,connect){
	ajax_add_edit.render(connect,app);
});

//博客
var ajax_blog = require('./ajax/article_get');
app.get('/ajax/blog', function(data,connect){
	ajax_blog.render(connect,app);
});
//实验室
var ajax_labs = require('./ajax/labs_get');
app.get('/ajax/labs', function(data,connect){
	ajax_labs.render(connect,app);
});

//友情链接
app.get('/ajax/links/list', function(data,connect){
	ajax_links.list(connect,app);
});
app.get('/ajax/links/detail/{id}', function(data,connect){
	ajax_links.detail(connect,app,data.id);
});
app.get('/ajax/links/add_edit', function(data,connect){
	ajax_links.add_edit(connect,app,data.id);
});
app.get('/ajax/links/post', function(data,connect){
	ajax_links.post(connect,app,data.id);
});

//清除缓存
var ajax_clear_cache = require('./ajax/clear_cache');
app.get('/ajax/clear_cache', function(data,connect){
	ajax_clear_cache.render(connect,app);
});

//图库
var ajax_asset = require('./ajax/asset/index');
app.get('/ajax/asset/*', function(data,connect){
	ajax_asset.render(connect,app);
});

//前端演示用的demo
app.get('/ajax/demo/*', function(data,connect){
	ajax_demo.render(connect,app);
});

//权限
app.get('/ajax/power', function(data,connect){
	connect.write('json',{
		'code' : 500
	})
//	ajax_power.render(connect,app);
});

//用户组
app.get('/ajax/user_group', function(data,connect){
	connect.write('json',{
		'code' : 500
	});
//	ajax_user_group.render(connect,app);
});

//公用删除接口
app.get('/ajax/del', function(data,connect){
	ajax_del.render(connect,app);
});

//评论
app.get('/ajax/comments/{mark}', function(data,connect){
	var mark = data.mark;
	//尝试使用ajax模块提供接口
	if(ajax_comments[mark]){
		ajax_comments[mark](connect,app);
	}else{
		connect.write('json',{
			'code' : 500
		});
	}
});

//标签模块
app.get('/ajax/tag/{act}', function(data,connect){
	var act = data.act;
	//尝试使用ajax模块提供接口
	if(ajax_tag[act]){
		ajax_tag[act](connect,app);
	}else{
		connect.write('json',{
			'code' : 500
		});
	}
});

//用户
app.get('/ajax/user/{act}', function(data,connect){
	var act = data.act;
	//尝试使用ajax模块提供接口
	if(ajax_user[act]){
		ajax_user[act](connect,app);
	}else{
		connect.write('json',{
			'code' : 500
		});
	}
});
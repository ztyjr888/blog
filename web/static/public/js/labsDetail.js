/*! bh-lay.com 2014-06-07 */
seajs.use(["/frontEnd/util/tie.js","/frontEnd/lib/highlight/highlight.pack.js"],function(){function a(a,b){$.ajax({url:"https://api.github.com/repos/"+a,dataType:"jsonp",success:function(a){var c=a.data;a&&a.meta&&200==a.meta.status?b&&b(null,c):b&&b(a.message||"受限")}})}function b(a,b){$.ajax({url:"https://api.github.com/users/"+a,dataType:"jsonp",success:function(a){var c=a.data;b&&b(null,c)}})}function c(){var a=$(window).height();$(".labs_detail_demo").height(a)}util.tie({dom:$(".labs_detail_bar_body"),scopeDom:$(".labs_detail_cnt"),fixed_top:30});var d=$(".labs_detail_download_link a");d.eq(0).addClass("active"),d.mouseover(function(){var a=$(this).index();$(".labs_detail_download_linkTxt ul:first").stop().animate({marginLeft:"-"+a+"00%"},200),d.removeClass("active"),d.eq(a).addClass("active")}),$(function(){L.nav(),L.nav.setCur("labs")});var e=$(".labs_detail_github").attr("data-repo"),f={};a(e,function(a,c){if(a){var d=$("#githubNoResult-temp").html();return void $(".labs_detail_github .labsDeGit_cnt").html(d)}var e=$("#github-temp").html();f.user_avatar=c.owner.avatar_url,f.user_login=c.owner.login,f.repos_name=c.name,f.repos_watchers_count=c.watchers_count,f.repos_forks_count=c.forks_count,f.repos_stargazers_count=c.stargazers_count,f.repos_watchers_count=c.watchers,b(f.user_login,function(a,b){f.user_repos_count=b.public_repos,f.user_followers_count=b.followers,f.user_following_count=b.following,f.user_name=b.name;var c=e.replace(/{(\w*)}/g,function(a,b){return"undefined"==typeof f[b]?"====":f[b]});$(".labs_detail_github .labsDeGit_cnt").html(c)})}),c(),$(window).resize(function(){c()}),hljs.initHighlighting()}),window.L=window.L||{},function(a){var b=function(){$(".nav_tool a").click(function(){$(".navLayer").hasClass("nav_slidedown")?$(".navLayer").removeClass("nav_slidedown"):$(".navLayer").addClass("nav_slidedown")}),$(".nav_mainList").on("click",function(){$(".navLayer").hasClass("nav_slidedown")&&$(".navLayer").removeClass("nav_slidedown")})},c=function(a){"/"==a&&(a="index"),$(".navLayer .nav li").removeClass("cur"),$(".navLayer .nav li[page="+a+"]").addClass("cur")};a.nav=b,a.nav.setCur=c}(L);
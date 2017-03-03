// JavaScript Document
//http://www.cnblogs.com/xiyangbaixue/p/4132901.html
//http://developer.51cto.com/art/201506/479127_3.htm
//https://segmentfault.com/a/1190000005029360
module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		//压缩JS文件grunt-contrib-uglify
		uglify:{
			options:{
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			build:{
				src:'js/zqj.js',
				dest:'build/js/<%= pkg.name %>.min.js'
				
			}
		},
		less:{
			dev:{
			/*	options:{
					paths:['less']
				},*/
				files:{
					'css/<%= pkg.name %>.css':'less/index.less'
				}
			},
			pro:{
				
			}
		},
		watch:{
			less:{
				files:['less/index.less'],
				tasks:['less:dev'],
				options:{
					livereload:true
				}
			}
		}
	});
	
	//加载包含 "uglify" 任务的插件。
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	//加载包含 "less" 任务的插件
	grunt.loadNpmTasks('grunt-contrib-less');
	
	//加载包含 "watch" 任务的插件
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default',['uglify','less:dev','watch']);
	//grunt.registerTask('lessDev',['less:dev']);
	
}


/*"options"中规定允许生成的压缩文件带banner，即在生成的压缩文件第一行加一句话说明。注意，其中使用到了pkg获取package.json的内容。

"build"中配置了源文件和目标文件。即规定了要压缩谁？压缩之后会生成谁？注意，我们这里将目标文件的文件名通过pkg的name和version来命名。*/
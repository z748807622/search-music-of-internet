var http = require('http');


//百度搜索，回调传入对象数组
exports.baidu = function(res,string,callback){
	var zjys = [];                                        //zjys储存zjy对象数组
	var zjy = {                                           //zjy储存一个歌曲信息
		title:null,
		singer:null,
		cover:null,
		src:null,
		lyric:null
	};
	//得到歌曲id
	http.get('http://musicmini.baidu.com/resources/plugins/suggest/temp.php?qword='+string,function(ress){
		var ddd = '';
		ress.on('data',function(data){
			ddd +=data;
		});
		ress.on('end',function(){
			var gg = JSON.parse(ddd.substring(1));
			if(gg){                                        //判断搜索的歌曲是否存在
				var over = 0;
				for(var i=0;i<gg.data.song.length;i++){
					getUrl(i,gg,function(hh,i){           //getUrl()通过歌曲id获取歌曲的地址
						over++;
						zjy.title = gg.data.song[i].songname;
						zjy.singer =gg.data.song[i].artistname+'--百度音乐';
						zjy.cover = hh.data.songList[0].songPicSmall;
						zjy.src = hh.data.songList[0].songLink;
						zjy.lyric = hh.data.songList[0].lrcLink;
						zjys.push(JSON.stringify(zjy));
						if(over==gg.data.song.length){     //判断歌曲信息全部收集完毕
							callback(zjys);
							console.log('--------------------end----------------------------')
						}
					})
				}
			}else {                                        //当查询的歌曲不存在时
				res.writeHead(404,{'Content-Type':'text/html;charset=UTF-8'});
				res.end('未找到该资源');
			}
		})
	})
	function getUrl(i,gg,cb){		                       //获取歌曲的url
		http.get('http://music.baidu.com/data/music/links?songIds='+gg.data.song[i].songid,function(resss){
				var eee = '';
				resss.on('data',function(data){
					eee+=data;
				});
				resss.on('end',function(data){
					var hh = JSON.parse(eee);
					cb(hh,i);
				})
		})
	}
}
//酷狗搜索
exports.kugou = function(res,string,callback){
	var zjys = [];
	var zjy = {
		title:null,
		singer:null,
		cover:null,
		src:null,
		lyric:null
	};               
	http.get('http://songsearch.kugou.com/song_search_v2?keyword=123'+string,function(ress){
		var ddd = '';
		ress.on('data',function(data){
			ddd +=data;
		});
		ress.on('end',function(){
			var gg = JSON.parse(ddd);
			if(gg){
				var over = 0;
				for(var i=0;i<gg.data.lists.length;i++){
					getUrl(i,gg,function(hh,i){
						over++;
						zjy.title = gg.data.lists[i].SongName;
						zjy.singer =gg.data.lists[i].SingerName+'--酷狗音乐';
						zjy.cover = hh.data.img;
						zjy.src = hh.data.play_url;
						zjy.lyric = '';
						zjys.push(JSON.stringify(zjy));
						if(over==gg.data.lists.length){
							callback(zjys);
							console.log('--------------------end----------------------------')
						}
					})
				}
			}else {
				res.writeHead(404,{'Content-Type':'text/html;charset=UTF-8'});
				res.end('未找到该资源');
			}
		})
	})
	function getUrl(i,gg,cb){		
		http.get('http://www.kugou.com/yy/index.php?r=play/getdata&hash='+gg.data.lists[i].FileHash,function(resss){
							var eee = '';
							resss.on('data',function(data){
								eee+=data;
							});
							resss.on('end',function(data){
								var hh = JSON.parse(eee);
								cb(hh,i);
							})
						})
	}
}


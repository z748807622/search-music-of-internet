/*blobfish.cn*/
var input = document.getElementById('input'),
    sub = document.getElementById('sub'),
    med = document.getElementById('method').getElementsByTagName('input'),
    display = document.getElementById('display');
var k = true;

var xhr = new XMLHttpRequest();
var zzzz = [
    {
        title : '欢迎',
        singer : 'welcome---',
        cover  : './pic/wel.jpg',
        src    : './music/zcl.mp3',
        lyric  : ""
    },
    {
        title : '欢迎',
        singer : 'welcome---',
        cover  : 'pic/wel.jpg',
        src    : './music/zcl.mp3',
        lyric  : ""
    }

];
var zzzzz = [];
var music = new SMusic({
                    musicList : zzzz,
                    autoPlay  : true,  //是否自动播放
                    defaultMode : 2,   //默认播放模式，随机
                    callback   : function (obj) {  //返回当前播放歌曲信息
                        //console.log(obj);
                        /*{title: "赤血长殷", singer: "王凯", cover: "http://data.smohan.net/upload/other/cxcy/cover.jpg", src: "http://data.smohan.net/upload/other/cxcy/music.mp3", index: 4}*/
                        document.getElementById('play').onclick = function(){
                            if(k){
                                music.pause();
                                k = false;
                            }else {
                                music.play()
                                k = true;
                            }
                        }
            }
});

//判断搜索源
function mmm(){
    var a='';
    for(var index in med){
        if(med[index].checked == true){
            a = med[index].name;
        }
    }
    return a;
}
//实现复选变单选
    for(var inn in med){
        med[inn].onclick = function(){
            for(var innn = 0;innn <med.length;innn++){
                med[innn].checked = false;
            }
            this.checked = true;
        }
    }
window.onload = function(){
    med[0].checked = true;
    for(var innn = 1;innn <med.length;innn++){
                med[innn].checked = false;
            }
}
//搜索按钮
sub.onclick = function(){
    this.disabled = true;
    this.value = '正在查找';
    this.backgroundColor = '#5681DC';
    //music.resetPlayer('love');
    sousuo(input.value,mmm());
}

//搜索音乐
function sousuo(zjy,method){
    //sub.disabled = true;
    if(input.value=='') {
        alert('请输入：');
        sub.value = '查询';
        sub.disabled = false;
        this.backgroundColor = '#2B76C4';
        return;
        }
    xhr.open("POST","/find");
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send('name='+zjy+'&method='+method);
    /*xhr.send({
        'name': zjy,
        'method': method.toString()
    });*/
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            //alert(1);
            sub.value = '查询';
            sub.disabled = false;
            this.backgroundColor = '#2B76C4';              
            zzzzz = xhr.responseText;
            zzzz = JSON.parse(zzzzz);
            for(var i = 0;i <zzzz.length;i++){
                zzzz[i] = JSON.parse(zzzz[i]);
            }
            //alert(typeof(zzzzz[0]));
            //alert(zzzz[0].title)
            //music.config.musicList = zzzz;
            music.musicList = zzzz;
            music.createListDom();
            music.resetPlayer(0);
            music.action();
            music.play();

        }else if(xhr.status==404) {
            sub.value = '查询';
            sub.disabled = false;
            this.backgroundColor = '#2B76C4';
            alert('未找到');
        }
    }   
}
    

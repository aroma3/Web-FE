
/* When this function is called, Cordova has been initialized and is ready to roll */
/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
 for more details -jm */
function onDeviceReady()
{
    
    
    //   window.location.href="http://music.baidu.com";
    //navigator.notification.alert("Cordova is working")
    getLocalFileSystem();
}
function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
   
    init();
  //  location.href = "http://pengjuxiang.fe.baidu.com/audio/Audio_volum.html" ;
}
function   log(str){
    if(window.console){
        console.log(str);
    }
}
var curPanel = '';
var hasInitBack = false
/**
 * add Back click handler
 * @return {[boolean]}  when backButton is exist return true ,or false;
 */
 function initBack() {
  //  var that = this;
    $('#backButton').bind('click', function() {
                          var temp = null;
                          temp = curDiv;
                          curDiv = oldDiv;
                          oldDiv = temp;
                          this.href="#nav";
                          $.ui.availableTransitions.slide(oldDiv, curDiv, true);
                          $.ui.setTitle('Test Demo');
                          $('#backButton').hide();
                          ctrl(curPanel,1);
                          curPanel = 'nav_list';
                          
                          //   $.ui.updateHeaderElement($('#header'));
                          });
    if ($('#backButton').length > 0) {
        return true;
    } else {
        return false;
    }
 };
/**
 * init nav-item click handler; when click slide page ; init back ;and modify title;
 * @return {[type]} [description]
 */
function init() {
    curDiv = $('#nav_list')[0];
    log('init: curDiv is : ' + typeof curDiv);
    
    oldDiv = null;
    
    $.ui.setTitle('Test Demo');
    initEvent();
    var playControl = new PlayControl({songInfo:songInfo,
                                      })
};
 function initEvent(){
    $('.nav-item').bind('click', initNavslibing());
     
 };
 function initNavslibing(){

    return function(e){
        var target = e.currentTarget,
        newId = target.id.replace('nav_', '');
        
        oldDiv = curDiv;
        
        curDiv = $('#'+newId)[0];
        
        
        
        $.ui.availableTransitions.slide(oldDiv, curDiv, false);
        $.ui.setTitle('Test Demo');
        $('#backButton').attr('href','#nav_list');
        $('#backButton').show();
        //  $('#header').show();
        if (!hasInitBack) {
            hasInitBack = initBack();
        }
        curPanel = newId;
        ctrl(newId);
    }
}
/* main control */
 
function ctrl(str,isCheckout){
   /*
    str = str.replace(/_(\w)/g,function(){
                      return arguments[1].toUpperCase()
                      });
    */
    log('ctrl: current method is '+ str);
    
    ctrlMap[str](isCheckout);
}
var ctrlMap = {}; 
 /**   */
/////////////////////////////////////////////////////////////////////////////////////
/**  init media play song **/

     var currSong=(function(){
              var playItem={	      
              currentSongId:"0" 
              };
              return {
              setCurrentSongId:function(id){
              playItem.currentSongId=id;
              return id;
              },
              getCurrentSongId:function(){
              return playItem.currentSongId;
              }
              };
              })();  
    playControl = new PlayControl({	
                            //  progressBar:this._progressBar,
                              currSong:currSong,
                              songInfo:songInfo
                              });
function mediaPlay(isCheckout){
    if(isCheckout){
        playControl.stop();
        return;
    }
    playControl.play(audioSrc);
   
}
ctrlMap['media_play'] = mediaPlay; 
//////////////////////////////////////////////////////////////////////
var isBusy = false;
//var musicStatus = isBusy;
//file for media do no't need file:// ; but for transfer must with file://
var songList = ['http://pengjuxiang.fe.baidu.com/music/%e8%b1%86%e6%b5%86%e6%b2%b9%e6%9d%a1.mp3',
                '/var/mobile/Applications/C818BFD4-59AD-44A9-B258-2647ECD41438/Documents/曙光.mp3',
                '/var/mobile/Applications/C818BFD4-59AD-44A9-B258-2647ECD41438/TestDemo.app/www/music/wen.mp3',
                'http://pengjuxiang.fe.baidu.com/music/%e6%9d%80%e6%89%8b.mp3'];
//songInfo[0].stLink
var audioSrc =  songInfo[0].stLink ;
function audioPlay(isCheckout){
    log('audioPlay: get in the audio');
    var audio = document.getElementById('audio');

    if(isCheckout){
        audio.pause();
        return ;
    }
    log(audioSrc);
    audio.src = audioSrc;
    audio.play();
    audio.onended = onEnded;
    log('audio play: audio src is '+ audio.src);
}

var curIndex = 0;
function onEnded(){
    var audio = document.getElementById('audio');
        if(curIndex < songInfo.length-1){
            audio.src =  songInfo[curIndex = curIndex+1].stLink ;
            //  audio.play();
        }else
        {
            audio.src =  audioSrc ;
            //     audio.play();
            curIndex = 0;
        }
    }
    
ctrlMap['audio_play'] = audioPlay;
//////////////////////////////////////////////////////////////////////




function volumeControlMedia(isCheckout){
    // do your thing!
    var volumeSlider = window.plugins.volumeSlider;
    if(isCheckout){
        volumeSlider.hideVolumeSlider();
        return ;
    }
    
    volumeSlider.createVolumeSlider(10,50,300,30); // origin x, origin y, width, height
    volumeSlider.showVolumeSlider();
}
ctrlMap['volume_control_media'] = volumeControlMedia ;

//////////////////////////////////////////////////////////////////////////////////////////

var link = "http://pengjuxiang.fe.baidu.com/music/%e4%b8%80%e4%b8%aa%e5%8f%88%e4%b8%80%e4%b8%aa.mp3";
function G(id){
    return document.getElementById(id);
}

function volumeControlAudio(isCheckout){
    var media = document.getElementById('media');
    if(isCheckout){
        media.pause();
        return;
    }
    media.src=link;
    media.volume = 0;
    media.play();
    // media.muted=true;
    initVolumeEvent();
    G('volume_label').innerHTML = "volume: "+ media.volume;
}

function initVolumeEvent(){
    
    G('volum_slider').addEventListener('change',function(){
                                       var slider = G('volum_slider');
                                       log('initEvent: change is fire. value: ' + slider.value) ;
                                       
                                       media.volume = slider.value/100 ;
                                       
                                       G('volume_label').innerHTML = "slider value:" + slider.value +"<br/>volume: "+ media.volume;
                                       
                                       log('initEvent: change is fire. value: ' + media.volume) ;
                                       }) ;
    G('volum_slider').value=0;
    
}

ctrlMap['volume_control_audio'] = volumeControlAudio;


//////////////////////////////////////////////////////////////////////////////////////////

function getItuneFile(){
    log('getItuneFile: login in the method!');
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                             log('FileStystem .root ' + fileSystem.root.name);
                             log('FileSystem . name ' + fileSystem.name);
                             
                             fileSystem.root.getDirectory('/',{create:false,exclusive: false},function(fileEntry){
                                                          log('getItuneFile: entry read start');
                                                          log('/fileEntry fullpath: ' + fileEntry.fullPath);
                                                          var count = 0;
                                                          function getRoot(dir){
                                                          if(dir.name == 'var'){
                                                          return ;
                                                          }
                                                          if(count == 10){
                                                          return ;
                                                          }
                                                          log('getRoot: the current is '+ count + 'is directory' + dir.isDirectory);
                                                          
                                                          log('getRoot: the fulpath is '+ dir.fullPath);
                                                          if('getParent' in dir){
                                                          
                                                          if(dir.name){
                                                          log('getRoot: the current is '+ count + '; name is ' + dir.name );
                                                          }
                                                          if(dir.root&& dir.root.name){
                                                          log('getRoot: the current is '+ count + '; root name ' + dir.root.name);
                                                          }
                                                        
                                                          count++;
                                                          dir.getParent(arguments.callee, fail);
                                                          
                                                          }
                                                          }
                                                          getRoot(fileEntry);
                                                        
                                                          
                                                          })
                             }, fail); 
}
function fail(error) {
    navigator.notification.alert('error: error code is ' + error.code);
    log('error: error code is ' + error.code);
}
ctrlMap['play_ipod_file']= getItuneFile;

////////////////////////////////////////////////////////////////////////////////////////

function substitute (str, obj) {
    if (!(Object.prototype.toString.call(str) === '[object String]')) {
        return '';
    }
    
    // {}, new Object(), new Class()
    // Object.prototype.toString.call(node=document.getElementById("xx")) : ie678 == '[object Object]', other =='[object HTMLElement]'
    // 'isPrototypeOf' in node : ie678 === false , other === true
    if(!(Object.prototype.toString.call(obj) === '[object Object]' && 'isPrototypeOf' in obj)) {
        return str;
    }
    
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace
    return str.replace(/\{([^{}]+)\}/g, function(match, key) {
                       var value = obj[key];
                       return ( value !== undefined) ? ''+value :'';
                       });
}
function trim(str){
  return  str.replace(/^\s+|\s+$/g,'');
}



//////////////////////////////////////////////////////////////////////

var downloadedList = "downloaded-list" ;
var localFileListName = "locale_song_list.txt";
var localFileList = [];
var downloadFileList = [];
var isDownloading = false;
function encodeArray(array){
    var i=0, len=array?array.length: 0, str='';
    for(; i < len; i++){
        if(array[i]){
            str += array[i].songUrl + '&' + array[i].songName;
        }
        str += '&&';
    }
    log('encodeArray: the songName songUrl is ' + str);
    return str;   
}
function decodeArray(str){
    var arr = [], i=0, len=0,temp=[] ;
    if( trim(str) == '')
        return arr;
 
    arr = str.split('&&');
  
    for(len = arr.length; i< len; i++){
    
        if(arr[i] && trim(arr[i]) != '')
        { 
          
             temp = arr[i].split('&') ;
            arr[i] = {songUrl: temp[0], songName: temp[1]} ;
           
        }else{
            
            arr.splice(i,1) ;
            len = arr.length;
            
        }
    }
   
    return arr;
}
function delArrayItem(songName,isFind){
    var findout = false;
    for(var i=0,len=localFileList.length; i < len; i++){
        if(localFileList[i].songName === songName){
            if(isFind){
                return true;
            }else{
            localFileList.splice(i, 1);
            break;
            }
        }
    }
}
function downloadFile() {
    log('downloadFile: ' + isDownloading);
    if(isDownloading){
        return ;
    }
   // log('downloadFile: get in and start!');
    var remoteFile = '', index = 0;
    if(downloadFileList.length > 0) {
       index = downloadFileList.splice(0,1)[0];
       remoteFile = songInfo[index].stLink ;
    }else{
       return ;
    }
    var localFileName = decodeURIComponent( remoteFile.substring(remoteFile.lastIndexOf('/')+1) );
    
    if( delArrayItem(localFileName,true) ){
        return ;
    }
    
    var fileSystem = getLocalFileSystem(), callee = arguments.callee;
   
    log('downloadFile: current remoteFile is ' + remoteFile);
   
    
    $('#download_status').show();
    isDownloading = true;
    
    fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
                            var localPath = fileEntry.fullPath;
                            if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                            localPath = localPath.substring(7);
                            }
                            var ft = new FileTransfer();
                           
                            ft.download(remoteFile,
                                        localPath, function(entry) {
                                        log('downloadFile: suucess!  localFileName: ' + localFileName + '   localPath:' + localPath);
                                       
                                        localFileList.push({'songName':localFileName, 'songUrl':localPath});
                                        getLocalFileListEntry({writer:true,reader:false});
                                        isDownloading = false ;
                                        $('#download_status').hide();
                                        setTimeout(callee,1000);
                                      
                                        }, function(){ isDownloading = false; return fail(); });
                            
                            }, fail);
                             
                
}
/**
 * events in the page
 *
 */
function playLocalSong(event){
    log('playLocalSong: log in !');
    var audio = G('download_audio');
    
    audio.pause();
    var src = this.href; 
    log('playLocalSong: song link' + src);
    audio.src = src;
    audio.play();
    return false;
}
function delLocalSong(event){
    log('delLocalSong: log in !');
    var link = this.href, fileName = link.substr( link.lastIndexOf('/') + 1 );
    log('delLocalSong: ' + fileName);
    fileName = decodeURIComponent(fileName);
    
    fileSystem.root.getFile(fileName,{create:false,exclusive:false}, function(fileEntry){
                            log('delLocalSong:  getFile success !' );
                            fileEntry.remove();
                            log('delLocalSong: del file success !' ) ;
                            delArrayItem( fileName ) ;
                            getLocalFileListEntry({writer:true,reader:false});
                            /*
                            fileEntry.file(function(file){
                                           file.remove();
                                           delArrayItem( fileName ) ;
                                           },
                                           fail);
                             */
                            },fail);
    return false;
}
function addDownLoadFile(event){
      var str = this.id.replace('link_','') ;
     // delArrayItem()
      downloadFileList.push(str) ;
       log('addDownLoadFile: ' + this.id);
      downloadFile();
    if(event && event.preventDefault){
        event.preventDefault();
    }

  //  event.returnValue = false;
    return false;
}
/////////////////event is end////////////////
function getLocalFileSystem(){
    log('getLocalFileSystem: get in localFileSytem' );
    if(typeof window.fileSystem === 'undefined'){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                             window.fileSystem = fileSystem;
                              log('getLocalFileSystem: success' );
                             }, fail);
    }
    else{
        return window.fileSystem;
    }
}


function readAsText(file){
    var reader = new FileReader();
    reader.onloadend = function(evt){
        log('readAsText: The text is ' + evt.target.result);
        localFileList = decodeArray(evt.target.result);
        log('readAsTest: 1 ' + typeof viewLocalFileList);
        viewLocalFileList( localFileList );
        //        log('readAsTest: 2 ');
        initDownloadEvent();
          //      log('readAsTest: 3 ');
    }
    reader.readAsText(file);
}
function writeAsText(writer){
    log('writeAsText: log in!') ;
//  writer.truncate(0);
//     log('writeAsText: log in 1!') ;
  //  writer.seek(0);
  //   log('writeAsText: log in 2!  ' + encodeArray(localFileList)) ;
    writer.write( encodeArray(localFileList) );
//     log('writeAsText: log in 3!') ;
    writer.onwrite= function(){
        log('writeAsText: success ') ;
    }
    writer.onwriteend = function(){
        viewLocalFileList( localFileList );
        
        initDownloadEvent();
    }
    
}
function getLocalFileListEntry(option){
    log('getLocalFileListEntry: is login  ');
    var result =[];
    var fileSystem = getLocalFileSystem();
   // log('getLocalFileListEntry: get fileSystem ' + typeof fileSystem);
  //  log('getLocalFileListEntry: ' + localFileListName);
    fileSystem.root.getFile(localFileListName, {create: true, exclusive: false}, function(fileEntry) {
                           // var localPath = fileEntry.fullPath;
                           
                            if(option.reader){
                            log('getLocalFileListEntry: in option reader.');
                            fileEntry.file(readAsText,fail);
                            }else if(option.writer){
                             log('getLocalFileListEntry: in option writer.');
                            fileEntry.createWriter(writeAsText,fail);
                            }
                            
                            }, fail);                          
    
   
}
function viewLocalFileList(fileList){
    var tpl = ' <li> <span class="song-name">{songName}</span> <a class="play-song icon" href="{songUrl}">Play</a> | <a class="del-song icon" href="{songUrl}">Delete</a></li>',
    //   fileList = getLocalFile(),
    i = 0,
    len = fileList ? fileList.length:0,
    str='';
  //  log('viewLocalFileList: fileList len is '+ len);
    for(; i<len && len>0; i++){
        str += substitute(tpl,fileList[i]);
    }
    log('viewLocalFileList : html is ' + str);
    $('#' + downloadedList).html( str );
    
}
function initDownloadEvent(){
    $('.download-song').unbind('click');
    $('.play-song').unbind('click');
    $('.del-song').unbind('click');
    
    $('.download-song').bind('click',addDownLoadFile);
    $('.play-song').bind('click',playLocalSong);
    $('.del-song').bind('click',delLocalSong);
}
function getInitDownload(isCheckout){
    var audio = G('download_audio');
    if(isCheckout){
        audio.stop();
    }else{
        getLocalFileListEntry({reader:true,writer:false});
        
    }
}
ctrlMap['music_download'] = getInitDownload;
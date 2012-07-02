/**
* @file Image.js
* @description 播放控制，包括播放的暂停、播放、上一首、下一首
*/

	 var PlayControl = function(){
	        var fn=function(conf){
	       
			    this.audioPlay =new AudioPlay();
				this.currSong=conf.currSong;
				this.songInfo = conf.songInfo;
				this.progressBar = conf.progressBar;
                if(this.progressBar){
				this.audioPlay.setProgressView(this.progressBar);
                }
			};
			fn.prototype={
			    trigger:function(src,target){
			   
				    if($(src).hasClass(target))
					 { $(src).removeClass(target); return 0; }
					 else{
						$(src).addClass(target); return 1;
					 }
				},
				changeStatus:function(isPlay){
				    //如果切换到播放状态，则去掉播放按钮，否则显示播放按钮
				     if(isPlay){
						  $("#play_icon").removeClass("playbar");
					 }else
					 {
						  $("#play_icon").addClass("playbar");
					 }
				},
				rePlay:function(){
                    log('replay: get rePlay');
					 var me=this;
					 //如果有playbar，表示现在是暂停状态，否则是播放状态
					 //先切换播放按钮，再暂停或播放歌曲
				   var isPlay= me.trigger("#play_icons a.pausebar","playbar");
					 if(isPlay && me.audioPlay.isCreate())
					 {
						 me.audioPlay.pause();
						
						 
					 }else
					 { 
                        if( !me.audioPlay.reStart() )
                         
						    me.play();						                             
                        

					 }
					 return false;
				},
				play:function(linkStr){
                    log("play.control play: login play method");
                    if(!linkStr){
                        linkStr = this.songInfo[0].stLink;
                    }
                //    log('songInfo.length' + this.songInfo.length + '   the first link: ' + linkStr);
				    this.audioPlay.play(linkStr);
                    this.changeStatus(1);
				},
				stop:function(){
				    this.audioPlay.stop();
				},				
				skipItem:function(direction){
				
				     var me=this;
                   //  me.pause();
				     var curId = me.currSong.getCurrentSongId(),linkStr="",id=0,length=me.songInfo.length;
					 if(direction>0){
						id=curId+1;
					 }else{
						id=curId-1;
					  }
					 if(id>=0&&id<length){
						 linkstr=me.songInfo[parseInt(id)].stLink;
					 }else{		
						 linkstr=me.songInfo[0].stLink;
						 id=0;
					 }
					 me.currSong.setCurrentSongId(parseInt(id));
					 me.audioPlay.play(linkstr);
                    log('skipItem: the curent linkstr is ' + linkstr);
					
					 me.changeStatus(1);
				}
				
			}
			return fn;
	 }()
	 
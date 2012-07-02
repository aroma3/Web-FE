/**
* @file view.js
* @description 创建歌曲列表，加载列表数据，添加列表tap事件监听
*/

var View = function(container,songInfo,currSong){
  
	      var listHtml = '<li id="{index}"><a href="#mbox">'+
	    '<div class="album_i" onclick="return ;"><img src="albumpicture/{albumimg}"/><'+'/div>'+
		'<div class="info_s" onclick="return ;"><span class="song"> {songname} <'+'/span><span class="album"> {album} <'+'/span><'+'/div>'+
		'<div class="singer" onclick="return ;"><span>{singer}<'+'/span><'+'/div>'+
		'<'+'/a><'+'/li>' ;
		  this._songInfo =songInfo||{}; 
		  this._currSong=currSong;
		  this._container = container||'songlist';
		  this._progressBar= new ProcessBar({
		      id:"music-process",
		      container:'process-bar'
		      
		  });
		
     
	      this.playControl = new PlayControl({	
                 progressBar:this._progressBar,
	             currSong:currSong,
	             songInfo:this._songInfo
	      });
		  this._getListHtml=function(){
		      return listHtml;
		  }		 
  };
 View.prototype={
     init:function(){
          
          this.loadSonglist();
          
          this.initEvent();
           this._progressBar.init();
     },
     loadSonglist:function(){
              var str=[],i,obj;
		      for(var key in this._songInfo){
		          
			       obj={
				           stlink:this._songInfo[key].stLink,
				           albumimg:this._songInfo[key].albumImg,
						   songname:this._songInfo[key].songname,
						   album:this._songInfo[key].album,
						   singer:this._songInfo[key].singer,
						   index:key
						   
					}
			        str+=substitute(this._getListHtml(),obj);
		      }
		      $("#"+this._container)[0].innerHTML=str;
     },
     initEvent:function(){
        //监听列表行元素 click事件
          var container=this._container,songInfo=this._songInfo,
          playControl=this.playControl,currSong=this._currSong;
          $("#"+this._container+" a").each(function(){
		         $(this).bind('tap',function(e){
		             log('List initEvent: tab is start click! ');
		             var $el=$(e.target).parentsUntil('#'+container),$el=$el?$el[$el.length-1]:{};
					 if(!$el)
					    return ;
					 var id=parseInt($el.id),linkstr=songInfo[id].stLink;
					 currSong.setCurrentSongId(id);
					 
		             try{	
                          volumeSlider.showVolumeSlider();
						  playControl.play(linkstr);		
						  playControl.changeStatus(1);
		             }catch(e){				
					 }
		      
		       }) ;
		   });
		   
		   $("#m_tb_back").each(function(i){
		        $(this).bind('tap',function(e){	 
                    volumeSlider.hideVolumeSlider();                             
		            playControl.stop();
		            playControl.changeStatus(0);
		             return;
		       })
		   });
	  
     }
     
 }

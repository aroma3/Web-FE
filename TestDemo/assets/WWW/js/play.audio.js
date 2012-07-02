/**
* @file play.audio.js
* @description 播放功能实现
*/
var AudioPlay= function(window){
var count=1;
 var AudioPlay=function(){
	        this.my_media = null;
      };
      AudioPlay.prototype={        
        play:function(src){    
            log('in AudioPlay play start');
     		     var me = this;
     		   
	            if(me.isCreate())
			    { 
			
			    	me.my_media.stop();
			    	me.my_media.src=src ; 
			    }else{	
            log('AudioPlay.play: new media');
			        me.my_media=new Media(src ,me.onSuccess, me.onError,me.onStatus);
			    }				
			    log('AudioPlay.play: start play');
	
		      	me.my_media.play(); 
                me.updateProgress(true);				
          },
          setProgressView:function(progressView){
             this.postViewId=progressView.id+"_post";
             this.duraViewId=progressView.id+"_dura";
             this.progressView=progressView;
          },
          pause:function(){
	         if(this.isCreate())
	         {
	          console.log(' pause2');
	            this.my_media.pause();
	         }
         },
         reStart:function(){
             log('restart: GET IN RESTART');
	     	 if(this.isCreate())
	         {
	         console.log('  reStart2');
	            this.my_media.play();
	         }else{
                 return false;
             }
         },
         stop:function(){
           if (this.isCreate()) {
                console.log("stopAudio():Audio Stop Success");
                this.my_media.stop();
            }
      		me.updateProgress(false);				
          },
          getMin:function(n){
              if(isNaN(n)||n<0)
              		return '';
		      var m=Math.floor(n%60),min=Math.floor(n/60);
              return ( min>9?min:('0'+min) )+':'+( m>9?m:('0'+m) );
          },
          updateProgress:function(isOn){
		     var me=this;
		    if(!isOn && this.intervalId)
		    {
		        clearInterval(this.intervalId);
		    }
		    else
		     this.intervalId = setInterval(function(){
			     var duration=me.my_media.getDuration();
			/*   
                  me.my_media.getCurrentPosition(function(position){
				         if(duration<0) return;
						$('#'+me.postViewId)[0].innerHTML=me.getMin(position);
						$('#'+me.duraViewId)[0].innerHTML=me.getMin(duration);
						me.progressView.setValue(Math.floor((position*100)/duration));
				  },me.onError);
		    
		            */
		     },1000);				     
		  },
          isCreate:function(){
               return this.my_media;
          },
          onSuccess:function(msg){              
               log("playAudio():Audio Success");
          },
          onError:function(error){
              log('code: '    + error.code + '------' +'message: ' + error.message);
       	  },
       	  onStatus:function(msg){
       	      log('AudioPlay.status:'+msg);
       	  }
       	  
       
      }
      
      return AudioPlay;
}(window)
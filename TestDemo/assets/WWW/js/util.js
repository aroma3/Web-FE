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
/*
var ProcessBar = function(conf){
    this.id=conf.id||'processBar';    
    this._container = conf.container;
    this.barid=this.id+'-bar';
	this.bodyHtml=substitute(this.tplBody,{processid:this.id,barid:this.id+"-bar"});
	
}
ProcessBar.prototype={
    tplBody:'<div id="{processid}"><div id="{barid}"><a href="javascript:void(0)" class="process" draggable="true"></a></div></div>',
    id:this.id,
	barid:'',    
    render:function(){         	
		$('#'+this._container)[0].innerHTML=this.bodyHtml;
        this.initEvent();
    },
	setValue:function(value){
	    value = isNaN(value)?0:value;
		value=(value<0?0:value)<=10?value:10;
	    $('#'+this.barid).css("width",value/10);
		this.render();
	},
	initEvent:function(){
	    $('#'+this.barid+' a')[0].ondragstart=function(ev){
		   var dt=ev.dataTransfer;
		   dt.dropEffect='move';
		   dt.effectAllowed='all';
		   
		}
		$('#'+this.barid+' a')[0].ondragend=function(ev){
		   var dt=ev.dataTransfer;
		}
	}
   
}
*/

var ProcessBar = function(window){
var count=1;
 var _ProcessBar=function(conf){
    this.id=conf.id||'processBar';    
    this._container = conf.container;
   
	this.bodyHtml=substitute(this.tplBody,{processid:this.id});
	
    };
    
_ProcessBar.prototype={
    tplBody:'<span id="{processid}_post" >00:00</span><input type="range" name="{processid}_name" id="{processid}" class="{processid}-range" draggable="true" min=1 max=100 value="1"/><span id="{processid}_dura" >00:00</span>',
    id:this.id,	
	pcolor:'#798EA9',
	dcolor:'white',
    render:function(){         	
		$('#'+this._container)[0].innerHTML=this.bodyHtml; 
		this.bar = $('#'+this.id);
    },
	init:function(){
	    this.render();
		this.initEvent();
	},
	setValue:function(value){
	    value = isNaN(value)?0:value;
		value=(value<0?0:value)<=100?value:100;
	    this.bar[0].value=value;
	   if(window.console)
	    { console.log('event:setvalue is called'); } 
	    this.updateView();	    
		
	},
	updateView:function(){
	        var bar = $('#'+this.id);	
   //        bar.css('background-image','url("./images/bg-bar.png") repeat-x');
    //       bar.css('-webkit-background-size','20%');
			//bar.css('background','-webkit-linear-gradient(left,'+this.pcolor+' '+bar[0].value+'%,'+this.dcolor+' '+bar[0].value+'%)');
			 if(window.console)
		       { console.log('event: the range bar value is '+bar[0].value); } 
		       
			bar.css('background-size',bar[0].value+'%');
			bar.css('font-size',bar[0].value+'px');
			// bar.css('-webkit-background-size','20%');
			//background:-webkit-gradient(linear, 0 0, 0 100%, from(#white), to(#black));
			
	},
	initEvent:function(){
	    var me = this;
		$('#'+me.id).bind('touchmove',function(ev){
		      
		       if(window.console)
		       { console.log('event: touch move of range bar is fire'); } 
		       me.updateView();
		   });
		$('#'+me.id).bind('change',function(ev){		     
		       if(window.console)
		       { console.log('event:change of range bar is fire'); } 
		       me.updateView();
		   });
		  
	}
   
  }
 return _ProcessBar;
}(window)
 
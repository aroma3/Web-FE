
var restorToSD=function(data,func){
				  //      alert("restorToSD");
					//        alert(data);
						
					//		alert(data);
				//	alert(1);
				console.log("in restorto sd----");
	
			
				 var onFileSystemSuccess = function(fileSystem){
						 var gotFileEntry = function(fileEntry) { 
						    console.log("got in file entry.......");
								
								function writeFile(writer) {
								    window.console.log("writefile.......");
								    writer.write(data);
								    var str = fileEntry.fullPath;
								    alert(str);
								    func(str);
								    
								};
								
							    window.console.log(fileEntry.fullPath);
								fileEntry.createWriter(writeFile, fsFail);
														  
						};
					//  alert("file system got success");
				      fileSystem.root.getFile("wen.mp3", {create: true}, gotFileEntry, fsFail);
				 }
				//resolve file system for image 
				//(image is currently stored in dir off of persistent file system but that may change) 
		//	alert(window.resolveLocalFileSystemURI);
			   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fsFail);
			//	window.resolveLocalFileSystemURI(imageURI, gotFileEntry, fsFail);       

    
};


var fsFail = function(error){
   alert(error.code);
   console.log("--------failed because:-------"+error.code);
};

var copiedFile = function(fileEntry){
   console.log("got in copiedFile :"+fileEntry.fullPath);
};


 /*
    
    function getData(url,callback){
		var request=new XMLHttpRequest();
		request.onreadystatechange=function(){
			if (request.readyState==4 && request.status==200){
			  
				callback(request.responseText);	
			}
		}
		request.open("GET",url);
		request.overrideMimeType('application/octet-stream; charset=x-user-defined');
		request.send(null);
   }
*/
 function getData(fileURL,callback){
  
	    var req = new XMLHttpRequest();
	    req.open('GET', fileURL, true);
	     
	   
	   req.onreadystatechange = function(aEvt) {
	 
	        if (req.readyState == 4) {
	        
	            if(req.status == 200){
	          
	                var fileContents = req.responseText;
	                var text="";
	                fileSize = fileContents.length;
	             //   alert(fileSize);
	           		 readByteAt = function(i){	                 
	                    return fileContents.charCodeAt(i) & 0xff;
	                }
	            //    for(var i=0;i<fileSize;i++){
	            //         text += readByteAt(i);
	            //    }
	             
	                if (typeof callback == "function"){ callback(fileContents);}
	            }
	            else
				{
	                throwException(_exception.FileLoadFailed);
					}
	        }
	    };
	    //XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com] 
	  //  this.req.overrideMimeType('application/octet-stream; charset=x-user-defined');
	    req.send(null);
    }
 function play(data){
            
            restorToSD(data,playAudio);
            
   }
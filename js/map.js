

function Map(obj){
	this.domObj=null;
	this.width=obj.width;
	this.height=obj.height;
	this.bgImg=obj.bgImg;
	this.gradeBox=obj.gradeBox;
	this.myPlanes=[];
	this.enemyPlanes=[];
	this.myScore=0;
	this.createUI();
	this.bgroll();
	
}
// let bgShow=$("#bgArea");
// console.info(bgShow);
Map.prototype.createUI=function(){
	this.domObj=document.createElement('div');
	this.domObj.style.cssText="position:absolute;overflow:hidden;background-size:100%";
	this.domObj.style.width=this.width+"px";
	this.domObj.style.height=this.height+"px";
	this.domObj.style.backgroundImage="url("+this.bgImg+")";
	$("#bgArea").appendChild(this.domObj);
	this.gradeBox=document.createElement('div');
	this.gradeBox.style.cssText="position:absolute;left:0;top:0;z-Index:3;color:white;text-align:center;line-height:16px;";
	this.gradeBox.style.width="50px";
	this.gradeBox.style.height="16px";
	this.gradeBox.style.backgroundColor="gray";
	this.gradeBox.innerHTML = this.myScore;
	this.domObj.appendChild(this.gradeBox);
}

   let step=0;
Map.prototype.bgroll=function(){
		setInterval(()=>{
		 	step++;
		 	if(step>=354){
		 		step=0;
		 	}
		 	this.domObj.style.backgroundPositionY=step+'px';
		},16)
	}
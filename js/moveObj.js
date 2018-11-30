//移动的物体
function MoverObj(obj){
	if(arguments.length>0){
		let defaultObj={
			map:null,
			width:0,
			height:0,
			left:0,
			top:0,
			bgImg:'',
			directionLeft:0,
			directionTop:0,
			incLeft:0,
			incTop:0,
			timeSpace:100
		};
	    //把传来的值赋值给defaultObj
	    for(let key in obj){
	    	defaultObj[key]=obj[key];
	    }
	    for(let key in defaultObj){
	    	this[key]=defaultObj[key];
	    }
	    this.domObj=null;
	    this.myTimer=null;
	    this.createUI();
		}
}
MoverObj.prototype.createUI = function(){
	this.domObj  = document.createElement("div");
	this.domObj.style.cssText = "position:absolute";
	this.domObj.style.width = this.width+"px";
	this.domObj.style.height = this.height+"px";
	this.domObj.style.left = this.left+"px";
	this.domObj.style.top = this.top+"px";
	this.domObj.style.backgroundImage = "url("+this.bgImg+")";
	this.domObj.setAttribute("ord",this.ord);
	this.map.domObj.appendChild(this.domObj);
}
MoverObj.prototype.go = function(){
	this.myTimer = setInterval(()=>{
		this.left = this.left+this.directionLeft*this.incLeft;
		this.top = this.top+this.directionTop*this.incTop;
		this.judgeEdge&&this.judgeEdge();

		this.domObj.style.left=this.left+"px";
		this.domObj.style.top=this.top+"px";
	},this.timeSpace);
}
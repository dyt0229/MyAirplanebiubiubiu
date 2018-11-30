

function MyPlane(obj){
	//建立继承关系
	MoverObj.apply(this,arguments);//继承父类的所有的属性
	this.bullets = [];
	this.allScore=0;
	this.dieImgs=obj.dieImgs;
	this.hpBox=null;
	this.hpCont=null;
	this.hp=10;
	this.peg=null;
	this.pegImg=obj.pegImg;
	this.pegWidth=obj.pegWidth;
	this.pegHeight=obj.pegHeight;
	this.createUI1();
}

MyPlane.prototype = new MoverObj();

MyPlane.prototype.createUI1=function(){
	this.hpBox=document.createElement("div");
	this.hpBox.style.cssText="position:absolute;height:5px;border:1px solid blue;";
	this.hpBox.style.width=this.width+"px";
	this.hpBox.style.left=this.left+"px";
	this.hpBox.style.top=this.top-5+"px";
	this.map.domObj.appendChild(this.hpBox);
	this.hpCont=document.createElement("div");
	this.hpCont.style.cssText ="position:absolute;height:5px;background:#48f114;";
	this.hpCont.style.width=(this.width/10)*this.hp+"px";
	this.hpBox.appendChild(this.hpCont);
	this.peg=document.createElement("div");
	this.peg.style.cssText="position:absolute;z-Index:5";
	this.peg.style.width=this.pegWidth+"px";
	this.peg.style.height=this.pegHeight+"px";
	this.peg.style.left=this.left+this.width+10+"px";
	this.peg.style.top=this.top+10+"px";
	this.peg.style.backgroundImage="url("+this.pegImg+")";
	this.map.domObj.appendChild(this.peg);
}
MyPlane.prototype.addEvent = function(){
	this.map.domObj.onmousemove = (event)=>{
		
		let evt = event || window.event;
		//地图距离box左上角的距离
		let offsetLeft = this.map.domObj.offsetLeft;
		let offsetTop = this.map.domObj.offsetTop;
		//box距离浏览器窗口左上角的距离
		let boxoffsetLeft = $("#box").offsetLeft;
		let boxoffsetTop=$("#box").offsetTop;
		
		this.left = evt.pageX- offsetLeft -boxoffsetLeft- this.width/2-17; 
		this.top = evt.pageY - offsetTop -boxoffsetTop-this.height/2-60; 
		
		if(this.left<=0){
			this.left=0;
		}else if(this.left>=this.map.width-this.width){
			this.left=this.map.width-this.width;
		}
		
		if(this.top<=0){
			this.top=0;
		}else if(this.top>=this.map.height-this.height){
			this.top=this.map.height-this.height;
		}
		
		this.domObj.style.left = this.left+"px";
		this.domObj.style.top = this.top+"px";

	
		this.hpBox.style.left=this.left+"px";
		this.hpBox.style.top=this.top-5+"px";


		let pegLeft=this.left+this.width+10;
		let pegTop=this.top+10;
		this.peg.style.left=pegLeft+"px";
		this.peg.style.top=pegTop+"px";
		if(pegLeft>=this.map.width-this.width){
			this.peg.style.left=pegLeft-this.width*2-10*2+"px";
			this.peg.style.top=pegTop+"px";
		}
		if(pegTop<=0){
			this.peg.style.top=pegTop+this.height*2+"px";
		}
		//边动边判断有没有被敌机击中
		this.isHit();
	}
}

//发射子弹
MyPlane.prototype.shoot = function(){
	let ord = 0;
	this.myTimer=setInterval(()=>{
		ord++;
		let b= new Bullet({
			map:this.map,
			myPlane:this,
			width:16,
			height:16,
			left:this.left+(this.width-16)/2,
			top:this.top-16,
			bgImg:"img/bullet2.png",
			directionTop:-1,
			incTop:32,
			timeSpace:150,
			ord:ord
		});
		b.go();
		this.bullets.push(b);
		let b1 = new Bullet({
			map: this.map,
			myPlane: this,
			width: 16,
			height: 16,
			left: this.left + (this.width - 16) / 2+26,
			top: this.top+5,
			bgImg: "img/bullet2.png",
			directionTop: -1,
			incTop: 32,
			timeSpace: 150,
			ord: ord
		});
		b1.go();
		this.bullets.push(b1);
		let b2 = new Bullet({
			map: this.map,
			myPlane: this,
			width: 16,
			height: 16,
			left: this.left + (this.width - 16) / 2 - 26,
			top: this.top+5,
			bgImg: "img/bullet2.png",
			directionTop: -1,
			incTop: 32,
			timeSpace: 150,
			ord: ord
		});
		b2.go();
		this.bullets.push(b2);
	},250);
}
MyPlane.prototype.isHit=function(){
	//我机的top<敌机的bottom&&我机的bottom>敌机的top&&我机的left<敌机的right&&我机的right>敌机的left
	let enemyPlanes = this.map.enemyPlanes;
	for(let i=0;i<enemyPlanes.length;i++){
		//判断我机是否有敌机接触
		//横向：我机的left<敌机的right并且我机的right>敌机的left
		//纵向：我机的top<敌机的bottom并且我机的bottom>敌机的top
		let myPleft=this.left;
		let myPRight=this.left+this.width;
		let myPTop=this.top;
		let myPBottom=this.top+this.height;

		let eLeft=enemyPlanes[i].left;
		let eRight=enemyPlanes[i].left+enemyPlanes[i].width;
		let eTop=enemyPlanes[i].top;
		let eBottom=enemyPlanes[i].top+enemyPlanes[i].height;
		if(eBottom>0){
			//敌机进入战场才开始判断
			if(myPleft<eRight&&myPRight>eLeft&&myPTop<eTop&&myPBottom>eTop){
				this.hp--;
				this.hpCont.style.width =(this.width/10)*this.hp+"px";
				enemyPlanes[i].score--;
				if (enemyPlanes[i].score<=0){
					enemyPlanes[i].die();
				}
				
				// let shineTimer=setInterval(() => {
				// 	this.domObj.style.transition="transform:scale(1.1);";
				// 	this.domObj.style.display="none";
				// }, this.timeSpace);
				// if(shineTimer){
				// 	window.clearInterval(shineTimer);
				// 	this.domObj.style.transition = "transform:scale(1);";
				// 	this.domObj.style.display = "blcok";
				// }
				if(this.hp<6){
					this.hpCont.style.backgroundColor = "yellow";
				}
				if(this.hp<=2){
					this.hpCont.style.backgroundColor="red";
				}
				
				if(this.hp<=0){
					this.boom();
					enemyPlanes[i].die();
					window.clearInterval(this.myTimer);
				}
			}
		}
	}
}
MyPlane.prototype.boom=function () { 
	
	//删除数据
	let index=this.map.myPlanes.indexOf(this);
	this.map.myPlanes.splice(index,1);
	//删除外观，先爆炸再删除外观
	let ord=-1;
	let dieTimer=setInterval(()=>{
		ord++;
		if(ord>this.dieImgs.length-1){
			window.clearInterval(dieTimer);
			this.domObj.remove();
			this.hpBox.remove();
			alert("game over!当前得分"+this.allScore+"分! 加油再战！");
			location.href = "airplanebeat.html";
		}
		this.domObj.style.backgroundImage="url("+this.dieImgs[ord]+")";
		
	},200);
 }
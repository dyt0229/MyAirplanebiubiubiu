

function MyPlane(obj){
	//建立继承关系
	MoverObj.apply(this,arguments);//继承父类的所有的属性
	this.bullets = [];
	this.allScore=0;
	this.dieImgs=obj.dieImgs;
}

MyPlane.prototype = new MoverObj();

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
				this.boom();
				enemyPlanes[i].die();
				window.clearInterval(this.myTimer);
				
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
			alert("game over!当前得分"+this.allScore+"分! 加油再战！");
			location.href = "airplanebeat.html";
		}
		this.domObj.style.backgroundImage="url("+this.dieImgs[ord]+")";
		
	},100);
 }
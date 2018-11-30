
function Bullet(bulletobj){
	MoverObj.apply(this,arguments);
	this.myPlane = bulletobj.myPlane; //子弹所属的战机
}
Bullet.prototype = new MoverObj();
Bullet.prototype.judgeEdge=function(){
	if(this.top<=-this.height){
		//删除（停定时器，删除数组，删外观）
		window.clearInterval(this.myTimer);
		//删除组（在我方战机的子弹数组里删除）
		let index=this.myPlane.bullets.indexOf(this);
		this.myPlane.bullets.splice(index,1);

		//删外观
		this.domObj.parentNode.removeChild(this.domObj);
	}
}
Bullet.prototype.go=function(){
	this.myTimer=setInterval(() => {
		//计算数据
		this.top=this.top+this.directionTop*this.incTop;
		//边界处理
		if(this.top<-1*this.height){
			this.die();
		}
		//外观
		this.domObj.style.top=this.top+"px";
		//每走一步，需要判断是否击中某个敌机
		this.isHit();
	}, this.timeSpace);
}
Bullet.prototype.isHit=function(){
	let enemyPlanes=this.myPlane.map.enemyPlanes;
	for(let i=0;i<enemyPlanes.length;i++){
		//判断当前子弹是否有敌机接触
		//横向：（子弹的right>敌机的left&&子弹的left<敌机的right）
		//纵向：（子弹的bottm>敌机的top&&子弹的top<敌机的bottom）
		let bLeft=this.left;
		let bRight=this.left+this.width;
		let bTop=this.top;
		let bBottom=this.top+this.height;

		let eLeft=enemyPlanes[i].left;
		let eRight=enemyPlanes[i].left+enemyPlanes[i].width;
		let eTop=enemyPlanes[i].top;
		let eBottom=enemyPlanes[i].top+enemyPlanes[i].height;

		// let hpInc = this.myPlane.map.enemyPlanes[i].hpCont.width/this.myPlane.map.enemyPlanes[i].score;
		if(eBottom>0){//敌机进入了地图（战场）才开始进行判断是否击中
			if(bRight>eLeft&&bLeft<eRight&&bBottom>eTop&&bTop<eBottom){
				//击中，子弹消失
				this.die();
				//敌机消失
				
				enemyPlanes[i].score--;
				enemyPlanes[i].hpCont.style.width = enemyPlanes[i].score*enemyPlanes[i].hpInc+"px";
				if (enemyPlanes[i].score * enemyPlanes[i].hpInc<enemyPlanes[i].width*0.7){
					enemyPlanes[i].hpCont.style.background="yellow";
				}
				if (enemyPlanes[i].score * enemyPlanes[i].hpInc < enemyPlanes[i].width * 0.4) {
					enemyPlanes[i].hpCont.style.background = "red";
				}
	
				this.myPlane.allScore++;
				this.myPlane.map.myScore = this.myPlane.allScore;
				// console.info(this.myPlane.allScore);
				// console.info(this.myPlane.map.myScore);
				this.myPlane.map.gradeBox.innerHTML = this.myPlane.map.myScore;
				
				if (enemyPlanes[i].score<=0){
					enemyPlanes[i].die();
				}
				return true;
			}
		}
	}
	return false;
}
Bullet.prototype.die=function(){
	//清除定时器
	window.clearInterval(this.myTimer);
	//删除数据（删除子弹数组）
	let index=this.myPlane.bullets.indexOf(this);
	this.myPlane.bullets.splice(index,1);
	//删除外观
	// this.domObj.parentNode.removeChild(this.domObj);
	this.domObj.remove();
}




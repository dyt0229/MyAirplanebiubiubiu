
function EnemyPlane(obj) {
    MoverObj.apply(this,arguments);//继承父类的所有属性
    this.bullets=[];
    this.dieImgs=obj.dieImgs;
    this.score=obj.score;
    this.hpBox=null;
    this.hpCont=null;
    this.hpInc=obj.width/obj.score;
    this.createUI1();
}
EnemyPlane.prototype=new MoverObj();
EnemyPlane.prototype.createUI1=function(){
    this.hpBox=document.createElement("div");
    this.hpBox.style.cssText="position:absolute;height:5px;border:1px solid blue;";
    this.hpBox.style.width = this.width + "px";
    this.hpBox.style.left=this.left+"px";
    this.hpBox.style.top=this.top-5+"px";
    this.map.domObj.appendChild(this.hpBox);
    this.hpCont=document.createElement("div");
    this.hpCont.style.cssText ="position:absolute;height:5px;background:#48f114;";
    this.hpCont.style.width=this.hpInc*this.score+"px";
    this.hpBox.appendChild(this.hpCont);
}
EnemyPlane.prototype.go=function(){
    this.myTimer=setInterval(() => {
        //计算数据
        this.top=this.top+this.directionTop*this.incTop;
        //边界处理
        if(this.top>this.map.height){
            // this.dispear();
            this.die();
        }
        //外观
        this.domObj.style.top=this.top+"px";
        this.hpBox.style.top=this.top-5+"px";
    }, this.timeSpace);
}
EnemyPlane.prototype.dispear=function(){
    window.clearInterval(this.myTimer);
    //删除敌机对象,删除敌机数组里的元素
    let index=this.map.enemyPlanes.indexOf(this);
    this.map.enemyPlanes.splice(index,1);
    //删除子弹的dom元素
    this.domObj.parentNode.removeChild(this.domObj);
}
EnemyPlane.prototype.die=function(){
    //清除定时器
    window.clearInterval(this.myTimer);
    //删除数据
    let index=this.map.enemyPlanes.indexOf(this);
    this.map.enemyPlanes.splice(index,1);
    //删除外观，删除之前爆炸一次
    let ord=-1;
    let innerTimer=setInterval(() => {
        ord++;
        if(ord>this.dieImgs.length-1){
            window.clearInterval(innerTimer);
            // this.domObj.parentNode.removeChild(this.domObj);
            this.domObj.remove();
            this.hpBox.remove();
        }
        this.domObj.style.backgroundImage="url("+this.dieImgs[ord]+")";
    }, 200);
}



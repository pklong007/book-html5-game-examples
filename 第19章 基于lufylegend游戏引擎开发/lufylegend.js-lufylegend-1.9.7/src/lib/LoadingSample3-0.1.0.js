function LoadingSample3(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	
	if(color==null)color = LGlobal._create_loading_color();
	s.color = color;
	s.progress = 0;
	s.screenWidth = LGlobal.width*0.75;
	s.screenHeight = height==null?LGlobal.height*0.1:height;
	if(s.screenHeight > 5)s.screenHeight=5;
	s.screenX = (LGlobal.width - s.screenWidth)/2;
	s.screenY = (LGlobal.height - s.screenHeight)/2;
	s.back = new LSprite();
	s.addChild(s.back);
	s.label = new LTextField();
	s.label.color="#ffffff";
	s.label.weight="bolder";
	s.label.size = s.screenHeight * 2;
	s.label.x = s.screenX + (s.screenWidth - s.label.getWidth())*0.5;
	s.label.y = s.screenY - s.screenHeight * 4;
	s.addChild(s.label);
	s.star = new Array();
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
LoadingSample3.prototype.onframe = function(s){
	var i,star,l;
	if(s.progress>=100){
		if(s.star.length > 0){
			for(i=0,l=s.star.length;i<l;i++){
				s.removeChild(s.star[i]);
			}
			s.star.length = 0;
		}
		return;
	}
	for(i=0,l=s.star.length;i<l;i++){
		star = s.star[i];
		star.alpha -= 0.1;
		star.x += star.speedx;
		star.y += star.speedy;
		if(star.alpha <= 0){
			s.star.splice(i,1);
			s.removeChild(star);
			i--,l--;
		}
	}
	if(s.star.length < 10)s.addStar();
};
LoadingSample3.prototype.addStar = function(){
	var s = this,c = LGlobal.canvas;
	var star = new LSprite();
	var step = 1 + Math.floor(Math.random()*4);
	star.graphics.add(function (){
		c.beginPath();
		c.fillStyle = "#ffffff";
		c.lineTo(step*2,step);
		c.lineTo(step*4,0);
		c.lineTo(step*3,step*2);
		c.lineTo(step*4,step*4);
		c.lineTo(step*2,step*3);
		c.lineTo(0,step*4);
		c.lineTo(step,step*2);
		c.lineTo(0,0);
		c.fill();
	});
	star.x = s.screenX + s.screenWidth*s.progress*0.01;
	star.y=s.screenY;
	star.speedx = 4 - 8*Math.random();
	star.speedy = 4 - 8*Math.random();
	s.star.push(star);
	s.addChild(star);
};
LoadingSample3.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	if(value > 100)value=100;
	s.progress = value;
	s.back.graphics.clear();
	s.back.graphics.add(function (){
		c.beginPath();
		c.fillStyle = "#00FFFF";
		c.rect(s.screenX - 3, s.screenY - 3, s.screenWidth + 6, s.screenHeight + 6);
		c.fill();
		c.beginPath();
		c.fillStyle = "#990033";
		c.rect(s.screenX, s.screenY, s.screenWidth, s.screenHeight);
		c.fill();
		c.beginPath();
		c.fillStyle = s.color;
		c.rect(s.screenX, s.screenY, s.screenWidth*value*0.01, s.screenHeight);
		c.fill();
	});
	s.label.text = value + "%";
};
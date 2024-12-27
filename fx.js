function iniFx(x) { for (var i in x) { var item=x[i]; var y=item.obj; var sClass=y.id.slice(0,4);
 if (sClass=='cpic') { new addParallaxPic(item); } if (sClass=='snow') { new addSnow(item); }
 if (sClass=='layf') { new addLayerFader(item); } if (sClass=='picf') { new addPictureFlip(item); } } ujLoaded(); }
var aMenus=new Array();
function populateSnow(sId,iDensity,iSpeed,iHeight,iSizes,iSoft) { var vFlakes = []; var iBodyHeight=document.body.offsetHeight;
 if (!iHeight) {iHeight=iBodyHeight}; if (iHeight>iBodyHeight) {iHeight=iBodyHeight}; if (!iSizes) {iSizes=5};
 iSizes=(Number(iSizes)*2)+2; var iTranslate=iHeight-iSizes-5; if (!iSpeed) {iSpeed=30}; iSpeed=(Number(iSpeed)*2)+20;
 var iDurations = iTranslate/iSpeed; var iStartDelays = iDurations*3; if (!iSoft) {iSoft=2}; iSoft=Number(iSoft);
 var vView = document.createElement('div'); vView.setAttribute('id','view-'+sId);
 vView.setAttribute('style','position:absolute; width:100%; '
 +'height:'+iHeight+'px; top:0; left:0; z-index:9999; overflow:hidden; pointer-events:none'); document.body.appendChild(vView);
 var iW = vView.offsetWidth; var iH = vView.offsetHeight; var iVol = iW*iH; if (!iDensity) {iDensity=12};
 var iQuantity = Math.floor(iVol*(iDensity*0.000005))+5; if (iQuantity>300) {iQuantity=300}; var sFlakeStem = 'flake-'+sId+'-';
 var v; var style=document.createElement('style'); style.setAttribute('id','dynamic-'+sId);
 style.innerHTML+=' .'+sFlakeStem+'r { ' +'position:absolute; top:0; ' +'background-color:white; ' +'border-radius:25px; '
 +'box-shadow:0 1px 2px rgba(0,0,0,1); ' +'opacity:0; ' +'animation:'+sFlakeStem+'k 9s linear infinite; ' +'}';
 style.innerHTML+='@keyframes '+sFlakeStem+'k { ' +'0% { opacity:0; transform:translateY(0); }' +'20% { opacity:0.8; }'
 +'80% { opacity:0.8; }' +'100% { opacity:0; transform:translateY('+iTranslate+'px); }' +' }'; document.head.appendChild(style);
 for (i = 0; i < iQuantity; i++) { var iSize = 5 + Math.floor(Math.random() * iSizes); var iBlur = (Math.random() * 3) + iSoft;
 var iDuration = (Math.random() * (iDurations*2))+iDurations; var iDelay = Math.random() * iStartDelays;
 var iPosition = Math.floor(Math.random() * 100); style.innerHTML+=' .'+sFlakeStem+i+' { ' +'left: '+iPosition+'%;'
 +'animation-delay: ' + iDelay + 's;' +'animation-duration: '+ iDuration + 's;' +'width: '+iSize + 'px;' +'height:'+iSize + 'px;'
 +'filter:blur(' + iBlur + 'px);' +' }'; v = document.createElement('div');
 v.setAttribute('class', sFlakeStem+'r '+sFlakeStem+i); vFlakes.push(v); vView.appendChild(v); } }
function addSnow(x) { var that=this; var vObj=x.obj; var sId=vObj.id; var iDensity=x.props['density'];
 var iSpeed=x.props['speed']; var iSize=x.props['size']; var iSoft=x.props['soft']; var iHeight=x.props['height'];
 populateSnow(sId,iDensity,iSpeed,iHeight,iSize,iSoft); }
function addLayerFader(x) { var that=this; var vObj=x.obj; var vLayer=vObj.parentElement; var sId=vObj.id;
 var sAniType=x.props['anitype']; var sTrigger=x.props['trigger']; if (!sTrigger) {sTrigger='auto';}
 var dStartOpacity=vLayer.style.opacity; var dTargetOpacity=x.props['targetopacity']; if (!dTargetOpacity) {dTargetOpacity=0.5;}
 var iDuration=x.props['duration']; if (!iDuration) {iDuration=1;} var iDelay=x.props['delay']; if (!iDelay) {iDelay=0;}
 vLayer.style.position='relative'; if (!dStartOpacity) { if (vLayer.style.visibility=='hidden') { vLayer.style.opacity=0.0; }
 else { vLayer.style.opacity=1.0; } } vObj.addEventListener('click', function() { if (vLayer.style.opacity==0) {
 vLayer.style.transition=''; if (sAniType=='drop') { vLayer.style.transform='translateY(-300px)'; } else {
 vLayer.style.transform='translateY(0px)'; } } setTimeout(function(){ var sP=iDuration+'s ease-out '+iDelay+'s';
 var sTran='opacity '+sP+', visibility '+sP+', transform '+sP; vLayer.style.transition=sTran; if (sAniType=='drop') {
 if (vLayer.style.opacity==0) { vLayer.style.transform='translateY(0px)'; } else if (dTargetOpacity==0) {
 vLayer.style.transform='translateY(300px)'; } } vLayer.style.opacity=dTargetOpacity;
 if (dTargetOpacity>0) { vLayer.style.visibility='visible'; } else { vLayer.style.visibility='hidden'; } },10); });
 if (sTrigger=='auto'){ setTimeout(function(){ const vEvent=new Event('click'); vObj.dispatchEvent(vEvent); },100); } }
function addPictureFlip(x) { var that=this; var vObj=x.obj; var sId=vObj.id; var sFlipAxis=x.props['flipaxis'];
 var vFront=vObj.querySelector('.front'); var vBack=vObj.querySelector('.back');
var vWrapper=document.createElement('div'); vWrapper.id=vObj.id; vObj.id=vObj.id+'-inner'; vWrapper.classList.toggle('abs');
 vWrapper.setAttribute('style','perspective:1000px'); vObj.parentNode.insertBefore(vWrapper,vObj); vWrapper.appendChild(vObj);
vObj.classList.toggle('hid'); vObj.classList.toggle('abs'); var vInner=vObj; vInner.style.position='relative';
 vInner.style.width='100%'; vInner.style.height='100%'; vInner.style.textAlign='center';
 vInner.style.transition='transform 0.5s ease-out, box-shadow 1s ease-out'; vInner.style.transformStyle='preserve-3d';
 vFront.style.backfaceVisibility='hidden'; vFront.style.transform='rotateZ(0deg)'; vBack.style.backfaceVisibility='hidden';
 vBack.style.transform='rotateY(180deg)';
var sTransform='rotateY'; if (sFlipAxis=='X') { sTransform='rotateX'; }
vWrapper.addEventListener('mouseover', function() { vInner.style.transform=sTransform+'(-180deg)'; });
 vWrapper.addEventListener('mouseout', function() { vInner.style.transform=sTransform+'(0deg)'; }); }
function syncParallaxPic(sId,iSpeed) { var vObj=document.getElementById(sId); var iPageH=document.documentElement.scrollHeight;
 var iViewH=document.documentElement.clientHeight; var iZone=iPageH-iViewH; var vCanvas=vObj.querySelector('.lx-canvas');
 vCanvas.style.height=iPageH+'px'; vObj.style.padding=0; var vPic=vObj.querySelector('.lx-pic');
 var vObjStyle=getComputedStyle(vObj); var vObjBound=vObj.getBoundingClientRect();
 var iObjT=vObjBound.top+window.pageYOffset+parseFloat(vObjStyle.borderTopWidth); var iObjH=parseFloat(vObjStyle.height);
 vPic.style.top=(iZone-(iObjT/iSpeed))+'px'; vPic.style.height=(iViewH/iSpeed)+iObjH+'px';
 var iPos=iZone-(window.pageYOffset/iSpeed); vObj.scrollTop=iPos; }
function addParallaxPic(x){ var that=this; var vObj=x.obj; vObj.style.transform='translate(0,0)'; var sId=vObj.id;
 var sExpand=x.props['expand']; var iSpeed=x.props['speed']; if (iSpeed==undefined) { iSpeed=2 }; if (sExpand) { var sIdO=sId;
 sId=sId+'-lx'; var d=document; var w=window; var s=vObj.style; var r=vObj.getBoundingClientRect(); var p=vObj.parentElement;
 var n=d.createElement('div'); vObj.id=sId; n.id=sIdO; n.className='hid abs inv'; p.appendChild(n); s.height=n.offsetHeight+'px';
 s.width=n.offsetWidth+'px'; s.top=r.top+w.pageYOffset+'px'; if (sExpand=='left') { s.width=r.left+w.pageXOffset+r.width+'px'; }
 if (sExpand!=='left') { s.right=0; s.width='auto'; } if (sExpand!=='right') { s.left=0; }
 if (sExpand=='right') { s.left=r.left+w.pageXOffset+'px'; } d.body.appendChild(vObj);
window.addEventListener('resize', function() { var vP=document.getElementById('paper').getBoundingClientRect();
 var pTop=vP.top+window.pageYOffset; var oTop=n.offsetTop; vObj.style.top=pTop+oTop+'px'; vObj.style.height=n.offsetHeight+'px';
 if (sExpand!=='full') { if (sExpand=='right') { var vL=vP.left+window.pageXOffset; vObj.style.left=vL+n.offsetLeft+'px';
 vObj.style.width='auto'; } else { var vL=vP.left+window.pageXOffset; vObj.style.width=vL+n.offsetLeft+n.offsetWidth+'px'; } }
 }, true); } document.addEventListener('scroll',syncParallaxPic.bind(null,sId,iSpeed)); syncParallaxPic(sId,iSpeed);
 vObj.classList.toggle('inv'); }
iniFx(aUjTree['fx']);

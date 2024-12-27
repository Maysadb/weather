function iniForms(x) { for (var i in x) { var y=x[i].obj; var sClass=y.id.slice(0,4); if (sClass=='sbtn') { new addForm(x[i]); }
 if (sClass=='date') { new addCalendar(x[i]) }; } ujLoaded(); }
function appendHiddenInput(vNode,sName,sVal) { var vInput=document.createElement('input'); vInput.setAttribute('type','hidden');
 vInput.setAttribute('name',sName); vInput.setAttribute('value',sVal); vNode.appendChild(vInput); }
function addForm(x) { var that=this; var vObj=x.obj; var sId=vObj.id; var sAction=vObj.getAttribute('data-url');
 var sMethod=x.props['method']; var sTarget=x.props['target']; var sEncType=x.props['enctype'];
 if (!sEncType) { sEncType='multipart/form-data'; } var sOnReset=x.props['onreset']; var sOnSubmit=x.props['onsubmit'];
 var sName=x.props['name']; var sCustomCode=x.props['customcode']; var sRecipient=x.props['recipient'];
 var sSuccessPage=x.props['successpage']; var sErrorPage=x.props['errorpage']; var sTemplate=x.props['template'];
 var vLayer=vObj.parentNode; var vForm=document.createElement('form'); if (sAction) { vForm.setAttribute('action',sAction); }
 if (sTarget) { vForm.setAttribute('target',sTarget); } if (sMethod) { vForm.setAttribute('method',sMethod); }
 if (sEncType) { vForm.setAttribute('enctype',sEncType); } if (sOnReset) { vForm.setAttribute('onreset',sOnReset); }
 if (sOnSubmit) { vForm.setAttribute('onsubmit',sOnSubmit); } if (sName) { vForm.setAttribute('name',sName); }
 if (sSuccessPage) { appendHiddenInput(vLayer,'successpage__',sSuccessPage); }
 if (sErrorPage) { appendHiddenInput(vLayer,'errorpage__',sErrorPage); }
 if (sTemplate) { appendHiddenInput(vLayer,'template__',sTemplate); }
 if (sRecipient) { appendHiddenInput(vLayer,'recipient__',sRecipient); } if (sCustomCode) {
 var vTmp=document.createElement('div'); vTmp.innerHTML=atob(sCustomCode); vLayer.appendChild(vTmp); }
 vLayer.parentNode.insertBefore(vForm,vLayer);
 vForm.addEventListener('submit',function(e){this.classList.remove('invalid'); if (!this.checkValidity()){e.preventDefault(); this.classList.add('invalid')}});
 vForm.appendChild(vLayer); }
function addCalendar(x) { function calcHostOffset() { function dateReady(sDate) { var iDT;
 if (Date.parse(sDate)) { iDT=new Date(sDate) } else { iDT=new Date('1/21/2000 00:00') } alert( sDate+' - '+iDT );
 iOffset=new Date().getTime()-iDT.getTime() } getHttpField('Date',window.location.href,this.dateReady); }
 function addPopupCal() { var x=document.getElementById('datetime'); if (!x) { x=document.createElement('style');
 x.id='datetime';
 var sCss='.dateBorder { border-top:solid 1px #AAAAAA } .datevert { line-height:30px } .datecell { float:left; width:32px; height:32px; overflow:hidden; text-align:center; background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAgCAYAAADT5RIaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACeSURBVHjaYvj//78DQAAxMTAw/AcIIBDxDyCAwARAAIEJgAACEwABBCL+AgQQmAUQQGAWQACBCYAAAhMAAQQmAAIITAAEEJgACCAwARBADECjGAACCMRiBQggMAEQQCCCHSCAwARAAIEIDoAAAhGcAAEEJgACCEwABBCI4AIIIDALIIDABEAAgQmAAAKrAwggsA6AAAITAAEENgUgwACIfhTPmXSpiQAAAABJRU5ErkJggg==\') top left repeat-x } .dateClose { position:absolute; top:-10px; left:-10px; width:30px; height:30px; background:url(\'data:image/png;base64,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\') } .dateToday { background:url(\'data:image/png;base64,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\') } .dateActive { background-color:#00B8FF }';
 document.getElementsByTagName('head')[0].appendChild(x);
 if (x.styleSheet) { x.styleSheet.cssText=sCss } else { x.innerHTML=sCss }; } x=document.createElement('div'); x.id='abcde';
 x.className='abs';
 x.style.cssText='visibility:hidden; width:362px; height:226px; z-index:9999; border:solid 1px gray; background-color:#999999; box-shadow:0 0 15px rgba(0,0,0,0.35); -moz-box-shadow:0 0 15px rgba(0,0,0,0.35); -webkit-box-shadow:0 0 15px rgba(0,0,0,0.35)';
 x.style.left=(+iX+10)+'px'; x.style.top=(+iY+10)+'px';
 vObj.onclick=new Function('document.getElementById("abcde").style.visibility="visible"'); var y=document.createElement('div');
 y.style.cssText='float:left; width:136px; height:100%; background-color:silver'; var y0=document.createElement('div');
 y0.className='datecell y'; y0.style.cssText='width:100%'; y0.innerHTML='<div class="datevert">'+'2011'+'</div>';
 y.appendChild(y0); for (var i in aMOY) { var y1=document.createElement('div'); var sCN='dateBorder datecell m'+i;
 if (i==0) { sCN='dateActive '+sCN }; y1.className=sCN; y1.style.cssText='width:50%';
 y1.innerHTML='<div class="datevert">'+aMOY[i].slice(0,3)+'</div>'; y.appendChild(y1); } var z=document.createElement('div');
 z.style.cssText='float:left; width:224px; height:100%'; for (var i in aDOW) { var z1=document.createElement('div');
 z1.className='datecell'; z1.innerHTML='<div class="datevert">'+aDOW[i].slice(0,2)+'</div>'; z.appendChild(z1); }
 for (var i=0; i<38; i++) { var z1=document.createElement('div'); var sCN='dateBorder datecell d'+i;
 if (i==21) { sCN='dateActive '+sCN }; z1.className=sCN; sCN='datevert'; if (i==16) { sCN='dateToday '+sCN };
 z1.innerHTML='<div class="'+sCN+'">'+i+'</div>'; z.appendChild(z1); } var z1=document.createElement('div');
 z1.className='dateBorder datecell today'; z1.style.cssText='width:128px';
 z1.innerHTML='<div class="dateToday" style="float:left; width:32px; height:32px"></div><div class="datevert" style="float:left">'+'Today'+'</div>';
 z.appendChild(z1); z1=document.createElement('div'); z1.className='dateClose'; z.appendChild(z1); x.appendChild(y);
 x.appendChild(z); document.body.appendChild(x); } this.showDate=function() {
 if (sGetDateFrom=='visitor') { var iDate=new Date() }
 else if (sGetDateFrom=='page') { var iDate=new Date(document.lastModified) }
 else if (sGetDateFrom=='host') { var iDate=new Date(); iDate.setTime(iDate.getTime()-iOffset) }; if (sDisplayDate) {
 if (sDisplayDate=='full') { var sDate=aDOW[iDate.getDay()]+', '+iDate.getDate()+' '+aMOY[iDate.getMonth()]+' '+iDate.getFullYear() };
 if (sDisplayDate=='ddm') { var sDate=aDOW[iDate.getDay()]+', '+iDate.getDate()+' '+aMOY[iDate.getMonth()] };
 if (sDisplayDate=='dmy') { var sDate=iDate.getDate()+' '+aMOY[iDate.getMonth()]+' '+iDate.getFullYear() };
 if (sDisplayDate=='dm') { var sDate=iDate.getDate()+' '+aMOY[iDate.getMonth()] };
 if (sDisplayDate=='my') { var sDate=aMOY[iDate.getMonth()]+' '+iDate.getFullYear() };
 if (sDisplayDate=='m') { var sDate=aMOY[iDate.getMonth()] }; if (sDisplayDate=='y') { var sDate=iDate.getFullYear() };
 if (sDisplayTime) { sDate=sDate+' ' }; } else var sDate=''; if (sDisplayTime) {
 var sHours=iDate.getHours(); sHours=(sHours<=9?'0'+sHours:sHours);
 var sMins=iDate.getMinutes(); sMins=(sMins<=9?'0'+sMins:sMins); var sSecs=iDate.getSeconds(); sSecs=(sSecs<=9?'0'+sSecs:sSecs);
 if (sDisplayTime=='hm') { var sTime=sHours+':'+sMins }; if (sDisplayTime=='hms') { var sTime=sHours+':'+sMins+':'+sSecs };
 if (sDisplayTime=='hm12') { var sTime=(sHours>12?sHours-12:sHours)+':'+sMins+(sHours>11?'pm':'am') }; sDate=sDate+sTime; };
 if (sPick) { document.getElementById(sId+'date').value=sDate }
 else { document.getElementById(sId+'date').innerHTML=sDate; document.getElementById(sId+'hf').value=sDate };
if (sRun=='true') { setTimeout(that.showDate,999) }; }; var that=this; var vObj=x.obj; var sId=vObj.id;
 var iX=stripPx(vObj.style.left); var iY=stripPx(vObj.style.top); var iOffset=0; var sPick=x.props['pick'];
 var aDOW=x.props['days'].split(','); var aMOY=x.props['months'].split(','); var sDisplayDate=x.props['date'];
 var sDisplayTime=x.props['time']; var sGetDateFrom=x.props['src']; var sRun=x.props['run']; if (sPick) { addPopupCal() };
 if (sGetDateFrom=='host') { calcHostOffset() }; this.showDate(); }
iniForms(aUjTree['form']);

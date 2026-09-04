# Client Script 
# Miekie KrunkerScript Architecture Framework
# MKS AF v1.0.0

# -MKS ARCHITECTURE FRAMEWORK-

str k="";str r="";
str[] bnLs=str[];str[] mtLs=str[];str[] vipLs=str[];str[] plrLs=str[];str[] tmpAd=str[];str[] tmpRo=str[];

bool adminPanelOpen=false;
str bg="background:rgba(0,0,0,0.9);";
str bg1="background:rgba(0,0,0,0.7);";
str bg2="background:rgba(153,29,36,1);";
str fnS="font-size:28px;";
str fnS1="font-size:15px;";
str fnS2="font-size:12px;";
str fnS3="font-size:10px;";
str fnC="color:#ffffff;";
str fnC1="color:#000000;";
str fnC2="color:#FF0000;";
str fnPlr="font-size:15px;font-weight:400;";

str brd="border:2px solid rgba(255,255,255,1);";
str brdRad="border-radius:10px;";
str brdRad1="border-radius:20px;";
str btnBg="rgba(55,55,55,7)";
str selBg="rgba(100,100,100,1)";
str norBrd="2px solid rgba(255,255,255,7)";
str selBrd="3px solid rgba(255,255,255,1)";

str txC="#ffffff;";
str ff="font-weight:800;";
str cr="border-radius:10px;";
str bx="box-sizing:border-box;";
str ov="overflow:hidden;";
str z="z-index:9999;";
str ps="position:absolute;";
str txAlgCen="text-align:center;";
str st=ps+bx+ov;

str adSelRowBg="rgba(100,100,100,1)";
str adSelRowBrd="2px solid rgba(255,255,255,1)";
str adNorRowBg="rgba(50,50,50,0.7)";
str adNorRowBrd="1px solid rgba(255,255,255,0.75)";
str adSelPlr="";

str adSelBtn="";str adSelLst="";

str[] adminButtonIDs=str[];str[] adminButtonLabels=str[];
str[] toolIDs=str[];str[] toolLabels=str[];str[] lmgs=str[];str[] smgs=str[];str[] rifles=str[];str[] launchers=str[];str[] pistols=str[];str[] shotguns=str[];str[] special=str[];str[] tools=str[];

str lnHght="line-height:42px;";
str[] toolBg=str["rgba(168,56,65,1)","rgba(153,29,36,1)","rgba(54,54,54,1)","rgba(54,54,54,1)","rgba(54,54,54,1)","rgba(54,54,54,1)","rgba(54,54,54,1)","rgba(54,54,54,1)","rgba(20,144,170,1)","rgba(20,144,170,1)"];
str bgBtn="rgba(17,19,42,1)";
num adRytFlash=0;
num adWepFlash=0;

bool useHdCht=true;
bool chtRvl=false;
str chtDisp="none";
bool isMuted=true;

action ovRect(num x,num y,num w,num h,num r,str c,num o){GAME.OVERLAY.drawRect(x,y,w,h,r,c,o);}
action ovTxt(str t,num x,num y,num r,num s,str a,str c,num o){GAME.OVERLAY.drawText(t,x,y,r,s,a,c,o);}

action strtcht() {if(useHdCht){GAME.UI.updateDIV("chatUI","display","none");chtDisp="none";}else{chtRvl=true;chtDisp="block";GAME.UI.updateDIV("chatUI","display","block");}}
action rndrcht() {if(isMuted){if(chtDisp!="none"){GAME.UI.updateDIV("chatUI","display","none");chtDisp="none";}}else{if(chtRvl&&chtDisp!="block"){GAME.UI.updateDIV("chatUI","display","block");chtDisp="block";}}}

# global/shared
action netSd(str id,obj d){GAME.NETWORK.send(id,d);}
action updDIV(str id,str prop,str v){GAME.UI.updateDIV(id,prop,v);}
action updDIVTxt(str id,str txt){GAME.UI.updateDIVText(id,txt);}
action crtDIV(str id,bool vis,str css,str parentId){GAME.UI.addDIV(id,vis,css,parentId);}
action assgSess(obj data){k=(str)data.k;r=(str)data.r;}
action rmFrStrLs(str[] arr,str v){for(num i=0;i<lengthOf arr;i++){if(arr[i]==v){remove arr[i];return;}}}
bool action inStrLs(str[] arr,str v){for(num i=0;i<lengthOf arr;i++){if(arr[i]==v){return true;}}return false;}
# global/shared

num svrEndCd=0;
bool svrEndShow=false;
str word=" SECONDS";
action renderSvrEnd() {
 if(!svrEndShow){return;}
 obj sz=GAME.OVERLAY.getSize();
 num w=(num)sz.width;
 num h=(num)sz.height;
 num boxH=200;
 num y=(h-boxH)/2;
 ovRect(0,y,w,boxH,0,"#232323",0.85);
 ovRect(0,y,w,5,0,"#ffffff",0.75);
 ovRect(0,y+boxH-5,w,5,0,"#ffffff",0.75);
 if(svrEndCd==1){word=" SECOND";}
 ovTxt("SERVER ENDS IN "+toStr(svrEndCd)+word,w/2,y+120,0,80,"center","#ffffff",1);
}
# left panel
action crtAdBtn(str id,str label,num top) {
 crtDIV(id,true,"position:absolute;left:20px;top:"+toStr(top)+"px;width:260px;height:50px;background:"+btnBg+";border:"+norBrd+";border-radius:10px;"+"box-sizing:border-box;"+fnC+fnS1+txAlgCen+"line-height:52px;cursor:pointer;pointer-events:auto;","mkAdLft");
 updDIVTxt(id,label);
 if(id==adSelBtn){updDIV(id,"border",selBrd);updDIV(id,"background",selBg);}
}

action selAdBtn(str id) {
 if(id==adSelBtn){return;}
 if(adSelBtn!=""){updDIV(adSelBtn,"border",norBrd);updDIV(adSelBtn,"background",btnBg);}
 updDIV(id,"border",selBrd);updDIV(id,"background",selBg);
 adSelBtn=id;
}
#left panel

# right panel
str adSelRyt="";
str adSelRytBrd="3px solid rgba(255,255,255,1)";
str adNorWepBrd="border:2px solid rgba(255,255,255,0.7);";
str[] wepBtnIDs=str[];
str[] wepNm=str[];
str adSelWep="";

action clrAdRytSel() {if(adSelRyt!=""){updDIV(adSelRyt,"border",norBrd);if(adSelRyt=="mkAdRytBan"){updDIVTxt(adSelRyt,"BAN");}}adSelRyt="";}

action selAdRyt(str id,str act,str lbl) {
 if(adSelRyt!=""){updDIV(adSelRyt,"border",norBrd);
  if(adSelRyt=="mkAdRytBan"){updDIVTxt(adSelRyt,"BAN");}
  if(adSelRyt=="mkAdRytMuteAction"||adSelRyt=="mkAdRytBanAction"||adSelRyt=="mkAdRytTAdAction"||adSelRyt=="mkAdRytTRoAction"){updDIVTxt(adSelRyt,"REMOVE");}
 }
 if(adSelWep!=""){updDIV(adSelWep,"border",norBrd);adSelWep="";}
 if(id=="mkAdRytBan"||id=="mkAdRytMuteAction"||id=="mkAdRytBanAction"){
  if(adSelRyt==id){netSd(act,{sI:k,tU:adSelPlr});updDIVTxt(id,lbl);adSelRyt="";return;}
  updDIV(id,"border",adSelRytBrd);
  updDIVTxt(id,"CONFIRM?");
  adSelRyt=id;
  return;
 }
 updDIV(id,"border",adSelRytBrd);
 adSelRyt=id;
 netSd(act,{sI:k,tU:adSelPlr});
 adRytFlash=GAME.TIME.now()+250;
}

action procAdRytAct(str id) {
 if(id=="mkAdRytKick"){selAdRyt(id,"kc","KICK");return;}
 if(id=="mkAdRytBan"){selAdRyt(id,"bn","BAN");return;}
 if(id=="mkAdRytMute"){selAdRyt(id,"mt","MUTE");return;}
 if(id=="mkAdRytRevive"){selAdRyt(id,"rv","REVIVE");return;}
 if(id=="mkAdRytGoTo"){selAdRyt(id,"gt","GO TO");return;}
 if(id=="mkAdRytBring"){selAdRyt(id,"bm","BRING ME");return;}
 if(id=="mkAdRytPts500"){selAdRyt(id,"5h","+100pts");return;}
 if(id=="mkAdRytPts1000"){selAdRyt(id,"1t","+1000pts");return;}
 if(id=="mkAdRytTempAd"){selAdRyt(id,"ta","TEMP ADMIN");return;}
 if(id=="mkAdRytTempRo"){selAdRyt(id,"tr","TEMP ROOT");return;}

 if(id=="mkAdRytMuteAction"){selAdRyt(id,"rM","REMOVE");return;}
 if(id=="mkAdRytBanAction"){selAdRyt(id,"rB","REMOVE");return;}
 if(id=="mkAdRytTAdAction"){selAdRyt(id,"rTA","REMOVE");return;}
 if(id=="mkAdRytTRoAction"){selAdRyt(id,"rTR","REMOVE");return;}
}

action selAdWep(str id,str name) {
 if(adSelWep!=""){updDIV(adSelWep,"border",norBrd);}
 if(adSelRyt!=""){updDIV(adSelRyt,"border",norBrd);adSelRyt="";}
 updDIV(id,"border","3px solid rgba(255,255,255,1)");
 adSelWep=id;
 netSd("aW",{sI:k,tU:adSelPlr,w:name});
 adWepFlash=GAME.TIME.now()+250;
}
action procAdWep(str id) {for(num i=0;i<lengthOf wepBtnIDs;i++){if(id==wepBtnIDs[i]){selAdWep(id,wepNm[i]);return;}}}

action clrAdRyt() {
 GAME.UI.removeDIV("mkAdRytBox");
 crtDIV("mkAdRytBox",true,"position:absolute;left:0;top:0;width:100%;height:100%;box-sizing:border-box;","mkAdRyt");
 crtDIV("mkAdRytEmpty",true,"position:absolute;left:20px;top:50%;width:280px;height:24px;box-sizing:border-box;"+fnC+fnS1+txAlgCen+"line-height:24px;pointer-events:none;","mkAdRytBox");
 updDIVTxt("mkAdRytEmpty","CURRENTLY EMPTY");
}

action crtAdRyt() {crtDIV("mkAdRytBox",true,"position:absolute;left:0;top:0;width:100%;height:100%;box-sizing:border-box;","mkAdRyt");}

action crtAdRytBtn(str id,str label,num left,num top,str bg,str fn) {crtDIV(id,true,"position:absolute;left:"+toStr(left)+"px;top:"+toStr(top)+"px;width:130px;height:40px;box-sizing:border-box;background:"+bg+";"+adNorWepBrd+brdRad+fnC+fn+txAlgCen+lnHght+"cursor:pointer;pointer-events:auto;","mkAdRytTools");updDIVTxt(id,label);}

action crtAdRytWep(str title,str[] weapons,num left,num top) {
 crtDIV("mkAdRyt"+title+"Title",true,"position:absolute;left:"+toStr(left)+"px;top:"+toStr(top)+"px;width:130px;height:20px;box-sizing:border-box;"+fnC+fnS3+ff+"line-height:20px;pointer-events:none;","mkAdRytTools");
 updDIVTxt("mkAdRyt"+title+"Title",title);
 for(num i=0;i<lengthOf weapons;i++) {str id="mkAdRyt"+title+"_"+toStr(i);addTo wepBtnIDs id;addTo wepNm weapons[i];crtAdRytBtn(id,weapons[i],left,top+25+(i*50),bgBtn,fnS3);}
}

action adActNTools() {
 wepBtnIDs=str[];
 wepNm=str[];

 crtDIV("mkAdRytTools",true,"position:absolute;left:0;top:170px;width:100%;height:260px;box-sizing:border-box;","mkAdRytBox");
 crtDIV("mkAdRytToolTitle",true,"position:absolute;left:20px;top:0;width:280px;height:20px;box-sizing:border-box;"+fnC+fnS2+ff+"line-height:20px;pointer-events:none;","mkAdRytTools");
 updDIVTxt("mkAdRytToolTitle","ADMIN TOOLS");

 for(num i=0;i<lengthOf toolIDs;i++) {num row=i-(i%2);crtAdRytBtn(toolIDs[i],toolLabels[i],20+((i%2)*150),30+(row*25),toolBg[i],fnS2);}
 if(r!="ro"&&r!="tr"){return;}
 crtDIV("mkAdRytWeaponTitle",true,"position:absolute;left:20px;top:300px;width:280px;height:20px;box-sizing:border-box;"+fnC+fnS2+ff+"line-height:20px;pointer-events:none;","mkAdRytTools");
 updDIVTxt("mkAdRytWeaponTitle","ADMIN WEAPONS");

 crtAdRytWep("LMGs",lmgs,20,330);
 crtAdRytWep("SMGs",smgs,170,330);
 crtAdRytWep("RIFLES",rifles,20,470);
 crtAdRytWep("LAUNCHERS",launchers,170,470);
 crtAdRytWep("PISTOLS",pistols,20,710);
 crtAdRytWep("SHOTGUNS",shotguns,170,660);
 crtAdRytWep("TOOLS",tools,20,1100);
 crtAdRytWep("SPECIAL",special,170,800);
}

action adRytRmAct(str id) {crtDIV(id,true,"position:absolute;left:95px;top:170px;width:130px;height:40px;box-sizing:border-box;"+bg2+brd+brdRad+fnC+fnS2+txAlgCen+lnHght+"cursor:pointer;pointer-events:auto;","mkAdRytBox");updDIVTxt(id,"REMOVE");}

action updAdRytPlr(str pNm,str prefix) {
 GAME.UI.removeDIV("mkAdRytBox");
 crtDIV("mkAdRytBox",true,"position:absolute;left:0;top:20px;width:100%;height:calc(100% - 40px);box-sizing:border-box;overflow-y:auto;overflow-x:hidden;","mkAdRyt");
 GAME.UI.addImage("68852","mkAdRytAvatar",true,"position:absolute;left:50%;top:0;transform:translateX(-50%);width:100px;height:100px;box-sizing:border-box;border-radius:10px;cursor:pointer;pointer-events:auto;","mkAdRytBox");
 crtDIV("mkAdRytName",true,"position:absolute;left:20px;top:120px;width:280px;height:24px;box-sizing:border-box;"+fnC+fnS1+ff+txAlgCen+"line-height:24px;cursor:pointer;pointer-events:auto;","mkAdRytBox");
 updDIVTxt("mkAdRytName",pNm);

 if(prefix=="pl"){adActNTools();}
 if(prefix=="mt"){adRytRmAct("mkAdRytMuteAction");}
 if(prefix=="bn"){adRytRmAct("mkAdRytBanAction");}
 if(prefix=="tAd"){adRytRmAct("mkAdRytTAdAction");}
 if(prefix=="tRo"){adRytRmAct("mkAdRytTRoAction");}
}
# right panel

# center panel
str conSelBrd="3px solid rgba(255,255,255,1)";
str adSelCon="";
num adConFlash=0;
str[] conIDs=str[];str[] conLbls=str[];str[] conEnab=str[];
str[] conNetIDs=str["kH","gL","sL","mG","eS"];
str[] dsCnNtIDs=str["rGL","rSL","rMG","rES"];

action adConAct() {
 GAME.UI.removeDIV("mkAdList");
 crtDIV("mkAdList",true,"position:absolute;left:0;top:20px;width:580px;height:580px;box-sizing:border-box;padding:0 20px;overflow-y:auto;overflow-x:hidden;","mkAdCen");
 for(num i=0;i<lengthOf conIDs;i++) {
  num col=i%3;num row=i-(i%3);
  crtDIV(conIDs[i],true,"position:absolute;left:"+toStr(20+(col*185))+"px;top:"+toStr((row/3)*100)+"px;width:170px;height:80px;box-sizing:border-box;"+bg2+brd+brdRad+fnC+fnS1+txAlgCen+"line-height:80px;cursor:pointer;pointer-events:auto;","mkAdList");
  updDIVTxt(conIDs[i],conLbls[i]);
  if(inStrLs(conEnab,conIDs[i])) {updDIV(conIDs[i],"border",conSelBrd);updDIV(conIDs[i],"background","#5bdb5c");}
 }
}

action procCon(str id) {
 for(num i=0;i<lengthOf conIDs;i++) {
  if(id==conIDs[i]) {
   if(id=="mkAdConKick") {
    netSd(conNetIDs[i],{sI:k});
    updDIV(id,"border",conSelBrd);
    updDIV(id,"background","#5bdb5c");
    adSelCon=id;
    adConFlash=GAME.TIME.now()+250;
    return;
   }
   if(inStrLs(conEnab,id)) {netSd(dsCnNtIDs[i-1],{sI:k,ui:id});}else{netSd(conNetIDs[i],{sI:k,ui:id});}
   return;
  }
 }
}

action clrAdCen() {
 GAME.UI.removeDIV("mkAdList");
 crtDIV("mkAdList",true,"position:absolute;left:0;top:20px;width:580px;height:580px;box-sizing:border-box;padding:0 20px;overflow-y:auto;overflow-x:hidden;","mkAdCen");
 crtDIV("mkAdEmpty",true,"width:540px;height:60px;box-sizing:border-box;"+fnC+"font-size:18px;"+txAlgCen+"line-height:60px;","mkAdList");
 updDIVTxt("mkAdEmpty","CURRENTLY EMPTY");
}

action crtAdList() {crtDIV("mkAdList",true,"position:absolute;left:0;top:20px;width:580px;height:580px;box-sizing:border-box;padding:0 20px;overflow-y:auto;overflow-x:hidden;","mkAdCen");}

action crtAdRow(str name,str prefix,num i,num total) {
 str rowId="mkAdRow_"+prefix+"_"+toStr(i);
 str nameId="mkAdName_"+prefix+"_"+toStr(i);
 str actionId="mkAdAction_"+prefix+"_"+toStr(i);
 str rowBg=adNorRowBg;
 str rowBrd=adNorRowBrd;
 if(name==adSelPlr) {rowBg=adSelRowBg;rowBrd=adSelRowBrd;}

 crtDIV(rowId,true,"position:relative;width:540px;height:60px;margin-bottom:"+toStr(i<total-1?10:0)+"px;box-sizing:border-box;background:"+rowBg+";border:"+rowBrd+";"+brdRad,
  "mkAdList");
 crtDIV(nameId,true,"position:absolute;left:20px;top:0;width:380px;height:60px;box-sizing:border-box;"+fnC+fnS1+"text-align:left;line-height:60px;pointer-events:none;",
  rowId);
 updDIVTxt(nameId,name);
 crtDIV(actionId,true,
  "position:absolute;right:10px;top:8.4px;width:100px;height:40px;box-sizing:border-box;background:rgba(190,190,190,1);"+brd+brdRad+fnC1+fnS2+txAlgCen+"line-height:42px;cursor:pointer;pointer-events:auto;",
  rowId);
 updDIVTxt(actionId,"ACTIONS");
 if(name==adSelPlr) {updDIV(actionId,"background","rgba(255,255,255,1)");}
}
action updAdList(str[] data,str prefix) {
 GAME.UI.removeDIV("mkAdList");

 crtDIV("mkAdList",true,
  "position:absolute;left:0;top:20px;width:580px;height:580px;box-sizing:border-box;padding:0 20px;overflow-y:auto;overflow-x:hidden;",
  "mkAdCen");

 if(lengthOf data==0) {
  crtDIV("mkAdEmpty",true,"width:540px;height:60px;box-sizing:border-box;"+fnC+"font-size:18px;"+txAlgCen+"line-height:60px;","mkAdList");
  updDIVTxt("mkAdEmpty","CURRENTLY EMPTY");
  return;}
 for(num i=0;i<lengthOf data;i++) {crtAdRow(data[i],prefix,i,lengthOf data);}
}

action updAdPlrRows(str[] newLs) {
 num oldLen=lengthOf plrLs;
 num newLen=lengthOf newLs;
 num minLen=oldLen;

 if(newLen<minLen){minLen=newLen;}

 for(num i=0;i<minLen;i++) {
  str rowId="mkAdRow_pl_"+toStr(i);
  str actionId="mkAdAction_pl_"+toStr(i);

  updDIVTxt("mkAdName_pl_"+toStr(i),newLs[i]);
  updDIV(rowId,"margin-bottom",toStr(i<newLen-1?10:0)+"px");
  updDIV(rowId,"border",adNorRowBrd);
  updDIV(rowId,"background",adNorRowBg);
  updDIV(actionId,"background","rgba(190,190,190,1)");

  if(newLs[i]==adSelPlr) {
   updDIV(rowId,"border",adSelRowBrd);
   updDIV(rowId,"background",adSelRowBg);
   updDIV(actionId,"background","rgba(255,255,255,1)");
  }
 }

 if(newLen>oldLen) {
  for(num i=oldLen;i<newLen;i++) {
   crtAdRow(newLs[i],"pl",i,newLen);
  }
 }

 if(newLen<oldLen) {
  for(num i=oldLen-1;i>=newLen;i--) {
   GAME.UI.removeDIV("mkAdRow_pl_"+toStr(i));
  }
 }

 plrLs=newLs;
}


bool action procAdListAct(str id,str[] data,str prefix) {
 for(num i=0;i<lengthOf data;i++) {
  if(id=="mkAdAction_"+prefix+"_"+toStr(i)) {

   # Clear every row in this list
   for(num j=0;j<lengthOf data;j++) {
    updDIV("mkAdRow_"+prefix+"_"+toStr(j),"border",adNorRowBrd);
    updDIV("mkAdRow_"+prefix+"_"+toStr(j),"background",adNorRowBg);
    updDIV("mkAdAction_"+prefix+"_"+toStr(j),"background","rgba(190,190,190,1)");
   }

   # Select clicked row
   adSelPlr=data[i];

   updDIV("mkAdRow_"+prefix+"_"+toStr(i),"border",adSelRowBrd);
   updDIV("mkAdRow_"+prefix+"_"+toStr(i),"background",adSelRowBg);
   updDIV("mkAdAction_"+prefix+"_"+toStr(i),"background","rgba(255,255,255,1)");

   clrAdRytSel();
   updAdRytPlr(adSelPlr,prefix);

   return true;
  }
 }

 return false;
}
# center panel

# global/shared
action procDtRec(str id,obj data) {
 str[] ls=str[];
 str prefix="";

 if(id=="plL"){ls=plrLs;prefix="pl";}
 else if(id=="mtL"){ls=mtLs;prefix="mt";}
 else if(id=="bnL"){ls=bnLs;prefix="bn";}
 else if(id=="tAdL"){ls=tmpAd;prefix="tAd";}
 else if(id=="tRoL"){ls=tmpRo;prefix="tRo";}
 else{return;}

 if((str)data.d!="") {
  ls=(str[])data.d;
  if(id=="plL"){plrLs=ls;}
  if(id=="mtL"){mtLs=ls;}
  if(id=="bnL"){bnLs=ls;}
  if(id=="tAdL"){tmpAd=ls;}
  if(id=="tRoL"){tmpRo=ls;}
 }
 updAdList(ls,prefix);
}

action updPlrList(str id,str pNm) {
 str[] newLs=str[];
 for(num i=0;i<lengthOf plrLs;i++){addTo newLs plrLs[i];}
 if(id=="plA"){addTo newLs pNm;}
 if(id=="plD"){rmFrStrLs(newLs,pNm);}
 if(adminPanelOpen&&adSelLst=="pl"){updAdPlrRows(newLs);}else{plrLs=newLs;}
}

action procPlrUpd(str id,obj data) {
 str pNm=(str)data.n;
 if(id=="plA"||id=="plD"){updPlrList(id,pNm);return;}
 if(id=="rM"){rmFrStrLs(mtLs,(str)data.n);updAdList(mtLs,"mt");return;}
 if(id=="rB"){rmFrStrLs(bnLs,(str)data.n);updAdList(bnLs,"bn");return;}
 if(id=="rTA"){rmFrStrLs(tmpAd,(str)data.n);updAdList(tmpAd,"tAd");return;}
 if(id=="rTR"){rmFrStrLs(tmpRo,(str)data.n);updAdList(tmpRo,"tRo");return;}
 if(id=="bnA"){addTo bnLs pNm;}
 if(id=="mtA"){addTo mtLs pNm;}
 if(id=="taA"){addTo tmpAd pNm;}
 if(id=="trA"){addTo tmpRo pNm;}
}

# global/shared

# base

action crtAdmPnl() {
 crtDIV("mkAdExt",true,"display:none;position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0);cursor:default;"+z,"");
 crtDIV("mkAdPnl",true,"display:none;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:1280px;height:720px;"+bg+brd+brdRad1+bx+z,"");
 crtDIV("mkAdTtl",true,ps+"left:0;top:28px;width:1280px;height:32px;"+txAlgCen+"color:"+txC+fnS+"pointer-events:none;","mkAdPnl");
 updDIVTxt("mkAdTtl","MK ADMIN PANEL");
 str[] id=str["mkAdLft","mkAdCen","mkAdRyt"];
 num[] x=num[20,340,940];num[] w=num[300,580,320];
 for(num i=0;i<lengthOf id;i++){crtDIV(id[i],true,st+"left:"+toStr(x[i])+"px;top:80px;width:"+toStr(w[i])+"px;height:620px;"+bg1+brd+cr,"mkAdPnl");}
 crtDIV("mkAdCls",true,"position:absolute;right:20px;top:18px;width:40px;height:40px;"+fnC+fnS+txAlgCen+"line-height:38px;cursor:pointer;box-sizing:border-box;","mkAdPnl");
 updDIVTxt("mkAdCls","X");
}

action clrAdSel() {
 if(adSelBtn!=""){updDIV(adSelBtn,"border",norBrd);updDIV(adSelBtn,"background",btnBg);}
 if(adSelRyt!=""){updDIV(adSelRyt,"border",norBrd);if(adSelRyt=="mkAdRytBan"){updDIVTxt(adSelRyt,"BAN");}}
 if(adSelWep!=""){updDIV(adSelWep,"border",norBrd);}

 adSelBtn="";adSelPlr="";adSelRyt="";adSelWep="";
 clrAdCen();clrAdRyt();
}
action clsAdPnl() {
 adminPanelOpen=false;
 updDIV("mkAdExt","display","none");
 updDIV("mkAdPnl","display","none");
 GAME.INPUTS.lockMouse();
 clrAdSel();
}
action showAdPlrLst() {selAdBtn("mkAdBtnPlrs");adSelLst="pl";adSelPlr="";clrAdRyt();netSd("bPl",{sI:k,r:"rq"});return;}
action toggAdPan() {
 if(adminPanelOpen) {clsAdPnl();}
 else{
  adminPanelOpen=true;
  updDIV("mkAdExt","display","block");
  updDIV("mkAdPnl","display","block");
  GAME.INPUTS.unlockMouse();
  showAdPlrLst();
 }
}
#base

# nuke limit system
num myNukeCount=0;
bool showNukeHUD=false;
num nkLmt=5;
num nukeWarnUntil=0;
bool showWarn=false;
num nkWarn=0;
action renderNukeCount() {
 obj size=GAME.OVERLAY.getSize();

 num screenWidth=(num)size.width;
 num screenHeight=(num)size.height;

 num panelW=225;
 num panelH=95;
 num marginX=430;
 num marginY=17;

 num panelX=marginX;
 num panelY=screenHeight-marginY-panelH;
 bool limitReached=((num)myNukeCount>=nkLmt);
 str borderColor="#202020";
 if(limitReached){borderColor="#ff4444";}

 # backdrop behind survivor + nuke panel
 ovRect(panelX-420,panelY-5,panelW+425,panelH+10,0,"#202020",0.7);
 # panel border
 ovRect(panelX,panelY,panelW,panelH,0,borderColor,0.9);
 # panel background
 ovRect(panelX+3,panelY+3,panelW-6,panelH-6,0,"#3a3a3a",0.9);

 if(limitReached){num centerX=panelX+(panelW/2)+5.2;ovTxt("NUKE LIMIT",centerX,panelY+34,0,20,"center","#ff4444",1);ovTxt("REACHED",centerX-1,panelY+73,0,20,"center","#ff4444",1);}
 else{
  # horizontal divider
  ovRect(panelX+3,panelY+45,panelW-6,2,0,"#202020",1);
  # vertical divider
  ovRect(panelX+170,panelY+3,2,panelH-6,0,"#202020",1);
  ovTxt("Nukes Used",panelX+15,panelY+28,0,18,"left","#ff4444",1);
  ovTxt(toStr(myNukeCount),panelX+199.5,panelY+28,0,18,"center","#ff4444",1);
  ovTxt("Nuke Limit",panelX+15,panelY+72,0,18,"left","#ffffff",1);
  ovTxt(toStr(nkLmt),panelX+199.5,panelY+72,0,18,"center","#ffffff",1);
 }
}

action renderNukeWarn() {
 if(GAME.TIME.now()<nukeWarnUntil){
  obj sz=GAME.OVERLAY.getSize();
  num w=(num)sz.width;num h=(num)sz.height;
  num boxW=w;num boxH=100;num x=0;num y=((h-boxH)/2)+350;

  ovRect(x,y,boxW,boxH,0,"#4b3a3a",1);
  ovTxt("YOU HAVE REACHED THE NUKE LIMIT",w/2,y+60,0,32,"center","#ff4444",1);
  # border
  ovRect(x,y,boxW,5,0,"#ff4444",1);
  ovRect(x,y+boxH-5,boxW,5,0,"#ff4444",1);
 }
}

action renderNukeLimitWarn() {
 if(GAME.TIME.now()>=nkWarn){return;}

 obj sz=GAME.OVERLAY.getSize();
 num w=(num)sz.width;num h=(num)sz.height;
 num boxW=900;num boxH=120;
 num x=(w-boxW)/2;num y=((h-boxH)/2)+300;
 ovRect(x,y,boxW,boxH,0,"#4b3a3a",1);
 # border
 ovRect(x,y,boxW,3,0,"#ff4444",1);
 ovRect(x,y+boxH-3,boxW,3,0,"#ff4444",1);
 ovRect(x,y,3,boxH,0,"#ff4444",1);
 ovRect(x+boxW-3,y,3,boxH,0,"#ff4444",1);

 ovTxt("N U K E   L I M I T    "+toStr(nkLmt),w/2,y+45,0,30,"center","#ffffff",1);
 ovTxt("N U K E R   D I E   I F   E X C E E D E D",w/2,y+94,0,30,"center","#ff4444",1);
}
# nuke limit system

# log system
bool logExpanded=false;
str[] strLog=str[];
obj[] objLog=obj[];
str[] logCat=str[];
str[] logClr=str["#63FFDD","#FFFFFF","#ff4444","#5EFF94","#ABABAB","#FFA600","#FF0000","#FF6642","#BFFF4D","#A678FF","#FF0047","#fc03ec","#FF0000","#8A8A8A"];

num lgMrH=22;num lgMP=10;num lgMR=4;num lgMF=12;
num lgErH=25;num lgEP=20;num lgEF=15;
num lgMw=420;num lgMh=110;num lgEw=700;num lgEh=720;
num lgML=670;num lgMB=10;
num lgRW=400;num lgEW=760;
num lgCW=40;num lgCH=40;num lgCX=10;num lgCY=10;
num lgCB=2;num lgCF=20;num lgCLH=36;

str lgBg="rgba(0,0,0,0.5)";
str lgBd="2px solid rgba(255,255,255,0.5)";

action crtLogClose() {
 crtDIV("mkLogClose",true,"position:absolute;right:"+toStr(lgCX)+"px;top:"+toStr(lgCY)+"px;width:20px;height:20px;box-sizing:border-box;text-align:center;font-size:12px;line-height:20px;color:#ffffff;cursor:pointer;pointer-events:auto;z-index:99999;","mkMiniLog");
 updDIVTxt("mkLogClose","X");
 updDIV("mkLogClose","background","transparent");
 updDIV("mkLogClose","border","none");
 updDIV("mkLogClose","width","20px");
 updDIV("mkLogClose","height","20px");
 updDIV("mkLogClose","font-size","12px");
 updDIV("mkLogClose","line-height","20px");
 updDIV("mkLogClose","display","none");
}
action crtExpLogRow(num i) {
 crtDIV("mkLogExpRow"+toStr(i),true,"position:relative;width:"+toStr(lgEW)+"px;height:"+toStr(lgErH)+"px;box-sizing:border-box;font-size:"+toStr(lgEF)+"px;line-height:"+toStr(lgErH)+"px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left;","mkMiniLog");
}
action crtExpLogRows() {for(num i=0;i<lengthOf objLog;i++) {crtExpLogRow(i);}}
action updExpLog() {
 for(num i=0;i<lengthOf objLog;i++) {
  str id="mkLogExpRow"+toStr(i);
  str cat=(str)objLog[i].c;
  str msg=(str)objLog[i].m;
  str cl=(str)objLog[i].cl;
  str txt="["+cat+"] "+msg;
  updDIVTxt(id,txt);updDIV(id,"color",cl);updDIV(id,"display","block");
 }
}
action crtLogRow(num i) {
 crtDIV("mkLogRow"+toStr(i),true,"position:absolute;left:"+toStr(lgMP)+"px;top:"+toStr(lgMP+(i*lgMrH))+"px;width:"+toStr(lgRW)+"px;height:"+toStr(lgMrH)+"px;box-sizing:border-box;font-size:"+toStr(lgMF)+"px;line-height:"+toStr(lgMrH)+"px;padding:0 5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left;","mkMiniLog");
}
action crtLogRows() {for(num i=0;i<lgMR;i++) {crtLogRow(i);}}
action updMiniLog() {
 num start=lengthOf objLog-lgMR;
 if(start<0) {start=0;}

 num count=lengthOf objLog-start;

 for(num i=0;i<lgMR;i++) {
  str id="mkLogRow"+toStr(i);
  if(i<count) {
   num logI=start+i;
   str cat=(str)objLog[logI].c;
   str msg=(str)objLog[logI].m;
   str cl=(str)objLog[logI].cl;
   str txt="["+cat+"] "+msg;
   updDIVTxt(id,txt);updDIV(id,"color",cl);updDIV(id,"display","block");
   }
   else {updDIV(id,"display","none");}
 }
}

action updLogSize() {
 if (logExpanded) {
  updDIV("mkLogBg","display","block");
  updDIV("mkMiniLog","left","50%");
  updDIV("mkMiniLog","top","50%");
  updDIV("mkMiniLog","bottom","auto");
  updDIV("mkMiniLog","transform","translate(-50%,-50%)");
  updDIV("mkMiniLog","width",toStr(lgEw)+"px");
  updDIV("mkMiniLog","height",toStr(lgEh)+"px");
  updDIV("mkMiniLog","padding","0px");
  updDIV("mkMiniLog","overflow","hidden");
  updDIV("mkLogExpBox","left","0px");
  updDIV("mkLogExpBox","top","20px");
  updDIV("mkLogExpBox","width","100%");
  updDIV("mkLogExpBox","height","calc(100% - 40px)");
  updDIV("mkLogExpBox","overflow-y","auto");
  updDIV("mkLogExpBox","overflow-x","hidden");
  updDIV("mkLogClose","display","block");
 }
 else {
  if(!showNukeHUD){lgML=440;}
  updDIV("mkLogBg","display","none");
  updDIV("mkMiniLog","left",toStr(lgML)+"px");
  updDIV("mkMiniLog","top","auto");
  updDIV("mkMiniLog","bottom",toStr(lgMB)+"px");
  updDIV("mkMiniLog","transform","none");
  updDIV("mkMiniLog","width",toStr(lgMw)+"px");
  updDIV("mkMiniLog","height",toStr(lgMh)+"px");
  updDIV("mkMiniLog","padding","0px");
  updDIV("mkMiniLog","overflow-y","hidden");
  updDIV("mkLogClose","display","none");
 }
}
action updMiniLogVis() {if(k!=""&&(r=="ro"||r=="tr")) {updDIV("mkMiniLog","display","block");}else{updDIV("mkMiniLog","display","none");}}
action crtMiniLog() {
 crtDIV("mkMiniLog",true,"display:none;position:absolute;box-sizing:border-box;background:"+lgBg+";border:"+lgBd+";overflow:hidden;z-index:9999;","gameUI");
 updLogSize();crtLogRows();updMiniLog();updMiniLogVis();
}
action crtLogBg() {
 crtDIV(
  "mkLogBg",
  true,
  "position:absolute;left:0;top:0;width:100%;height:100%;z-index:9998;pointer-events:auto;",
  "gameUI"
 );

 updDIV("mkLogBg","display","none");
}
action setMiniLogVis(bool vis) {
 str d="block";

 if(!vis) {
  d="none";
 }

 for(num i=0;i<lgMR;i++) {
  updDIV("mkLogRow"+toStr(i),"display",d);
 }
}

action openLog() {
 logExpanded=true;
 setMiniLogVis(false);
 GAME.UI.removeDIV("mkLogExpBox");
 crtDIV("mkLogExpBox",true,"position:absolute;left:0;top:20px;width:100%;height:calc(100% - 40px);box-sizing:border-box;overflow-y:auto;overflow-x:hidden;","mkMiniLog");

 for(num i=0;i<lengthOf objLog;i++) {
  str id="mkLogExpRow"+toStr(i);
  crtDIV(id,true,"position:relative;width:calc(100% - 40px);margin-left:20px;margin-right:20px;height:"+toStr(lgErH)+"px;box-sizing:border-box;font-size:"+toStr(lgEF)+"px;line-height:"+toStr(lgErH)+"px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left;cursor:pointer;pointer-events:auto;","mkLogExpBox");
  str cat=(str)objLog[i].c;str msg=(str)objLog[i].m;str cl=(str)objLog[i].cl;
  updDIVTxt(id,"["+cat+"] "+msg);
  updDIV(id,"color",cl);
 }
 updDIV("mkLogClose","z-index","99999");
 updDIV("mkLogClose","pointer-events","auto");

 updLogSize();
 GAME.INPUTS.unlockMouse();
}

action closeLog() {
 logExpanded=false;
 GAME.UI.removeDIV("mkLogExpBox");
 updLogSize();updMiniLog();
 GAME.INPUTS.lockMouse();
}

action parseLog(str raw) {
 for(num j=0;j<lengthOf logCat;j++) {
  str tag="["+logCat[j]+"]";
  str chk=GAME.UTILS.truncateTxt(raw,lengthOf tag,true,0);

  if(chk==tag) {str msg=GAME.UTILS.replaceText(raw,tag+" ","");addTo objLog {c:logCat[j],m:msg,cl:logClr[j]};break;}
 }
}

action addExpLogRow(num i) {
 str id="mkLogExpRow"+toStr(i);

 crtDIV(
  id,
  true,
  "position:relative;width:calc(100% - 40px);margin-left:20px;margin-right:20px;height:"+toStr(lgErH)+"px;box-sizing:border-box;font-size:"+toStr(lgEF)+"px;line-height:"+toStr(lgErH)+"px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left;cursor:pointer;pointer-events:auto;",
  "mkLogExpBox"
 );

 str cat=(str)objLog[i].c;
 str msg=(str)objLog[i].m;
 str cl=(str)objLog[i].cl;

 updDIVTxt(id,"["+cat+"] "+msg);
 updDIV(id,"color",cl);
}
action logR(obj data) {
 str m=(str)data.m;

 GAME.log(m);
 addTo strLog m;
 parseLog(m);

 if(logExpanded) {
  num i=lengthOf objLog-1;
  addExpLogRow(i);
 } else {
  updMiniLog();
 }
}

action copyLog(str id) {
 for(num i=0;i<lengthOf objLog;i++) {
  if(id=="mkLogExpRow"+toStr(i)) {str cat=(str)objLog[i].c;str msg=(str)objLog[i].m;GAME.UTILS.copyToClipboard("["+cat+"] "+msg);break;}
 }
}
# log system

action assgAdUI(obj d) {adminButtonIDs=(str[])d.b;adminButtonLabels=(str[])d.c;toolIDs=(str[])d.t;toolLabels=(str[])d.u;lmgs=(str[])d.l;smgs=(str[])d.s;rifles=(str[])d.r;
 launchers=(str[])d.x;pistols=(str[])d.p;shotguns=(str[])d.h;special=(str[])d.z;tools=(str[])d.w;conIDs=(str[])d.ci;conLbls=(str[])d.cl;conEnab=(str[])d.ce;
 num buttonTop=15;
 num buttonGap=70;
 for(num i=0;i<lengthOf adminButtonIDs;i++) {
  crtAdBtn(adminButtonIDs[i],adminButtonLabels[i],buttonTop+(i*buttonGap));
 }
}
action procLog(obj d){
 logCat=(str[])d.lr;strLog=(str[])d.lh;objLog=obj[];
 for(num i=0;i<lengthOf strLog;i++){parseLog(strLog[i]);}
 updMiniLogVis();
 updMiniLog();
}
action procAd() {clsAdPnl();k="";r="";updMiniLogVis();strLog=str[];objLog=obj[];logCat=str[];
adminButtonIDs=str[];adminButtonLabels=str[];toolIDs=str[];toolLabels=str[];lmgs=str[];smgs=str[];rifles=str[];launchers=str[];pistols=str[];shotguns=str[];special=str[];tools=str[];}
# -MKS ARCHITECTURE FRAMEWORK-

# Runs when the game starts
public action start() {
 #GAME.SCENE.setSkyColor("#8fbec5");GAME.SCENE.setAmbientLight("#EDE9D8",0.65);
 strtcht();
 crtAdmPnl();
 crtAdList();
 crtAdRyt();

 crtLogBg();
 crtMiniLog();
 crtLogClose();

 logExpanded = false;
}

# Runs every game tick
public action update(num delta) {
 if(adRytFlash>0&&GAME.TIME.now()>=adRytFlash){if(adSelRyt!=""){updDIV(adSelRyt,"border",norBrd);adSelRyt="";}adRytFlash=0;}
 if(adWepFlash>0&&GAME.TIME.now()>=adWepFlash){if(adSelWep!=""){updDIV(adSelWep,"border",norBrd);adSelWep="";}adWepFlash=0;}
 if(adConFlash>0&&GAME.TIME.now()>=adConFlash){
  if(adSelCon!=""){
   updDIV(adSelCon,"border",norBrd);
   updDIV(adSelCon,"background",toolBg[1]);
   adSelCon="";
  }
  adConFlash=0;
 }
}

# Add rendering logic in here
public action render(num delta) {
 rndrcht();
 if(svrEndShow){updDIV("mkSvrEnd","display","block");}else{updDIV("mkSvrEnd","display","none");}
 if(showNukeHUD){renderNukeCount();}
 renderNukeWarn();
 renderSvrEnd();
 renderNukeLimitWarn();
}

# Player spawns in
public action onPlayerSpawn(str id) {
 obj p=GAME.PLAYERS.findByID(id);
 if(notEmpty p&&(bool)p.isYou){if(showNukeHUD){showNukeHUD=true;}else{showNukeHUD=false;}if(showWarn){nkWarn=GAME.TIME.now()+10000;showWarn=false;}}
}

# Player died
public action onPlayerDeath(str id,str killerID) {
 obj p=GAME.PLAYERS.findByID(id);
 if(notEmpty p&&(bool)p.isYou){showNukeHUD=false;}
}

# User pressed a key
public action onKeyPress(str key,num code) {
 if (key=="v"){netSd("v",{});return;}
 if(key=="m"&&k!=""&&r!=""){toggAdPan();}
 if(key=="l"&&!logExpanded&&k!=""&&(r=="ro"||r=="tr")){openLog();}
}

# User clicked a DIV (ID)
public action onDIVClicked(str id) {
 if(id=="mkAdCls"){clsAdPnl();return;}
 if(id=="mkAdExt"){clsAdPnl();return;}
 if(id=="mkAdRytAvatar"||id=="mkAdRytName"){GAME.UTILS.copyToClipboard(adSelPlr);return;}
 if(procAdListAct(id,plrLs,"pl")){return;}
 if(procAdListAct(id,mtLs,"mt")){return;}
 if(procAdListAct(id,bnLs,"bn")){return;}
 if(procAdListAct(id,tmpAd,"tAd")){return;}
 if(procAdListAct(id,tmpRo,"tRo")){return;}

 if(id=="mkAdBtnPlrs"){selAdBtn(id);adSelLst="pl";adSelPlr="";clrAdRyt();netSd("bPl",{sI:k,r:"rq"});return;}
 if(id=="mkAdBtnMt"){selAdBtn(id);adSelLst="mt";adSelPlr="";clrAdRyt();netSd("bMt",{sI:k,r:"rq"});return;}
 if(id=="mkAdBtnBn"){selAdBtn(id);adSelLst="bn";adSelPlr="";clrAdRyt();netSd("bBn",{sI:k,r:"rq"});return;}
 if(id=="mkAdBtnTAd"){selAdBtn(id);adSelLst="tAd";adSelPlr="";clrAdRyt();netSd("bTAd",{sI:k,r:"rq"});return;}
 if(id=="mkAdBtnTRo"){selAdBtn(id);adSelLst="tRo";adSelPlr="";clrAdRyt();netSd("bTRo",{sI:k,r:"rq"});return;}
 if(id=="mkAdBtnCon"){selAdBtn(id);adSelLst="cn";adSelPlr="";clrAdRyt();adConAct();netSd("bCn",{sI:k,r:"rq"});return;}
 #if(id=="mkAdBtnOth"){selAdBtn(id);netSd("bPl",{sI:k,r:"rq"});return;}

 procCon(id);
 procAdRytAct(id);
 procAdWep(id);

 if(id=="mkLogClose"||id=="mkLogBg"){closeLog();return;}
 if(logExpanded){str logId=GAME.UTILS.truncateTxt(id,11,true,0);if(logId=="mkLogExpRow"){copyLog(id);return;}}
}

# Client receives network message
public action onNetworkMessage(str id,obj data) {
 if(id=="nkC"){myNukeCount=(num)data.c;if(myNukeCount>=nkLmt){nukeWarnUntil=GAME.TIME.now()+10000;}}
 if(id=="clP"){procAd();}
 if(id=="sc"){svrEndShow=(bool)data.c;}
 if(id=="sID"){assgSess(data);}
 if(id=="aUI"){assgAdUI(data);}
 if(id=="lH"){procLog(data);}
 if(id=="lR"){logR(data);}
 if(id=="plA"||id=="plD"){procPlrUpd(id,data);return;}
 if(id=="UPL"){str[] newLs=(str[])data.ls;if(adminPanelOpen&&adSelLst=="pl"){updAdPlrRows(newLs);}else{plrLs=newLs;}}
 if(id=="bnA"||id=="mtA"){procPlrUpd(id,data);return;}
 if(id=="rM"||id=="rB"){procPlrUpd(id,data);return;}
 if(id=="rTA"||id=="rTR"){procPlrUpd(id,data);return;}
 if(id=="taA"||id=="trA"){procPlrUpd(id,data);return;}
 if(id=="mtM"){isMuted=(bool)data.b;chtRvl=!isMuted;return;}
 if(inStrLs(conNetIDs,id)){
  addTo conEnab (str)data.ui;
  updDIV((str)data.ui,"border",conSelBrd);
  updDIV((str)data.ui,"background","#5bdb5c");
  if(id=="kH"){adSelCon=(str)data.ui;adConFlash=GAME.TIME.now()+250;}
  return;
 }
 if(id=="rES"){svrEndShow=false;svrEndCd=0;}
 if(inStrLs(dsCnNtIDs,id)){
  rmFrStrLs(conEnab,(str)data.ui);
  updDIV((str)data.ui,"border",norBrd);
  updDIV((str)data.ui,"background",toolBg[1]);
  return;
 }
 if(id=="eCd"){svrEndCd=(num)data.n;if(svrEndCd>=1){svrEndShow=true;}return;}
 procDtRec(id,data);
}
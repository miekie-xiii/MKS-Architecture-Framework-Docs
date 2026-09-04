# Server Script 
# Miekie KrunkerScript Architecture Framework
# MKS AF v1.0.0

# -MKS ARCHITECTURE FRAMEWORK-

# TRIGGER LOCATIONS
num rnX={{REVIVE_TEAM_SWITCH_X}};num rnY={{REVIVE_TEAM_SWITCH_Y}};num rnZ={{REVIVE_TEAM_SWITCH_Z}}; # REV NUKE
num mgnX={{MINIGUN_X}};num mgnY={{MINIGUN_Y}};num mgnZ={{MINIGUN_Z}}; # MINIGUN
num slmX={{SLIMER_X}};num slmY={{SLIMER_Y}};num slmZ={{SLIMER_Z}}; # SLIMER
num wmnX={{WAR_MACHINE_X}};num wmnY={{WAR_MACHINE_Y}};num wmnZ={{WAR_MACHINE_Z}}; # WAR MACHINE
num bltX={{BUILD_TOOL_X}};num bltY={{BUILD_TOOL_Y}};num bltZ={{BUILD_TOOL_Z}}; # BUILD TOOL
num wepID=1;

# mute and ban lists
str[] bnPlrCon=str["xatrao","xatroa","cldb","xotrao"]; # ban players with names containing these strings
str[] banLs=str[]; # ban list
str[] mtLs=str[]; # mute list

str[] root=str["Miekie"]; # root list
str[] admin=str["admin123"]; # admin list
str[] tmpRo=str[]; # temp root
str[] tmpAd=str[]; # temp admin
str[] protAcc=str["protectedAccount123"]; # protected accounts

str[] btnIDs=str["mkAdBtnPlrs","mkAdBtnMt","mkAdBtnBn","mkAdBtnTAd","mkAdBtnTRo","mkAdBtnCon","mkAdBtnOth"];
str[] toolIDs=str["mkAdRytKick","mkAdRytBan","mkAdRytRevive","mkAdRytMute","mkAdRytGoTo","mkAdRytBring","mkAdRytPts500","mkAdRytPts1000","mkAdRytTempAd","mkAdRytTempRo"];
str[] lmgs=str["MACHINE GUN","MINIGUN"];
str[] smgs=str["SUBMACHINE GUN","AKIMBO UZI"];
str[] rifles=str["SNIPER RIFLE","ASSAULT RIFLE","FAMAS","SEMI AUTO"];
str[] laun=str["ROCKET","NOOB TUBE","WAR MACHINE"];
str[] pistols=str["PISTOL","DESERT EAGLE","REVOLVER","TECHKY-9","AUTO PISTOL","AKIMBO PISTOL","ALIEN BLASTER"];
str[] shotguns=str["SHOTGUN","SAWED OFF"];
str[] special=str["BLASTER","SLIMER","CHARGE RIFLE","CROSSBOW","COMBAT KNIFE","BOULDER","ZAPPER","COMPRESSOR"];
str[] tools=str["GRAPPLER","BUILD TOOL"];
str[] conIDs=str["mkAdConKick","mkAdConGuest","mkAdConLock","mkAdConMute","mkAdConEnd"];
str[] conLbls=str["KICK HOST","GUEST LOCK","SERVER LOCK","MUTE GUESTS","END SERVER"];
str[] conNetIDs=str["kH","gL","sL","mG","eS"];
str[] dsCnNtIDs=str["rGL","rSL","rMG","rES"];
str[] conEnab=str[];
str[] btnLbls=str["PLAYERS","MUTE","BAN","TEMP ADMIN","TEMP ROOT","CONTROLS","OTHERS"];
str[] btn=str["bPl","bMt","bBn","bTAd","bTRo","bCn"];
str[] toolLbls=str["KICK","BAN","REVIVE","MUTE","GO TO","BRING ME","+500pts","+1000pts","TEMP ADMIN","TEMP ROOT","GAVE"];
str[] actStr=str["kc","bn","rv","mt","gt","bm","5h","1t","ta","tr","aW"];
str[] rmAct=str["","rM","rB","rTA","rTR"];
str[] isGrdedAct=str["mt","ta","tr","kc","bn"];
str[] logCat=str["ACT","REQ","DENY","WEP","NET","WRNG","ERR","RM","TMP","CTRL","SYS","PLR","VC","SYNC"];

# controls
bool gstLk=false;
bool svrLk=false;
bool mtAllGst=false;

str action fnLbl(str[] src,str lbl,str[] trg) {for(num i=0;i<lengthOf src;i++){if(src[i]==lbl){return trg[i];}}return "";}

# - ADMIN PERMISSIONS -
num[] adBtn=num[0]; # admin & tmp root/admin
num[] adTool=num[0,1,4,5,3]; # admin & tmp admin

num[] rtBtn=num[0,1,2,3,4,5]; # root only
num[] rtTool=num[0,1,2,3,4,5,6,7,8,9]; # root
num[] trTool=num[0,1,2,3,4,5,6,7]; # tmp root

num[] lmgi=num[6,25];
num[] smgi=num[3,9];
num[] rifleI=num[0,1,14,7];
num[] launI=num[8,22,26];
num[] pistolI=num[2,10,4,21,16,27,11];
num[] shotI=num[5,15];
num[] specialI=num[18,23,28,13,12,29,24,30];
num[] toolI=num[20,19];

num[] tpWep=num[25,26,23,19];
# - ADMIN PERMISSIONS -

obj[] svPlrLoc=obj[];

str HASH_CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_.-";
str[] adInLobby=str[];
obj[] adSess=obj[];
str[] logHis=str[];
obj[] objPlr=obj[];
str[] plrLs=str[];
str[] plrLsID=str[];

obj action fnByID(str id){return GAME.PLAYERS.findByID(id);}
obj[] action allPlr(){return GAME.PLAYERS.list();}
bool action inStrLs(str[] arr,str v){for(num i=0;i<lengthOf arr;i++){if(arr[i]==v){return true;}}return false;}
action rmFrStrLs(str[] arr,str v){for(num i=0;i<lengthOf arr;i++){if(arr[i]==v){remove arr[i];return;}}}
str action retStr(str[] arr,str v,str[] trg){for(num i=0;i<lengthOf arr;i++){if(arr[i]==v){return trg[i];}}return "";}
bool action idInAdSess(str id){for(num i=0;i<lengthOf adSess;i++){if((str)adSess[i].id==id){return true;}}return false;}

bool action isRoot(str acc){return inStrLs(root,acc);}
bool action isTmpRoot(str acc){return inStrLs(tmpRo,acc);}
bool action hasRoot(str acc){return isRoot(acc)||isTmpRoot(acc);}
bool action isAdmin(str acc){return inStrLs(admin,acc)||inStrLs(tmpAd,acc);}
bool action isAuthorized(str acc){return inStrLs(admin,acc)||inStrLs(tmpAd,acc)||hasRoot(acc);}
bool action isProtAcc(str acc){return inStrLs(protAcc,acc);}
action netSd(str id,obj d,str pId){GAME.NETWORK.send(id,d,pId);}
action netBc(str id,obj d){GAME.NETWORK.broadcast(id,d);}
action netBcToAd(str id,obj data){for(num i=0;i<lengthOf adSess;i++){netSd(id,data,(str)adSess[i].id);}}
action logR(str cat,str msg) {
 str c="["+cat+"] ";
 str m=c+msg;
 addTo logHis m;
 for(num i=0;i<lengthOf adSess;i++){
  str r=(str)adSess[i].r;
  if(r=="ro"||r=="tr"){netSd("lR",{m:m},(str)adSess[i].id);}
 }
}


num svrEndAt=0;
num svrEndLast=-1;
bool svrEndActive=false;
num kcTeam=4;

action kcAccgToTeamNum() {
 obj[] plr=allPlr();
 for(num team=kcTeam;team>=1;team--){
  for(num i=0;i<lengthOf plr;i++){
   if((num)plr[i].team==team){GAME.ADMIN.kick((str)plr[i].id);}
  }
 }
}
action endSvrCD(num delta) {
 if(svrEndActive){
  num left=svrEndAt-GAME.TIME.now();
  num sec=(left+999-((left+999)%1000))/1000;

  if(sec!=svrEndLast){svrEndLast=sec;netBc("eCd",{n:sec});}
  if(left<=0){
   svrEndActive=false;
   svrEndAt=0;
   svrEndLast=-1;
   netBc("eCd",{n:-1});
   kcAccgToTeamNum();
  }
 }
}

# ban
action procBan(str id) {obj p=fnByID(id);if(!notEmpty p){return;}str tAcc=(str)p.accountName;for(num i=0;i<lengthOf banLs;i++){if(banLs[i]==tAcc){logR("SYS", "SERVER :: AUTO BAN :: "+tAcc);GAME.ADMIN.ban(id);}}}
bool action chkBnPlr(obj p){
 str n=UTILS.toLower((str)p.accountName);
 for(num i=0;i<lengthOf bnPlrCon;i++){
  if(UTILS.textContains(n,bnPlrCon[i])){
   logR("SYS", "SERVER :: AUTO BAN :: "+(str)p.accountName);
   GAME.ADMIN.ban((str)p.id);
   return true;
  }
 }
 return false;
}
# ban

# mute
action procMtd(obj p) {
 for(num i=0;i<lengthOf mtLs;i++){
  str acc=(str)p.accountName;
  if(acc==mtLs[i]||(str)p.username==mtLs[i]){netSd("mtM",{b:true},(str)p.id);return;}
  if(mtAllGst&&acc==""){netSd("mtM",{b:true},(str)p.id);return;}
 }
 netSd("mtM",{b:false},(str)p.id);
}
# mute

# authentication
num action hashChar(str ch) {for(num i=0;i<lengthOf HASH_CHARS;i++){if(UTILS.truncateTxt(HASH_CHARS,i,true,i+1)==ch){return i;}}return 0;}

str action genSessID(str accountID,str accountName,str playerID) {
 str input=accountID+"|"+accountName+"|"+playerID+"|"+toStr(GAME.TIME.now());
 num h1=73129;num h2=19453;num h3=91771;
 for(num i=0;i<lengthOf input;i++){
  str ch=UTILS.truncateTxt(input,i,true,i+1);
  num v=hashChar(ch);
  num n=1000000007;
  h1=(h1*257+v+17)%n;h2=(h2*131+v+h1)%n;h3=(h3*193+v+h2)%n;
 }
 num a=h1%64;num b=h2%64;num c=h3%64;num d=(h1+h2)%64;num e=(h2+h3)%64;num f=(h1+h3)%64;
 return(UTILS.truncateTxt(HASH_CHARS,a,true,a+1)+UTILS.truncateTxt(HASH_CHARS,b,true,b+1)+UTILS.truncateTxt(HASH_CHARS,c,true,c+1)+UTILS.truncateTxt(HASH_CHARS,d,true,d+1)+UTILS.truncateTxt(HASH_CHARS,e,true,e+1)+UTILS.truncateTxt(HASH_CHARS,f,true,f+1));
}

action getByIdx(str[] dst,str[] src,num[] idx) {for(num i=0;i<lengthOf idx;i++){addTo dst src[idx[i]];}}

action admAuth(str id) {
 obj p=fnByID(id);
 if(!notEmpty p||!isAuthorized((str)p.accountName)){return;}

 if(!idInAdSess((str)p.id)) {
  str acNm=(str)p.accountName;
  str pId=(str)p.id;
  str sessID=genSessID((str)p.accountID,acNm,pId);
  str rl="ad";
  str[] b=str[];str[] c=str[];str[] t=str[];str[] u=str[];
  str[] l=str[];str[] s=str[];str[] r=str[];str[] x=str[];str[] q=str[];str[] h=str[];str[] z=str[];str[] w=str[];str[] ci=str[];str[] cl=str[];str[] ce=str[];str[] lr=str[];str[] lh=str[];

  if(hasRoot(acNm)) {
   if(isRoot(acNm)){rl="ro";getByIdx(b,btnIDs,rtBtn);getByIdx(c,btnLbls,rtBtn);getByIdx(t,toolIDs,rtTool);getByIdx(u,toolLbls,rtTool);}
   else{rl="tr";getByIdx(b,btnIDs,adBtn);getByIdx(c,btnLbls,adBtn);getByIdx(t,toolIDs,trTool);getByIdx(u,toolLbls,trTool);}
   l=lmgs;s=smgs;r=rifles;x=laun;q=pistols;h=shotguns;z=special;w=tools;ci=conIDs;cl=conLbls;ce=conEnab;lr=logCat;
   num st=lengthOf logHis-30;
   if(st<0){st=0;}
   for(num i=st;i<lengthOf logHis;i++){addTo lh logHis[i];}
  }
  else {
   if(inStrLs(tmpAd,acNm)){rl="ta";}
   getByIdx(b,btnIDs,adBtn);getByIdx(c,btnLbls,adBtn);
   getByIdx(t,toolIDs,adTool);getByIdx(u,toolLbls,adTool);
  }

  addTo adSess {id:pId,accN:acNm,sId:sessID,r:rl};
  netSd("sID",{k:sessID,r:rl},pId);
  netSd("aUI",{b:b,c:c,t:t,u:u,l:l,s:s,r:r,x:x,p:q,h:h,z:z,w:w,ci:ci,cl:cl,ce:ce},pId);
  netSd("lH",{lr:lr,lh:lh},pId);
 }
 addTo adInLobby id;
}
action rmAdSess(str id) { for(num i=0;i<lengthOf adSess;i++){if((str)adSess[i].id==id){remove adSess[i];break;}}}
bool action verSessId(str sdr,str sID) {
 for(num i=0;i<lengthOf adSess;i++){if((str)adSess[i].id==sdr&&(str)adSess[i].sId==sID){return true;}}return false;
}

action invalidAdReq(str sdr,str acc){rmAdSess(sdr);logR("ERR",acc+" :: sent INVALID REQUEST :: SERVER");}
bool action verAd(str sdr,str sId) {
 obj p=fnByID(sdr);if(!notEmpty p){return false;}
 str acc=(str)p.accountName;
 if(!verSessId(sdr,sId)||!isAuthorized(acc)){invalidAdReq(sdr,acc);return false;}
 return true;
}
# authentication

# authorization
bool action procActPerm(str a,str id,str t) {
 bool allo=true;
 if(isRoot(t)){allo=false;}
 else if(!isRoot(a)&&isProtAcc(t)){allo=false;}
 else if(isTmpRoot(a)&&isTmpRoot(t)){allo=false;}
 else if(isAdmin(a)&&isTmpRoot(t)){allo=false;}
 else if(isAdmin(a)&&isAdmin(t)){allo=false;}
 str lbl=retStr(actStr,id,toolLbls);
 if(!allo){logR("DENY",a+" :: "+lbl+" DENIED :: "+t);}
 return allo;
}
# authorization

# network security
obj[] rlRec=obj[];
bool action rlLogged(str id) {
 for(num i=0;i<lengthOf rlRec;i++){
  if((str)rlRec[i].id==id){
   if((bool)rlRec[i].log){return true;}
   rlRec[i].log=true;
   return false;
  }
 }
 return false;
}
bool action allowReq(str id) {
 num now=GAME.TIME.now();

 for(num i=0;i<lengthOf rlRec;i++){
  if((str)rlRec[i].id==id){
   if(now-(num)rlRec[i].tm>=1000){rlRec[i].ct=1;rlRec[i].tm=now;rlRec[i].exp=now+5000;rlRec[i].log=false;return true;}
   (num)rlRec[i].ct+=1;
   if((num)rlRec[i].ct>5){return false;}
   return true;
  }
 }
 addTo rlRec {id:id,ct:1,tm:now,exp:now+5000,log:false};
 return true;
}
action rmRL(str id) {for(num i=lengthOf rlRec-1;i>=0;i--){if((str)rlRec[i].id==id){remove rlRec[i];}}}
action rlTime(num delta) {
 num now=GAME.TIME.now();
 for(num i=lengthOf rlRec-1;i>=0;i--){if(now>=(num)rlRec[i].exp){remove rlRec[i];}}
}

num action validAdPkt(str id,obj data,obj p) {
 if((str)data.sI==""){return 0;}

 if(inStrLs(conNetIDs,id)||inStrLs(dsCnNtIDs,id)){return 4;}
 if(inStrLs(btn,id)){return 1;}

 if((str)data.tU==""&&(str)data.w==""){return 0;}
 if(inStrLs(actStr,id)){return 2;}
 if(inStrLs(rmAct,id)){return 3;}
 logR("ERR",(str)p.accountName+" :: sent INVALID <"+id+"> net req :: Server");
 return 0;
}
# network security

# data request
str[] dtRq=str[];

bool action dtReqUsed(str pId,str type) {str k=pId+"|"+type;for(num i=0;i<lengthOf dtRq;i++){if(dtRq[i]==k){return true;}}addTo dtRq k;return false;}

action procDtReq(str id,obj data,str pId) {
 str sId=(str)data.sI;
 if(!verAd(pId,sId)){return;}
 str type="";str resId="";

 if(id=="bPl"){type="pl";resId="plL";}
 if(id=="bMt"){type="mt";resId="mtL";}
 if(id=="bBn"){type="bn";resId="bnL";}
 if(id=="bTAd"){type="tAd";resId="tAdL";}
 if(id=="bTRo"){type="tRo";resId="tRoL";}

 if(type==""){return;}
 if(dtReqUsed(pId,type)){netSd(resId,{d:""},pId);return;}

 obj s=fnByID(pId);
 if(!notEmpty s){return;}
 if(type=="pl"){netSd(resId,{d:plrLs},pId);}
 if(type=="mt"){netSd(resId,{d:mtLs},pId);}
 if(type=="bn"){netSd(resId,{d:banLs},pId);}
 if(type=="tAd"){netSd(resId,{d:tmpAd},pId);}
 if(type=="tRo"){netSd(resId,{d:tmpRo},pId);}

 logR("REQ",(str)s.accountName+" :: req <"+id+"> data :: Server");
}
action rmDtRq(str pId) {for(num i=lengthOf dtRq-1;i>=0;i--){if(UTILS.truncateTxt(dtRq[i],0,true,lengthOf pId)==pId){remove dtRq[i];}}}
# data request

# sync
num nxtPlrLs=0;
num plrLsCd=0;

bool plrJn=false;
bool plrLf=false;
bool rnPlrLs=false;

str order="0123456789abcdefghijklmnopqrstuvwxyz";

num action getCharRank(str c){
 for(num i=0;i<lengthOf order;i++){
  if(GAME.UTILS.truncateTxt(order,i,true,i+1)==c){return i;}
 }
 return 999;
}

bool action isNameBefore(str a,str b){
 num m=lengthOf a;
 if(lengthOf b<m){m=lengthOf b;}

 for(num i=0;i<m;i++){
  num x=getCharRank(GAME.UTILS.truncateTxt(a,i,true,i+1));
  num y=getCharRank(GAME.UTILS.truncateTxt(b,i,true,i+1));
  if(x!=y){return x<y;}
 }
 return lengthOf a<lengthOf b;
}
bool action renewPlrLs(){
 rnPlrLs=true;
 plrJn=false;
 plrLf=false;
 obj[] ps=GAME.PLAYERS.list();
 str[] nLs=str[];
 str[] nIDs=str[];
 str[] nSort=str[];
 obj[] nObj=obj[];
 for(num i=0;i<lengthOf ps;i++){
  if(plrJn||plrLf){rnPlrLs=false;return false;}
  obj p=ps[i];
  if(chkBnPlr(p)){continue;}
  str n=(str)p.accountName;
  if(n==""){n=(str)p.username;}
  addTo nLs n;
  addTo nIDs (str)p.id;
  addTo nSort GAME.UTILS.toLower(n);
  addTo nObj {i:(str)p.id,n:n};
 }
 for(num i=1;i<lengthOf nLs;i++){
  if(plrJn||plrLf){rnPlrLs=false;return false;}
  str n=nLs[i];
  str id=nIDs[i];
  str s=nSort[i];
  obj o=nObj[i];
  num j=i-1;
  while(j>=0&&isNameBefore(s,nSort[j])){
   nLs[j+1]=nLs[j];
   nIDs[j+1]=nIDs[j];
   nSort[j+1]=nSort[j];
   nObj[j+1]=nObj[j];
   j--;
  }
  nLs[j+1]=n;
  nIDs[j+1]=id;
  nSort[j+1]=s;
  nObj[j+1]=o;
 }
 plrLs=nLs;
 plrLsID=nIDs;
 objPlr=nObj;
 if(plrJn||plrLf){rnPlrLs=false;return false;}
 plrJn=false;
 plrLf=false;
 rnPlrLs=false;
 logR("SYNC","SERVER :: PLAYER LIST RENEWED :: has ROOT");
 return true;
}

action sendPlrLs(){
 for(num i=0;i<lengthOf adSess;i++){
  netSd("UPL",{ls:plrLs},(str)adSess[i].id);
 }
}

action updPlrLs(){
 num t=Math.ceil((nxtPlrLs-GAME.TIME.now())/1000);
 if(t==5&&plrLsCd!=5){
  logR("SYNC","SERVER :: PLAYER LIST RENEWS IN 5 SECONDS :: has ROOT");
  plrLsCd=5;
 }
 if(!rnPlrLs&&(plrJn||plrLf)){logR("SYNC","SERVER :: PLAYER LIST RENEWAL RESTARTED :: has ROOT");if(renewPlrLs()){sendPlrLs();}return;}
 if(GAME.TIME.now()>=nxtPlrLs&&!rnPlrLs){
  if(!renewPlrLs()){return;}
  sendPlrLs();
  plrLsCd=0;
  nxtPlrLs=GAME.TIME.now()+30000;
 }
}

action syncPlrLs(str type,str id){
 obj p=fnByID(id);
 if(!notEmpty p){return;}
 str pId=(str)p.id;str pAc=(str)p.accountName;
 bool ls=true;
 bool f=false;
 if(pAc==""){ls=false;pAc=(str)p.username;}
 if(type=="pl"){
  for(num i=0;i<lengthOf plrLsID;i++){if(plrLsID[i]==pId){f=true;break;}}
  if(!f){logR("PLR",(str)p.username+" :: joined :: SERVER");if(rnPlrLs){plrJn=true;return;}addTo plrLs pAc;addTo plrLsID pId;addTo objPlr {i:pId,n:pAc};}
 }
 for(num j=0;j<lengthOf adSess;j++){
  if(type=="pl"){if(!f){netSd("plA",{n:pAc},(str)adSess[j].id);}}
  if(type=="bn"){if(ls){netSd("bnA",{n:pAc},(str)adSess[j].id);}}
  if(type=="mt"){netSd("mtA",{n:pAc},(str)adSess[j].id);}
  if(type=="ta"){netSd("taA",{n:pAc},(str)adSess[j].id);}
  if(type=="tr"){netSd("trA",{n:pAc},(str)adSess[j].id);}
 }
}

action syncPlrRm(str id){
 for(num i=lengthOf objPlr-1;i>=0;i--){if((str)objPlr[i].i==id){logR("PLR",(str)objPlr[i].n+" :: left :: SERVER");if(rnPlrLs){plrLf=true;return;}remove objPlr[i];break;}}
 for(num i=lengthOf plrLsID-1;i>=0;i--){
  if(plrLsID[i]==id){
   str pNm=plrLs[i];
   remove plrLsID[i];
   remove plrLs[i];
   for(num j=0;j<lengthOf adSess;j++){netSd("plD",{n:pNm},(str)adSess[j].id);}
   break;
  }
 }
}
str action getPlrNm(str nM) {
 obj[] plrs=allPlr();
 for(num i=0;i<lengthOf plrs;i++){if((str)plrs[i].accountName==nM||(str)plrs[i].username==nM){return (str)plrs[i].id;}}
 return "";
}
action syncRmPlrLs(str id,str nM) {
 for(num j=0;j<lengthOf adSess;j++){netSd(id,{n:nM},(str)adSess[j].id);}
 str pId=getPlrNm(nM);
 if(pId==""){return;}
 if(id=="rM"){netSd("mtM",{b:false},pId);return;}
 if(id=="rTA"||id=="rTR"){rmAdSess(pId);netSd("clP",{},pId);}
}
# sync

# action security
str action fnIdByName(str tUsr){
 obj[] plr=allPlr();
 for(num i=0;i<lengthOf plr;i++) {
  str pAcc=(str)plr[i].accountName;
  str pUNm=(str)plr[i].username;
  if(pAcc==""){pAcc=pUNm;}
  if(pAcc==tUsr||pUNm==tUsr) {
   return (str)plr[i].id;
   break;
  }
 }
 return "";
}
action rmPlrFromLs(str id,obj data,str pID) {
 str sId=(str)data.sI; # admin's sess id
 str sdr=pID; # sender's id
 if(!verAd(sdr,sId)){return;}

 str tNm=(str)data.tU;
 str tID=fnIdByName(tNm); # target's id

 obj a=fnByID(pID);
 if(!notEmpty a){return;}
 str aAcc=(str)a.accountName;
 if(id=="rM"){rmFrStrLs(mtLs,tNm);syncRmPlrLs(id,tNm);}
 if(id=="rB"){rmFrStrLs(banLs,tNm);syncRmPlrLs(id,tNm);}
 if(id=="rTA"){if(!isRoot(aAcc)){return;}rmFrStrLs(tmpAd,tNm);syncRmPlrLs(id,tNm);}
 if(id=="rTR"){if(!isRoot(aAcc)){return;}rmFrStrLs(tmpRo,tNm);syncRmPlrLs(id,tNm);if(inStrLs(admin,tNm)){if(tID!=""){admAuth(tID);}}} 
 str lbl=fnLbl(rmAct,id,btnLbls);
 logR("RM",aAcc+" :: REMOVED FROM "+lbl+" LIST :: "+tNm);
 return;
}

action adTpPlr(str id,obj a,obj t,str aAcc,str tAcc) {
 if(id=="gt"){a.position.x=t.position.x;a.position.y=t.position.y;a.position.z=t.position.z;}
 if(id=="bm"){t.position.x=a.position.x;t.position.y=a.position.y;t.position.z=a.position.z;}
 logR("ACT",aAcc+" :: "+(id=="gt"?"GO TO":"BRING ME")+" :: "+tAcc);
}

action grantTmpRole(str role,str sAcc,str tAcc,str tID,str aID) {
 if(inStrLs(role=="ta"?admin:root,tAcc)||(role=="ta"&&inStrLs(root,tAcc))){
  str m=role=="ta"&&inStrLs(root,tAcc)?"is a ROOT":"already "+(role=="ta"?"an ADMIN":"a ROOT");
  logR("DENY",tAcc+" :: "+m+" :: Server");return;}
 if(role=="tr"&&inStrLs(admin,tAcc)){rmAdSess(tID);netSd("clP",{},tID);}
 if(inStrLs(role=="ta"?tmpAd:tmpRo,tAcc)){logR("DENY",tAcc+" :: already a TEMP "+(role=="ta"?"ADMIN":"ROOT")+" :: Server");return;}
 if(role=="ta"&&inStrLs(tmpRo,tAcc)){rmFrStrLs(tmpRo,tAcc);
  for(num i=0;i<lengthOf adSess;i++){netSd("rTR",{n:tAcc},(str)adSess[i].id);}rmAdSess(tID);netSd("clP",{},tID);}
 if(role=="tr"&&inStrLs(tmpAd,tAcc)){rmFrStrLs(tmpAd,tAcc);
  for(num i=0;i<lengthOf adSess;i++){netSd("rTA",{n:tAcc},(str)adSess[i].id);}rmAdSess(tID);netSd("clP",{},tID);}

 addTo (role=="ta"?tmpAd:tmpRo) tAcc;
 syncPlrLs(role,tID);
 admAuth(tID);
 logR("TMP",sAcc+" :: GRANTED "+(role=="ta"?"TMP ADMIN":"TMP ROOT")+" :: "+tAcc);
}
action addLoc(obj p,bool wep){addTo svPlrLoc {id:(str)p.id,x:(num)p.position.x,y:(num)p.position.y,z:(num)p.position.z,at:GAME.TIME.now()+500,w:wep,gave:false,try:0};}
action setPlrTeam(obj t) {
 addLoc(t,false);
 t.position.x=rnX;t.position.y=rnY;t.position.z=rnZ;
}

num action getWepID(str n) {
 for(num i=0;i<lengthOf special;i++) {
  if(i<lengthOf lmgs&&n==lmgs[i]){return lmgi[i];}
  if(i<lengthOf smgs&&n==smgs[i]){return smgi[i];}
  if(i<lengthOf rifles&&n==rifles[i]){return rifleI[i];}
  if(i<lengthOf laun&&n==laun[i]){return launI[i];}
  if(i<lengthOf pistols&&n==pistols[i]){return pistolI[i];}
  if(i<lengthOf shotguns&&n==shotguns[i]){return shotI[i];}
  if(i<lengthOf special&&n==special[i]){return specialI[i];}
  if(i<lengthOf tools&&n==tools[i]){return toolI[i];}
 }
 return -1;
}

action tpWepRoom(obj p,str n) {
 p.clearLoadout();
 addLoc(p,true);
 if(n==lmgs[1]){p.position.x=mgnX;p.position.y=mgnY;p.position.z=mgnZ;}
 else if(n==special[1]){p.position.x=slmX;p.position.y=slmY;p.position.z=slmZ;}
 else if(n==laun[2]){p.position.x=wmnX;p.position.y=wmnY;p.position.z=wmnZ;}
 else if(n==tools[1]){p.position.x=bltX;p.position.y=bltY;p.position.z=bltZ;}
}

action giveWep(obj p,str a,str n,str t) {
 num id=-1;

 if(n==tools[1]){id=25;}
 else if(n==lmgs[1]){id=26;}
 else if(n==laun[2]){id=23;}
 else if(n==special[1]){id=19;}
 else{id=getWepID(n);}

 if(id>=0){if(n==tools[1]||n==lmgs[1]||n==laun[2]||n==special[1]){tpWepRoom(p,n);}p.giveWeapon(id);}
}
bool action atSavedLoc(obj p,obj loc) {
 num tol=2;
 num minX=(num)loc.x-tol;num maxX=(num)loc.x+tol;
 num minY=(num)loc.y-tol;num maxY=(num)loc.y+tol;
 num minZ=(num)loc.z-tol;num maxZ=(num)loc.z+tol;
 if((num)p.position.x>=minX&&(num)p.position.x<=maxX&&(num)p.position.y>=minY&&(num)p.position.y<=maxY&&(num)p.position.z>=minZ&&(num)p.position.z<=maxZ){return true;}
 return false;
}
action procSvPlrLoc(){
  for(num i=lengthOf svPlrLoc-1;i>=0;i--){
  if(GAME.TIME.now()<(num)svPlrLoc[i].at){continue;}

  obj p=fnByID((str)svPlrLoc[i].id);
  if(!notEmpty p){remove svPlrLoc[i];continue;}

  if(atSavedLoc(p,svPlrLoc[i])||(num)svPlrLoc[i].try>=5){remove svPlrLoc[i];continue;}
  p.position.x=(num)svPlrLoc[i].x;
  p.position.y=(num)svPlrLoc[i].y;
  p.position.z=(num)svPlrLoc[i].z;
  if((bool)svPlrLoc[i].w&&!(bool)svPlrLoc[i].gave){p.giveWeapon(wepID);svPlrLoc[i].gave=true;}
  svPlrLoc[i].at=GAME.TIME.now()+100;(num)svPlrLoc[i].try+=1;
 }
}

action procAdAct(str id,obj data,str pID) {
 str sId=(str)data.sI; # admin's sess id
 str sdr=pID; # sender's id
 if(!verAd(sdr,sId)){return;}

 str tUsr=(str)data.tU;
 str tID=fnIdByName(tUsr); # target's id
 if(tID==""){return;}

 obj a=fnByID(pID);obj t=fnByID(tID);
 if(!notEmpty a||!notEmpty t){return;}
 str aAcc=(str)a.accountName;str tAcc=(str)t.accountName;
 bool bLs=true;
 if(tAcc==""){bLs=false;tAcc=(str)t.username;}
 str act=retStr(actStr,id,toolLbls);
 str cat="ACT";
 if(id=="aW"){str w=(str)data.w;giveWep(t,aAcc,w,tAcc);cat="WEP";act+=" "+w;}
 if(id=="rv"){setPlrTeam(t);}
 if(id=="gt"||id=="bm"){adTpPlr(id,a,t,aAcc,tAcc);}
 if(id=="5h"){(num)t.score+=500;}
 if(id=="1t"){(num)t.score+=1000;}
 if(inStrLs(isGrdedAct, id)) {
  if(!procActPerm(aAcc,id,tAcc)){return;}
  if(id=="mt"){if(!inStrLs(mtLs,tAcc)){addTo mtLs tAcc;syncPlrLs(id,tID);netSd("mtM",{b:true},tID);}}
  if(id=="ta"||id=="tr"){if(isRoot(aAcc)){grantTmpRole(id,aAcc,tAcc,tID, pID);return;}}
  if(id=="kc"){GAME.ADMIN.kick(tID);act+="ED";}
  if(id=="bn"){if(bLs){addTo banLs tAcc;}syncPlrLs(id,tID);GAME.ADMIN.ban(tID);act+="NED";}
 }
 logR(cat,aAcc+" :: "+act+" :: "+tAcc);
}

action kcHst(str aAcc){obj p=GAME.CONFIG.getHost();str tAcc=(str)p.accountName;if(tAcc==""){tAcc=(str)p.username;}str act="CTRL";str m="";if(!isRoot(tAcc)){GAME.ADMIN.kick((str)p.id);m="KICKED HOST";}else{act="DENY";m="KICK HOST DENIED";}logR(act,aAcc+" :: "+m+" :: "+tAcc);}
action kcGst(){gstLk=true;obj[] plr=allPlr();for(num i=0;i<lengthOf plr;i++){if((str)plr[i].accountName==""){GAME.ADMIN.kick(plr[i].id);}}logR("SYS","SERVER :: Kicked :: all Guests");}
action mtGst(bool val){mtAllGst=val;obj[] plr=allPlr();for(num i=0;i<lengthOf plr;i++){if((str)plr[i].accountName==""){netSd("mtM",{b:val},(str)plr[i].id);}}}

action procAdCon(str id,obj data,str pID) {
 str sId=(str)data.sI;
 if(!verAd(pID,sId)){return;}

 obj a=fnByID(pID);
 if(!notEmpty a){return;}

 str aAcc=(str)a.accountName;
 if(!isRoot(aAcc)){logR("DENY",aAcc+" :: CONTROLS DENIED :: Server");return;}
 str ui=(str)data.ui;
 str lbl=fnLbl(conIDs,ui,conLbls);
 if(inStrLs(dsCnNtIDs,id)){lbl="DISABLED "+lbl;}
 else{lbl="ENABLED "+lbl;}

 str trg="Server";

 if(id=="kH"){kcHst(aAcc);return;}
 if(id=="gL"){kcGst();addTo conEnab ui;trg="Guests";}
 if(id=="sL"){if(isRoot(aAcc)){svrLk=true;addTo conEnab ui;trg="Players";}}
 if(id=="mG"){mtGst(true);addTo conEnab ui;trg="Guests";}
 if(id=="eS"){svrEndActive=true;svrEndAt=GAME.TIME.now()+45000;svrEndLast=-1;addTo conEnab ui;netBc("sc",{c:true});}

 if(id=="rGL"){gstLk=false;rmFrStrLs(conEnab,ui);trg="Guests";}
 if(id=="rSL"){if(isRoot(aAcc)){svrLk=false;rmFrStrLs(conEnab,ui);trg="Players";}}
 if(id=="rMG"){mtGst(false);rmFrStrLs(conEnab,ui);trg="Guests";}
 if(id=="rES"){svrEndActive=false;svrEndAt=0;svrEndLast=-1;netBc("eCd",{n:-1});rmFrStrLs(conEnab,ui);netBc("sc",{c:false});}

 netBcToAd(id,{ui:ui,m:""});
 logR("CTRL",aAcc+" :: "+lbl+" :: "+trg);
}
# action security

# nuke limit & revNuke & force respawn system
obj[] plrNuke=obj[];
num nkLmt=5;
bool nukeAct=false;
str[] currNkr=str[];
str[] revNkr=str[];
num rspwnChk=0;
obj[] nukeKill=obj[];
bool actNkLmt=false;
action recPlrNuke(str pId) {
 for(num i=0;i<lengthOf plrNuke;i++){if((str)plrNuke[i].pID==pId){(num)plrNuke[i].nk+=1;netSd("nkC",{c:(num)plrNuke[i].nk},pId);return;}}addTo plrNuke {pID:pId,nk:1};netSd("nkC",{c:1},pId);
}
action tpNuker(obj n) {str pId=(str)n.id;if((num)n.team==2){if(!inStrLs(revNkr,pId)){addTo revNkr pId;}n.position.x=rnX;n.position.y=rnY;n.position.z=rnZ;}}
action procNkr(str pId) {obj p=fnByID(pId);if(!inStrLs(currNkr,pId)){addTo currNkr pId;}tpNuker(p);}
action frcRspwnDdPlrs() {obj[] plrs=GAME.PLAYERS.list();for(num i=0;i<lengthOf plrs;i++){obj p=plrs[i];str pId=(str)p.id;if(!(bool)p.active&&(!isAuthorized((str)p.accountName)||inStrLs(currNkr,pId))){p.respawn();}}}
action procRevNkr(str pId,obj n){if(inStrLs(currNkr,pId)&&(num)n.team==2){tpNuker(n);}}
action schedNK(str pId) {for(num i=0;i<lengthOf nukeKill;i++){if((str)nukeKill[i].pId==pId){return;}}addTo nukeKill {pId:pId,t:GAME.TIME.now()+3000};}
action procNK() {
 for(num i=lengthOf nukeKill-1;i>=0;i--){if(GAME.TIME.now()<(num)nukeKill[i].t){continue;}obj p=fnByID((str)nukeKill[i].pId);if(!notEmpty p){remove nukeKill[i];continue;}
  if(!(bool)p.active){remove nukeKill[i];continue;}(num)p.health-=100000;(num)nukeKill[i].t=GAME.TIME.now()+250;}
}
action procEndNuke(str pId,obj p) {
 if(inStrLs(revNkr,pId)){schedNK(pId);rmFrStrLs(revNkr, pId);}rmFrStrLs(currNkr,pId);
 if(actNkLmt){
  for(num i=0;i<lengthOf plrNuke;i++){if((str)plrNuke[i].pID==pId&&(num)plrNuke[i].nk>nkLmt){schedNK(pId);
  GAME.CHAT.broadcast((str)p.accountName+" exceeded the nuke limit.","#ff4444");break;}} 
 }
 nukeAct=false;
}
# nuke limit & revNuke & force respawn system
# -MKS ARCHITECTURE FRAMEWORK-

# Runs when the game starts
public action start() {

}
# Runs every game tick
public action update(num delta) {
 rspwnChk+=delta;
 if(rspwnChk>=250){rspwnChk=0;frcRspwnDdPlrs();}
 if(lengthOf nukeKill!=0){procNK();}
 endSvrCD(delta);
 rlTime(delta);
 if(lengthOf svPlrLoc!=0){procSvPlrLoc();}
 updPlrLs();
}

# Player spawns in
public action onPlayerSpawn(str id) {
 obj p=fnByID(id);
 if(!notEmpty p){return;}
 str tAcc=(str)p.accountName;if(tAcc==""){tAcc=(str)p.username;}
 if(gstLk||svrLk){if((str)p.accountName==""||svrLk){if(!isAuthorized((str)p.accountName)){logR("SYS","SERVER :: Kicked :: "+tAcc);GAME.ADMIN.kick(id);return;}}}
 # if(!isAdmin((str)p.accountName)){GAME.ADMIN.ban(id);}
 procMtd(p);syncPlrLs("pl",id);admAuth(id);procBan(id);if(nukeAct){procRevNkr(id,p);}chkBnPlr(p);
}

public action onPlayerDeath(str id, str killerID) {
 obj player = GAME.PLAYERS.findByID(id);
 if (!notEmpty player) {return;}
}

# Called from Custom Trigger Action
public action onCustomTrigger(str pId,str customParam,num value) {
 obj p=fnByID(pId);
 if(!notEmpty p){return;}
 if(customParam=="nukeStart"){nukeAct=true;recPlrNuke(pId);}procNkr(pId);
 if(customParam=="nukeEnd"){procEndNuke(pId,p);}
}
action plrVC(obj p) {str aAcc=(str)p.accountName;if(aAcc==""){aAcc=(str)p.username;}logR("VC",aAcc+" :: USING VOICE CHAT :: SERVER");}

# Server receives network message
public action onNetworkMessage(str id,obj data,str pID) {
 obj p=fnByID(pID);
 if(!notEmpty p){return;}
 if(!allowReq(pID)){if(!rlLogged(pID)){logR("WRNG",(str)p.accountName+" :: exceeded req limit <"+id+"> :: SERVER");}return;}
 if(id=="v"){plrVC(p);return;}
 num vld=validAdPkt(id,data,p);
 if(vld==0){return;}
 logR("NET",(str)p.accountName+" :: sent valid <"+id+"> req :: SERVER");
 if(vld==1&&(str)data.r=="rq"){procDtReq(id,data,pID);}
 if(vld==2){procAdAct(id,data,pID);}
 if(vld==3){rmPlrFromLs(id,data,pID);}
 if(vld==4){procAdCon(id,data,pID);}
}

# When a player leaves the server
public action onPlayerLeave(str pId) {
 rmRL(pId);rmAdSess(pId);syncPlrRm(pId);rmDtRq(pId);rmFrStrLs(adInLobby,pId);
}

# Runs when the round ends
public action onGameEnd() {
 for(num i=0; i<lengthOf adSess;i++){netSd("clP",{},(str)adSess[i].id);}
 plrNuke=obj[];adSess=obj[];dtRq=str[];
 while(lengthOf logHis>30){remove logHis[0];}
}
import './style.css';
import playerUrl from './assets/player_idle.svg';
import slashUrl from './assets/player_attack_slash.svg';
import dayEnemyUrl from './assets/enemy_day_stalker.svg';
import nightEnemyUrl from './assets/enemy_night_wraith.svg';
import dayIconUrl from './assets/time_day.svg';
import nightIconUrl from './assets/time_night.svg';

type TimeState = 'day'|'night';
type Point = {x:number;y:number};
type Rect = {x:number;y:number;w:number;h:number};
type Enemy = Point & {alive:boolean};

const canvas=document.querySelector<HTMLCanvasElement>('#world')!;
const context=canvas.getContext('2d')!;
const timeElement=document.querySelector<HTMLElement>('#time')!;
const timeIcon=document.querySelector<HTMLImageElement>('#time-icon')!;
const objectiveElement=document.querySelector<HTMLElement>('#objective')!;
const switchesElement=document.querySelector<HTMLElement>('#switches')!;
const defeatedElement=document.querySelector<HTMLElement>('#defeated')!;
const waitButton=document.querySelector<HTMLButtonElement>('#wait')!;
const messageElement=document.querySelector<HTMLElement>('#message')!;
const summary=document.querySelector<HTMLElement>('#summary')!;
const summaryData=document.querySelector<HTMLElement>('#summary-data')!;
const zoneData=document.querySelector<HTMLElement>('#zone-data')!;

const WORLD={w:1120,h:680}; const SPEED=190; const PLAYER_RADIUS=18; const ATTACK_RADIUS=82;
const home:Point={x:120,y:560};
const qaStart:Point=new URLSearchParams(location.search).get('qa')==='zone-a'?{x:345,y:250}:home;
const zones=[{name:'Zone A · Sunken Court',x:345,y:175,color:'#655333'},{name:'Zone B · Moon Garden',x:850,y:470,color:'#3e5068'}] as const;
const objectives=[
  {name:'Inspect Zone A',x:zones[0].x,y:zones[0].y,phase:'day'},
  {name:'Inspect Zone B',x:zones[1].x,y:zones[1].y,phase:'day'},
  {name:'Return Home and Wait Until Night',x:home.x,y:home.y,phase:'wait'},
  {name:'Inspect Zone A at Night',x:zones[0].x,y:zones[0].y,phase:'night'},
  {name:'Inspect Zone B at Night',x:zones[1].x,y:zones[1].y,phase:'night'},
  {name:'Return Home',x:home.x,y:home.y,phase:'night'},
] as const;
const walls:Rect[]=[
  {x:0,y:0,w:1120,h:35},{x:0,y:645,w:1120,h:35},{x:0,y:0,w:35,h:680},{x:1085,y:0,w:35,h:680},
  {x:515,y:35,w:38,h:210},{x:515,y:335,w:38,h:220},{x:160,y:340,w:355,h:36},{x:675,y:300,w:340,h:36},
  {x:675,y:500,w:36,h:145},{x:930,y:90,w:36,h:210},
];
const daySpawns=[{x:305,y:165},{x:380,y:205},{x:345,y:115}];
const nightSpawns=[{x:805,y:445},{x:880,y:505},{x:900,y:420}];
function load(url:string){const value=new Image();value.src=url;return value;}
const images={player:load(playerUrl),slash:load(slashUrl),dayEnemy:load(dayEnemyUrl),nightEnemy:load(nightEnemyUrl),dayIcon:load(dayIconUrl),nightIcon:load(nightIconUrl)};

let timeState:TimeState='day'; let player:Point={...qaStart}; let enemies:Enemy[]=[]; let objectiveIndex=0; let switches=0;
let defeated={day:0,night:0}; let entered={aDay:false,aNight:false,bDay:false,bNight:false}; let finished=false;
let attackUntil=0; let transitionUntil=0; let messageUntil=0; let lastTime=performance.now(); const keys=new Set<string>();

function spawnEnemies(){const source=timeState==='day'?daySpawns:nightSpawns;enemies=source.map(item=>({...item,alive:true}));}
function atHome(){return Math.hypot(player.x-home.x,player.y-home.y)<85;}
function resetSession(){timeState='day';player={...qaStart};objectiveIndex=0;switches=0;defeated={day:0,night:0};entered={aDay:false,aNight:false,bDay:false,bNight:false};finished=false;attackUntil=0;transitionUntil=0;messageElement.textContent='';summary.hidden=true;spawnEnemies();updateHud();canvas.focus();}
function updateHud(){const day=timeState==='day';timeElement.textContent=day?'DAY':'NIGHT';timeIcon.src=day?dayIconUrl:nightIconUrl;document.body.classList.toggle('night',!day);objectiveElement.textContent=objectives[objectiveIndex]?.name??'Complete';switchesElement.textContent=String(switches);defeatedElement.textContent=`Day ${defeated.day} · Night ${defeated.night}`;waitButton.textContent=day?'Wait Until Night ':'Wait Until Day ';const key=document.createElement('kbd');key.textContent='Q';waitButton.append(key);waitButton.disabled=!atHome()||finished;}
function setMessage(text:string,duration=1300){messageElement.textContent=text;messageUntil=performance.now()+duration;}
function switchTime(){if(finished)return;if(!atHome()){setMessage('Return to Home to wait');return;}timeState=timeState==='day'?'night':'day';switches+=1;spawnEnemies();transitionUntil=performance.now()+650;setMessage(timeState==='day'?'Day arrives':'Night falls');if(objectives[objectiveIndex]?.phase==='wait'&&timeState==='night')objectiveIndex+=1;updateHud();}
function collides(x:number,y:number){return walls.some(w=>x+PLAYER_RADIUS>w.x&&x-PLAYER_RADIUS<w.x+w.w&&y+PLAYER_RADIUS>w.y&&y-PLAYER_RADIUS<w.y+w.h)||enemies.some(e=>e.alive&&Math.hypot(x-e.x,y-e.y)<42);}
function attack(){if(finished||performance.now()<transitionUntil)return;attackUntil=performance.now()+220;const target=enemies.filter(e=>e.alive&&Math.hypot(player.x-e.x,player.y-e.y)<=ATTACK_RADIUS).sort((a,b)=>Math.hypot(player.x-a.x,player.y-a.y)-Math.hypot(player.x-b.x,player.y-b.y))[0];if(!target){setMessage('No enemy in range',650);return;}target.alive=false;defeated[timeState]+=1;setMessage(`${timeState==='day'?'Day Stalker':'Night Wraith'} defeated`);updateHud();}
function checkObjective(){const step=objectives[objectiveIndex];if(!step||Math.hypot(player.x-step.x,player.y-step.y)>72)return;if(step.phase==='wait'){setMessage('Use Wait at Home to change time');return;}if(step.phase!==timeState){setMessage(`This step is observed during ${step.phase.toUpperCase()}`);return;}if(objectiveIndex===0)entered.aDay=true;if(objectiveIndex===1)entered.bDay=true;if(objectiveIndex===3)entered.aNight=true;if(objectiveIndex===4)entered.bNight=true;objectiveIndex+=1;if(objectiveIndex===objectives.length){finished=true;showSummary();}updateHud();}
function showSummary(){summaryData.textContent=`Time switched: ${switches>0?'Yes':'No'} · Switches: ${switches} · Defeated in Day: ${defeated.day} · Defeated in Night: ${defeated.night}`;zoneData.textContent=`Zone A entered — Day: ${entered.aDay?'Yes':'No'}, Night: ${entered.aNight?'Yes':'No'} · Zone B entered — Day: ${entered.bDay?'Yes':'No'}, Night: ${entered.bNight?'Yes':'No'}`;summary.hidden=false;}
function update(dt:number,now:number){if(!finished&&now>=transitionUntil){let dx=0,dy=0;if(keys.has('KeyA')||keys.has('ArrowLeft'))dx-=1;if(keys.has('KeyD')||keys.has('ArrowRight'))dx+=1;if(keys.has('KeyW')||keys.has('ArrowUp'))dy-=1;if(keys.has('KeyS')||keys.has('ArrowDown'))dy+=1;if(dx||dy){const length=Math.hypot(dx,dy);const nx=player.x+dx/length*SPEED*dt,ny=player.y+dy/length*SPEED*dt;if(!collides(nx,player.y))player.x=nx;if(!collides(player.x,ny))player.y=ny;}checkObjective();}waitButton.disabled=!atHome()||finished;if(messageElement.textContent&&now>messageUntil)messageElement.textContent='';}
function sprite(img:HTMLImageElement,x:number,y:number,size=62,alpha=1){context.globalAlpha=alpha;context.drawImage(img,x-size/2,y-size/2,size,size);context.globalAlpha=1;}
function draw(now:number){const night=timeState==='night';context.fillStyle=night?'#20283b':'#344039';context.fillRect(0,0,WORLD.w,WORLD.h);context.strokeStyle=night?'#2b3550':'#405049';for(let x=0;x<WORLD.w;x+=40){context.beginPath();context.moveTo(x,0);context.lineTo(x,WORLD.h);context.stroke();}for(let y=0;y<WORLD.h;y+=40){context.beginPath();context.moveTo(0,y);context.lineTo(WORLD.w,y);context.stroke();}zones.forEach((z,i)=>{context.beginPath();context.arc(z.x,z.y,118,0,Math.PI*2);context.fillStyle=z.color;context.fill();context.fillStyle='#edf0e8';context.font='700 15px system-ui';context.textAlign='center';context.fillText(z.name,z.x,z.y-92);context.fillStyle='#bac4bf';context.font='12px system-ui';context.fillText(i===0?'Old stone court':'Overgrown garden',z.x,z.y+96);});context.fillStyle='#345b48';context.fillRect(60,515,120,92);context.fillStyle='#edf0e8';context.font='700 13px system-ui';context.fillText('HOME · REST',home.x,625);context.fillStyle='#111817';walls.forEach(w=>context.fillRect(w.x,w.y,w.w,w.h));context.strokeStyle='#57645f';context.lineWidth=3;walls.forEach(w=>context.strokeRect(w.x,w.y,w.w,w.h));const step=objectives[objectiveIndex];if(step){context.beginPath();context.arc(step.x,step.y,78+Math.sin(now/180)*4,0,Math.PI*2);context.strokeStyle='#e4c66f';context.lineWidth=4;context.stroke();}enemies.forEach(e=>{if(e.alive)sprite(timeState==='day'?images.dayEnemy:images.nightEnemy,e.x,e.y,64);});sprite(images.player,player.x,player.y,62);if(now<attackUntil)sprite(images.slash,player.x+35,player.y-7,72,(attackUntil-now)/220);if(now<transitionUntil){context.fillStyle=`rgba(${night?'36,43,72':'226,197,112'},${Math.max(0,(transitionUntil-now)/650)*.38})`;context.fillRect(0,0,WORLD.w,WORLD.h);}}
function frame(now:number){const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;update(dt,now);draw(now);requestAnimationFrame(frame);}
window.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(event.code))event.preventDefault();keys.add(event.code);if((event.code==='Space'||event.code==='KeyE')&&!event.repeat)attack();if(event.code==='KeyQ'&&!event.repeat)switchTime();if(event.code==='KeyR')resetSession();});
window.addEventListener('keyup',event=>keys.delete(event.code));window.addEventListener('blur',()=>keys.clear());waitButton.addEventListener('click',switchTime);document.querySelector<HTMLButtonElement>('#restart')!.addEventListener('click',resetSession);document.querySelector<HTMLButtonElement>('#summary-restart')!.addEventListener('click',resetSession);canvas.addEventListener('pointerdown',()=>canvas.focus());
resetSession();requestAnimationFrame(frame);

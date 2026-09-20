import './style.css';
import playerUrl from './assets/player_farmer.svg';
import seedUrl from './assets/seed_pouch.svg';
import emptyUrl from './assets/plot_empty.svg';
import plantedUrl from './assets/crop_planted.svg';
import growingUrl from './assets/crop_growing.svg';
import readyUrl from './assets/crop_ready.svg';
import produceUrl from './assets/produce.svg';

type PlotState='empty'|'planted'|'growing'|'ready';
type Point={x:number;y:number};
type Plot=Point&{state:PlotState;plantedAt:number};

const canvas=document.querySelector<HTMLCanvasElement>('#world')!;
const context=canvas.getContext('2d')!;
const seedsElement=document.querySelector<HTMLElement>('#seeds')!;
const harvestedElement=document.querySelector<HTMLElement>('#harvested')!;
const produceElement=document.querySelector<HTMLElement>('#produce')!;
const promptElement=document.querySelector<HTMLElement>('#prompt')!;
const messageElement=document.querySelector<HTMLElement>('#message')!;
const reflectButton=document.querySelector<HTMLButtonElement>('#reflect')!;
const reflection=document.querySelector<HTMLElement>('#reflection')!;
const reflectionData=document.querySelector<HTMLElement>('#reflection-data')!;

const WORLD={w:960,h:600};const SPEED=185;const PLAYER_RADIUS=18;const INTERACT_RANGE=78;
const start:Point={x:120,y:470};const seedCache:Point={x:170,y:165};
const plotPositions=[{x:430,y:210},{x:625,y:210},{x:530,y:405}];
const qaMode=new URLSearchParams(location.search).get('qa');
function load(url:string){const value=new Image();value.src=url;return value;}
const images={player:load(playerUrl),seed:load(seedUrl),empty:load(emptyUrl),planted:load(plantedUrl),growing:load(growingUrl),ready:load(readyUrl),produce:load(produceUrl)};

let player:Point={...start};let plots:Plot[]=[];let seeds=0;let harvested=0;let produce=0;let messageUntil=0;let lastTime=performance.now();const keys=new Set<string>();

function resetSession(){player=qaMode==='seed'?{x:170,y:225}:qaMode?{x:430,y:280}:{...start};plots=plotPositions.map(position=>({...position,state:'empty',plantedAt:0}));seeds=qaMode==='plant'?1:0;harvested=0;produce=0;if(qaMode==='growth'){plots[0].state='planted';plots[0].plantedAt=performance.now();}if(qaMode==='ready')plots[0].state='ready';messageElement.textContent='';promptElement.hidden=true;reflectButton.hidden=true;reflection.hidden=true;updateHud();canvas.focus();}
function updateHud(){seedsElement.textContent=String(seeds);harvestedElement.textContent=String(harvested);produceElement.textContent=String(produce);reflectButton.hidden=harvested<2;}
function setMessage(text:string,duration=1200){messageElement.textContent=text;messageUntil=performance.now()+duration;}
function nearbyPlot(){return plots.map((plot,index)=>({plot,index,distance:Math.hypot(player.x-plot.x,player.y-plot.y)})).filter(item=>item.distance<=INTERACT_RANGE).sort((a,b)=>a.distance-b.distance)[0];}
function promptText(){if(Math.hypot(player.x-seedCache.x,player.y-seedCache.y)<=INTERACT_RANGE)return '[E] Take one Seed';const nearby=nearbyPlot();if(!nearby)return '';if(nearby.plot.state==='empty')return seeds>0?'[E] Plant Seed':'Need a Seed';if(nearby.plot.state==='planted')return 'Planted · waiting';if(nearby.plot.state==='growing')return 'Growing · waiting';return '[E] Harvest Produce';}
function interact(){if(!reflection.hidden)return;if(Math.hypot(player.x-seedCache.x,player.y-seedCache.y)<=INTERACT_RANGE){seeds+=1;setMessage('Seed collected');updateHud();return;}const nearby=nearbyPlot();if(!nearby)return;const plot=nearby.plot;if(plot.state==='empty'){if(seeds===0){setMessage('Pick up a seed first');return;}seeds-=1;plot.state='planted';plot.plantedAt=performance.now();setMessage(`Plot ${nearby.index+1} planted`);}else if(plot.state==='ready'){plot.state='empty';plot.plantedAt=0;harvested+=1;produce+=1;setMessage('Harvest complete · Produce +1',1700);}updateHud();}
function collides(x:number,y:number){return x<48||x>WORLD.w-48||y<48||y>WORLD.h-48;}
function updateGrowth(now:number){plots.forEach(plot=>{if(plot.state==='planted'&&now-plot.plantedAt>=4000)plot.state='growing';if(plot.state==='growing'&&now-plot.plantedAt>=8000){plot.state='ready';setMessage('A crop is ready to harvest',1600);}});}
function update(dt:number,now:number){if(reflection.hidden){let dx=0,dy=0;if(keys.has('KeyA')||keys.has('ArrowLeft'))dx-=1;if(keys.has('KeyD')||keys.has('ArrowRight'))dx+=1;if(keys.has('KeyW')||keys.has('ArrowUp'))dy-=1;if(keys.has('KeyS')||keys.has('ArrowDown'))dy+=1;if(dx||dy){const length=Math.hypot(dx,dy);const nx=player.x+dx/length*SPEED*dt,ny=player.y+dy/length*SPEED*dt;if(!collides(nx,player.y))player.x=nx;if(!collides(player.x,ny))player.y=ny;}updateGrowth(now);const text=promptText();promptElement.textContent=text;promptElement.hidden=!text;}if(messageElement.textContent&&now>messageUntil)messageElement.textContent='';}
function sprite(img:HTMLImageElement,x:number,y:number,w=64,h=w,alpha=1){context.globalAlpha=alpha;context.drawImage(img,x-w/2,y-h/2,w,h);context.globalAlpha=1;}
function draw(now:number){context.fillStyle='#8da873';context.fillRect(0,0,WORLD.w,WORLD.h);context.strokeStyle='#849e6d';for(let x=0;x<WORLD.w;x+=40){context.beginPath();context.moveTo(x,0);context.lineTo(x,WORLD.h);context.stroke();}for(let y=0;y<WORLD.h;y+=40){context.beginPath();context.moveTo(0,y);context.lineTo(WORLD.w,y);context.stroke();}context.fillStyle='#c9bd83';context.fillRect(70,420,140,115);context.fillStyle='#f7f1cf';context.font='700 13px system-ui';context.textAlign='center';context.fillText('START',140,555);context.fillStyle='#637a55';context.fillRect(90,85,160,160);context.fillStyle='#f4efd2';context.fillText('SEED CACHE',170,88);sprite(images.seed,seedCache.x,seedCache.y,68);plots.forEach((plot,index)=>{sprite(images.empty,plot.x,plot.y,112,76);if(plot.state!=='empty'){const asset=plot.state==='planted'?images.planted:plot.state==='growing'?images.growing:images.ready;const bob=plot.state==='ready'?Math.sin(now/180)*3:0;sprite(asset,plot.x,plot.y-9+bob,70);}context.fillStyle='#f7f0d4';context.fillText(`PLOT ${index+1}`,plot.x,plot.y+56);});sprite(images.player,player.x,player.y,66);if(harvested>0){sprite(images.produce,875,95,50);context.fillStyle='#fff7d9';context.fillText(`× ${produce}`,915,100);}}
function frame(now:number){const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;update(dt,now);draw(now);requestAnimationFrame(frame);}
function showReflection(){reflectionData.textContent=`Harvested: ${harvested} · Produce: ${produce} · Current Seeds: ${seeds}`;reflection.hidden=false;promptElement.hidden=true;}
window.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.code))event.preventDefault();keys.add(event.code);if(event.code==='KeyE'&&!event.repeat)interact();if(event.code==='KeyR')resetSession();});window.addEventListener('keyup',event=>keys.delete(event.code));window.addEventListener('blur',()=>keys.clear());canvas.addEventListener('pointerdown',()=>canvas.focus());document.querySelector<HTMLButtonElement>('#restart')!.addEventListener('click',resetSession);reflectButton.addEventListener('click',showReflection);document.querySelector<HTMLButtonElement>('#continue')!.addEventListener('click',()=>{reflection.hidden=true;canvas.focus();});
resetSession();requestAnimationFrame(frame);

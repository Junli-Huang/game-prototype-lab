import './style.css';

type Item = { rotated: boolean; id: number; name: string; w: number; h: number; value: number; visual: string; tint: string; edge: string; x?: number; y?: number };
// Fixed sequence: 12 distinct items, 60 cells. No random loot or item effects.
const specs: [string, number, number, number, string, string, string][] = [
 ['急救药',1,1,15,'medicine','#e4eddf','#749071'],
 ['罐装肉',1,2,25,'can','#eedcc6','#af8b60'],
 ['维修工具',2,2,50,'tool','#d6e2dc','#6e9081'],
 ['绷带',2,1,20,'bandage','#f0e9cf','#ae9c68'],
 ['废旧电池',2,2,35,'battery','#d9e2ce','#879663'],
 ['干燥种子',2,2,30,'seed','#e2e6be','#8e9a55'],
 ['机械零件',2,3,65,'gear','#dae1e7','#7a8e9e'],
 ['未知组织',2,3,80,'organ','#e7d1db','#a56e8c'],
 ['旧式步枪',1,4,70,'rifle','#dfd8c9','#8f8066'],
 ['黑色遗物',3,3,120,'relic','#d6d1e3','#817395'],
 ['木板',1,3,18,'plank','#eadbc1','#aa8855'],
 ['密封仪器',3,5,190,'device','#cddfdc','#648f85'],
];
// Small prototype-owned vector illustrations: visual identity, not a renderer system.
const drawings: Record<string,string> = {
 medicine:'<rect x="20" y="14" width="24" height="42" rx="7" fill="#eef5de"/><path d="M24 8h16v10H24z" fill="#59735c"/><path d="M29 27h6v7h7v6h-7v7h-6v-7h-7v-6h7z" fill="#cc5f50"/>',
 can:'<rect x="15" y="12" width="34" height="44" rx="7" fill="#bb6b4b"/><ellipse cx="32" cy="13" rx="17" ry="6" fill="#ddd6bd"/><path d="M17 26h30v17H17z" fill="#ecd6a4"/><path d="M25 32q10-9 15 4q-10 8-15-4" fill="#ad664c"/>',
 tool:'<path d="M24 19v-7h16v7" fill="none" stroke="#53675c" stroke-width="5"/><rect x="8" y="21" width="48" height="32" rx="5" fill="#668e79"/><path d="M9 33h46M30 29v10" stroke="#e5dec0" stroke-width="5"/>',
 bandage:'<rect x="7" y="23" width="50" height="21" rx="10" fill="#d3bb88" transform="rotate(-25 32 32)"/><path d="M24 22h17v22H24z" fill="#f6ead2" transform="rotate(-25 32 32)"/>',
 battery:'<rect x="12" y="19" width="40" height="36" rx="4" fill="#697d59"/><path d="M17 12h9v7h-9zm21 0h9v7h-9z" fill="#a68f61"/><path d="m35 23-12 16h10l-4 12 15-19H33z" fill="#ead799"/>',
 seed:'<path d="m17 12 30 0-4 10 9 31H12l9-31z" fill="#b8a371"/><path d="M22 19h21" stroke="#655f3c" stroke-width="3"/><path d="M32 48V29q-14-7-14 4q0 9 14 7q15-1 14-11q-9-3-14 7" fill="#627c42"/>',
 gear:'<path d="M26 7h12l2 9 8-4 8 9-6 7 7 6-4 12-10-1-2 11H26l-3-10-10 3-7-11 7-8-5-8 10-9 8 4z" fill="#8596a1"/><circle cx="32" cy="32" r="11" fill="#dfe8e9"/><circle cx="32" cy="32" r="5" fill="#647780"/>',
 organ:'<path d="M32 13c-16-14-30 12-17 29s31 18 36-1S42 4 32 13" fill="#ac6e86"/><path d="M31 13q12 14-3 30m-12-18q14-7 20 7m-7 9 12 6" fill="none" stroke="#e2afba" stroke-width="3"/>',
 rifle:'<path d="m28 4 7 0v27h7v7h-9l-2 22H20l5-28z" fill="#57625c"/><path d="m24 39 10 0-3 22H18z" fill="#94704e"/><path d="M25 23h11v12H25z" fill="#a18259"/>',
 relic:'<path d="m32 5 20 17-6 30-28 0-7-30z" fill="#514b62"/><path d="m32 14 12 20-12 12-12-12z" fill="#92819f"/><ellipse cx="32" cy="32" rx="10" ry="5" fill="#dac398"/><circle cx="32" cy="32" r="3" fill="#40374e"/>',
 plank:'<path d="m22 4 20 4-4 52-20-3z" fill="#b58e57"/><path d="m29 8-5 44m12-37-5 35" stroke="#866238" stroke-width="2"/>',
 device:'<rect x="12" y="6" width="40" height="54" rx="6" fill="#59877e"/><rect x="18" y="13" width="28" height="20" rx="3" fill="#d1e4c5"/><path d="m21 25 6-5 6 6 10-8" stroke="#59877e" fill="none" stroke-width="3"/><circle cx="24" cy="45" r="5" fill="#d7c393"/><circle cx="40" cy="45" r="5" fill="#a7c5b4"/>',
};
const $ = <T extends HTMLElement>(id:string) => document.getElementById(id) as T;
const board=$('board'), tray=$('tray'), drop=$('drop');
let items:Item[]=[], discarded:Item[]=[], index=0, current:Item|null=null;
let drag: { item:Item; w:number; h:number; rotated:boolean; ox:number; oy:number; px:number; py:number; ghost:HTMLElement; original:HTMLElement; pointer:number } | null=null;
const preview=document.createElement('div');preview.className='placement';
const cell=()=>board.clientWidth/6;
const describe=(i:Item)=>`${i.name} · ${i.w} × ${i.h} · 价值 ${i.value}`;
function art(i:Item){return `<div class="item-art"><svg viewBox="0 0 64 64" aria-hidden="true">${drawings[i.visual]}</svg></div><span class="price">${i.value}</span>`;}
function element(i:Item,inTray=false){
 const el=document.createElement('div');el.className=`item${inTray?' in-tray':''}`;el.dataset.id=String(i.id);el.title=describe(i);el.setAttribute('aria-label',describe(i));
 el.style.setProperty('--tint',i.tint);el.style.setProperty('--edge',i.edge);el.style.width=`${i.w*cell()}px`;el.style.height=`${i.h*cell()}px`;el.innerHTML=art(i);
 el.style.setProperty('--art-size',`${Math.min(105,Math.min(i.w,i.h)*cell()-12)}px`);
 el.style.setProperty('--art-angle',i.rotated?'90deg':'0deg');
 if(!inTray){el.style.left=`${i.x!*cell()}px`;el.style.top=`${i.y!*cell()}px`;}
 el.addEventListener('pointerenter',()=>{$('details').textContent=describe(i);});
 el.addEventListener('pointerdown',e=>start(e,i,el));return el;
}
function render(){
 board.replaceChildren(...items.map(i=>element(i)));tray.replaceChildren();
 if(current)tray.append(element(current,true));else tray.textContent=index===specs.length?'全部物品已处理':'已处理，点击下一件';
 $('next').toggleAttribute('disabled',!!current||index===specs.length);
 $('progress').textContent=`${index} / ${specs.length}`;
 const value=items.reduce((s,i)=>s+i.value,0);$('value').textContent=`价值 ${value}`;
 $('stats').textContent=`占格 ${items.reduce((s,i)=>s+i.w*i.h,0)} / 48 · 保留 ${items.length} 件`;
 $('discarded').replaceChildren(...discarded.map(i=>{const li=document.createElement('li');li.textContent=describe(i);return li;}));
 const complete=index===specs.length&&!current;$('summary').hidden=!complete;
 $('summary-text').textContent=`保留：${items.map(i=>i.name).join('、')||'无'}。总价值：${value}。丢弃：${discarded.map(i=>i.name).join('、')||'无'}。`;
}
function next(){if(current||index>=specs.length)return;const [name,w,h,value,visual,tint,edge]=specs[index];current={rotated:false,id:index++,name,w,h,value,visual,tint,edge};$('details').textContent=describe(current);render();}
function legal(x:number,y:number,w:number,h:number,id:number){return x>=0&&y>=0&&x+w<=6&&y+h<=8&&!items.some(i=>i.id!==id&&x<i.x!+i.w&&x+w>i.x!&&y<i.y!+i.h&&y+h>i.y!);}
function target(){const r=board.getBoundingClientRect();return {x:Math.round((drag!.px-drag!.ox-r.left)/cell()),y:Math.round((drag!.py-drag!.oy-r.top)/cell())};}
function over(el:HTMLElement){const r=el.getBoundingClientRect();return drag!.px>=r.left&&drag!.px<=r.right&&drag!.py>=r.top&&drag!.py<=r.bottom;}
function show(){if(!drag)return;const d=drag;d.ghost.style.width=`${d.w*cell()}px`;d.ghost.style.height=`${d.h*cell()}px`;d.ghost.style.left=`${d.px-d.ox}px`;d.ghost.style.top=`${d.py-d.oy}px`;
 d.ghost.style.setProperty('--art-angle',d.rotated?'90deg':'0deg');
 drop.classList.toggle('active',over(drop));preview.remove();
 if(over(board)){const {x,y}=target();preview.style.cssText=`left:${x*cell()}px;top:${y*cell()}px;width:${d.w*cell()}px;height:${d.h*cell()}px`;preview.className=`placement${legal(x,y,d.w,d.h,d.item.id)?'':' invalid'}`;board.append(preview);}
}
function start(e:PointerEvent,item:Item,el:HTMLElement){if(e.button!==0||drag)return;e.preventDefault();const r=el.getBoundingClientRect();const ghost=el.cloneNode(true) as HTMLElement;ghost.className='item dragging';document.body.append(ghost);drag={item,w:item.w,h:item.h,rotated:item.rotated,ox:e.clientX-r.left,oy:e.clientY-r.top,px:e.clientX,py:e.clientY,ghost,original:el,pointer:e.pointerId};el.style.opacity='.25';el.setPointerCapture(e.pointerId);$('details').textContent=describe(item);show();}
function cancel(message='已取消，物品回到原处。'){if(!drag)return;drag.ghost.remove();drag.original.style.opacity='';$('details').textContent=describe(drag.item);drag=null;preview.remove();drop.classList.remove('active');$('message').textContent=message;render();}
window.addEventListener('pointermove',e=>{if(drag&&e.pointerId===drag.pointer){drag.px=e.clientX;drag.py=e.clientY;show();}});
window.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.pointer)return;drag.px=e.clientX;drag.py=e.clientY;const d=drag,{x,y}=target();let message='这里放不下，物品已回到原处。';
 if(over(drop)){items=items.filter(i=>i.id!==d.item.id);discarded.push(d.item);if(current===d.item)current=null;message=`已丢弃 ${d.item.name}。`;}
 else if(over(board)&&legal(x,y,d.w,d.h,d.item.id)){Object.assign(d.item,{x,y,w:d.w,h:d.h,rotated:d.rotated});if(current===d.item){items.push(d.item);current=null;}message=`已放好 ${d.item.name}。`;}
 cancel(message);
});
window.addEventListener('pointercancel',()=>cancel());window.addEventListener('blur',()=>cancel());
window.addEventListener('keydown',e=>{if(!drag)return;if(e.key.toLowerCase()==='r'&&!e.repeat){e.preventDefault();const d=drag;const nx=d.ox/(d.w*cell()),ny=d.oy/(d.h*cell());[d.w,d.h]=[d.h,d.w];d.rotated=!d.rotated;d.ox=(d.rotated?1-ny:ny)*d.w*cell();d.oy=(d.rotated?nx:1-nx)*d.h*cell();$('details').textContent=`${d.item.name} · ${d.w} × ${d.h} · 价值 ${d.item.value}`;show();}else if(e.key==='Escape')cancel();});
window.addEventListener('resize',()=>{if(drag)cancel();else render();});
$('next').addEventListener('click',next);$('restart').addEventListener('click',()=>{if(drag)cancel();items=[];discarded=[];index=0;current=null;next();$('message').textContent='已重开相同序列。从第一件物品开始。';});
next();

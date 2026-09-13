import './style.css';

type PrototypeStatus =
  | 'IDEA' | 'READY' | 'BUILDING' | 'TESTING' | 'INTERESTING'
  | 'MAYBE' | 'DEAD' | 'PROMOTED';

interface PrototypeEntry {
  id: string;
  name: string;
  status: PrototypeStatus;
  hypothesis: string;
  url: string; // Relative to the launcher, e.g. prototypes/001_example/
}

// Manually maintain launcher metadata here. Gameplay stays in each prototype.
const prototypes: PrototypeEntry[] = [
  {
    id: '002',
    name: 'Enemy Respawn Lab · EXP-007 / EXP-008 World Refresh R2',
    status: 'MAYBE',
    hypothesis: 'R2 对照试玩没有明显体验信号；当前停止继续扩展 #002，保留 World Refresh 作为未来更丰富玩法语境中的候选结构。',
    url: 'prototypes/002_campfire_respawn/',
  },
  {
    id: '001',
    name: 'Backpack Lab · EXP-003 Equipment vs Loot Space',
    status: 'TESTING',
    hypothesis: '相同 Loot 序列下，Starting Locked Equipment Occupancy 是否会改变后续整理与留舍压力？',
    url: 'prototypes/001_spatial_backpack/',
  },
];

const list = document.querySelector<HTMLDivElement>('#prototype-list')!;
document.querySelector<HTMLDivElement>('#empty-state')!.hidden = prototypes.length > 0;

for (const prototype of prototypes) {
  const card = document.createElement('article');
  const number = document.createElement('p');
  number.className = 'muted';
  number.textContent = `#${prototype.id}`;
  const title = document.createElement('h3');
  title.textContent = prototype.name;
  const status = document.createElement('p');
  status.textContent = `Status: ${prototype.status}`;
  const hypothesis = document.createElement('p');
  hypothesis.textContent = `Hypothesis: ${prototype.hypothesis}`;
  const play = document.createElement('a');
  play.href = prototype.url;
  play.textContent = 'Play →';
  play.setAttribute('aria-label', `试玩 ${prototype.name}`);
  card.append(number, title, status, hypothesis, play);
  list.append(card);
}

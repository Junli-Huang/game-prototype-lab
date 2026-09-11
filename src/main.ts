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
    status: 'TESTING',
    hypothesis: '同一 World Refresh Profile 由主动 Rest 或全局 Blood Moon 触发，会形成怎样不同的行动节奏？',
    url: 'prototypes/002_campfire_respawn/',
  },{ id: '001', name: 'Spatial Backpack Placement · EXP-001', status: 'MAYBE', hypothesis: '有限二维空间中的摆放与取舍，是否能让背包整理本身产生乐趣？', url: 'prototypes/001_spatial_backpack/' }];

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

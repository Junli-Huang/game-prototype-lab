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
    id: '005',
    name: 'Time-Based Enemies Lab · EXP-013',
    status: 'TESTING',
    hypothesis: '固定地图的敌人随 Day / Night 可预测地换区，是否让玩家开始选择什么时候去哪里？',
    url: 'prototypes/005_time_based_enemies/',
  },
  {
    id: '004',
    name: 'Persistent Enemy Corpses Lab · EXP-018',
    status: 'TESTING',
    hypothesis: '敌人尸体持续留在固定地图中，是否让重访区域更有历史痕迹与空间记忆？',
    url: 'prototypes/004_persistent_enemy_corpses/',
  },
  {
    id: '003',
    name: 'Fixed Map Exploration Lab · EXP-004 / EXP-006',
    status: 'TESTING',
    hypothesis: '起始持有一把钥匙，是否会让玩家主动从近端提前打开已知捷径并改变路线规划？',
    url: 'prototypes/003_fixed_map_exploration/',
  },
  {
    id: '002',
    name: 'Enemy Respawn Lab · EXP-007 / EXP-008 World Refresh R2',
    status: 'MAYBE',
    hypothesis: 'R2 对照试玩没有明显体验信号；当前停止继续扩展 #002，保留 World Refresh 作为未来更丰富玩法语境中的候选结构。',
    url: 'prototypes/002_campfire_respawn/',
  },
  {
    id: '001',
    name: 'Backpack Lab · EXP-049 Fixed vs Movable Equipment',
    status: 'MAYBE',
    hypothesis: 'Player 更喜欢不带 lock 的 Required Equipment；保留轻度正向方向，不扩展当前实现。',
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

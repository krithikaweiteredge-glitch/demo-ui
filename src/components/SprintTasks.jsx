import { useState } from 'react';

const INITIAL_TASKS = [
  { id: 1, name: 'Design system update',   pct: 100, color: 'var(--purple)', done: true  },
  { id: 2, name: 'Auth module refactor',   pct: 80,  color: 'var(--teal)',   done: true  },
  { id: 3, name: 'Analytics dashboard',    pct: 55,  color: 'var(--pink)',   done: false },
  { id: 4, name: 'Mobile responsiveness',  pct: 30,  color: 'var(--sky)',    done: false },
  { id: 5, name: 'Unit test coverage',     pct: 10,  color: '#f97316',       done: false },
];

export default function SprintTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggle = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="glass-card tasks-card reveal">
      <div className="card-header">
        <div className="card-title">Sprint Progress</div>
        <button className="view-all-btn">Sprint 15</button>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <div className="task-item" key={task.id}>
            <button
              className={`task-check${task.done ? ' done' : ''}`}
              onClick={() => toggle(task.id)}
              aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}
            >
              {task.done ? '✓' : ''}
            </button>
            <div className="task-body">
              <div className="task-name">{task.name}</div>
              <div className="task-progress-bar">
                <div className="task-fill" style={{ width: `${task.pct}%`, background: task.color }} />
              </div>
            </div>
            <div className="task-pct">{task.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

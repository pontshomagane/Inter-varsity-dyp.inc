import React from 'react';
import type { ChallengeCategory } from '../types';

interface ProgressChartProps {
  challenges: ChallengeCategory[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ challenges }) => {
  const size = 200;
  const center = size / 2;
  const labels = challenges.map(c => c.title.split(' ')[0]);
  const numAxes = labels.length;

  const getPoint = (value: number, index: number): [number, number] => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const x = center + value * center * Math.cos(angle);
    const y = center + value * center * Math.sin(angle);
    return [x, y];
  };

  const axisPoints = labels.map((_, i) => getPoint(1, i));
  const labelPoints = labels.map((_, i) => getPoint(1.2, i));

  const dataPoints = challenges.map((challenge, i) => {
    const totalTasks = challenge.content.tasks.length;
    const completedTasks = challenge.content.tasks.filter(t => t.completed).length;
    const proficiency = totalTasks > 0 ? completedTasks / totalTasks : 0;
    return getPoint(proficiency, i);
  }).map(p => `${p[0]},${p[1]}`).join(' ');

  return (
    <div className="flex justify-center items-center h-full">
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" aria-label="Proficiency chart across security categories">
        <g className="text-slate-300 dark:text-slate-600">
          {axisPoints.map((point, i) => (
            <line key={`axis-${i}`} x1={center} y1={center} x2={point[0]} y2={point[1]} stroke="currentColor" strokeWidth="0.5" />
          ))}
          {[0.25, 0.5, 0.75, 1].map(radius => (
            <polygon 
                key={`ring-${radius}`}
                points={axisPoints.map((_, i) => getPoint(radius, i)).join(' ')} 
                fill="none" 
                stroke="currentColor"
                strokeWidth="0.5"
            />
          ))}
        </g>
        <g className="text-slate-500 dark:text-slate-400 text-[8px] font-semibold">
          {labels.map((label, i) => (
            <text 
              key={`label-${i}`} 
              x={labelPoints[i][0]} 
              y={labelPoints[i][1]}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
            >
              {label}
            </text>
          ))}
        </g>
        <polygon 
          points={dataPoints} 
          className="fill-green-500/20 stroke-green-500"
          strokeWidth="1.5"
        />
        {dataPoints.split(' ').map((point, i) => {
            const [x,y] = point.split(',');
            return <circle key={`point-${i}`} cx={x} cy={y} r="2" className="fill-green-500" />
        })}
      </svg>
    </div>
  );
};

export default ProgressChart;
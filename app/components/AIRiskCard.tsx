'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

type RiskStatus = 'critical' | 'high' | 'medium' | 'low' | 'safe';

const riskColor: Record<RiskStatus, string> = {
  critical: '#ff2d55',
  high:     '#ff9500',
  medium:   '#ffcc00',
  low:      '#34c759',
  safe:     '#00ff88',
};

const riskBg: Record<RiskStatus, string> = {
  critical: 'rgba(255,45,85,0.08)',
  high:     'rgba(255,149,0,0.08)',
  medium:   'rgba(255,204,0,0.08)',
  low:      'rgba(52,199,89,0.08)',
  safe:     'rgba(0,255,136,0.08)',
};

const riskAdvice: Record<string, string> = {
  'Data Entry / CRUD Dev': 'Shift to AI tooling, prompt engineering, or data pipeline work.',
  'QA / Manual Tester':    'Learn automation (Playwright, Cypress) and AI test generation.',
  'Junior Frontend Dev':   'Specialize in design systems, 3D/WebGL, or complex state management.',
  'Backend API Dev':       'Move toward distributed systems, real-time infra, or AI backends.',
  'Full Stack Dev':        'Focus on product ownership, architecture decisions, and AI integration.',
  'DevOps Engineer':       'Platform engineering and FinOps skills create a deep moat.',
  'AI/ML Engineer':        'You are building the tools. Stay current on research.',
  'Security Engineer':     'AI increases attack surface  demand for this role is accelerating.',
};

interface AIRiskCardProps {
  role: string;
  risk: number;
  status: string;
  index?: number;
}

export default function AIRiskCard({ role, risk, status, index = 0 }: AIRiskCardProps) {
  const [flipped, setFlipped] = useState(false);
  const s = status as RiskStatus;
  const color = riskColor[s] ?? '#00ff88';
  const bg = riskBg[s] ?? 'rgba(0,255,136,0.06)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="relative cursor-pointer select-none"
      style={{ perspective: 1000, height: 88 }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, type: 'spring', stiffness: 120, damping: 18 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-lg p-3 flex flex-col justify-between border"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: bg,
            borderColor: `${color}25`,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono truncate text-[var(--ds-gray-700)]">{role}</span>
            <span className="text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded"
              style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
              {status.toUpperCase()}
            </span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 rounded-full overflow-hidden bg-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
                initial={{ width: 0 }}
                animate={{ width: `${risk}%` }}
                transition={{ delay: 0.3 + index * 0.06, duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-[var(--ds-gray-500)]">AI automation risk</span>
              <span className="text-[11px] font-mono font-semibold tabular-nums" style={{ color }}>{risk}%</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-lg p-3 flex flex-col justify-center border"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'var(--ds-background-300)',
            borderColor: `${color}25`,
          }}
        >
          <div className="text-[10px] font-mono font-bold mb-1.5" style={{ color }}>ADVICE</div>
          <p className="text-[11px] text-[var(--ds-gray-600)] leading-relaxed line-clamp-3">
            {riskAdvice[role] ?? 'Stay adaptable and keep learning emerging technologies.'}
          </p>
        </div>
      </motion.div>

      {/* Flip hint */}
      {!flipped && (
        <div className="absolute bottom-1.5 right-2 text-[8px] font-mono text-[var(--ds-gray-500)] pointer-events-none z-10">
          tap to flip
        </div>
      )}
    </motion.div>
  );
}

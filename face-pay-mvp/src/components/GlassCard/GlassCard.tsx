import styles from './GlassCard.module.css'

export default function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles['glass-card']}>
      {children}
    </div>
  )
}

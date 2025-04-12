export function BlobBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/25 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 dark:opacity-40 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/60 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 dark:opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/60 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 dark:opacity-40 animate-blob animation-delay-4000"></div>
    </div>
  )
}
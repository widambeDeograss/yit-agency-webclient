

// Poll Skeleton
const PollSkeleton = () => (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 animate-pulse">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-full bg-muted"></div>
        <div>
          <div className="h-4 w-24 bg-muted rounded"></div>
          <div className="h-3 w-32 bg-muted rounded mt-1"></div>
        </div>
      </div>
      <div className="h-7 w-3/4 bg-muted rounded mt-3 mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <div className="h-5 w-32 bg-muted rounded"></div>
              <div className="h-4 w-8 bg-muted rounded"></div>
            </div>
            <div className="h-2 w-full bg-muted rounded"></div>
            <div className="h-3 w-12 bg-muted rounded mt-1 ml-auto"></div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="h-5 w-16 bg-muted rounded"></div>
          <div className="h-5 w-20 bg-muted rounded"></div>
        </div>
        <div className="h-8 w-20 bg-muted rounded"></div>
      </div>
    </div>
  );


  
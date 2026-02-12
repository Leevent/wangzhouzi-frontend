import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
    />
  );
}

// 資源卡片骨架屏
export function ResourceCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
      <div className="flex items-center mb-4">
        <Skeleton className="h-12 w-12 rounded-lg mr-3" />
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
}

// 分類卡片骨架屏
export function CategoryCardSkeleton() {
  return (
    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex items-center mb-3">
        <Skeleton className="h-10 w-10 rounded-lg mr-3" />
        <div>
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5 mt-1" />
    </div>
  );
}

// 頁面載入骨架屏
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 標題骨架 */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        {/* 卡片網格骨架 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ResourceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skeleton;

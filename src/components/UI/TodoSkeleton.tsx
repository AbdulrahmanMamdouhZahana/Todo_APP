import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TodoSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-4 flex-1">
        {/* ID badge skeleton */}
        <Skeleton width={36} height={28} borderRadius={8} />

        <div className="flex-1 space-y-1.5">
          {/* Title */}
          <Skeleton width="45%" height={20} borderRadius={6} />
          {/* Description */}
          <Skeleton width="80%" height={16} borderRadius={6} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 self-end sm:self-center">
        <Skeleton width={72} height={36} borderRadius={10} />
        <Skeleton width={72} height={36} borderRadius={10} />
      </div>
    </div>
  );
};

export default TodoSkeleton;
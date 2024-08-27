import { Skeleton } from "../ui/skeleton";

export function StockCardSkeleton() {
  return (
    <div className="border rounded px-4 py-4 grid grid-cols-2 gap-10 mx-auto w-full">
      <div className="flex flex-col gap-3">
        <Skeleton className="w-[150px] h-[30px] rounded-full" />
        <Skeleton className="w-[200px] h-[20px] rounded-full" />
      </div>
      <div className="flex flex-col items-end gap-3">
        <Skeleton className="w-[120px] h-[30px] rounded-full" />
        <Skeleton className="w-[150px] h-[20px] rounded-full" />
      </div>
    </div>
  );
}

import { Skeleton } from "../ui/skeleton";
import { StatisticCardSkeleton } from "./StatisticCardSkeleton";
import { StockCardSkeleton } from "./StockCard";

export function HomePageSkeleton() {
  return (
    <div className="flex flex-col gap-12">
      <StockCardSkeleton />
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Estatísticas do Ativo</h2>
        <StatisticCardSkeleton />
        <StatisticCardSkeleton />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <h2 className="font-bold text-2xl text-center">Resumo</h2>
          <Skeleton className="w-[130px] h-[25px] rounded-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="w-[80px] h-[16px]" />
          <Skeleton className="w-[20px] h-[16px]" />
          <Skeleton className="w-[60px] h-[16px]" />
          <Skeleton className="w-[120px] h-[16px]" />
          <Skeleton className="w-[60px] h-[16px]" />
          <Skeleton className="w-[90px] h-[16px]" />
          <Skeleton className="w-[120px] h-[16px]" />
          <Skeleton className="w-[40px] h-[16px]" />
          <Skeleton className="w-[100px] h-[16px]" />
          <Skeleton className="w-[60px] h-[16px]" />
          <Skeleton className="w-[140px] h-[16px]" />
          <Skeleton className="w-[90px] h-[16px]" />
          <Skeleton className="w-[40px] h-[16px]" />
          <Skeleton className="w-[70px] h-[16px]" />
          <Skeleton className="w-[100px] h-[16px]" />
        </div>
      </div>
      <StatisticCardSkeleton />
    </div>
  );
}

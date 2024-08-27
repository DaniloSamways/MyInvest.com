"use client";

import { SearchForm } from "@/components/Forms/SearchForm";
import { StockCard } from "@/components/Cards/StockCard";
import { searchSchema, SearchSchemaInput } from "@/schemas/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StatisticCard } from "@/components/Cards/StatisticCard";
import { Badge } from "@/components/ui/badge";
import { AlertRecommendation } from "@/components/AlertRecommendation";
import { stockService } from "@/services/StockService";
import { useState } from "react";
import { StockResponse } from "@/@types/stock";

export default function Home() {
  const [stock, setStock] = useState<StockResponse | null>();
  const form = useForm<SearchSchemaInput>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      stock: "",
    },
  });

  async function onSubmit(data: SearchSchemaInput) {
    const response = await stockService.findStock(data.stock);
    if (response) {
      return setStock(response);
    }
    setStock(null);
  }

  return (
    <main className="mt-10 max-w-screen-sm mx-auto flex flex-col gap-8">
      <SearchForm form={form} onSubmit={onSubmit} />
      {stock && (
        <>
          <div className="flex flex-col gap-12">
            <StockCard info={stock} />
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-2xl">Estatísticas do Ativo</h2>
              <StatisticCard variant="bad">Péssimo P/VP</StatisticCard>
              <StatisticCard variant="good">
                Excelente Dividend Yield
              </StatisticCard>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2">
                <h2 className="font-bold text-2xl text-center">Resumo</h2>
                <Badge
                  variant={"outline"}
                  className="px-2 py-1 border-primary text-primary"
                >
                  Ótimo investimento
                </Badge>
              </div>
              <p>
                Esse é um ótimo investimento para longo prazo, contando com boas
                rentabilidades a longo prazo.
              </p>
            </div>
          </div>
          <AlertRecommendation />
        </>
      )}
    </main>
  );
}

"use client";

import { SearchForm } from "@/components/Forms/SearchForm";
import { StockCard } from "@/components/Cards/StockCard";
import { searchSchema, SearchSchemaInput } from "@/schemas/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertRecommendation } from "@/components/AlertRecommendation";
import { stockService } from "@/services/StockService";
import { useState } from "react";
import { StockResponse } from "@/@types/stock";
import { HomePageSkeleton } from "@/components/Skeletons/HomePageSkeleton";
import { StockNotFound } from "@/components/StockNotFound";
import { StockSummary } from "@/components/HomePage/StockSummary";
import { StockIndicators } from "@/components/HomePage/StockIndicators";
import { StockPoints } from "@/components/HomePage/StockPoints";

export default function Home() {
  const [stock, setStock] = useState<StockResponse | null>();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const form = useForm<SearchSchemaInput>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      stock: "",
    },
  });

  async function onSubmit(data: SearchSchemaInput) {
    setNotFound(false);
    setStock(null);
    setLoading(true);
    const response = await stockService.findStock(data.stock);
    if (response) {
      setStock(response);
      setLoading(false);
      return;
    }
    setNotFound(true);
    setStock(null);
    setLoading(false);
  }

  return (
    <main className="mt-10 max-w-screen-sm mx-auto flex flex-col gap-8 mb-6">
      <SearchForm form={form} onSubmit={onSubmit} />
      {notFound && <StockNotFound />}
      {loading && <HomePageSkeleton />}
      {stock && (
        <>
          <div className="flex flex-col gap-12">
            <StockCard info={stock} />
            <StockPoints
              negativePoints={stock.company.negative_points}
              goodPoints={stock.company.good_points}
            />
            <StockIndicators stock={stock} />
            {/* <StockSummary /> */}
          </div>
          <AlertRecommendation />
        </>
      )}
    </main>
  );
}

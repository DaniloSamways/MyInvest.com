import { SearchSchemaInput } from "@/schemas/searchSchema";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CircleHelp } from "lucide-react";

interface SearchFormProps {
  form: UseFormReturn<SearchSchemaInput>;
  onSubmit: (data: SearchSchemaInput) => void;
}

export function SearchForm({ form, onSubmit }: SearchFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full justify-center mx-auto"
      >
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-white text-xl flex gap-2 items-center">
                Comece buscando pelo ativo desejado
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <CircleHelp className="h-4 w-4 text-zinc-600" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-52 bg-zinc-800 p-2 rounded bg-opacity-90">
                      <p className="font-extralight text-center">
                        No momento, disponível apenas para <b>Ações</b> da{" "}
                        <b>Bolsa Brasileira</b>
                      </p>
                      <br />
                      <p className="font-extralight text-center">
                        Em breve estarão disponíveis FIIs, Stocks e ETFs
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <div className="flex gap-4">
                <FormControl className="flex-1">
                  <Input placeholder="CSMG3" {...field} />
                </FormControl>
                <Button type="submit">Pesquisar</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

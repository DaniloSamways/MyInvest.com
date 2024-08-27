import { SearchSchemaInput } from "@/schemas/searchSchema";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
              <FormLabel className="text-white text-xl">
                Comece buscando pelo ativo desejado
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

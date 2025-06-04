import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "./file-upload";
import { insertProductSchema, categories, type InsertProduct } from "@shared/schema";
import { defaultColors, type ColorVariation } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Save, Upload } from "lucide-react";

export function AdminProductForm() {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      images: [],
      colors: [],
      specifications: {}
    }
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const response = await apiRequest("POST", "/api/products", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Produto criado",
        description: "Produto adicionado ao catálogo com sucesso!",
      });
      form.reset();
      setSelectedColors([]);
      setProductImages([]);
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao criar produto. Tente novamente.",
      });
    }
  });

  const onSubmit = (data: InsertProduct) => {
    const productData = {
      ...data,
      images: productImages,
      colors: selectedColors,
    };
    createProductMutation.mutate(productData);
  };

  const addColor = (colorValue: string) => {
    if (!selectedColors.includes(colorValue)) {
      setSelectedColors([...selectedColors, colorValue]);
    }
  };

  const removeColor = (colorValue: string) => {
    setSelectedColors(selectedColors.filter(c => c !== colorValue));
  };

  const handleImageUpload = (urls: string[]) => {
    setProductImages([...productImages, ...urls]);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-foreground">
          <Plus className="w-6 h-6 mr-2 text-primary" />
          Adicionar Novo Produto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Sofá Moderno 3 Lugares" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descrição detalhada do produto..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Upload de Imagens</label>
                  <FileUpload 
                    onUpload={handleImageUpload}
                    maxFiles={10}
                    className="mt-2"
                  />
                  {productImages.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        {productImages.length} imagem(ns) adicionada(s)
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {productImages.map((url, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={url} 
                              alt={`Produto ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => setProductImages(productImages.filter((_, i) => i !== index))}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Variações de Cor</label>
                  <div className="mt-2">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {defaultColors.map((color) => (
                        <Button
                          key={color.value}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addColor(color.value)}
                          disabled={selectedColors.includes(color.value)}
                          className="h-12 p-2 flex flex-col items-center"
                        >
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-xs mt-1">{color.name}</span>
                        </Button>
                      ))}
                    </div>
                    
                    {selectedColors.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedColors.map((colorValue) => {
                          const color = defaultColors.find(c => c.value === colorValue);
                          return (
                            <Badge key={colorValue} variant="secondary" className="flex items-center gap-1">
                              <div 
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: color?.hex }}
                              />
                              {color?.name}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 ml-1"
                                onClick={() => removeColor(colorValue)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  form.reset();
                  setSelectedColors([]);
                  setProductImages([]);
                }}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={createProductMutation.isPending}
                className="min-w-32"
              >
                {createProductMutation.isPending ? (
                  "Salvando..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Produto
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

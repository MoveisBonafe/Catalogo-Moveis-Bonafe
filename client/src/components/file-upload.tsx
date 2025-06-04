import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Upload, Image } from "lucide-react";
import { uploadToGitHub, fileToBase64, validateImageFile } from "@/lib/github";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUpload: (urls: string[]) => void;
  maxFiles?: number;
  className?: string;
}

export function FileUpload({ onUpload, maxFiles = 5, className }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles: File[] = [];
    
    for (const file of acceptedFiles) {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        toast({
          variant: "destructive",
          title: "Arquivo inválido",
          description: validation.error,
        });
      }
    }

    setFiles(prev => [...prev, ...validFiles].slice(0, maxFiles));
  }, [maxFiles, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxFiles - files.length,
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);
    
    try {
      const uploadPromises = files.map(async (file, index) => {
        const base64Content = await fileToBase64(file);
        const fileName = `${Date.now()}-${file.name}`;
        const url = await uploadToGitHub({
          fileName,
          fileContent: base64Content,
          message: `Upload de imagem: ${fileName}`
        });
        
        setProgress(((index + 1) / files.length) * 100);
        return url;
      });

      const urls = await Promise.all(uploadPromises);
      onUpload(urls);
      setFiles([]);
      
      toast({
        title: "Upload concluído",
        description: `${files.length} imagem(ns) enviada(s) com sucesso`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no upload",
        description: "Erro ao enviar imagens. Tente novamente.",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-primary/50 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-primary mb-4" />
        <p className="text-lg font-medium text-foreground mb-2">
          {isDragActive 
            ? "Solte as imagens aqui..." 
            : "Clique para selecionar imagens"
          }
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          Ou arraste e solte arquivos aqui
        </p>
        <p className="text-xs text-muted-foreground">
          PNG, JPG, WebP até 5MB cada • Máximo {maxFiles} imagens
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Imagens selecionadas:</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <Image className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {uploading && (
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-1">
                Enviando... {Math.round(progress)}%
              </p>
            </div>
          )}

          <Button 
            onClick={handleUpload}
            disabled={uploading}
            className="w-full mt-4"
          >
            {uploading ? "Enviando..." : `Enviar ${files.length} imagem(ns)`}
          </Button>
        </div>
      )}
    </div>
  );
}

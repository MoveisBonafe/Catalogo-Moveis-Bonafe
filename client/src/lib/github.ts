import { apiRequest } from "./queryClient";

export interface GitHubUploadOptions {
  fileName: string;
  fileContent: string;
  message?: string;
}

export async function uploadToGitHub({
  fileName,
  fileContent,
  message = "Upload nova imagem do produto"
}: GitHubUploadOptions): Promise<string> {
  // Adicionar timestamp para evitar conflitos de nome
  const timestamp = Date.now();
  const fileExtension = fileName.split('.').pop();
  const uniqueFileName = `${timestamp}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  
  const response = await apiRequest("POST", "/api/upload", {
    fileName: uniqueFileName,
    content: fileContent,
    message
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro no upload');
  }
  
  const data = await response.json();
  return data.url;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data:image/jpeg;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: "Tipo de arquivo não suportado. Use JPG, PNG ou WebP." 
    };
  }
  
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: "Arquivo muito grande. Máximo 5MB." 
    };
  }
  
  return { valid: true };
}

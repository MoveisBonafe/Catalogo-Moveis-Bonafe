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
  const response = await apiRequest("POST", "/api/upload", {
    fileName,
    content: fileContent,
    message
  });
  
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

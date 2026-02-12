import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 合併 Tailwind CSS 類名的輔助函數
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化日期（台灣格式）
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '未知日期';
  }
}

// 清理 HTML 內容（移除潛在危險標籤）
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^>]*>/gi, '')
    .replace(/<object\b[^>]*>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '');
}

// 截斷文字
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

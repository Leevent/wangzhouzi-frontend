import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">頁面不存在</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          抱歉，您要找的頁面不存在或已被移除。
        </p>
        <div className="flex justify-center space-x-4">
          <Button as="link" href="/" variant="primary">
            返回首頁
          </Button>
          <Button as="link" href="/resources" variant="outline">
            瀏覽資源
          </Button>
        </div>
      </div>
    </div>
  );
}

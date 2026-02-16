import Link from 'next/link';
import { Category } from '@/lib/ghost';
import { getBlogCategoryStyle } from '@/config/blog-categories';

interface BlogCategoryCardProps {
  category: Category;
}

export default function BlogCategoryCard({ category }: BlogCategoryCardProps) {
  const style = getBlogCategoryStyle(category.slug);

  return (
    <Link
      href={`/blog/category/${category.slug}`}
      className="block p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all hover:border-blue-300"
    >
      <div className="flex items-center mb-3">
        <span className="text-3xl mr-3">{style.icon}</span>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {category.name}
          </h3>
          <span className="text-sm text-gray-500">
            {category.count} 篇文章
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">
        {category.description || style.description}
      </p>
    </Link>
  );
}

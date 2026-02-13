import Link from 'next/link';
import { getEraSlug } from '@/config/history-categories';

interface EraCardProps {
  name: string;
  icon: string;
  color: string;
  dateRange: string;
  description: string;
}

export default function EraCard({ name, icon, color, dateRange, description }: EraCardProps) {
  const slug = getEraSlug(name);

  return (
    <Link href={`/timeline/${slug}`} className="group">
      <div
        className="rounded-xl p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1 h-full"
        style={{ backgroundColor: `${color}15` }}
      >
        <span className="text-4xl mb-4 block">{icon}</span>
        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-amber-600 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{dateRange}</p>
        <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}

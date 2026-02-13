import Link from 'next/link';

interface TopicCardProps {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export default function TopicCard({ name, icon, color, description }: TopicCardProps) {
  return (
    <Link
      href={`/topics/${encodeURIComponent(name)}`}
      className="bg-gray-50 rounded-xl p-4 hover:bg-amber-50 hover:shadow-md transition-all group"
    >
      <div className="flex items-center">
        <span
          className="text-2xl mr-3 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}30` }}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}

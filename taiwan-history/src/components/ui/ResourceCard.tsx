import { getResourceTypeIcon, getAccessTypeLabel, type TaiwanHistoryResource } from '@/config/external-resources';

interface ResourceCardProps {
  resource: TaiwanHistoryResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-amber-300 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-amber-600 transition-colors flex-1">
          {resource.name}
          <span className="ml-2 text-gray-400 group-hover:text-amber-500">↗</span>
        </h3>
        <span className="text-lg ml-2" title={resource.resourceType}>
          {getResourceTypeIcon(resource.resourceType)}
        </span>
      </div>

      {resource.nameEn && (
        <p className="text-xs text-gray-400 mb-2">{resource.nameEn}</p>
      )}

      {resource.institution && (
        <p className="text-sm text-amber-600 mb-2">{resource.institution}</p>
      )}

      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
        {resource.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {resource.tags.slice(0, 3).map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          {resource.language.map((lang, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-gray-100 rounded">
              {lang === 'zh-TW' ? '中文' : lang === 'ja' ? '日文' : '英文'}
            </span>
          ))}
        </span>
        <span className={`px-2 py-0.5 rounded ${
          resource.accessType === 'free'
            ? 'bg-green-100 text-green-700'
            : resource.accessType === 'partial'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {getAccessTypeLabel(resource.accessType)}
        </span>
      </div>
    </a>
  );
}

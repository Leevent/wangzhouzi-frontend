interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

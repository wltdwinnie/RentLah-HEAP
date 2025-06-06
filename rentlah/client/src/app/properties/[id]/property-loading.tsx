export default function PropertyLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-[500px] mb-8 rounded-xl bg-gray-200" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-48 bg-gray-200 rounded" />
        </div>
        <div className="h-96 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

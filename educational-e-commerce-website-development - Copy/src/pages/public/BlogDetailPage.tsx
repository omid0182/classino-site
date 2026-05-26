import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getBlogBySlug, getBlogs } from '../../utils/storage';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogBySlug(slug) : undefined;
  const relatedPosts = getBlogs()
    .filter(b => b.isPublished && b.slug !== slug)
    .slice(0, 3);

  if (!post) {
    return (
      <div className="bg-[#F0E8E2] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">😕</span>
          <h1 className="text-2xl font-black text-gray-700 mb-4">مقاله مورد نظر یافت نشد</h1>
          <Link to="/blog" className="text-[#2F5AF3] font-bold hover:underline">بازگشت به وبلاگ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F0E8E2] min-h-screen">
      <Helmet>
        <title>{post.seoTitle || `${post.title} | وبلاگ کلاسینو`}</title>
        <meta name="description" content={post.seoDescription || post.excerpt} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-white/50 border-b border-black/5">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#2F5AF3]">صفحه اصلی</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#2F5AF3]">وبلاگ</Link>
            <span>/</span>
            <span className="text-gray-800 font-bold truncate">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-[#2F5AF3] bg-[#2F5AF3]/10 px-3 py-1 rounded-lg">{post.category}</span>
            <span className="text-xs text-gray-400 font-bold">{new Date(post.createdAt).toLocaleDateString('fa-IR')}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-gray-800 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 leading-8">{post.excerpt}</p>
          <div className="flex items-center gap-4 mt-4 text-sm font-bold text-gray-500">
            <span>✍️ {post.author}</span>
          </div>
        </header>

        {/* Image */}
        {post.image && (
          <div className="mb-8 rounded-3xl overflow-hidden shadow-lg">
            <img src={post.image} alt={post.title} className="w-full max-h-96 object-cover" />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose-content text-gray-700 leading-9 text-lg mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pt-6 border-t border-black/5">
            <span className="text-sm font-bold text-gray-500">برچسب‌ها:</span>
            {post.tags.map((tag, i) => (
              <span key={i} className="bg-white border border-black/5 text-gray-600 text-xs px-3 py-1.5 rounded-lg font-bold">
                # {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-black/10">
            <h2 className="text-xl font-black text-gray-800 mb-6">مقالات مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map(rp => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition border border-black/5"
                >
                  <h3 className="font-bold text-gray-700 group-hover:text-[#2F5AF3] transition line-clamp-2 text-sm mb-2">
                    {rp.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-5">{rp.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
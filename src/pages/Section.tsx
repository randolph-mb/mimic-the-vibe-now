
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import SectionTitle from '@/components/SectionTitle';
import Newsletter from '@/components/Newsletter';
import { Article, articles } from '@/data/mockArticles';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

const Section = () => {
  const { categoryName } = useParams();
  const [page, setPage] = React.useState(1);
  const articlesPerPage = 9;
  
  // Filter articles by category
  const filteredArticles = categoryName 
    ? articles.filter(article => 
        article.category.toLowerCase() === categoryName.toLowerCase()
      )
    : articles;
  
  // If no articles match, show all
  const displayArticles = filteredArticles.length > 0 ? filteredArticles : articles;
  
  // Get paginated articles
  const startIndex = (page - 1) * articlesPerPage;
  const paginatedArticles = displayArticles.slice(startIndex, startIndex + articlesPerPage);
  const totalPages = Math.ceil(displayArticles.length / articlesPerPage);
  
  // Get featured article (first article)
  const featuredArticle = displayArticles[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Section Title */}
          <SectionTitle title={categoryName || 'All Articles'} />
          
          {/* Featured Article */}
          {featuredArticle && page === 1 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7">
                  <Link to={`/article/${featuredArticle.id}`}>
                    <img 
                      src={featuredArticle.image} 
                      alt={featuredArticle.title} 
                      className="w-full h-96 object-cover"
                    />
                  </Link>
                </div>
                <div className="md:col-span-5 flex flex-col justify-center">
                  <span className="inline-block text-xs uppercase font-sans tracking-wider mb-2 text-gray-500">
                    {featuredArticle.category}
                  </span>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold leading-tight mb-4">
                    <Link to={`/article/${featuredArticle.id}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {featuredArticle.excerpt}
                  </p>
                  <p className="text-sm text-gray-500">
                    By {featuredArticle.author} • {featuredArticle.date}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paginatedArticles.map((article, index) => {
              // Skip the first article on page 1 as it's already displayed as featured
              if (index === 0 && page === 1 && featuredArticle) return null;
              
              return (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  image={article.image}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  author={article.author}
                  size="medium"
                />
              );
            })}
          </div>
          
          {/* Message when no articles are found */}
          {paginatedArticles.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No articles found in this category.</h3>
              <p className="mt-2 text-gray-500">Please check back later or explore other categories.</p>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink 
                        onClick={() => setPage(index + 1)}
                        isActive={page === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
        
        {/* Newsletter Signup */}
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Section;

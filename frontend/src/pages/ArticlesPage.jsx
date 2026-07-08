import { useState, useEffect } from "react";
import api from "../services/api";

const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get("/articles");
            const articlesData = response.data?.data || response.data;
            setArticles(Array.isArray(articlesData) ? articlesData : []);
        } catch (err) {
            console.error("Failed to fetch articles:", err);
            setError("Could not load articles. Please try again later.");
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-content-center align-items-center h-full py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-3" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p className="text-gray-500 text-sm">Loading articles...</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles && articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article.id} className="bg-white rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
                            <div className="p-5 flex-1 flex flex-col">
                                <h5 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h5>
                                <p className="text-gray-500 text-sm flex-1">{article.body || article.content}</p>
                                <div className="mt-4 text-right">
                                    <small className="text-gray-400">
                                        {new Date(article.created_at).toLocaleDateString()}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm text-center py-12">
                            <p className="mb-0 text-gray-400 text-sm">No articles found.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticlesPage;
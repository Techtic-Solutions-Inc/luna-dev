import ErrorBoundary from '../components/ErrorBoundary';
import BlogScreen from '../components/features/BlogScreen';

const BlogPage = () => (
  <ErrorBoundary>
    <BlogScreen />
  </ErrorBoundary>
);

export default BlogPage;

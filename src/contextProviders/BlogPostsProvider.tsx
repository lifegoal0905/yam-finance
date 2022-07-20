import {
  createContext,
  FunctionComponent,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import { groupBy, orderBy } from 'lodash';

import { BlogPost, GroupedBlogPosts } from '@typings/BlogPost';

type SearchValueProviderProps = {
  children: ReactNode;
};

type BlogPostsContextType = {
  blogPosts: BlogPost[];
  featuredAndOrderedBlogPosts: BlogPost[];
  groupedBlogPostsByCategory: GroupedBlogPosts;
  searchPostsQuery: string;
  searchPostsResult: BlogPost[];
  handleSetBlogPosts: (value: BlogPost[]) => void;
  handleSetSearchPostsQuery: (value: string) => void;
  handleRemoveSearchPostsQuery: () => void;
};

export const BlogPostsContext = createContext<BlogPostsContextType>({} as BlogPostsContextType);
export const useBlogPostsContext = (): BlogPostsContextType => useContext(BlogPostsContext);

const BlogPostsProvider: FunctionComponent<SearchValueProviderProps> = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchPostsQuery, setSearchPostValue] = useState('');

  const handleSetBlogPosts = useCallback((posts: BlogPost[]) => setBlogPosts(posts), []);
  const handleSetSearchPostsQuery = useCallback(
    (value: string): void => setSearchPostValue(value),
    []
  );

  const handleRemoveSearchPostsQuery = useCallback(
    (): void => handleSetSearchPostsQuery!(''),
    [handleSetSearchPostsQuery]
  );

  const searchPostsResult = useMemo(
    (): BlogPost[] =>
      blogPosts?.filter((post) =>
        [post.data.title, post.data.date, post.data.author, post.data.category]
          .join('')
          .toLowerCase()
          .includes(searchPostsQuery.toLowerCase())
      ),
    [blogPosts, searchPostsQuery]
  );

  const featuredAndOrderedBlogPosts = useMemo(
    (): BlogPost[] =>
      orderBy(
        blogPosts?.filter((post) => post.data.isFeatured),
        ['data.featuredOrder', 'data.date'],
        ['asc', 'asc']
      ),
    [blogPosts]
  );
  const groupedBlogPostsByCategory = useMemo(
    () => groupBy(blogPosts, (post: BlogPost): string => post.data.category || 'No category'),
    [blogPosts]
  );

  const value = useMemo(
    () => ({
      blogPosts,
      featuredAndOrderedBlogPosts,
      groupedBlogPostsByCategory,
      handleSetBlogPosts,
      searchPostsQuery,
      searchPostsResult,
      handleSetSearchPostsQuery,
      handleRemoveSearchPostsQuery,
    }),
    [
      blogPosts,
      featuredAndOrderedBlogPosts,
      groupedBlogPostsByCategory,
      handleSetBlogPosts,
      searchPostsQuery,
      searchPostsResult,
      handleSetSearchPostsQuery,
      handleRemoveSearchPostsQuery,
    ]
  );

  return <BlogPostsContext.Provider value={value}>{children}</BlogPostsContext.Provider>;
};

export default BlogPostsProvider;

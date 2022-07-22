import { FunctionComponent, useCallback, useState } from 'react';
import { Accordion, AccordionProps } from '@chakra-ui/react';

import { GroupedBlogPosts } from '@typings/BlogPost';

import BlogLayoutSidebarCategoryGroup from './BlogLayoutSidebarCategoryGroup';
import BlogLayoutSidebarSeeAllArticles from './BlogLayoutSidebarSeeAllArticles';

type BlogLayoutSidebarNavigationProps = {
  posts: GroupedBlogPosts;
} & AccordionProps;

const BlogLayoutSidebarNavigation: FunctionComponent<BlogLayoutSidebarNavigationProps> = ({
  posts,
  ...restProps
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleSetActiveIndex = useCallback((index: number): void => setActiveIndex(index), []);

  return (
    <Accordion
      as="nav"
      w={{ base: 'full', lg: '2xs' }}
      allowToggle
      index={activeIndex}
      onChange={handleSetActiveIndex}
      {...restProps}
    >
      <BlogLayoutSidebarSeeAllArticles setActiveIndex={handleSetActiveIndex} />

      {Object.entries(posts).map(([category, categoryPosts]) => (
        <BlogLayoutSidebarCategoryGroup
          categoryName={category}
          posts={categoryPosts}
          key={category}
        />
      ))}
    </Accordion>
  );
};

export default BlogLayoutSidebarNavigation;

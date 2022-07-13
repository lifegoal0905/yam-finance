import { NextPage } from 'next';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Box, AspectRatio } from '@chakra-ui/react';

import { getAllPosts, getPostBySlug, postFilePaths } from '@api/blogApi';
import mdxComponents from '@components/mdx';
import { BlogPost, BlogPostData, GroupedBlogPosts } from '@typings/BlogPost';
import BlogLayout from '@layouts/BlogLayout/BlogLayout';
import groupPostsByCategory from '@utils/groupPostsByCategory';
import { BlogPostHeader, BlogPostContent } from '@views/blog/blogPost';
import CONFIG from '@config';

type BlogPostPageProps = {
  params?: { slug: string };
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  frontMatter: { [key: string]: string | number | boolean };
  posts: BlogPost[];
  groupedPosts: GroupedBlogPosts;
};

type ParamsType = {
  params: { slug: string };
};

export const getStaticProps = async ({
  params,
}: ParamsType): Promise<{ props: BlogPostPageProps }> => {
  const { source, frontMatter } = await getPostBySlug(params.slug);
  const posts = getAllPosts() as BlogPost[];
  const groupedPosts = groupPostsByCategory(posts);

  return {
    props: {
      source,
      frontMatter,
      posts,
      groupedPosts,
    },
  };
};

export const getStaticPaths = async (): Promise<{
  paths: ParamsType[];
  fallback: boolean;
}> => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({
  source,
  frontMatter,
  posts,
  groupedPosts,
}) => (
  <BlogLayout posts={posts} groupedPosts={groupedPosts}>
    <Head>
      <title>
        {CONFIG.app.title} | {frontMatter.metaTitle}
      </title>
    </Head>
    <Box
      maxW={{ base: '3xl', '1.5xl': 'fit-content' }}
      mt={{ base: 10, lg: 0 }}
      mx="auto"
      px={{ base: 5, '1.5xl': 0 }}
    >
      <BlogPostHeader post={frontMatter as BlogPostData} />
      <BlogPostContent>
        <MDXRemote {...source} components={{ ...mdxComponents, AspectRatio } as never} />
      </BlogPostContent>
    </Box>
  </BlogLayout>
);

export default BlogPostPage;

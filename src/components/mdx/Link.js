import NextLink from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

const Link = ({ children, as, href, ...restProps }) => (
  <NextLink as={as} href={href} passHref {...restProps}>
    <ChakraLink
      textDecoration="underline"
      _hover={{
        color: 'brand.500',
      }}
    >
      {children}
    </ChakraLink>
  </NextLink>
);

export default Link;

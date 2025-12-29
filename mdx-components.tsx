import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { HaskellRef, HaskellRefList } from '@/components/HaskellRef';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    HaskellRef,
    HaskellRefList,
    ...components,
  };
}

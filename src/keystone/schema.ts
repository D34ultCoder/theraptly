import { list } from '@keystone-6/core'
import { text, relationship, timestamp } from '@keystone-6/core/fields'
import { Lists } from '.keystone/types';
import { allowAll } from '@keystone-6/core/access';

export const lists = {
  // see https://keystonejs.com/docs/config/lists for more information on lists
  BlogPost: list({
    // access: allowAll below will allow public access to the list and should be updated
    // see the access control docs for more information
    // https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,
    fields: {
      // See https://keystonejs.com/docs/fields/overview for more information on fields
      title: text({ validation: { isRequired: true }}),
      content: text({ validation: { isRequired: true }}),
      author: relationship({
        ref: 'Author.posts',
        many: false
      }),
      publishedDate: timestamp(),
      tags: relationship({
        ref: 'Tag.posts',
        many: true
      })
    }
  }),
  Author: list({
    // access: allowAll below will allow public access to the list and should be updated
    // see the access control docs for more information
    // https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,
    fields: {
      // See https://keystonejs.com/docs/fields/overview for more information on fields
      name: text({ validation: { isRequired: true }}),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique'
      }),
      bio: text(),
      posts: relationship({
        ref: 'BlogPost.author',
        many: true
      })
    }
  }),
  Tag: list({
    // access: allowAll below will allow public access to the list and should be updated
    // see the access control docs for more information
    // https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,
    fields: {
      // See https://keystonejs.com/docs/fields/overview for more information on fields
      name: text({
        validation: { isRequired: true },
        isIndexed: 'unique'
      }),
      posts: relationship({
        ref: 'BlogPost.tags',
        many: true
      })
    }
  })
}

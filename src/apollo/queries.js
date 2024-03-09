import { gql } from "@apollo/client";

const getProductCards = gql`
  query get($page: Int, $categoryID: ID) {
    getProductCards(page: $page, categoryID: $categoryID) {
      page
      pageSize
      products {
        categories {
          title
          slug
        }
        title
        slug
        colors
        cost
        price
        mark
        tag
        discount
      }
    }
  }
`;

const getProductCardsByTag = gql`
  query get($page: Int, $tag: String) {
    getProductCardsByTag(page: $page, tag: $tag) {
      page
      pageSize
      products {
        categories {
          title
          slug
        }
        title
        slug
        colors
        cost
        price
        mark
        tag
        discount
      }
    }
  }
`;

const getProductCardsPromotion = gql`
  query get($page: Int, $promotion: Boolean) {
    getProductCardsPromotion(page: $page, promotion: $promotion) {
      page
      pageSize
      products {
        categories {
          title
          slug
        }
        title
        slug
        colors
        cost
        price
        mark
        tag
        discount
      }
    }
  }
`;

const getProductBySlug = gql`
  query get($slug: String) {
    getProductBySlug(slug: $slug) {
      id
      title
      cost
      price
      description
      discount
      # suggest
      # categories {
      #   slug
      #   _id
      # }
      colors {
        title
        mark
        images
      }
      # _id
      # title
      # categories {
      #   slug
      #   _id
      # }
      # colors {
      #   title
      #   images
      # }
    }
  }
`;

export {
  getProductCards,
  getProductCardsByTag,
  getProductCardsPromotion,
  getProductBySlug,
};

import { gql } from "@apollo/client";

const getProductCards = gql`
  query get($page: Int, $category: String) {
    getProductCards(page: $page, category: $category) {
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

export { getProductCards, getProductCardsByTag, getProductCardsPromotion };

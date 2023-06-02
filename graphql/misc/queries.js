const gql = require('graphql-tag');

module.exports.secureImageUrlV2 = gql`
  query SecureImageUrlV2($id: String!) {
    secureImageUrlV2(id: $id) {
      url
    }
  }
`;

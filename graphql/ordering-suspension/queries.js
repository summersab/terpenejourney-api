const gql = require('graphql-tag');

module.exports.orderingSuspensionQuery = gql`
  query OrderingSuspension($dispensaryId: String!, $active: Boolean) {
    orderingSuspension(dispensaryId: $dispensaryId, active: $active) {
      id
      subscriberCount
      active
      pausedAt
    }
  }
`;

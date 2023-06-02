const gql = require('graphql-tag');

module.exports.filteredIntegrations = gql`
  query FilteredIntegrations($dispensaryId: String!) {
    filteredIntegrations(dispensaryId: $dispensaryId) {
      _id
      adapter
      credentials
      dispensaryId
      failedSyncs
      flags
      integrationType
      isRunning
      lastImportedAtISO
      lastSyncAt
      lastSyncAtISO
      live
      meta {
        custom_types
        shopifyFields
      }
      pending
      thresholds
      kioskThresholds
      types
      weights
      integrationCategory
      categoryMapping {
        foreignCategory
        localCategory
        localSubcategory
      }
      fieldMapping {
        foreignField
        localField
      }
      crmPropertyMapping {
        foreignProperty
        localProperty
      }
      crmPipelineMapping {
        pipelineId
        mappings {
          abandoned
          open
          confirmed
          inTransit
          closed
        }
      }
      syncFailureMessage
      syncFailureType
    }
  }
`;

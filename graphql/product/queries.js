const gql = require('graphql-tag');

import fragments from './fragments';

module.exports.activeProductsCheck = gql`
  query ActiveProductsCheck($productsFilter: activeProductsCheckInput!, $includeEnterpriseSpecials: Boolean = false) {
    activeProductsCheck(filter: $productsFilter, includeEnterpriseSpecials: $includeEnterpriseSpecials) {
      _id
      enterpriseProductId
      medicalSpecialPrices
      medicalPrices
      recSpecialPrices
      wholesalePrices
      recPrices
      Options
      limitsPerCustomer {
        key
        value
      }
      manualInventory {
        option
        inventory
      }
      Name
      special
      specialData {
        bogoSpecials {
          applyRewardsToConditions
          excludeConditionItemsFromRewards
          bogoConditionLogicOperator
          bogoConditions {
            _id
            brandId
            brandIds
            brandName
            brandNames
            categoryIds
            categoryName
            categoryNames
            productGroup
            productId
            productIds
            quantity
            subcategoryIds
            subcategoryNames
            weight
            weightOperator
          }
          bogoRewardLogicOperator
          bogoRewards {
            _id
            brandId
            brandIds
            brandName
            brandNames
            categoryIds
            categoryName
            categoryNames
            dollarDiscount
            productGroup
            productId
            productIds
            percentDiscount
            quantity
            subcategoryIds
            subcategoryNames
            targetPrice
            weight
          }
          discountBehavior
          discountToCart {
            _id
            enabled
            discountType
            value
          }
          endStamp
          excludedProducts {
            conditions {
              _id
              key
              Name
            }
            rewards {
              _id
              key
              Name
            }
          }
          isRecurring
          itemsForAPrice {
            _id
            enabled
            value
          }
          discountBundle {
            _id
            applyTo
            discountType
            enabled
            limit
            value
          }
          menuType
          recurringEndDate
          redemptionLimit
          specialId
          specialName
          specialType
          totalQuantity {
            enabled
            maxQuantity
            quantity
            quantityOperator
          }
          totalWeight {
            enabled
            weight
            weightOperator
          }
          totalSpend {
            enabled
            maximumSpend
            minimumSpend
            spendOperator
          }
        }
        saleSpecials {
          discount
          eligibleProductOptions
          menuType
          percentDiscount
          saleDiscounts {
            _id
            brandIds
            brandNames
            categoryIds
            categoryNames
            discountAmount
            discountType
            productGroup
            productIds
            subcategoryIds
            subcategoryNames
            weights
            weightOperator
          }
          source
          sourceId
          specialId
          specialRestrictions
          specialType
          stackingMode
          targetPrice
        }
      }
      POSMetaData {
        children {
          option
          quantity
          quantityAvailable
          canonicalEffectivePotencyMg
        }
      }
      bottleDepositTaxCents
    }
  }
`;

module.exports.adminFilteredProducts = gql`
  ${fragments.adminBaseProductFragment}

  query AdminFilteredProducts($productsFilter: productsFilterInput!, $page: Int, $perPage: Int) {
    filteredProducts(filter: $productsFilter, page: $page, perPage: $perPage) {
      products {
        ...adminBaseProductFragment
        libraryProduct {
          id
          name
        }
        productTemplate
        connectedCount
        forcedPotencyUnit
      }
      queryInfo {
        totalCount
      }
    }
  }
`;

module.exports.adminIndividualFilteredProduct = gql`
  ${fragments.adminBaseProductFragment}

  query AdminIndividualFilteredProduct($productsFilter: productsFilterInput!, $includeTerpenes: Boolean! = false) {
    filteredProducts(filter: $productsFilter) {
      products {
        ...adminBaseProductFragment
        stockImage
        stockImageAliases
        stockImageCategory
        productTemplate
        libraryProduct {
          id
          name
        }
        terpenes @include(if: $includeTerpenes) {
          id
          terpeneId
          value
          unit
          unitSymbol
          libraryTerpene {
            name
          }
        }
        cannabinoidsV2 {
          value
          unit
          cannabinoidId
          cannabinoid {
            name
          }
        }
        connectedCount
        forcedPotencyUnit

        connectedByUser {
          firstName
          lastName
          fullName
        }
        updatedByUser {
          firstName
          lastName
          fullName
        }
        updatedByAdminAt
      }
      queryInfo {
        totalCount
      }
    }
  }
`;

module.exports.getProductChangeEvents = gql`
  query GetProductChangeEvents($productId: ID!) {
    productChangeEvents(productId: $productId) {
      id
      createdAt
      createdBy
      createdByUser {
        firstName
        lastName
        fullName
      }
      event
      metadata
      newValues
      oldValues
      productId
      versionId
    }
  }
`;

module.exports.matchingProducts = gql`
  query MatchingProducts(
    $dispensaryIds: [String]
    $limit: Int
    $name: String
    $productLibraryState: String
    $bypassOnlineThresholds: Boolean
  ) {
    matchingProducts(
      dispensaryIds: $dispensaryIds
      limit: $limit
      name: $name
      productLibraryState: $productLibraryState
      bypassOnlineThresholds: $bypassOnlineThresholds
    ) {
      id
      _id
      Name
      brand {
        id
        name
      }
      brandName
      type
      strainType
      THC
      THCContent {
        unit
        range
      }
      CBD
      CBDContent {
        unit
        range
      }
      Image
      recPrices
    }
  }
`;

module.exports.bulkLibraryProductUpdateStatus = gql`
  query BulkLibraryProductUpdateStatus($jobId: String!) {
    bulkLibraryProductUpdateStatus(jobId: $jobId) {
      meta {
        status
      }
    }
  }
`;

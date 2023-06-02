const gql = require('graphql-tag');

module.exports.filteredSpecialsV2 = gql`
  query FilteredSpecialsV2($specialsFilter: filteredSpecialsInput!, $includeEnterpriseSpecials: Boolean = false) {
    filteredSpecialsV2(filter: $specialsFilter, includeEnterpriseSpecials: $includeEnterpriseSpecials) {
      queryInfo {
        totalCount
      }
      specials {
        _id
        active
        applyRewardsToConditions
        excludeConditionItemsFromRewards
        menuDisplayName
        menuDisplayDescription
        bogoConditionLogicOperator
        menuDisplayImage
        bogoConditions {
          _id
          brandId
          brandIds
          brandName
          brandNames
          categoryIds
          categoryName
          categoryNames
          enterpriseProductId
          exclusions {
            _id
            brandIds
            brandNames
            categoryIds
            categoryNames
            productIds
            productGroup
            subcategoryIds
            subcategoryNames
            weights
            weightOperator
          }
          productGroup
          productId
          productIds
          quantity
          requiresSingleSku
          subcategoryIds
          subcategoryNames
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
          weight
          weights
          weightOperator
        }
        bogoRewardLogicOperator
        bogoRewards {
          _id
          applicationRules {
            _id
            comparisonOperator
            quantity
            applicationType
          }
          brandId
          brandIds
          brandName
          brandNames
          categoryIds
          categoryName
          categoryNames
          dollarDiscount
          discountAmount
          discountType
          enterpriseProductId
          exclusions {
            _id
            brandIds
            brandNames
            categoryIds
            categoryNames
            productIds
            productGroup
            subcategoryIds
            subcategoryNames
            weights
            weightOperator
          }
          productGroup
          productId
          productIds
          percentDiscount
          quantity
          requiresSingleSku
          subcategoryIds
          subcategoryNames
          targetPrice
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
          weight
          weights
          weightOperator
        }
        clicks
        createdAt
        createdBy
        description
        descriptionHtml
        discount
        discountedPrices
        discountPrecedence
        discountStacking
        discountToCart {
          _id
          enabled
          discountType
          value
        }
        dispensaryId
        displayRank
        emailSpecial
        endDay
        endStamp
        endTime
        excludedProducts {
          _id
          Name
          key
          conditions {
            _id
            Name
            key
          }
          rewards {
            _id
            Name
            key
          }
        }
        heading
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
        name
        percentDiscount
        productDiscounts
        productGroup
        productGroupRewards
        products
        recurring {
          days
          endDate
          endTime
          setEndDate
          startTime
        }
        redemptionLimit
        saleDiscounts {
          _id
          brandIds
          brandNames
          categoryIds
          categoryNames
          discountAmount
          discountType
          exclusions {
            _id
            brandIds
            brandNames
            categoryIds
            categoryNames
            productGroup
            productIds
            subcategoryIds
            subcategoryNames
            weights
            weightOperator
          }
          productGroup
          productIds
          subcategoryIds
          subcategoryNames
          weights
          weightOperator
        }
        scope
        source
        sourceId
        specialId
        specialRestrictions
        specialType
        stackingBehavior
        stackingMode
        startDate
        startDay
        startStamp
        startTime
        subject
        targetPrice
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
        updatedAt
        updatedBy
        version
      }
    }
  }
`;

module.exports.filteredSpecials = gql`
  query FilteredSpecials($specialsFilter: filteredSpecialsInput!, $includeEnterpriseSpecials: Boolean = false) {
    filteredSpecials(filter: $specialsFilter, includeEnterpriseSpecials: $includeEnterpriseSpecials) {
      queryInfo {
        totalCount
      }
      specials {
        _id
        active
        applyRewardsToConditions
        excludeConditionItemsFromRewards
        menuDisplayName
        menuDisplayDescription
        bogoConditionLogicOperator
        menuDisplayImage
        bogoConditions {
          _id
          brandId
          brandIds
          brandName
          brandNames
          categoryIds
          categoryName
          categoryNames
          enterpriseProductId
          exclusions {
            _id
            brandIds
            brandNames
            categoryIds
            categoryNames
            productIds
            productGroup
            subcategoryIds
            subcategoryNames
            weights
            weightOperator
          }
          productGroup
          productId
          productIds
          quantity
          requiresSingleSku
          subcategoryIds
          subcategoryNames
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
          weight
          weights
          weightOperator
        }
        bogoRewardLogicOperator
        bogoRewards {
          _id
          applicationRules {
            _id
            comparisonOperator
            quantity
            applicationType
          }
          brandId
          brandIds
          brandName
          brandNames
          categoryIds
          categoryName
          categoryNames
          dollarDiscount
          discountAmount
          discountType
          enterpriseProductId
          exclusions {
            _id
            brandIds
            brandNames
            categoryIds
            categoryNames
            productIds
            productGroup
            subcategoryIds
            subcategoryNames
            weights
            weightOperator
          }
          productGroup
          productId
          productIds
          percentDiscount
          quantity
          subcategoryIds
          subcategoryNames
          requiresSingleSku
          targetPrice
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
          weight
          weights
          weightOperator
        }
        clicks
        createdAt
        createdBy
        description
        descriptionHtml
        discount
        discountedPrices
        discountPrecedence
        discountStacking
        discountToCart {
          _id
          enabled
          discountType
          value
        }
        dispensaryId
        displayRank
        emailSpecial
        endDay
        endStamp
        endTime
        excludedProducts {
          _id
          Name
          key
          conditions {
            _id
            Name
            key
          }
          rewards {
            _id
            Name
            key
          }
        }
        heading
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
        name
        percentDiscount
        productDiscounts
        productGroup
        productGroupRewards
        products
        recurring {
          days
          endDate
          endTime
          setEndDate
          startTime
        }
        redemptionLimit
        saleDiscounts {
          _id
          brandIds
          brandNames
          categoryIds
          categoryNames
          discountAmount
          discountType
          exclusions {
            _id
            brandIds
            brandNames
            categoryIds
            categoryNames
            productGroup
            productIds
            subcategoryIds
            subcategoryNames
            weights
            weightOperator
          }
          productGroup
          productIds
          subcategoryIds
          subcategoryNames
          weights
          weightOperator
        }
        scope
        source
        sourceId
        specialId
        specialRestrictions
        specialType
        stackingBehavior
        stackingMode
        startDate
        startDay
        startStamp
        startTime
        subject
        targetPrice
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
        updatedAt
        updatedBy
        version
      }
    }
  }
`;
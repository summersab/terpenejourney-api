const gql = require('graphql-tag');

module.export.adminBaseProductFragment = gql`
  fragment adminBaseProductFragment on Products {
    id
    _id
    AdditionalOptions
    brand {
      _id
      id
      imageUrl
      isGlobal
      name
    }
    brandName
    CBD
    CBDContent {
      unit
      range
    }
    comingSoon
    connectedAt
    connectedBy
    createdAt
    createdBy
    dateCreated
    Description
    descriptionHtml
    DispensaryID
    dispensaryName
    duplicatedProductId
    effects
    enterpriseProductId
    Image
    images {
      _id
      url
      origin
      description
      active
      userId
    }
    imgixSettings {
      productCard {
        border
        mark
        markscale
        markpad
        fit
      }
      productModal {
        border
        mark
        markscale
        markpad
        fit
      }
    }
    integrationKey
    matchedLibraryItemsConfidence
    medicalOnly
    medicalPrices
    medicalSpecialPrices
    Name
    Options
    limitsPerCustomer {
      key
      value
    }
    manualInventory {
      option
      inventory
    }
    originalPrices
    overrides
    POSMetaData {
      canonicalCategory
      canonicalID
      canonicalImgUrl
      canonicalBrandName
      canonicalName
      children {
        canonicalCategory
        canonicalID
        canonicalName
        medPrice
        option
        price
        quantity
        quantityAvailable
        recPrice
        standardEquivalent {
          value
          unit
        }
        recEquivalent {
          value
          unit
        }
      }
      integrationID
    }
    preCropImage
    Prices
    wholesalePrices
    rawPrices
    rawMedicalPrices
    recOnly
    recPrices
    recSpecialPrices
    preTaxRecPrices
    preTaxMedPrices
    reviewedAt
    reviewedBy
    score
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
        discountToCart {
          _id
          enabled
          discountType
          value
        }
        discountBehavior
        discountStacking
        discountPrecedence
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
        stackingBehavior
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
        discountStacking
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
        stackingBehavior
        stackingMode
        targetPrice
      }
    }
    Status
    strainType
    subcategory
    syncedAt
    updatedAt
    updatedBy
    THC
    THCContent {
      unit
      range
    }
    type
    vapeTaxApplicable
    weight
    featured {
      current
      startTime
      endTime
    }
    isBelowThreshold
    isBelowKioskThreshold
    optionsBelowThreshold
    optionsBelowKioskThreshold
    adminEdits {
      updatedAt
      updatedBy
    }
    brandLogo
    brandDescription
    cName
    brandId
    bottleDepositTaxCents
  }
`;

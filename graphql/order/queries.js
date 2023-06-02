const gql = require('graphql-tag');

module.exports.filteredOrders = gql`
  query FilteredOrders(
    $ordersFilter: ordersFilterInput!
    $ordersSort: ordersSortInput
    $ordersPagination: ordersPaginationInput
  ) {
    filteredOrders(filter: $ordersFilter, sort: $ordersSort, pagination: $ordersPagination) {
      queryInfo {
        totalCount
      }
      orders {
        coupon {
          _id
          active
          addedDate
          amount
          percentDiscount
          fixedDiscountInCents
          code
          dispensary
          expDate
          numAllowedUses
          numUses
          usedBy
        }
        createdAt
        credit
        durationEstimates {
          delivery {
            lowInMinutes
            highInMinutes
          }
          pickup {
            lowInMinutes
            highInMinutes
          }
        }
        deliveryFee
        dispensary {
          _id
          name
          cName
          phone
          logoImage
          address
          timezone
          featureFlags {
            hideDeliveryEstimate
          }
        }
        id
        customer {
          _id
          emails {
            address
          }
          profile {
            medicalCard {
              expirationDate
              number
              state
              photo
            }
            driversLicense
            photoId
            firstName
            lastName
            email
            phone
            birthday
          }
        }
        guestCustomer {
          firstName
          lastName
          email
          phone
          birthMonth
          birthDay
          birthYear
        }
        medicalOrder
        medicalCard {
          expirationDate
          number
          state
          photo
        }
        mixAndMatch
        orderId
        orders {
          basePrice
          option
          price
          additionalOption
          product {
            _id
            Name
            type
            Options
            Image
            AdditionalOptions
            brandName
            preTaxRecPrices
            preTaxMedPrices
          }
          quantity
        }
        specialInstructions
        status
        taxAmount
        cannabisTax
        bottleDepositTaxCents
        tipAmount
        paymentFee
        paymentMethod
        subtotal
        totalCost
        isPreviewOrder
        terminal
        autoConfirmed
        autoClosed
        isKioskOrder
        isAnonymous
        isAfterHoursOrder
        isCurbsidePickupOrder
        isDriveThruPickupOrder
        driversLicense
        deliveryInfo {
          address
          apartmentNum
          deliveryAddress
          deliveryOption
          lastSearchedAddress
          nonDeliveryAddress
          address
          location {
            lat
            lng
            ln1
            ln2
            city
            state
            zipcode
          }
        }
        cannabisTaxExistence {
          med {
            pos
            menu
            checkout
          }
          rec {
            pos
            menu
            checkout
          }
        }
        salesTaxExistence {
          med {
            pos
            menu
            checkout
          }
          rec {
            pos
            menu
            checkout
          }
        }
        bottleDepositTaxExistence {
          med {
            pos
            menu
            checkout
          }
          rec {
            pos
            menu
            checkout
          }
        }
        appliedRewards {
          copy
          value
          operator
        }
        reservation {
          startTimeISO
          endTimeISO
        }
        receipt
      }
    }
  }
`;

module.exports.getOrderForDelivery = gql`
  query GetOrderForDelivery($id: String!) {
    getOrderForDelivery(id: $id) {
      coupon {
        _id
      }
      createdAt
      credit
      durationEstimates {
        delivery {
          lowInMinutes
          highInMinutes
        }
        pickup {
          lowInMinutes
          highInMinutes
        }
      }
      deliveryFee
      dispensary {
        _id
        name
        cName
        phone
        logoImage
        address
        timezone
        featureFlags {
          hideDeliveryEstimate
        }
      }
      id
      customer {
        _id
        emails {
          address
        }
        profile {
          medicalCard {
            expirationDate
            number
            state
            photo
          }
          driversLicense
          photoId
          firstName
          lastName
          email
          phone
          birthday
        }
      }
      guestCustomer {
        firstName
        lastName
        email
        phone
        birthMonth
        birthDay
        birthYear
      }
      medicalOrder
      medicalCard {
        expirationDate
        number
        state
        photo
      }
      orderId
      orders {
        basePrice
        option
        price
        product {
          _id
          Name
          type
          Options
          brandName
        }
        quantity
      }
      specialInstructions
      status
      taxAmount
      cannabisTax
      bottleDepositTaxCents
      tipAmount
      paymentFee
      paymentMethod
      subtotal
      totalCost
      isPreviewOrder
      terminal
      autoConfirmed
      autoClosed
      deliveryInfo {
        address
        apartmentNum
        deliveryAddress
        deliveryOption
        lastSearchedAddress
        nonDeliveryAddress
        address
        location {
          lat
          lng
          ln1
          ln2
          city
          state
          zipcode
        }
      }
    }
  }
`;

module.exports.getOrder = gql`
  query GetOrder($id: String!) {
    getOrder(id: $id) {
      archived
      order {
        coupon {
          _id
          active
          addedDate
          amount
          percentDiscount
          fixedDiscountInCents
          code
          dispensary
          expDate
          numAllowedUses
          numUses
          usedBy
        }
        manualDiscount {
          fixedDiscountInCents
          percentDiscount
        }
        createdAt
        credit
        curbsideArrivalInfo {
          arrivalInformation
        }
        deliveryEstimate
        deliveryFee
        dispensary {
          _id
          name
          cName
          phone
          logoImage
          address
          timezone
          featureFlags {
            hideDeliveryEstimate
          }
        }
        id
        customer {
          _id
          emails {
            address
          }
          profile {
            medicalCard {
              expirationDate
              number
              state
              photo
            }
            driversLicense
            photoId
            firstName
            lastName
            email
            phone
            birthday
          }
        }
        mixAndMatch
        pos {
          name
          externalID
          failureType
          failureReason
          failureAcks {
            web
            terminal
          }
          humanReadableError
        }
        fleetManagementTask {
          adapter
          id
        }
        guestCustomer {
          firstName
          lastName
          email
          phone
          birthMonth
          birthDay
          birthYear
          photoId
        }
        medicalOrder
        medicalCard {
          expirationDate
          number
          state
          photo
        }
        orderId
        orders {
          basePrice
          option
          price
          additionalOption
          product {
            _id
            Name
            Image
            strainType
            type
            subcategory
            Options
            brandName
            POSMetaData {
              children {
                canonicalName
                option
              }
            }
            AdditionalOptions
            THCContent {
              unit
              range
            }
            CBDContent {
              unit
              range
            }
            Prices
            preTaxRecPrices
            preTaxMedPrices
          }
          quantity
        }
        specialInstructions
        status
        statusTimes
        statusEvents {
          event
          at
          by
          byType
          agentName
        }
        taxAmount
        cannabisTax
        bottleDepositTaxCents
        tipAmount
        paymentFee
        paymentMethod
        subtotal
        totalCost
        isAnonymous
        isAfterHoursOrder
        isGuestOrder
        isPreviewOrder
        isKioskOrder
        isCurbsidePickupOrder
        isDriveThruPickupOrder
        terminal
        autoConfirmed
        autoClosed
        driverName
        driverNumber
        driversLicense
        deliveryInfo {
          address
          apartmentNum
          deliveryAddress
          deliveryOption
          lastSearchedAddress
          nonDeliveryAddress
          address
          location {
            lat
            lng
            ln1
            ln2
            city
            state
            zipcode
          }
        }
        editEvents {
          at
          by
          byType
          agentName
        }
        isArchived
        archivedBy
        archivedAtISO
        cancellationReason
        updatedAt
        hypur {
          id
        }
        paysafe {
          card {
            type
            lastDigits
          }
          authorizations {
            id
            amount
          }
          settlements {
            id
            amount
            cancelled
          }
          refunds {
            id
            amount
          }
        }
        moneris {
          id
          status
          transactionNumber
          card {
            brand
            lastDigits
          }
        }
        appliedRewards {
          copy
          value
          operator
          brand
        }
        reservation {
          startTimeISO
          endTimeISO
        }
      }
    }
  }
`;

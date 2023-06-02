const gql = require('graphql-tag');

module.exports.addCustomerToOrder = gql`
  mutation AddCustomerToOrder($input: addCustomerToOrderInput!) {
    addCustomerToOrder(input: $input) {
      updated
    }
  }
`;

module.exports.archiveOrder = gql`
  mutation ArchiveOrder($input: archiveOrderInput!) {
    archiveOrder(input: $input) {
      success
      message
    }
  }
`;

module.exports.createOrder = gql`
  mutation CreateOrder($input: ordersCreateInput!) {
    createOrder(order: $input) {
      paymentMethod
      coupon {
        _id
      }
      tipValue {
        percent
        dollar
      }
      createdAt
      creditTotal
      customer {
        _id
        profile {
          medicalCard {
            expirationDate
            number
            state
            photo
          }
          driversLicense
          photoId
        }
      }
      medicalOrder
      medicalCard {
        expirationDate
        number
        state
        photo
      }
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
      deliveryInfo {
        address
        apartmentNum
        deliveryAddress
        deliveryOption
        lastSearchedAddress
        nonDeliveryAddress
        location {
          ln1
          ln2
          city
          state
          zipcode
        }
      }
      deliveryFee
      dispensary {
        _id
        cName
        name
        phone
        address
        offerDelivery
        alt36
        check
        creditCardAtDoor
        payOnlineChase
        payOnlineHypur
        payOnlineMerrco
        payOnlineMoneris
        creditCardByPhone
        debitOnly
        linx
        canPay
        paytender
        aeropay
        deliveryMin
        timezone
        deliveryHours {
          Monday {
            end
            start
          }
          Tuesday {
            end
            start
          }
          Wednesday {
            end
            start
          }
          Thursday {
            end
            start
          }
          Friday {
            end
            start
          }
          Saturday {
            end
            start
          }
          Sunday {
            end
            start
          }
        }
        pickupHours {
          Monday {
            end
            start
          }
          Tuesday {
            end
            start
          }
          Wednesday {
            end
            start
          }
          Thursday {
            end
            start
          }
          Friday {
            end
            start
          }
          Saturday {
            end
            start
          }
          Sunday {
            end
            start
          }
        }
        feeTiers {
          fee
          max
          min
        }
        featureFlags {
          hideDeliveryEstimate
        }
      }
      id
      orderId
      orders {
        basePrice
        option
        price
        product {
          _id
          Name
          type
          strainType
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
      }
      taxAmount
      cannabisTax
      tipAmount
      subtotal
      totalCost
      guestCustomer {
        phone
        firstName
        lastName
        email
        birthMonth
        birthDay
        birthYear
      }
      isKioskOrder
      isPreviewOrder
      isGuestOrder
      isAfterHoursOrder
      messages
      destinationTerminal
      customerState
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
        id
        copy
        available
        value
        operator
      }
    }
  }
`;

module.exports.exportOrders = gql`
  mutation ExportOrders($dispensaryId: String!, $email: String!, $cancelled: Boolean) {
    exportOrders(dispensaryId: $dispensaryId, email: $email, cancelled: $cancelled) {
      success
    }
  }
`;

module.exports.exportOrderReport = gql`
  mutation ExportOrderReport($export: exportOrderReportInput!) {
    exportOrderReport(export: $export) {
      success
      count
    }
  }
`;

module.exports.markOrderPOSFailed = gql`
  mutation MarkOrderPOSFailed($input: markOrderPOSFailedInput!) {
    markOrderPOSFailed(input: $input) {
      updated
    }
  }
`;

module.exports.printOrderOnTerminal = gql`
  mutation PrintOrderOnTerminal($input: printOrderInput!) {
    printOrderOnTerminal(input: $input) {
      printed
    }
  }
`;

module.exports.reopenOrder = gql`
  mutation ReopenOrder($id: String!) {
    reopenOrder(id: $id) {
      success
    }
  }
`;

module.exports.unarchiveOrder = gql`
  mutation UnarchiveOrder($id: String!) {
    unarchiveOrder(id: $id) {
      success
    }
  }
`;

module.exports.updateOrderV2 = gql`
  mutation UpdateOrderV2($input: ordersCreateInput!) {
    updateOrderV2(input: $input) {
      paymentMethod
      coupon {
        _id
      }
      tipValue {
        percent
        dollar
      }
      createdAt
      creditTotal
      customer {
        _id
        profile {
          medicalCard {
            expirationDate
            number
            state
          }
          driversLicense
        }
      }
      medicalOrder
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
      deliveryInfo {
        address
        apartmentNum
        deliveryAddress
        deliveryOption
        lastSearchedAddress
        nonDeliveryAddress
      }
      deliveryFee
      driverName
      driverNumber
      driversLicense
      dispensary {
        _id
        cName
        name
        phone
        address
        timezone
        offerDelivery
        alt36
        check
        creditCardAtDoor
        creditCardByPhone
        debitOnly
        linx
        canPay
        paytender
        aeropay
        deliveryMin
        deliveryHours {
          Monday {
            end
            start
          }
          Tuesday {
            end
            start
          }
          Wednesday {
            end
            start
          }
          Thursday {
            end
            start
          }
          Friday {
            end
            start
          }
          Saturday {
            end
            start
          }
          Sunday {
            end
            start
          }
        }
        pickupHours {
          Monday {
            end
            start
          }
          Tuesday {
            end
            start
          }
          Wednesday {
            end
            start
          }
          Thursday {
            end
            start
          }
          Friday {
            end
            start
          }
          Saturday {
            end
            start
          }
          Sunday {
            end
            start
          }
        }
        feeTiers {
          fee
          max
          min
        }
      }
      id
      orderId
      orders {
        basePrice
        option
        price
        product {
          _id
          Name
          productName
          Image
          type
          strainType
          Options
          Prices
        }
        quantity
      }
      specialInstructions
      status
      statusEvents {
        event
        at
        by
        byType
        agentName
      }
      taxAmount
      cannabisTax
      tipAmount
      subtotal
      total
      totalCost
      guestCustomer {
        phone
        firstName
        lastName
        email
        birthMonth
        birthDay
        birthYear
      }
      isKioskOrder
      isAfterHoursOrder
      isPreviewOrder
      isGuestOrder
      statusTimes
      editEvents {
        at
        by
        byType
        agentName
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
    }
  }
`;

module.exports.updateOrderStatus = gql`
  mutation UpdateOrderStatus($input: ordersStatusUpdateInput!) {
    updateOrderStatus(order: $input) {
      paymentMethod
      coupon {
        _id
      }
      tipValue {
        percent
        dollar
      }
      createdAt
      creditTotal
      customer {
        _id
        emails {
          address
        }
        profile {
          birthday
          medicalCard {
            expirationDate
            number
            state
            photo
          }
          driversLicense
          firstName
          lastName
          fullName
          phone
          photoId
        }
      }
      medicalOrder
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
      deliveryInfo {
        address
        apartmentNum
        deliveryAddress
        deliveryOption
        lastSearchedAddress
        nonDeliveryAddress
      }
      deliveryFee
      driverName
      driverNumber
      dispensary {
        _id
        cName
        name
        phone
        address
        timezone
        offerDelivery
        alt36
        check
        creditCardAtDoor
        creditCardByPhone
        debitOnly
        linx
        canPay
        paytender
        aeropay
        deliveryMin
        deliveryHours {
          Monday {
            end
            start
          }
          Tuesday {
            end
            start
          }
          Wednesday {
            end
            start
          }
          Thursday {
            end
            start
          }
          Friday {
            end
            start
          }
          Saturday {
            end
            start
          }
          Sunday {
            end
            start
          }
        }
        pickupHours {
          Monday {
            end
            start
          }
          Tuesday {
            end
            start
          }
          Wednesday {
            end
            start
          }
          Thursday {
            end
            start
          }
          Friday {
            end
            start
          }
          Saturday {
            end
            start
          }
          Sunday {
            end
            start
          }
        }
        feeTiers {
          fee
          max
          min
        }
      }
      id
      orderId
      orders {
        basePrice
        option
        price
        product {
          _id
          Name
          productName
          Image
          type
          strainType
          Options
          Prices
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
      tipAmount
      paymentFee
      subtotal
      total
      totalCost
      guestCustomer {
        phone
        firstName
        lastName
        email
        birthMonth
        birthDay
        birthYear
      }
      isKioskOrder
      isAfterHoursOrder
      isCurbsidePickupOrder
      isDriveThruPickupOrder
      isPreviewOrder
      isGuestOrder
      terminal
      editEvents {
        at
        by
        byType
        agentName
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
    }
  }
`;

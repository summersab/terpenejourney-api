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
				deliveryFee
				id
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
			}
		}
	}
`;

module.exports.filteredOrdersNotes = gql`
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
				createdAt
				id
				orderId
				specialInstructions
			}
		}
	}
`;

module.exports.filteredOrdersOrig = gql`
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

module.exports.loginConsumer = gql`
	mutation LoginConsumer($email: String!, $password: String!) {
		loginConsumer(email: $email, password: $password) {
			accessToken
			transferToken
			user {
				_id
				createdAt
				emails {
					address
				}
				profile {
					birthday
					emailNotifications
					emailOptIn
					firstName
					lastName
					medicalCard {
						expirationDate
						number
						state
						photo
					}
					phone
					photoId
					textNotifications
					type
				}
			}
		}
	}
`;

module.exports.meConsumer = gql`
	query MeConsumer {
		meConsumer {
			_id
			createdAt
			emails {
				address
			}
			profile {
				address {
					city
					lat
					ln1
					ln2
					lng
					state
					zipcode
				}
				birthday
				emailNotifications
				emailOptIn
				firstName
				lastName
				medicalCard {
					expirationDate
					number
					state
					photo
				}
				phone
				textNotifications
				type
				photoId
			}
		}
	}
`;
/**
 {
   "operationName" : "ConsumerSignup",
   "variables" : {
      "input" : {
         "data" : {
            "embedded" : false
         },
         "email" : "anonymous.temp.account@gmail.com",
         "password" : "w56u85e8kk45e",
         "profile" : {
            "birthday" : "12/19/1986",
            "emailNotifications" : true,
            "firstName" : "Andrew",
            "lastName" : "Summers",
            "medicalCard" : null,
            "phone" : "(281) 433-7909",
            "textNotifications" : true
         }
      }
   }
}

 */
module.exports.consumerSignup = gql`
	mutation ConsumerSignup($input: consumerSignupInput!) {
		consumerSignup(input: $input) {
			accessToken
			user {
				_id
				emails {
					address
				}
				profile {
					birthday
					emailNotifications
					emailOptIn
					firstName
					lastName
					medicalCard {
						expirationDate
						number
						state
					}
					phone
					photoId
					textNotifications
				}
			}
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

module.exports.fetchCartDetails = gql`
	fragment terpeneFragment on Terpene {
		aliasList
		aromas
		description
		effects
		id
		name
		potentialHealthBenefits
		unitSymbol
	}
	
	fragment activeTerpeneFragment on ActiveTerpene {
		id
		terpene {
		...terpeneFragment
		}
		name
		terpeneId
		unit
		unitSymbol
		value
	}
	
	fragment activeCannabinoidFragment on ActiveCannabinoid {
		cannabinoidId
		cannabinoid {
		description
		id
		name
		}
		unit 
		value
	}
	
	fragment productFragment on Product {
		brand {
		description
		id
		imageUrl
		name
		}
		category
		description
		descriptionHtml
		effects
		enterpriseProductId
		id
		productBatchId
		image
		images {
		id
		url
		label
		description
		}
		menuTypes
		name
		slug
		posId
		potencyCbd {
		formatted
		range
		unit
		}
		potencyThc {
		formatted
		range
		unit
		}
		posMetaData {
		id
		category
		sku
		}
		staffPick
		strainType
		subcategory
		tags
		variants {
		id
		option
		priceMed
		priceRec
		specialPriceMed
		specialPriceRec
		quantity
		}
		terpenes {
		...activeTerpeneFragment
		}
		cannabinoids {
		...activeCannabinoidFragment
		}
	}
	
	fragment checkoutAdressFragment on CheckoutAddress {
		city
		deliverable
		formatted
		geometry {
		coordinates
		type
		}
		state
		street1
		street2
		valid
		zip
	}
	
	fragment itemFragment on Item {
		id
		errors
		option
		product {
		...productFragment
		}
		productId
		quantity
		valid
		isDiscounted
		basePrice
		discounts {
		total
		}
		taxes {
		total
		cannabis
		sales
		}
	}
	
	fragment priceSummaryFragment on PriceSummary {
		discounts
		fees
		mixAndMatch
		rewards
		subtotal
		taxes
		total
	}
	
	fragment checkoutFragment on Checkout {
		address {
		...checkoutAdressFragment
		}
		createdAt
		id
		items {
		...itemFragment
		}
		orderType
		priceSummary {
		...priceSummaryFragment
		}
		pricingType
		redirectUrl
		updatedAt
	}
	
	query FetchCartDetails(
		$retailerId: ID!
		$checkoutId: ID!
	) {
		checkout(
		retailerId: $retailerId
		id: $checkoutId
		) {
		...checkoutFragment
		}
	} 
`;

/*
module.exports.terpeneFragmentmenuQuery = gql`
	fragment terpeneFragment on Terpene {
		aliasList
		aromas
		description
		effects
		id
		name
		potentialHealthBenefits
		unitSymbol
	}

	fragment activeTerpeneFragment activeTerpeneFragmenton ActiveTerpene {
		id
		terpene {
			...terpeneFragment
		}
		name
		terpeneId
		unit
		unitSymbol
		value
	}

	fragment activeCannabinoidFragment activeCannabinoidFragmenton ActiveCannabinoid {
		cannabinoidId
		cannabinoid {
			description
			id
			name
		}
		unit
		value
	}

	fragment productFragment productFragmenton Product {
		brand {
			description
			id
			imageUrl
			name
		}
		category
		description
		descriptionHtml
		effects
		enterpriseProductId
		id
		productBatchId
		image
		images {
			id
			url
			label
			description
		}
		menuTypes
		name
		slug
		posId
		potencyCbd {
			formatted
			range
			unit
		}
		potencyThc {
			formatted
			range
			unit
		}
		posMetaData {
			id
			category
			sku
		}
		staffPick
		strainType
		subcategory
		tags
		variants {
			id
			option
			priceMed
			priceRec
			specialPriceMed
			specialPriceRec
			quantity
		}
		terpenes {
			...activeTerpeneFragment
		}
		cannabinoids {
			...activeCannabinoidFragment
		}
	}

	query MenuQuery(
		$retailerId: ID!
	) {
		menu(
			retailerId: $retailerId
		) {
			products {
				...productFragment
			}
		}
	}
	`;




module.exports.emailIntegrationCredentials = gql`
	mutation emailIntegrationCredentials($input: integrationCredsInput!) {
		emailIntegrationCredentials(input: $input) {
			success
		}
	}
`;

module.exports.dispensaryUpdate = gql`
	mutation DispensaryUpdate($input: dispensaryUpdateInput!) {
		dispensaryUpdate(input: $input) {
			success
		}
	}
`;

module.exports.dispensaryUpdateOptionsSettings = gql`
	mutation DispensaryUpdateOptionsSettings($input: dispensaryUpdateOptionsSettingsInput!) {
		dispensaryUpdateOptionsSettings(input: $input) {
			success
			message
		}
	}
`;

module.exports.dispensaryUpdateTaxConfiguration = gql`
	mutation DispensaryUpdateTaxConfiguration($input: dispensaryUpdateInput!) {
		dispensaryUpdateTaxConfiguration(input: $input) {
			success
		}
	}
`;

module.exports.dispensaryRemoveFromChain = gql`
	mutation DispensaryRemoveFromChain($input: dispensaryRemoveFromChainInput!) {
		dispensaryRemoveFromChain(input: $input) {
			success
		}
	}
`;

module.exports.chainDispensaryIds = gql`
	query ChainDispensaryIds($chainId: String, $status: String) {
		chainDispensaryIds(chainId: $chainId, status: $status)
	}
`;

module.exports.chainDispensariesByStatus = gql`
	query ChainDispensariesByStatus($chainId: String, $status: String) {
		chainDispensariesByStatus(chainId: $chainId, status: $status) {
			id
			retailer {
				id
				assignedToBillingGroup
			}
		}
	}
`;

module.exports.filteredDispensaries = gql`
	query AdminDispensaries($dispensaryFilter: dispensariesFilterInput!) {
		filteredDispensaries(filter: $dispensaryFilter) {
			...baseDispensaryFragment
			hoursSettings {
				inStorePickup {
					...hoursSettingsForOrderTypeFragment
				}
				curbsidePickup {
					...hoursSettingsForOrderTypeFragment
				}
				driveThruPickup {
					...hoursSettingsForOrderTypeFragment
				}
				delivery {
					...hoursSettingsForOrderTypeFragment
				}
			}
			orderTypesConfigV2 {
				inStorePickup {
					...inStorePickupOrderingSettingsFragment
				}
				curbsidePickup {
					...curbsidePickupOrderingSettingsFragment
				}
				driveThruPickup {
					...driveThruPickupOrderingSettingsFragment
				}
				delivery {
					...deliveryOrderingSettingsFragment
					...deliveryZonesFragment
				}
				kiosk {
					...kioskOrderingSettingsFragment
				}
				offerAnyPickupService
				offerDeliveryService
			}
			enabledOrderTypes {
				curbsidePickup
				delivery
				driveThruPickup
				inStorePickup
				kiosk
				pickup
			}
			tier
			timezone
			embeddedMenuUrl
			menuIntegration {
				live
				adapter
				lastSyncAt
				lastSyncAtISO
			}
			fleetManagementIntegration {
				live
				adapter
				flags {
					fleetManagementStatus
					onfleetStatus
				}
			}
			superAdmins {
				name
				role
				userId
			}
			dangerIntervals {
				confirmedInMinutes
				readyForPickupInMinutes
				inTransitInMinutes
				inTransitClosedInMinutes
			}
			menuWeights
			isLibrary
			hideFromCCT
			firstActiveAt
			firstActiveAtISO
			embedSettings {
				iframeCSS
				pageCSS
				autoGTM
				autoScroll
				autoScrollOffset
				disclaimerTextHtml
				disableRouting
				disablePageLoadsAtTop
				applyToAllLocations
			}
			customDomainSettings {
				domain
			}
			plusSettings {
				checkoutUrl
				defaultReturnUrl
			}
			printedMenuSettings {
				Categories {
					category
					enabled
				}
				StrainTypes {
					strainType
					backgroundColor
					borderColor
				}
				Photos {
					enabled
				}
				HeaderText {
					text
				}
				FooterText {
					text
				}
				PageBreaks {
					enabled
				}
				MenuType {
					type
				}
			}
			retailer {
				id
				assignedToBillingGroup
				enterpriseId
				enterprise {
					id
					billingVersion
				}
			}
			taxConfig {
				version
				calculationMethod
				discountTaxOrder
				taxes {
					...taxProperties
				}
			}
			messagingSettings {
				disableConfirmation
				disableSubmitted
				disableReadyForPickup
				disableStartDelivery
				notifySid
			}
			orderStatusEmailSettings {
				disableSubmitted
				disableConfirmed
				disableReadyForPickup
				disableOutForDelivery
			}
			storeSettings {
				rewardsIntegrationConfiguration {
					rewardsProgramDisplayName
				}
			}
			webCustomizationSettings {
				colorSettings {
					navBarColor
					linkColor
				}
				fontSettings {
					family
				}
			}
		}
	}
`;

module.exports.dispensaryNamesAndIds = gql`
	query DispensaryNamesAndIds {
		dispensaryNamesAndIds {
			id
			name
		}
	}
`;

module.exports.chainDispensaryNamesAndIds = gql`
	query ChainDispensaryNamesAndIds($chainId: String) {
		chainDispensaryNamesAndIds(chainId: $chainId) {
			id
			name
			address
			retailer {
				id
				assignedToBillingGroup
			}
		}
	}
`;

module.exports.getDeliveryInfo = gql`
	query GetDeliveryInfo($input: getDeliveryInfoInput!) {
		getDeliveryInfo(input: $input) {
			withinBounds
			fee
			minimum
			feeVaries
			minimumVaries
		}
	}
`;

module.exports.pendingDispensaries = gql`
	query PendingDispensaries($searchStr: String, $sort: sortInput, $page: Int, $perPage: Int) {
		pendingDispensaries(searchStr: $searchStr, sort: $sort, page: $page, perPage: $perPage) {
			meta {
				totalCount
			}
			dispensaries {
				id
				name
				createdAt
				createdAtISO
				phone
			}
		}
	}
`;

module.exports.activeDispensaries = gql`
	query ActiveDispensaries($params: activeDispensariesInput) {
		activeDispensaries(params: $params) {
			meta {
				allStates
				accountExecutives {
					name
					role
					userId
				}
				customerSuccessManagers {
					name
					role
					userId
				}
			}
			dispensaries {
				_id
				devices {
					lastSeenAt
					versionNumber
				}
				integration {
					lastSyncAt
					lastSyncAtISO
					adapter
				}
				profile {
					status
					name
					chain
					lastThirtyDaysSales
					menuScore
					connectedProductPercentage
					embeddedPageViews
					hideFromCCT
					cName
				}
			}
		}
	}
`;

module.exports.getTimezone = gql`
	query GetTimezone($lat: Float, $lng: Float, $timeStamp: Int!) {
		getTimezone(lat: $lat, lng: $lng, timeStamp: $timeStamp) {
			timezone
		}
	}
`;

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

module.exports.uploadImage = gql`
	mutation UploadImage($input: imageUploadInput!) {
		uploadImage(input: $input) {
			url
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

module.exports.adminBaseProductFragment = gql`
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

module.exports.filteredProducts = gql`
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

module.exports.filteredProducts = gql`
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

module.exports.productChangeEvents = gql`
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

module.exports.$dispensaryIds = gql`
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

module.exports.updateConsumerUser = gql`
	mutation UpdateConsumerUser($input: consumerUserProfileInput!) {
		updateConsumerUser(user: $input) {
			success
		}
	}
`;

module.exports.acceptTermsOfService = gql`
	mutation AcceptTermsOfService {
		acceptTermsOfService {
			success
		}
	}
`;

module.exports.setViewedTermsOfService = gql`
	mutation SetViewedTermsOfService {
		setViewedTermsOfService {
			success
		}
	}
`;

module.exports.getUserQuery = gql`
	query GetUserQuery($id: String!) {
		getUserQuery(id: $id) {
			_id
			email
			phone
			createdAt
			fullName
			firstName
			lastName
			textNotifications
		}
	}
`;

module.exports.filteredUsers = gql`
	query FilteredUsers($usersFilter: usersFilterInput!) {
		filteredUsers(filter: $usersFilter) {
			_id
			email
			type
			fullName
			phone
			textNotifications
			permissions {
				orders
				menu
				customers
				promote
				analytics
				settings
				users
				allLocations
				dispensaryIds
				driver
				menuReview
				superMenuReview
				messaging
				billing
			}
			dispensaryId
			chainID
			createdAt
			createdBy
			roleAtDispensary
		}
	}
`;

module.exports.filteredUsers = gql`
	query SuperAdminUsers($usersFilter: usersFilterInput!) {
		filteredUsers(filter: $usersFilter) {
			userId: _id
			email
			fullName
			firstName
			lastName
			type
		}
	}
`;

module.exports.validatePasswordResetTokenQuery = gql`
	query ValidatePasswordResetTokenQuery($token: String!) {
		validatePasswordResetTokenQuery(token: $token) {
			isValid
		}
	}
`;

module.exports.validatePasswordTokenQuery = gql`
	query ValidatePasswordTokenQuery($token: String!) {
		validatePasswordTokenQuery(token: $token) {
			isValid
		}
	}
`;

module.exports.$customersFilter = gql`
	query SuperAdminCustomers(
		$customersFilter: superAdminCustomersFilter
		$customersSort: customersSortInput
		$customersPagination: customersPaginationInput
	) {
		superAdminCustomers(filter: $customersFilter, sort: $customersSort, pagination: $customersPagination) {
			meta {
				totalCount
			}
			customers {
				_id
				email
				createdAt
				ordersTotal
				numOrders
				fullName
				firstName
				lastName
				phone
			}
		}
	}
`;

module.exports.filteredProducts = gql`
	query DispensaryCategoriesSubcategoriesQuery($productsFilter: productsFilterInput!) {
		filteredProducts(filter: $productsFilter) {
			products {
				type
				subcategory
			}
		}
	}
`;

module.exports.generateDispensaryUserStreamToken = gql`
	mutation GenerateDispensaryUserStreamToken($input: dispensaryUserStreamTokenInput!) {
		generateDispensaryUserStreamToken(input: $input) {
			token
		}
	}
`;

module.exports.brandDispensaryFragment = gql`
	fragment brandDispensaryFragment on Brand {
		dispensary {
			id
			name
		}
	}
`;

module.exports.brandFragmentForDropdown = gql`
	fragment brandFragmentForDropdown on Brand {
		_id
		id
		name
		imageUrl
	}
`;

module.exports.brandFragment = gql`
	fragment brandFragment on Brand {
		_id
		aliasList
		createdAt
		description
		id
		imageUrl
		libraryProductsCount
		name
		productsCount
		updatedAt
	}
`;

module.exports.bucketListFragment = gql`
	fragment bucketListFragment on Bucket {
		createdBy {
			_id
			firstName
			lastName
		}
		checkedOutAt
		checkedOutBy {
			_id
			firstName
			lastName
		}
		completedReviewsCount
		id
		name
		productsCount
		teamName
	}
`;

module.exports.couponFragment = gql`
	fragment couponFragment on Coupons {
		_id
		active
		addedDate
		applicableCategories {
			category
			subcategory
		}
		code
		dispensaryId
		expDate
		fixedDiscountInCents
		numAllowedUses
		numUses
		percentDiscount
		oneUsePerCustomer
		restrictions {
			minimumPurchase
			minimumPurchaseInCents
			noSpecials
		}
		usedBy
	}
`;

module.exports.deviceFragment = gql`
	fragment deviceFragment on Devices {
		_id
		accessCode
		autoPrintDevice
		buildNumber
		config {
			getDeliveryOrders
			getKioskOrders
			getPickupOrders
			orderSource
		}
		dispensaryId
		lastSeenAt
		nickname
		online
		printerConnected
		updatedAt
		versionNumber
	}
`;

module.exports.GetSubscriptionsV2PaymentSources = gql`
	fragment GetSubscriptionsV2PaymentSources on DispensaryBillingV2 {
		paymentSources {
			card {
				brand
				last4
			}
			type
		}
	}
`;

module.exports.hourSetFragment = gql`
	fragment hourSetFragment on Dispensaries_profile_hours {
		Monday {
			active
			end
			start
		}
		Tuesday {
			active
			end
			start
		}
		Wednesday {
			active
			end
			start
		}
		Thursday {
			active
			end
			start
		}
		Friday {
			active
			end
			start
		}
		Saturday {
			active
			end
			start
		}
		Sunday {
			active
			end
			start
		}
	}
`;

module.exports.paymentTypesFragment = gql`
	fragment paymentTypesFragment on PaymentTypesConfig {
		alt36
		check
		creditCardAtDoor
		payOnlineChase
		payOnlineHypur
		payOnlineMerrco
		payOnlineMoneris
		creditCardByPhone
		debit
		dutchiePay
		cash
		linx
		canPay
		paytender
		aeropay
	}
`;

module.exports.baseDispensaryFragment = gql`
	fragment baseDispensaryFragment on Dispensaries {
		id
		customDomainSettings {
			domain
		}
		plusSettings {
			checkoutUrl
			defaultReturnUrl
		}
		distance
		name
		cName
		timezone
		phone
		address
		description
		status
		chain
		location {
			ln1
			ln2
			city
			state
			country
			zipcode
			geometry {
				coordinates
			}
		}
		temporalLocation {
			lastUpdatedAt
			coordinates
			onDuty
		}
		deliveryHours {
			...hourSetFragment
		}
		pickupHours {
			...hourSetFragment
		}
		categoryPhotos {
			src
			category
		}
		customCategoryPhotos {
			url
			category
		}
		specialHours {
			name
			startDate
			endDate
			hoursPerDay {
				date
				pickupHours {
					active
					start
					end
				}
				deliveryHours {
					active
					start
					end
				}
			}
		}
		effectiveHours {
			deliveryHours {
				...hourSetFragment
			}
			pickupHours {
				...hourSetFragment
			}
		}
		offerAnyPickupService
		offerPickup
		offerCurbsidePickup
		offerDriveThruPickup
		offerDelivery
		listImage
		bannerImage
		logoImage
		embeddedLogoImage
		embeddedMenuUrl
		SpecialLogoImage
		embedBackUrl
		embedSettings {
			disclaimerTextHtml
			disablePageLoadsAtTop
			autoGTM
			privacyPolicyUrl
		}
		alt36
		check
		creditCardAtDoor
		payOnlineHypur
		payOnlineMerrco
		creditCardByPhone
		debitOnly
		cashOnly
		cashless
		linx
		canPay
		paytender
		aeropay
		recDispensary
		medicalDispensary
		maxDeliveryDistance
		mixAndMatchPricingWeights
		feeTiers {
			fee
			feeType
			max
			min
			percentFee
		}
		acceptsTips
		acceptsDutchiePayTips
		requiresDriversLicense
		requiresDriversLicenseForPickup
		requirePhotoIdForDelivery
		requirePhotoIdForPickup
		removeMedicalCardFieldsAtCheckout
		menuOrder
		menuSortSettings {
			brands
			category
			menuOrder
		}
		callConfirmation
		phoneTree
		email
		emailConfirmation
		stealthMode
		actionEstimates {
			pickup {
				readyInMinutes
				rangeInMinutes
			}
			delivery {
				readyInMinutes
				rangeInMinutes
				deliveryTimeInMinutes
			}
		}
		durationEstimateOverrides {
			delivery {
				enabled
				lowInMinutes
				highInMinutes
			}
			pickup {
				enabled
				lowInMinutes
				highInMinutes
			}
		}
		paymentFees {
			fee
			feeType
			paymentType
		}
		ordersConfig {
			posItemNames
			autoConfirm
			autoClose
			terminalReceiptOptions {
				customerNameOption
				birthdate
				deliveryAddress
				phone
				medical
				potencyInfo
				disableSocialImpact
			}
		}
		kioskOrderingEnabled
		kioskInstructions
		kioskConfig {
			fullNameOnly
			phoneRequired
			notesField
			directedOrders
			hidePhoneField
			hideEmailField
			showBirthdateField
		}
		categoryLimits {
			name
			value
		}
		categoryLimitsEnabled
		specialsSettings {
			discountBehavior
			discountStacking
			discountPrecedence
			enableIndividualSpecialPrecedence
			enableIndividualDiscountStacking
			stackingBehavior
			nonStackingBehavior
		}
		storeSettings {
			isolatedMenus
			customerMessagingTermsAccepted
			defaultViewStyle
			disablePurchaseLimits
			disableGuestDOB
			displayPhoneConfirmation
			enableDutchiePayConsumerSurcharge
			requireEmailAddressForGuestCheckout
			requireMedCardPhotoForPickup
			hideAddressFromDutchieMain
			requireMedCardPhotoForDelivery
			enableAfterHoursOrderingForPickup
			enableAfterHoursOrderingForDelivery
			enableLLxSaleDiscountSync
			enableMixAndMatchPricingForPickup
			enableMixAndMatchPricingForDelivery
			enableScheduledOrderingForPickup
			enableScheduledOrderingForDelivery
			enableLimitPerCustomer
			quantityLimit
			enableOrderStatusEmails
			enableStorefrontAgeGate
			disableGuestCheckout
			stealthMode
			dontCombineWeightedProducts
			keepUncombinedWeights
			dontMapSubcategoriesByProductName
			prioritizeStaffPicksInSearchResults
			hideEffects
			hideFilters
			subscriptions {
				enabled
			}
			rewardsIntegrationConfiguration {
				rewardsProgramDisplayName
			}
		}
		featureFlags {
			hideStoreHours
			enableOnfleet
			hideDeliveryEstimate
			hideMyAccount
			enablePausedOrders
			hasEffectsFilter
			enableAdvancedDiscountSettings
			enableAfterHoursOrdering
			enableBogoSpecials
			enableBogoTotalQuantityAndWeight
			enableScheduledOrdering
			enableArrivals
			enableMenuImport
			enableMixAndMatch
			enableNonTerminalAutoConfirm
		}
		menuScore
		menuScoresByCategory {
			category
			value
		}
		productCategorySummary {
			category
			value
		}
		updatedAt
		updatedAtISO
		updatedBy
		terminals {
			_id
			nickname
			versionNumber
			lastSeenAt
			lastSeenAtISO
			config {
				orderSource
			}
		}
		ordersArePaused
		ageVerificationBannerHtml
		ageVerificationBannerColor
		menuBannerHtml
		menuBannerColor
		menuUrl
		colorSettings {
			linkColor
			navBarColor
		}
		pickupMinimum {
			enabled
			minimumInCents
		}
		orderTypesConfig {
			pickup {
				enabled
				paymentTypes {
					...paymentTypesFragment
				}
			}
			curbsidePickup {
				enabled
				paymentTypes {
					...paymentTypesFragment
				}
			}
			driveThruPickup {
				enabled
				paymentTypes {
					...paymentTypesFragment
				}
			}
			delivery {
				enabled
				paymentTypes {
					...paymentTypesFragment
				}
			}
			kiosk {
				enabled
				paymentTypes {
					...paymentTypesFragment
				}
			}
			offerAnyPickupService
			offerDeliveryService
		}
		paymentTypesAccepted {
			alt36
			check
			creditCardAtDoor
			payOnlineChase
			payOnlineHypur
			payOnlineMerrco
			payOnlineMoneris
			creditCardByPhone
			debit
			dutchiePay
			cash
			linx
			canPay
			paytender
			aeropay
		}
	}		
`;

module.exports.baseOrderingSettingsFragment = gql`
	fragment baseOrderingSettingsFragment on BaseOrderingSettings {
		enableASAPOrdering
		enableScheduledOrdering
		enableAfterHoursOrdering
		paymentTypes {
			...paymentTypesFragment
		}
		scheduledOrderingConfigV2 {
			advancedDayOrderingEnabled
			advancedDayOrderingLimit
			incrementInMinutes
			nextAvailableInMinutes
			orderLimitsEnabled
		}
	}
`;

module.exports.curbsidePickupOrderingSettingsFragment = gql`
	fragment curbsidePickupOrderingSettingsFragment on CurbsidePickupOrderingSettings {
		...baseOrderingSettingsFragment
		orderMinimum {
			enabled
			minimumInCents
		}
		enableCurbsideArrivals
		arrivalInformationInstructions
	}
`;

module.exports.deliveryOrderingSettingsFragment = gql`
	fragment deliveryOrderingSettingsFragment on DeliveryOrderingSettings {
		...baseOrderingSettingsFragment
		deliveryFeeTiers {
			feeInCents
			maximumInCents
			minimumInCents
			feeType
			percentFee
		}
		deliveryMode
		deliveryRadius {
			orderMinimum {
				enabled
				minimumInCents
			}
			radiusInMiles
		}
		deliveryZipCodes {
			zipCode
			feeInCents
			minimumInCents
			feeType
			percentFee
		}
	}
`;

module.exports.deliveryZonesFragment = gql`
	fragment deliveryZonesFragment on DeliveryOrderingSettings {
		deliveryZones {
			name
			area {
				type
				features {
					type
					geometry {
						type
						coordinates
					}
				}
			}
			feeInCents
			minimumInCents
			feeType
			percentFee
		}
	}
`;

module.exports.driveThruPickupOrderingSettingsFragment = gql`
	fragment driveThruPickupOrderingSettingsFragment on DriveThruPickupOrderingSettings {
		...baseOrderingSettingsFragment
		orderMinimum {
			enabled
			minimumInCents
		}
	}
`;

module.exports.hoursForDay = gql`
	fragment hoursForDay on dayBounds {
		active
		end
		start
	}
`;

module.exports.weeklyHoursFragment = gql`
	fragment weeklyHoursFragment on WeeklyHours {
		Friday {
			...hoursForDay
		}
		Monday {
			...hoursForDay
		}
		Saturday {
			...hoursForDay
		}
		Sunday {
			...hoursForDay
		}
		Thursday {
			...hoursForDay
		}
		Tuesday {
			...hoursForDay
		}
		Wednesday {
			...hoursForDay
		}
	}
`;

module.exports.specialHoursDayFragment = gql`
	fragment specialHoursDayFragment on SpecialHoursDay {
		date
		hours {
			...hoursForDay
		}
	}
`;

module.exports.specialHoursFragment = gql`
	fragment specialHoursFragment on SpecialHours {
		id
		name
		startDate
		endDate
		hoursPerDay {
			...specialHoursDayFragment
		}
	}
`;

module.exports.hoursSettingsForOrderTypeFragment = gql`
	fragment hoursSettingsForOrderTypeFragment on HoursSettingsForOrderType {
		hours {
			...weeklyHoursFragment
		}
		specialHours {
			...specialHoursFragment
		}
	}
		
`;

module.exports.inStorePickupOrderingSettingsFragment = gql`
	fragment inStorePickupOrderingSettingsFragment on InStorePickupOrderingSettings {
		...baseOrderingSettingsFragment
		orderMinimum {
			enabled
			minimumInCents
		}
	}
`;

module.exports.kioskOrderingSettingsFragment = gql`
	fragment kioskOrderingSettingsFragment on KioskOrderingSettings {
		enabled
		fullNameOnly
		phoneRequired
		notesField
		directedOrders
		hideEmailField
		hidePhoneField
		showBirthdateField
		kioskInstructions
		paymentTypes {
			...paymentTypesFragment
		}
	}
`;

module.exports.maxReservationSlotFragment = gql`
	fragment maxReservationSlotFragment on MaxReservationSlot {
		currentCount
		date
		startTime
		endTime
		maxOrders
		slotId
	}
`;

module.exports.maxReservationSlotsByDayFragment = gql`
	fragment maxReservationSlotsByDayFragment on MaxReservationSlotsByDay {
		Monday {
			...maxReservationSlotFragment
		}
		Tuesday {
			...maxReservationSlotFragment
		}
		Wednesday {
			...maxReservationSlotFragment
		}
		Thursday {
			...maxReservationSlotFragment
		}
		Friday {
			...maxReservationSlotFragment
		}
		Saturday {
			...maxReservationSlotFragment
		}
		Sunday {
			...maxReservationSlotFragment
		}
	}
`;

module.exports.scheduledOrderingConfigFragment = gql`
	fragment scheduledOrderingConfigFragment on ReservationOptionsForOrderType {
		advancedDayOrderingEnabled
		advancedDayOrderingLimit
		incrementInMinutes
		nextAvailableInMinutes
		orderLimitsEnabled
	}
`;

module.exports.taxProperties = gql`
	fragment taxProperties on Dispensaries_TaxConfig_Tax {
		id
		type
		name
		rate
		potencyRate
		potency
		medical
		recreational
		taxBasis
		stages {
			op
			type
		}
		applyTo {
			types
			hemp
		}
		order
		deliveryPolicy
		includeStateSalesTaxInDestinationRate
	}
`;

module.exports.consumerBaseProductFragment = gql`
	fragment consumerBaseProductFragment on Products {
		_id
		id
		AdditionalOptions
		brandId
		brandName
		CBD
		CBDContent {
			unit
			range
		}
		comingSoon
		createdAt
		DispensaryID
		enterpriseProductId
		Image
		images {
			url
			description
			active
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
		measurements {
			netWeight {
				unit
				values
			}
			volume {
				unit
				values
			}
		}
		medicalOnly
		medicalPrices
		medicalSpecialPrices
		wholesalePrices
		Name
		nonArmsLength
		Options
		limitsPerCustomer {
			key
			value
		}
		manualInventory {
			option
			inventory
		}
		POSMetaData {
			canonicalID
			canonicalBrandName
			children {
				canonicalEffectivePotencyMg
				option
				quantity
				quantityAvailable
				kioskQuantityAvailable
				standardEquivalent {
					value
					unit
				}
				recEquivalent {
					value
					unit
				}
			}
		}
		Prices
		pricingTierData {
			generatedTiersId
			tiersId
			tiersName
			tiers {
				startWeight
				endWeight
				price
				pricePerGram
				weightUOM
			}
		}
		recOnly
		recPrices
		recSpecialPrices
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
					selectedCategoriesAndSubcategories
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
					discountAmount
					discountType
					dollarDiscount
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
					selectedCategoriesAndSubcategories
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
				discountBundle {
					_id
					applyTo
					discountType
					enabled
					limit
					value
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
				menuType
				nonStackingBehavior
				recurringEndDate
				redemptionLimit
				settingsDerivedFrom
				specialId
				specialName
				specialType
				stackingBehavior
				stackingMode
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
				qualifyingOptions
			}
			saleSpecials {
				discount
				discountStacking
				eligibleProductOptions
				menuType
				nonStackingBehavior
				percentDiscount
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
				settingsDerivedFrom
				source
				sourceId
				specialId
				specialName
				specialType
				specialRestrictions
				stackingBehavior
				stackingMode
				targetPrice
			}
		}
		Status
		strainType
		subcategory
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
		cName
		pastCNames
		brandLogo
		bottleDepositTaxCents
	}
`;

module.exports.TerpeneFragment = gql`
	fragment TerpeneFragment on Terpene {
		aliasList
		aromas
		description
		effects
		id
		name
		unitSymbol
		potentialHealthBenefits
	}
`;

module.exports.adminIdentityFragment = gql`
	fragment adminIdentityFragment on LoginAdmin {
		accessToken
		user {
			_id
			createdAt
			emails {
				address
			}
			profile {
				browserNotification
				chainID
				desktopNotification
				dispensaryId
				emailNotifications
				emailOptIn
				firstName
				fullName
				lastName
				permissions {
					allLocations
					billing
					analytics
					customers
					driver
					enterpriseAdmin
					enterpriseSpecials
					menu
					menuReview
					superMenuReview
					orders
					promote
					settings
					users
					tasks
				}
				phone
				textNotifications
				type
			}
		}
	}
`;

module.exports.enterpriseSpecialData = gql`
	fragment enterpriseSpecialData on EnterpriseSpecial {
		_id
		active
		menuDisplayName
		menuDisplayDescription
		menuDisplayImage
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
			targetPrice
			subcategoryIds
			subcategoryNames
			weight
		}
		cipher
		clicks
		complete
		createdAt
		createdBy
		description
		descriptionHtml
		discount
		discountedPrices
		discountToCart {
			_id
			enabled
			discountType
			value
		}
		discountPrecedence
		discountStacking
		dispensaryId
		dispensaries
		displayRank: dollarDiscount
		duplicatedFrom
		emailSpecial
		endDay
		endStamp
		endTime
		enterpriseId
		enterpriseSpecialId
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
		id
		inactiveDispensaries
		isRecurring
		itemsForAPrice {
			_id
			enabled
			value
		}
		localTime
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
		specialRestrictions
		stackingBehavior
		stackingMode
		startDay
		startStamp
		startTime
		specialType
		subject
		targetPrice
		timezone
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
`;

module.exports.specialData = gql`
	fragment specialData on Specials {
		_id
		active
		applyRewardsToConditions
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
			targetPrice
			subcategoryIds
			subcategoryNames
			weight
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
`;

module.exports.BillToTextPaymentSources = gql`
	fragment BillToTextPaymentSources on DispensaryBillingV2 {
		paymentSources {
			card {
				brand
				last4
			}
			type
		}
	}
`;

module.exports.InvoicesTableInvoices = gql`
	fragment InvoicesTableInvoices on ChargebeeSubscriptionV2 {
		invoices {
			amountDue
			billingCycle
			dueDate
			id
			lineItems {
				dateFrom
				dateTo
			}
			status
			total
		}
	}
`;

module.exports.adminContentBaseProductFragment = gql`
	fragment adminContentBaseProductFragment on Products {
		id
		_id
		AdditionalOptions
		brand {
			_id
			id
			name
		}
		brandName
		CBD
		CBDContent {
			unit
			range
		}
		connectedAt
		connectedBy
		createdAt
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
			active
			label
			description
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
			canonicalName
			canonicalBrandName
			children {
				canonicalCategory
				canonicalEffectivePotencyMg
				canonicalID
				canonicalName
				medPrice
				option
				price
				quantity
				quantityAvailable
				recPrice
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
					subcategoryIds
					subcategoryNames
					quantity
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
				source
				sourceId
				specialId
				specialRestrictions
				specialType
				stackingMode
				targetPrice
			}
			discount
			percentDiscount
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
		weight
		featured {
			current
			startTime
			endTime
		}
		isBelowThreshold
		optionsBelowThreshold
		adminEdits {
			updatedAt
			updatedBy
		}
		brandLogo
		brandDescription
		cName
		brandId
	}
`;

module.exports.persistCheckoutV2 = gql`
	mutation PersistCheckoutV2($order: JSON!, $dispensaryId: String!, $token: String) {
		persistCheckoutV2(order: $order, dispensaryId: $dispensaryId, token: $token) {
			checkoutToken
		}
	}
`;

module.exports.persistCheckout = gql`
	mutation PersistCheckout($order: JSON!, $dispensaryId: String!, $token: String!) {
		persistCheckout(order: $order, dispensaryId: $dispensaryId, token: $token) {
			success
		}
	}
`;

module.exports.createBrandV2 = gql`
	mutation CreateBrand($brand: brandInput!) {
		createBrandV2(brand: $brand) {
			...brandFragment
		}
	}
`;

module.exports.deleteBrand = gql`
	mutation DeleteBrand($id: String!) {
		deleteBrand(id: $id) {
			_id
		}
	}
`;

module.exports.updateBrandV2 = gql`
	mutation UpdateBrand($id: String!, $brand: brandInput!) {
		updateBrandV2(id: $id, brand: $brand) {
			...brandFragment
		}
	}
`;

module.exports.searchBrandsV2 = gql`
	query BrandsForDropdown($dispensaryId: String, $searchString: String, $limit: Int, $parentBrandId: ID, $hasParent: Boolean, $localAndGlobal: Boolean) {
		searchBrandsV2(
			filters: {dispensaryId: $dispensaryId, parentBrandId: $parentBrandId, hasParent: $hasParent, localAndGlobal: $localAndGlobal}
			pagination: {limit: $limit, offset: 0}
			search: $searchString
			sort: {sortBy: score, sortDirection: desc}
		) {
			brands {
				...brandFragmentForDropdown
				isGlobal
			}
		}
	}
`;

module.exports.listRegions = gql`
	query GetBrandRegions {
		listRegions {
			id
			code
			country
			subdivision
			countryName
			subdivisionName
		}
	}
`;

module.exports.getBrand = gql`
	query GetBrand($id: String!) {
		getBrand(id: $id) {
			...brandFragment
			isGlobal
			regions {
				id
				code
				country
				subdivision
				countryName
				subdivisionName
			}
			source
			creatorUserId
			dispensary {
				name
				id
			}
			parentBrandId
		}
	}
`;

module.exports.searchBrandsV2 = gql`
	query SuperBrandsIndex($filters: searchBrandsFilters, $pagination: paginationInput, $search: String, $sort: searchBrandsSort) {
		searchBrandsV2(
			filters: $filters
			pagination: $pagination
			search: $search
			sort: $sort
		) {
			brands {
				...brandFragment
				...brandDispensaryFragment
			}
	queryInfo {
				totalCount
			}
		}
	}
			
`;

module.exports.getCannabinoids = gql`
	query GetCannabinoids {
		getCannabinoids {
			name
			id
		}
	}
`;

module.exports.createCouponV2 = gql`
	mutation CreateCouponV2($input: createCouponInput!) {
		createCouponV2(coupon: $input) {
			...couponFragment
		}
	}
`;

module.exports.deleteCoupon = gql`
	mutation DeleteCoupon($id: String!) {
		deleteCoupon(id: $id) {
			success
		}
	}
`;

module.exports.deleteCouponV2 = gql`
	mutation DeleteCouponV2($id: String!) {
		deleteCouponV2(id: $id) {
			success
		}
	}
`;

module.exports.updateCoupon = gql`
	mutation UpdateCoupon($input: updateCouponInput!) {
		updateCoupon(coupon: $input) {
			...couponFragment
		}
	}
`;

module.exports.filteredCoupons = gql`
	query FilteredCoupons($filter: couponsFilterInput, $sort: couponsSortInput, $pagination: couponsPaginationInput) {
		filteredCoupons(filter: $filter, sort: $sort, pagination: $pagination) {
	queryInfo {
				totalCount
			}
			coupons {
				...couponFragment
				dispensary
				reimbursed
			}
		}
	}
`;

module.exports.clearAllCurbsideArrivals = gql`
	mutation ClearAllCurbsideArrivals($dispensaryId: String!) {
		clearAllCurbsideArrivals(dispensaryId: $dispensaryId) {
			success
		}
	}
`;

module.exports.clearCurbsideArrival = gql`
	mutation ClearCurbsideArrival($arrivalId: String!) {
		clearCurbsideArrival(arrivalId: $arrivalId) {
			success
		}
	}
`;

module.exports.markCurbsideArrivalArrivedV2 = gql`
	mutation MarkCurbsideArrivalArrivedV2($token: String!) {
		markCurbsideArrivalArrivedV2(token: $token) {
			id
		}
	}
`;

module.exports.updateCurbsideArrivalV2 = gql`
	mutation UpdateCurbsideArrivalV2($token: String!, $arrivalInformation: String!) {
		updateCurbsideArrivalV2(token: $token, arrivalInformation: $arrivalInformation) {
			id
		}
	}
`;

module.exports.getCurbsideArrivalByToken = gql`
	query GetCurbsideArrivalByToken($token: String!) {
		getCurbsideArrivalByToken(token: $token) {
			id
			dispensary {
				id
				phone
				orderTypesConfigV2 {
					curbsidePickup {
						arrivalInformationInstructions
					}
				}
			}
			arrivalInformation
			arrivedAt
			clearedAt
			createdAt
			updatedAt
		}
	}
`;

module.exports.getCurbsideArrivals = gql`
	query GetCurbsideArrivalsForBanner($dispensaryId: String!) {
		getCurbsideArrivals(dispensaryId: $dispensaryId) {
			id
		}
	}
`;

module.exports.getCurbsideArrivals = gql`
	query GetCurbsideArrivals($dispensaryId: String!) {
		getCurbsideArrivals(dispensaryId: $dispensaryId) {
			id
			order {
				id
				orderId
				customer {
					profile {
						firstName
						lastName
						phone
					}
				}
				guestCustomer {
					firstName
					lastName
					phone
				}
			}
			arrivalInformation
			arrivedAt
			clearedAt
			createdAt
			updatedAt
		}
	}
`;

module.exports.updateCustomerSubscription = gql`
	mutation UpdateCustomerSubscription($customerId: String!, $subscribed: Boolean!) {
		updateCustomerSubscription(customerId: $customerId, subscribed: $subscribed) {
			success
		}
	}
`;

module.exports.getDevices = gql`
	query GetDevices($dispensaryId: String!) {
		getDevices(dispensaryId: $dispensaryId) {
			...deviceFragment
		}
	}
`;

module.exports.getKioskTerminals = gql`
	query GetKioskTerminals($dispensaryId: String!) {
		getKioskTerminals(dispensaryId: $dispensaryId) {
			id
			dispensaryId
			nickname
		}
	}
`;

module.exports.addSubscriptionToChain = gql`
	mutation AddSubscriptionToChain($dispensaryIds: [String]!, $chargebeeCustomerId: String!) {
		addSubscriptionToChain(
			dispensaryIds: $dispensaryIds
			chargebeeCustomerId: $chargebeeCustomerId
		) {
			message
			success
		}
	}
`;

module.exports.removeSubscriptionFromChain = gql`
	mutation RemoveSubscriptionFromChain($ids: [String]!, $chargebeeCustomerId: String!) {
		removeSubscriptionFromChain(
			ids: $ids
			chargebeeCustomerId: $chargebeeCustomerId
		) {
			message
			success
		}
	}
`;

module.exports.getBillingSubscriptions = gql`
	query GetChainBillingInfo($dispensaries: [String!]) {
		getBillingSubscriptions(dispensaries: $dispensaries) {
			dispensaryBilling {
				chain
				chargebeeCustomerId
			}
		}
	}
`;

module.exports.getBillingSubscriptions = gql`
	query GetSubscriptionsForChain($dispensaries: [String!]) {
		getBillingSubscriptions(dispensaries: $dispensaries) {
			dispensaryBilling {
				chain
				chargebeeCustomer {
					company
				}
			}
		}
	}
`;

module.exports.getSubscriptionsV2 = gql`
	query GetSubscriptionsV2($retailers: [RetailerInput]!) {
		getSubscriptionsV2(retailers: $retailers) {
			dispensaryBilling {
				chain
				chargebeeCustomer {
					id
					company
					contacts {
						email
						sendBillingEmail
					}
					locationCount
				}
				...GetSubscriptionsV2PaymentSources
			}
			chargebeeSubscription {
				status
				trialStart
				trialEnd
				currentTermStart
				currentTermEnd
				nextBillingAt
				createdAt
				startedAt
				activatedAt
				invoices {
					id
					total
					lineItems {
						dateFrom
						dateTo
						quantity
						amount
					}
					status
					amountPaid
					amountDue
					creditsApplied
				}
				planAmount
			}
			manualPayments
			chargebeePlan {
				period
				periodUnit
			}
			retailerId
		}
	}
`;

module.exports.getBillingSubscriptions = gql`
	query GetSubscriptions($dispensaries: [String!]) {
		getBillingSubscriptions(dispensaries: $dispensaries) {
			dispensaryBilling {
				chain
				chargebeeCustomerId
				chargebeeCustomer {
					company
					contacts {
						email
						sendBillingEmail
					}
					locationCount
				}
				paymentSources {
					card {
						brand
						last4
					}
					type
				}
			}
			dispensaryId
			chargebeeSubscriptionId
			chargebeeSubscription {
				status
				trialStart
				trialEnd
				currentTermStart
				currentTermEnd
				nextBillingAt
				createdAt
				startedAt
				activatedAt
				invoices {
					id
					total
					lineItems {
						dateFrom
						dateTo
						quantity
						amount
					}
					status
					amountPaid
					amountDue
					creditsApplied
				}
				planAmount
			}
			manualPayments
			chargebeePlan {
				period
				periodUnit
			}
		}
	}
`;

module.exports.dispensaryOnboarding = gql`
	mutation DispensaryOnboarding($input: dispensaryOnboardingInput!) {
		dispensaryOnboarding(input: $input) {
			success
		}
	}
`;

module.exports.dispensaryUploadOnboardingAsset = gql`
	mutation DispensaryUploadOnboardingAsset($data: String!, $fileName: String!) {
		dispensaryUploadOnboardingAsset(data: $data, fileName: $fileName) {
			fileIds
		}
	}
`;

module.exports.filteredDispensaries = gql`
	query DispensarySearch($dispensaryFilter: dispensariesFilterInput!) {
		filteredDispensaries(filter: $dispensaryFilter) {
			id
			name
			cName
			status
			recDispensary
			medicalDispensary
			offerPickup
			offerCurbsidePickup
			offerDriveThruPickup
			offerAnyPickupService
			offerDelivery
			listImage
			location {
				city
				county
				geometry {
					coordinates
					type
				}
				ln1
				ln2
				state
				zipcode
				country
			}
			actionEstimates {
				delivery {
					readyInMinutes
					rangeInMinutes
					deliveryTimeInMinutes
				}
				pickup {
					readyInMinutes
					rangeInMinutes
				}
			}
			durationEstimateOverrides {
				pickup {
					enabled
					lowInMinutes
					highInMinutes
				}
				delivery {
					enabled
					lowInMinutes
					highInMinutes
				}
			}
			storeSettings {
				enableAfterHoursOrderingForPickup
				enableAfterHoursOrderingForDelivery
				enableScheduledOrderingForPickup
				enableScheduledOrderingForDelivery
			}
			featureFlags {
				hideDeliveryEstimate
			}
			effectiveHours {
				deliveryHours {
					...hourSetFragment
				}
				pickupHours {
					...hourSetFragment
				}
			}
			deliveryHours {
				...hourSetFragment
			}
			deliveryInfo {
				withinBounds
				fee
				minimum
				feeVaries
				minimumVaries
				feeType
				percentFee
			}
			feeTiers {
				fee
				feeType
				max
				min
				percentFee
			}
			pickupHours {
				...hourSetFragment
			}
			specialHours {
				name
				startDate
				endDate
				hoursPerDay {
					date
					pickupHours {
						active
						start
						end
					}
					deliveryHours {
						active
						start
						end
					}
				}
			}
			distance
			maxDeliveryDistance
			timezone
			orderTypesConfig {
				pickup {
					enabled
					paymentTypes {
						alt36
						check
						creditCardAtDoor
						payOnlineChase
						payOnlineHypur
						payOnlineMerrco
						payOnlineMoneris
						creditCardByPhone
						debit
						cash
						linx
						canPay
						paytender
						aeropay
						dutchiePay
					}
				}
				curbsidePickup {
					enabled
					paymentTypes {
						alt36
						check
						creditCardAtDoor
						payOnlineChase
						payOnlineHypur
						payOnlineMerrco
						payOnlineMoneris
						creditCardByPhone
						debit
						cash
						linx
						canPay
						paytender
						aeropay
						dutchiePay
					}
				}
				driveThruPickup {
					enabled
					paymentTypes {
						alt36
						check
						creditCardAtDoor
						payOnlineChase
						payOnlineHypur
						payOnlineMerrco
						payOnlineMoneris
						creditCardByPhone
						debit
						cash
						linx
						canPay
						paytender
						aeropay
						dutchiePay
					}
				}
				delivery {
					enabled
					paymentTypes {
						alt36
						check
						creditCardAtDoor
						payOnlineChase
						payOnlineHypur
						payOnlineMerrco
						payOnlineMoneris
						creditCardByPhone
						debit
						cash
						linx
						canPay
						paytender
						aeropay
						dutchiePay
					}
				}
				kiosk {
					enabled
					paymentTypes {
						alt36
						check
						creditCardAtDoor
						payOnlineChase
						payOnlineHypur
						payOnlineMerrco
						payOnlineMoneris
						creditCardByPhone
						debit
						cash
						linx
						canPay
						paytender
						aeropay
						dutchiePay
					}
				}
				offerAnyPickupService
				offerDeliveryService
			}
			orderTypesConfigV2 {
				inStorePickup {
					enableASAPOrdering
					enableScheduledOrdering
					enableAfterHoursOrdering
				}
				curbsidePickup {
					enableASAPOrdering
					enableScheduledOrdering
					enableAfterHoursOrdering
				}
				driveThruPickup {
					enableASAPOrdering
					enableScheduledOrdering
					enableAfterHoursOrdering
				}
				delivery {
					enableASAPOrdering
					enableScheduledOrdering
					enableAfterHoursOrdering
				}
				offerAnyPickupService
				offerDeliveryService
			}
			hoursSettings {
				inStorePickup {
					...hoursSettingsForOrderTypeFragment
				}
				curbsidePickup {
					...hoursSettingsForOrderTypeFragment
				}
				driveThruPickup {
					...hoursSettingsForOrderTypeFragment
				}
				delivery {
					...hoursSettingsForOrderTypeFragment
				}
			}
			enabledOrderTypes {
				pickup
				inStorePickup
				curbsidePickup
				driveThruPickup
				delivery
				kiosk
			}
			paymentTypesAccepted {
				alt36
				check
				creditCardAtDoor
				payOnlineChase
				payOnlineHypur
				payOnlineMerrco
				payOnlineMoneris
				creditCardByPhone
				debit
				cash
				linx
				canPay
				paytender
				aeropay
				dutchiePay
			}
		}
	}
			
`;

module.exports.geolocate = gql`
	query GeolocateConsumer {
		geolocate {
			ip
			hostname
			city
			region
			country
			loc
			org
			postal
			timezone
		}
	}
`;

module.exports.generateHypurTokenV2 = gql`
	mutation GenerateHypurTokenV2($code: String!, $hostname: String, $state: String!) {
		generateHypurTokenV2(code: $code, hostname: $hostname, state: $state) {
			accessToken
			embedded
		}
	}
`;

module.exports.createLibraryProductV2 = gql`
	mutation CreateLibraryProductV2($libraryProduct: NewLibraryProduct!, $state: String!) {
		createLibraryProductV2(libraryProduct: $libraryProduct, state: $state) {
			id
		}
	}
`;

module.exports.createLibraryProductV3 = gql`
	mutation CreateLibraryProductV3($libraryProduct: NewLibraryProductV2!, $state: String!) {
		createLibraryProductV3(libraryProduct: $libraryProduct, state: $state) {
			id
		}
	}
`;

module.exports.matchLibraryProductsV2 = gql`
	query MatchLibraryProductsV2($limit: Int, $name: String!, $state: String!, $category: String, $subcategory: String, $brandIds: [String], $brand: String, $scopes: [String]) {
		matchLibraryProductsV2(
			limit: $limit
			name: $name
			state: $state
			category: $category
			subcategory: $subcategory
			brandIds: $brandIds
			brand: $brand
			scopes: $scopes
		) {
			id
			brand {
				id
				name
				imageUrl
			}
			category
			cbdContent {
				unit
				range
			}
			image
			images {
				_id
				url
				active
				origin
			}
			name
			price
			productTemplate
			stockImage
			strainType
			subcategory
			thcContent {
				unit
				range
			}
		}
	}
`;

module.exports.matchLibraryProducts = gql`
	query MatchLibraryProducts($limit: Int, $name: String!, $state: String!, $category: String, $subcategory: String, $brandIds: [String], $brand: String, $productTemplate: Boolean) {
		matchLibraryProducts(
			limit: $limit
			name: $name
			state: $state
			category: $category
			subcategory: $subcategory
			brandIds: $brandIds
			brand: $brand
			productTemplate: $productTemplate
		) {
			id
			brand {
				id
				name
			}
			category
			cbdContent {
				unit
				range
			}
			image
			name
			price
			strainType
			subcategory
			thcContent {
				unit
				range
			}
		}
	}
`;

module.exports.addressResidentialCheck = gql`
	query AddressResidentialCheck($input: addressResidentialCheckInput!) {
		addressResidentialCheck(input: $input) {
			isValid
		}
	}
`;

module.exports.resetPasswordV2 = gql`
	mutation ResetPasswordV2($input: resetPasswordInput!) {
		resetPasswordV2(input: $input) {
			message
			success
		}
	}
`;

module.exports.sendBrandUserPasswordResetEmail = gql`
	mutation SendBrandUserPasswordResetEmail($email: String!) {
		sendBrandUserPasswordResetEmail(email: $email) {
			message
			success
		}
	}
`;

module.exports.sendPasswordResetEmailV2 = gql`
	mutation SendPasswordResetEmailV2($email: String!) {
		sendPasswordResetEmailV2(email: $email) {
			message
			success
		}
	}
`;

module.exports.setPasswordV2 = gql`
	mutation SetPasswordV2($input: setPasswordInput!) {
		setPasswordV2(input: $input) {
			message
			success
		}
	}
`;

module.exports.updatePasswordV2 = gql`
	mutation UpdatePasswordV2($oldPassword: String!, $newPassword: String!) {
		updatePasswordV2(oldPassword: $oldPassword, newPassword: $newPassword) {
			accessToken
		}
	}
`;

module.exports.getPaymentsCheckoutCredentials = gql`
	query GetPaymentsCheckoutCredentials($adapter: String!, $dispensaryId: String!) {
		getPaymentsCheckoutCredentials(adapter: $adapter, dispensaryId: $dispensaryId) {
			... on ChaseHostedProfileCredentials {
				uID
			}
			... on MonerisHTProfileCredentials {
				profileId
			}
		}
	}
`;

module.exports.getMonerisTokenizationProfile = gql`
	query GetMonerisTokenizationProfile($dispensaryId: String!) {
		getMonerisTokenizationProfile(dispensaryId: $dispensaryId) {
			profileId
		}
	}
`;

module.exports.filteredProducts = gql`
	query FilteredProducts($productsFilter: productsFilterInput!, $useCache: Boolean, $page: Int, $perPage: Int, $includeEnterpriseSpecials: Boolean = false, $includeCannabinoids: Boolean = true) {
		filteredProducts(
			filter: $productsFilter
			useCache: $useCache
			page: $page
			perPage: $perPage
			includeEnterpriseSpecials: $includeEnterpriseSpecials
		) {
			products {
				...consumerBaseProductFragment
				brand {
					id
					_id
					description
					imageUrl
					name
				}
				effects
				popularSortKey
				cannabinoidsV2 @include(if: $includeCannabinoids) {
					value
					unit
					cannabinoid {
						name
					}
				}
			}
	queryInfo {
				totalCount
				totalPages
			}
		}
	}
`;

module.exports.filteredProducts = gql`
	query IndividualFilteredProduct($productsFilter: productsFilterInput!, $useCache: Boolean, $includeTerpenes: Boolean! = false, $includeEnterpriseSpecials: Boolean = false, $includeCannabinoids: Boolean = true) {
		filteredProducts(
			filter: $productsFilter
			useCache: $useCache
			includeEnterpriseSpecials: $includeEnterpriseSpecials
		) {
			products {
				...consumerBaseProductFragment
				brand {
					id
					_id
					description
					imageUrl
					name
				}
				terpenes @include(if: $includeTerpenes) {
					id
					libraryTerpene {
						aromas
						description
						effects
						name
					}
					terpeneId
					unit
					unitSymbol
					value
				}
				cannabinoidsV2 @include(if: $includeCannabinoids) {
					value
					unit
					cannabinoid {
						name
						description
					}
				}
				effects
				description
				descriptionHtml
			}
		}
	}
`;

module.exports.createAlpineUserV2 = gql`
	mutation CreateAlpineUserV2($firstName: String, $lastName: String, $address: String, $email: String, $program: String!, $dispensaryId: String!, $favoriteStore: String!, $phoneNumber: String!, $acceptedTerms: Boolean!) {
		createAlpineUserV2(
			firstName: $firstName
			lastName: $lastName
			address: $address
			email: $email
			program: $program
			dispensaryId: $dispensaryId
			favoriteStore: $favoriteStore
			phoneNumber: $phoneNumber
			acceptedTerms: $acceptedTerms
		) {
			success
			wallet {
				balance
				rewardBrand
				rewards {
					id
					copy
					available
					operator
					cost
					value
					rewardType
				}
				userHasWallet
				auth {
					pinConfirmed
					incorrectPinProvided
					authTextMessageSent
				}
			}
		}
	}
`;

module.exports.createAlpineUser = gql`
	mutation CreateAlpineUser($firstName: String, $lastName: String, $address: String, $email: String, $program: String!, $dispensaryId: String!, $favoriteStore: String!, $phoneNumber: String!, $acceptedTerms: Boolean!) {
		createAlpineUser(
			firstName: $firstName
			lastName: $lastName
			address: $address
			email: $email
			program: $program
			dispensaryId: $dispensaryId
			favoriteStore: $favoriteStore
			phoneNumber: $phoneNumber
			acceptedTerms: $acceptedTerms
		) {
			success
			wallet {
				balance
				rewardBrand
				rewards {
					id
					copy
					available
					operator
					cost
					value
					rewardType
				}
				userHasWallet
				auth {
					pinConfirmed
					incorrectPinProvided
					authTextMessageSent
				}
			}
		}
	}
`;

module.exports.getRewardsV2 = gql`
	query GetRewardsV2($phoneNumber: String!, $dispensaryId: String!, $dob: String, $pin: String) {
		getRewardsV2(
			phoneNumber: $phoneNumber
			dispensaryId: $dispensaryId
			dob: $dob
			pin: $pin
		) {
			balance
			rewards {
				id
				copy
				available
				operator
				cost
				value
				rewardType
			}
			rewardBrand
			userHasWallet
			auth {
				pinConfirmed
				incorrectPinProvided
				authTextMessageSent
			}
		}
	}
`;

module.exports.bulkEndSpecialsV2 = gql`
	mutation BulkEndSpecialsV2($input: endSpecialsInput!) {
		bulkEndSpecialsV2(input: $input) {
			message
			success
		}
	}
`;

module.exports.bulkEndSpecials = gql`
	mutation BulkEndSpecials($input: endSpecialsInput!) {
		bulkEndSpecials(input: $input) {
			message
			success
		}
	}
`;

module.exports.createEnterpriseSpecialV2 = gql`
	mutation CreateEnterpriseSpecialV2($input: EnterpriseSpecialInputV2!) {
		createEnterpriseSpecialV2(input: $input) {
			message
			success
		}
	}
`;

module.exports.createEnterpriseSpecialsSettings = gql`
	mutation CreateEnterpriseSpecialsSettings($enterpriseId: ID!, $input: EnterpriseSpecialsSettingsInput!) {
		createEnterpriseSpecialsSettings(enterpriseId: $enterpriseId, input: $input) {
			message
			success
		}
	}
`;

module.exports.createSpecialV3 = gql`
	mutation CreateSpecialV3($input: SpecialsInputV3!) {
		createSpecialV3(input: $input) {
			_id
		}
	}
`;

module.exports.deleteEnterpriseSpecial = gql`
	mutation DeleteEnterpriseSpecial($enterpriseId: String!, $id: String!) {
		deleteEnterpriseSpecial(enterprise_id: $enterpriseId, id: $id) {
			message
			success
		}
	}
`;

module.exports.deleteSpecialV2 = gql`
	mutation DeleteSpecialV2($id: String!) {
		deleteSpecialV2(id: $id) {
			_id
		}
	}
`;

module.exports.endEnterpriseSpecial = gql`
	mutation EndEnterpriseSpecial($enterpriseId: String!, $id: String!) {
		endEnterpriseSpecial(enterprise_id: $enterpriseId, id: $id) {
			success
			message
		}
	}
`;

module.exports.endSpecialV2 = gql`
	mutation EndSpecialV2($id: String!) {
		endSpecialV2(id: $id) {
			_id
		}
	}
`;

module.exports.incrementClicks = gql`
	mutation IncrementSpecialClicks($input: incrementClicksInput!) {
		incrementClicks(special: $input) {
			message
			success
		}
	}
`;

module.exports.updateEnterpriseSpecialV2 = gql`
	mutation UpdateEnterpriseSpecialV2($id: String!, $input: EnterpriseSpecialInputV2!) {
		updateEnterpriseSpecialV2(id: $id, input: $input) {
			message
			success
		}
	}
`;

module.exports.updateEnterpriseSpecialsSettings = gql`
	mutation UpdateEnterpriseSpecialsSettings($enterpriseId: ID!, $input: EnterpriseSpecialsSettingsInput!) {
		updateEnterpriseSpecialsSettings(enterpriseId: $enterpriseId, input: $input) {
			message
			success
		}
	}
`;

module.exports.updateSpecialV3 = gql`
	mutation UpdateSpecialV3($id: String!, $input: SpecialsInputV3!) {
		updateSpecialV3(id: $id, input: $input) {
			_id
		}
	}
`;

module.exports.updateSpecialsSortOrder = gql`
	mutation UpdateSpecialsSortOrder($input: SortOrderInput!) {
		updateSpecialsSortOrder(input: $input) {
			message
			success
		}
	}
`;

module.exports.enterpriseSpecialsV3 = gql`
	query EnterpriseSpecialsV3($enterpriseId: ID!, $filter: filteredSpecialsInputV2) {
		enterpriseSpecialsV3(enterpriseId: $enterpriseId, filter: $filter) {
	queryInfo {
				totalCount
			}
			specials {
				_id
				active
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
				cipher
				clicks
				complete
				createdAt
				createdBy
				description
				descriptionHtml
				discount
				discountedPrices
				discountToCart {
					_id
					enabled
					discountType
					value
				}
				displayRank
				earliestStartStamp
				emailSpecial
				endDay
				endStamp
				endTime
				enterpriseId
				enterpriseSpecialId
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
				latestEndStamp
				localTime
				menuDisplayDescription
				menuDisplayName
				menuDisplayImage
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
				retailers
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
				specialRestrictions
				specialType
				startDay
				startStamp
				startTime
				subject
				targetPrice
				timezone
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

module.exports.enterpriseSpecials = gql`
	query EnterpriseSpecials($enterpriseId: ID!) {
		enterpriseSpecials(enterpriseId: $enterpriseId) {
			_id
			active
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
			cipher
			clicks
			createdAt
			createdBy
			description
			descriptionHtml
			discount
			discountedPrices
			discountToCart {
				_id
				enabled
				discountType
				value
			}
			displayRank
			emailSpecial
			endDay
			endStamp
			endTime
			enterpriseId
			enterpriseSpecialId
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
			localTime
			menuDisplayDescription
			menuDisplayName
			menuDisplayImage
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
			retailers
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
			specialRestrictions
			specialType
			startDay
			startStamp
			startTime
			subject
			targetPrice
			timezone
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
`;

module.exports.filteredSpecialsV2 = gql`
	query FilteredSpecialsV2($specialsFilter: filteredSpecialsInput!, $includeEnterpriseSpecials: Boolean = false) {
		filteredSpecialsV2(
			filter: $specialsFilter
			includeEnterpriseSpecials: $includeEnterpriseSpecials
		) {
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
		filteredSpecials(
			filter: $specialsFilter
			includeEnterpriseSpecials: $includeEnterpriseSpecials
		) {
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

module.exports.getStockImage = gql`
	query getStockImage($category: String, $productName: String) {
		getStockImage(category: $category, productName: $productName) {
			url
		}
	}
`;

module.exports.createStrainV2 = gql`
	mutation CreateStrainV2($input: strainInput!) {
		createStrainV2(strain: $input) {
			id
		}
	}
`;

module.exports.deleteStrain = gql`
	mutation DeleteStrain($id: String!) {
		deleteStrain(id: $id) {
			id
		}
	}
`;

module.exports.updateStrainV2 = gql`
	mutation UpdateStrainV2($id: String!, $input: strainInput!) {
		updateStrainV2(id: $id, strain: $input) {
			id
		}
	}
`;

module.exports.filteredStrains = gql`
	query FilteredStrains($filter: strainsFilterInput, $sort: strainsSortInput, $pagination: paginationInput) {
		filteredStrains(filter: $filter, sort: $sort, pagination: $pagination) {
	queryInfo {
				totalCount
			}
			strains {
				description
				effects
				id
				imageUrl
				name
				potentialHealthBenefits
			}
		}
	}
`;

module.exports.getStrain = gql`
	query GetStrain($id: String!) {
		getStrain(id: $id) {
			aromas
			description
			effects
			id
			imageUrl
			labels
			name
			potentialHealthBenefits
			ratio
			terpenes {
				id
				name
			}
		}
	}
`;

module.exports.filteredSubscriptions = gql`
	query FilteredSubscriptions($subscriptionsFilter: subscriptionsFilterInput) {
		filteredSubscriptions(filter: $subscriptionsFilter) {
			_id
			createdAt
			createdBy
			dateAdded
			dispensaryId
			dispensaryName
			email
			emailOptIn
			emailSubscription
			name
			numOrders
			orderTotal
			phone
			source
			textSubscription
			userId
		}
	}
`;

module.exports.getCustomerSubscriptions = gql`
	query GetCustomerSubscriptions {
		getCustomerSubscriptions {
			dispensaryId
			dispensaryName
			emailOptIn
			emailSubscription
			id
		}
	}
`;

module.exports.unsubscribeCustomerQuery = gql`
	query GetUnsubscribeDispensary($customerId: String!) {
		unsubscribeCustomerQuery(customerId: $customerId) {
			subscribed
			dispensary {
				name
				logoImage
			}
		}
	}
`;

module.exports.createTerpeneV2 = gql`
	mutation CreateTerpene($terpene: terpeneInput!) {
		createTerpeneV2(terpene: $terpene) {
			id
		}
	}
`;

module.exports.deleteTerpene = gql`
	mutation DeleteTerpene($id: String!) {
		deleteTerpene(id: $id) {
			id
		}
	}
`;

module.exports.updateTerpeneV2 = gql`
	mutation UpdateTerpene($id: String!, $terpene: terpeneInput!) {
		updateTerpeneV2(id: $id, terpene: $terpene) {
			id
		}
	}
`;

module.exports.filteredTerpenes = gql`
	query FilteredTerpenes($filter: terpenesFilter, $sort: terpenesSort) {
		filteredTerpenes(filter: $filter, sort: $sort) {
			...TerpeneFragment
			strains {
				_id
			}
		}
	}
`;

module.exports.getTerpene = gql`
	query GetTerpene($id: String!) {
		getTerpene(id: $id) {
			...TerpeneFragment
		}
	}
`;

module.exports.createUser = gql`
	mutation CreateUser($input: usersCreateInput!) {
		createUser(user: $input) {
			audioNotificationsOnNewArrivalsDisabled
			audioNotificationsOnNewOrdersDisabled
			chainID
			createdAt
			createdBy
			dispensaryId
			email
			fullName
			permissions {
				allLocations
				analytics
				billing
				customers
				dispensaryIds
				driver
				menu
				menuReview
				orders
				promote
				settings
				superMenuReview
				users
			}
			phone
			roleAtDispensary
			textNotifications
			type
		}
	}
`;

module.exports.deleteUser = gql`
	mutation DeleteUser($input: usersDeleteInput!) {
		deleteUser(user: $input) {
			fullName
		}
	}
`;

module.exports.loginAdminViaToken = gql`
	mutation LoginAdminViaToken($transferToken: String!) {
		loginAdminViaToken(transferToken: $transferToken) {
			...adminIdentityFragment
		}
	}
`;

module.exports.loginAdmin = gql`
	mutation LoginAdmin($email: String!, $password: String!) {
		loginAdmin(email: $email, password: $password) {
			...adminIdentityFragment
		}
	}
`;

module.exports.logout = gql`
	mutation Logout {
		logout {
			message
			success
		}
	}
`;

module.exports.updateUser = gql`
	mutation UpdateUser($input: usersUpdateInput!) {
		updateUser(user: $input) {
			audioNotificationsOnNewArrivalsDisabled
			audioNotificationsOnNewOrdersDisabled
			chainID
			createdAt
			createdBy
			dispensaryId
			email
			fullName
			isWeeklyReportEnabled
			permissions {
				allLocations
				analytics
				billing
				customers
				dispensaryIds
				driver
				menu
				menuReview
				orders
				promote
				settings
				superMenuReview
				users
			}
			phone
			roleAtDispensary
			textNotifications
			type
			unsubscribedDispensaries
		}
	}
`;

module.exports.getFilteredBrandSummaries = gql`
	query AnalyticsBrandsQuery($input: BrandsSummaryInput!, $pagination: AnalyticsPagination, $sort: AnalyticsSort) {
		getFilteredBrandSummaries(input: $input, pagination: $pagination, sort: $sort) {
			brands {
				brandId
				brandName
				numProducts
				percentSales
				totalSalesCents
				percentChange
				centsChange
			}
			meta {
				totalCount
			}
		}
	}
`;

module.exports.exportFilteredBrandsSummaries = gql`
	mutation AnalyticsExportBrandsMutation($input: BrandsSummaryInput!, $sort: AnalyticsSort) {
		exportFilteredBrandsSummaries(input: $input, sort: $sort) {
			success
		}
	}
`;

module.exports.getTrendingBrands = gql`
	query GetTrendingBrandsQuery($input: BrandsSummaryInput!, $pagination: AnalyticsPagination, $sort: AnalyticsSort) {
		getTrendingBrands(input: $input, pagination: $pagination, sort: $sort) {
			trending {
				brandId
				brandName
				percentChangeFromLastPeriod
				dollarHistoryThisPeriod {
					date
					totalSales
				}
			}
		}
	}
`;

module.exports.getEcommerceAbandonedCarts = gql`
	query AnalyticsAbandonedCartsQuery($input: AnalyticsInput!, $pagination: AnalyticsPagination, $sort: AnalyticsSort) {
		getEcommerceAbandonedCarts(input: $input, pagination: $pagination, sort: $sort) {
			carts {
				id
				createdAt
				firstName
				lastName
				email
				phone
				valueInCents
			}
			meta {
				totalCount
			}
		}
	}
`;

module.exports.getEcommerceDataPoints = gql`
	query AnalyticsEcommerceDataPointsQuery($input: AnalyticsInput!) {
		getEcommerceDataPoints(input: $input) {
			conversion {
				percentOfVisits
				unitDifferenceFromLastPeriod
			}
			abandonment {
				currentValue
				unitDifferenceFromLastPeriod
			}
			order {
				currentValue
				percentDifference
			}
			repeatCustomers {
				percentOfVisits
				unitDifferenceFromLastPeriod
			}
			conversionFunnel {
				visitedMenu {
					percentOfVisits
				}
				interacted {
					percentOfVisits
				}
				addedToCart {
					percentOfVisits
				}
				visitedCheckout {
					percentOfVisits
				}
				placedOrder {
					percentOfVisits
				}
			}
		}
	}
`;

module.exports.exportFilteredCartsSummaries = gql`
	mutation AnalyticsExportCartsMutation($input: AnalyticsInput!, $sort: AnalyticsSort) {
		exportFilteredCartsSummaries(input: $input, sort: $sort) {
			success
		}
	}
`;

module.exports.getMarketingCampaigns = gql`
	query AnalyticsMarketingCampaignsQuery($input: AnalyticsInput!, $pagination: AnalyticsPagination, $sort: AnalyticsSort) {
		getMarketingCampaigns(input: $input, pagination: $pagination, sort: $sort) {
			campaigns {
				utmCampaign
				utmSource
				utmMedium
				conversionPercentage
				conversionPercentageUnitChange
				averageOrderValue
				averageOrderValueChangePercentage
				totalSales
			}
			meta {
				totalCount
			}
		}
	}
`;

module.exports.getMarketingCoupons = gql`
	query AnalyticsMarketingCouponQuery($input: AnalyticsInput!, $pagination: AnalyticsPagination, $sort: AnalyticsSort) {
		getMarketingCoupons(input: $input, pagination: $pagination, sort: $sort) {
			coupons {
				couponId
				couponName
				revenue
				prevTotalSales
				currentUsage
				prevUsage
				averageOrderValue
				averageOrderValueChangePercentage
				averageUsageChangePercentage
				discount
			}
			meta {
				totalCount
			}
		}
	}
`;

module.exports.getMarketingDataPoints = gql`
	query AnalyticsMarketingDataPointsQuery($input: AnalyticsInput!) {
		getMarketingDataPoints(input: $input) {
			totalCampaignsCents
			totalSpecialsCents
			totalCouponsCents
			marketingRevenue {
				date
				specialsCents
				couponsCents
			}
		}
	}
`;

module.exports.exportFilteredCampaignsSummaries = gql`
	mutation AnalyticsExportCampaignsMutation($input: AnalyticsInput!, $sort: AnalyticsSort) {
		exportFilteredCampaignsSummaries(input: $input, sort: $sort) {
			success
		}
	}
`;

module.exports.exportCouponsSummaries = gql`
	mutation AnalyticsExportCouponsMutation($input: AnalyticsInput!, $sort: AnalyticsSort) {
		exportCouponsSummaries(input: $input, sort: $sort) {
			success
		}
	}
`;

module.exports.exportSpecialsSummaries = gql`
	mutation AnalyticsExportSpecialsMutation($input: AnalyticsInput!, $sort: AnalyticsSort) {
		exportSpecialsSummaries(input: $input, sort: $sort) {
			success
		}
	}
`;

module.exports.getMarketingSpecials = gql`
	query AnalyticsMarketingSpecialsQuery($input: AnalyticsInput!, $pagination: AnalyticsPagination, $sort: AnalyticsSort) {
		getMarketingSpecials(input: $input, pagination: $pagination, sort: $sort) {
			specials {
				specialId
				dispensaryId
				name
				type
				emailSent
				clickThroughPercentage
				conversionPercentage
				conversionChangePercentage
				averageOrderValue
				averageOrderValueChangePercentage
				totalSales
			}
			meta {
				totalCount
			}
		}
	}
`;

module.exports.exportFilteredProductSummaries = gql`
	mutation AnalyticsExportProductsMutation($input: ProductsSummaryInput!, $sort: AnalyticsSort) {
		exportFilteredProductSummaries(input: $input, sort: $sort) {
			success
		}
	}
`;

module.exports.getFilteredProductSummaries = gql`
	query AnalyticsProductsQuery($input: ProductsSummaryInput!, $pagination: AnalyticsPagination, $sort: AnalyticsSort) {
		getFilteredProductSummaries(input: $input, pagination: $pagination, sort: $sort) {
			products {
				productId
				productName
				brandId
				brandName
				category
				strainType
				sales
				percentChange
				dollarChange
				dispensaryId
				numSold
			}
			meta {
				totalCount
			}
		}
	}
`;

module.exports.salesOrdersQuery = gql`
	query SalesOrdersQuery($input: SharedSalesInput!) {
		salesOrdersQuery(input: $input) {
			totalOrders
			totalSales
			revenueChange
			percentChange
			ordersByDate {
				date
				totalOrders
				totalSales
			}
		}
	}
`;

module.exports.getProductSalesByCategory = gql`
	query GetProductSalesByCategory($input: SharedSalesInput!) {
		getProductSalesByCategory(input: $input) {
			categoryOptions {
				key
				label
				value
			}
			lineItems {
				price
				productType
				categoryOption
				totalSales
				percentOfTotal
			}
			totalSales
		}
	}
`;

module.exports.getTopProduct = gql`
	query GetTopProduct($input: SharedSalesInput!) {
		getTopProduct(input: $input) {
			product {
				brand {
					id
					name
					imageUrl
				}
				brandId
				brandLogo
				Image
				images {
					_id
					url
					origin
					active
				}
				Name
				stockImage
				strainType
				type
			}
			total
		}
	}
`;

module.exports.createBrandV2 = gql`
	mutation CreateDispensaryBrand($name: String!, $dispensaryId: String!) {
		createBrandV2(brand: {name: $name, dispensaryId: $dispensaryId}) {
			id
			name
		}
	}
`;

module.exports.getBrandsV2 = gql`
	query BrandsForDropdownByIds($ids: [String]!) {
		getBrandsV2(ids: $ids) {
			...brandFragmentForDropdown
		}
	}
`;

module.exports.menuFiltersV2 = gql`
	query GetMenuFilters($dispensaryId: String!) {
		menuFiltersV2(dispensaryId: $dispensaryId) {
			brands {
				id
				name
			}
			strainTypes
			weights
			effects
			categoriesSubcategories {
				category
				subcategories
			}
		}
	}
`;

module.exports.filteredProducts = gql`
	query GetCollectionsProducts($filter: productsFilterInput!) {
		filteredProducts(filter: $filter) {
			products {
				Name
				id
				type
				subcategory
			}
		}
	}
`;

module.exports.filteredProducts = gql`
	query GetCarouselProducts($productsFilter: productsFilterInput!) {
		filteredProducts(filter: $productsFilter, page: 0, perPage: 15, useCache: true) {
			products {
				id
				Name
				Image
				Prices
				brand {
					id
					name
				}
				brandName
				strainType
				type
			}
		}
	}
`;

module.exports.filteredDispensaries = gql`
	query GetMenuCustomization($dispensaryId: String!) {
		filteredDispensaries(filter: {cNameOrID: $dispensaryId}) {
			webCustomizationSettings {
				colorSettings {
					navBarColor
					linkColor
				}
				fontSettings {
					family
				}
			}
			menuBannerHtml
			menuBannerColor
			ageVerificationBannerHtml
			ageVerificationBannerColor
			embedSettings {
				disclaimerTextHtml
			}
			categoryPhotos {
				src
				category
			}
			location {
				state
			}
			imageBanners {
				_id
				image
				mobileImage
				alt
				link
				position
			}
		}
	}
`;

module.exports.dispensaryUpdate = gql`
	mutation UpdateMenuCustomization($dispensaryId: String!, $menuBannerHtml: String, $menuBannerColor: String, $ageVerificationBannerHtml: String, $ageVerificationBannerColor: String) {
		dispensaryUpdate(
			input: {id: $dispensaryId, profile: {menuBannerHtml: $menuBannerHtml, menuBannerColor: $menuBannerColor, ageVerificationBannerHtml: $ageVerificationBannerHtml, ageVerificationBannerColor: $ageVerificationBannerColor}}
		) {
			success
			message
		}
	}
`;

module.exports.updateWebCustomizationSettings = gql`
	mutation UpdateWebCustomizationSettings($dispensaryId: String!, $input: UpdateWebCustomizationSettingsInput!) {
		updateWebCustomizationSettings(dispensaryId: $dispensaryId, input: $input) {
			success
			message
		}
	}
`;

module.exports.updateImageBanners = gql`
	mutation UpdateImageBanners($dispensaryId: String!, $input: UpdateImageBannersInput!) {
		updateImageBanners(dispensaryId: $dispensaryId, input: $input) {
			success
			message
		}
	}
`;

module.exports.bulkUpdateMenuSections = gql`
	mutation UpdateMenuSections($dispensaryId: String!, $menuSections: [menuSectionBulkUpdateInput!], $deletes: [ID!]) {
		bulkUpdateMenuSections(
			dispensaryId: $dispensaryId
			menuSections: $menuSections
			deletes: $deletes
		) {
			id
		}
	}
`;

module.exports.getCollections = gql`
	query GetCollections($dispensaryId: String!) {
		getCollections(dispensaryId: $dispensaryId) {
			id
			slug
			dispensaryId
			title
			description
			allConditions
			sortBy
			productCount
			position
			isFeatured
			conditions {
				id
				condition
				itemKey
				itemValue
				productCollectionId
			}
		}
	}
`;

module.exports.getCollection = gql`
	query GetCollection($dispensaryId: String!, $collectionId: String!) {
		getCollection(dispensaryId: $dispensaryId, collectionId: $collectionId) {
			id
			slug
			dispensaryId
			title
			description
			allConditions
			sortBy
			productCount
			isFeatured
			position
			conditions {
				id
				condition
				itemKey
				itemValue
				productCollectionId
			}
		}
	}
`;

module.exports.createCollection = gql`
	mutation CreateCollection($dispensaryId: String!, $input: UpdateCollectionInput!) {
		createCollection(dispensaryId: $dispensaryId, input: $input) {
			id
			slug
			dispensaryId
			title
			description
			allConditions
			sortBy
			productCount
			conditions {
				id
				condition
				itemKey
				itemValue
				productCollectionId
			}
		}
	}
`;

module.exports.updateCollection = gql`
	mutation UpdateCollection($collectionId: String!, $input: UpdateCollectionInput!) {
		updateCollection(collectionId: $collectionId, input: $input) {
			id
			slug
			dispensaryId
			title
			description
			allConditions
			sortBy
			productCount
			conditions {
				id
				condition
				itemKey
				itemValue
				productCollectionId
			}
		}
	}
`;

module.exports.deleteCollection = gql`
	mutation DeleteCollection($collectionId: String!) {
		deleteCollection(collectionId: $collectionId) {
			success
			message
		}
	}
`;

module.exports.updateFeaturedCollection = gql`
	mutation UpdateFeaturedCollection($dispensaryId: String!, $input: UpdateFeaturedInput!) {
		updateFeaturedCollection(dispensaryId: $dispensaryId, input: $input) {
			id
			title
			position
			isFeatured
		}
	}
`;

module.exports.getMenuSections = gql`
	query GetMenuSectionsForEmbed($dispensaryId: String!) {
		getMenuSections(dispensaryId: $dispensaryId) {
			id
			label
			sectionType
		}
	}
`;

module.exports.filteredProducts = gql`
	query GetMenuSectionProductsAdmin($filter: productsFilterInput!) {
		filteredProducts(filter: $filter) {
			products {
				Name
				brand {
					id
					name
				}
				_id
				id
				featured {
					current
				}
				type
				subcategory
				special
			}
		}
	}
`;

module.exports.createMenuSection = gql`
	mutation CreateMenuSection($menuSection: menuSectionCreateInput!) {
		createMenuSection(menuSection: $menuSection) {
			id
		}
	}
`;

module.exports.destroyMenuSection = gql`
	mutation DestroyMenuSection($id: String!, $dispensaryId: String) {
		destroyMenuSection(id: $id, dispensaryId: $dispensaryId) {
			message
			success
		}
	}
`;

module.exports.getMenuSections = gql`
	query GetMenuSections($dispensaryId: String!) {
		getMenuSections(dispensaryId: $dispensaryId) {
			brandId
			category
			id
			label
			linkLabel
			position
			subcategory
			sectionType
			sectionName
			products
		}
	}
`;

module.exports.sortMenuSections = gql`
	mutation SortMenuSections($dispensaryId: String!, $ids: [String!]!) {
		sortMenuSections(dispensaryId: $dispensaryId, ids: $ids) {
			message
			success
		}
	}
`;

module.exports.updateMenuSection = gql`
	mutation UpdateMenuSection($id: ID!, $menuSection: menuSectionUpdateInput!) {
		updateMenuSection(id: $id, menuSection: $menuSection) {
			id
		}
	}
`;

module.exports.filteredProducts = gql`
	query AdminIndexProducts($productsFilter: productsFilterInput!, $page: Int, $perPage: Int) {
		filteredProducts(filter: $productsFilter, page: $page, perPage: $perPage) {
			products {
				id
				_id
				brand {
					id
					name
				}
				brandName
				CBD
				CBDContent {
					unit
					range
				}
				DispensaryID
				duplicatedProductId
				medicalOnly
				Name
				Options
				POSMetaData {
					canonicalID
					canonicalBrandName
				}
				recOnly
				recPrices
				medicalPrices
				Prices
				score
				Status
				strainType
				subcategory
				updatedAt
				THC
				THCContent {
					unit
					range
				}
				type
				weight
				isBelowThreshold
				isBelowKioskThreshold
				forcedPotencyUnit
				cannabinoidsV2 {
					value
					unit
					cannabinoid {
						name
					}
				}
			}
	queryInfo {
				totalCount
			}
		}
	}
`;

module.exports.disconnectProduct = gql`
	mutation DisconnectProduct($id: String!) {
		disconnectProduct(id: $id) {
			message
			success
		}
	}
`;

module.exports.getOrders = gql`
	query GetOrdersForMessaging($input: getOrdersInput!) {
		getOrders(input: $input) {
	queryInfo {
				totalCount
			}
			orders {
				createdAt
				customerId
				customerEmail
				customerName
				customerPhone
				dispensaryId
				_id
				orderId
				status
			}
		}
	}
`;

module.exports.createMessagingFeatureRequest = gql`
	mutation CreateMessagingFeatureRequest($dispensaryName: String!, $email: String!, $userName: String) {
		createMessagingFeatureRequest(
			dispensaryName: $dispensaryName
			email: $email
			userName: $userName
		) {
			success
		}
	}
`;

module.exports.createOrderingSuspensionV2 = gql`
	mutation CreateOrderingSuspensionV2($dispensaryId: ID!) {
		createOrderingSuspensionV2(dispensaryId: $dispensaryId) {
			id
		}
	}
`;

module.exports.endOrderingSuspensionV2 = gql`
	mutation EndOrderingSuspensionV2($dispensaryId: ID!) {
		endOrderingSuspensionV2(dispensaryId: $dispensaryId) {
			id
		}
	}
`;

module.exports.getOrder = gql`
	query getOrderToPrint($id: String!) {
		getOrder(id: $id) {
			order {
				coupon {
					percentDiscount
					fixedDiscountInCents
					code
				}
				createdAt
				credit
				creditTotal
				curbsideArrivalInfo {
					arrivalInformation
				}
				deliveryFee
				customer {
					profile {
						firstName
						lastName
						medicalCard {
							expirationDate
							number
						}
						phone
						birthday
					}
				}
				guestCustomer {
					firstName
					lastName
					birthMonth
					birthDay
					birthYear
				}
				medicalOrder
				medicalCard {
					expirationDate
					number
				}
				orderId
				orders {
					basePrice
					option
					additionalOption
					product {
						type
						Options
					}
					quantity
				}
				specialInstructions
				taxAmount
				cannabisTax
				bottleDepositTaxCents
				tipAmount
				paymentFee
				paymentMethod
				totalCost
				isKioskOrder
				isCurbsidePickupOrder
				isDriveThruPickupOrder
				deliveryInfo {
					apartmentNum
					deliveryOption
					address
				}
				appliedRewards {
					value
					operator
					brand
					redemptionAttempts {
						programResponse {
							rewardRedemption {
								id
								createdAt
								name
								description
							}
						}
						status
						redeemBy
					}
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
				driversLicense
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
						brandId
						brandName
						POSMetaData {
							children {
								canonicalName
								option
								quantity
							}
						}
						AdditionalOptions
						THCContent {
							unit
							value
							range
						}
						CBDContent {
							unit
							value
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
				isAfterHoursOrder
				isAnonymous
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
					redemptionAttempts {
						programResponse {
							rewardRedemption {
								id
								createdAt
								name
								description
							}
						}
						status
						redeemBy
					}
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

module.exports.filteredCoupons = gql`
	query FilteredCouponsForDispensaryAdmin($filter: couponsFilterInput, $sort: couponsSortInput, $pagination: couponsPaginationInput) {
		filteredCoupons(filter: $filter, sort: $sort, pagination: $pagination) {
	queryInfo {
				totalCount
			}
			coupons {
				_id
				active
				addedDate
				applicableCategories {
					category
					subcategory
				}
				code
				dispensary
				dispensaryId
				expDate
				fixedDiscountInCents
				numAllowedUses
				numUses
				percentDiscount
				oneUsePerCustomer
				reimbursed
				restrictions {
					minimumPurchase
					minimumPurchaseInCents
					noSpecials
				}
				usedBy
			}
		}
	}
`;

module.exports.enterpriseProducts = gql`
	query AdminEnterpriseProducts($enterpriseId: ID!) {
		enterpriseProducts(enterpriseId: $enterpriseId) {
			products {
				brandId
				brandName
				dispensaryProducts {
					brandId
					brandName
					dispensaryId
					id
					status
				}
				enterpriseProductId
				medicalOnly
				medicalPrices
				name
				options
				prices
				recOnly
				recPrices
				subcategory
				type
			}
		}
	}
`;

module.exports.enterpriseProductsV2 = gql`
	query AdminEnterpriseProductsV2($enterpriseId: ID!) {
		enterpriseProductsV2(enterpriseId: $enterpriseId) {
			products {
				brandId
				brandName
				dispensaryProducts {
					brandId
					brandName
					dispensaryId
					id
					status
					enterpriseProductId
				}
				enterpriseProductId
				medicalOnly
				medicalPrices
				name
				options
				prices
				recOnly
				recPrices
				subcategory
				type
			}
		}
	}
`;

module.exports.getEnterpriseSpecial = gql`
	query GetEnterpriseSpecial($enterpriseSpecialId: ID!) {
		getEnterpriseSpecial(enterpriseSpecialId: $enterpriseSpecialId) {
			_id
			active
			applyRewardsToConditions
			excludeConditionItemsFromRewards
			menuDisplayName
			menuDisplayDescription
			menuDisplayImage
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
				enterpriseProductId
				productGroup
				productId
				productIds
				quantity
				selectedCategoriesAndSubcategories
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
				enterpriseProductId
				dollarDiscount
				productGroup
				productId
				productIds
				percentDiscount
				quantity
				targetPrice
				selectedCategoriesAndSubcategories
				subcategoryIds
				subcategoryNames
				weight
			}
			cipher
			clicks
			complete
			createdAt
			createdBy
			description
			descriptionHtml
			discount
			discountedPrices
			discountToCart {
				_id
				enabled
				discountType
				value
			}
			discountPrecedence
			discountStacking
			dispensaryId
			dispensaries
			displayRank
			dollarDiscount
			duplicatedFrom
			earliestStartStamp
			emailSpecial
			endDay
			endStamp
			endTime
			enterpriseId
			enterpriseSpecialId
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
			inactiveDispensaries
			isRecurring
			itemsForAPrice {
				_id
				enabled
				value
			}
			latestEndStamp
			localTime
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
			specialRestrictions
			stackingBehavior
			stackingMode
			startDay
			startStamp
			startTime
			specialType
			subject
			targetPrice
			timezone
			totalQuantity {
				enabled
				maxQuantity
				quantity
				quantityOperator
			}
			totalSpend {
				enabled
				maximumSpend
				minimumSpend
				spendOperator
			}
			totalWeight {
				enabled
				weight
				weightOperator
			}
			updatedAt
			updatedBy
			version
		}
	}
`;

module.exports.filteredProducts = gql`
	query AdminSpecialsProducts($productsFilter: productsFilterInput!, $page: Int, $perPage: Int) {
		filteredProducts(filter: $productsFilter, page: $page, perPage: $perPage) {
			products {
				_id
				brand {
					_id
					id
					description
					name
				}
				brandDescription
				brandId
				brandName
				DispensaryID
				enterpriseProductId
				id
				Image
				medicalOnly
				medicalPrices
				Name
				Options
				Prices
				recOnly
				recPrices
				Status
				subcategory
				type
				updatedAt
			}
		}
	}
`;

module.exports.updateSpecialMenuDesign = gql`
	mutation updateSpecialMenuDesign($id: ID!, $input: MenuDesignInput!) {
		updateSpecialMenuDesign(id: $id, input: $input) {
			message
			success
		}
	}
`;

module.exports.getEnterpriseSpecialsHistory = gql`
	query GetEnterpriseSpecialsHistory($enterpriseId: ID!, $enterpriseSpecialId: ID!) {
		getEnterpriseSpecialsHistory(
			enterpriseId: $enterpriseId
			enterpriseSpecialId: $enterpriseSpecialId
		) {
			id
			enterpriseSpecialId
			versions {
				...enterpriseSpecialData
			}
		}
	}
`;

module.exports.getEnterpriseSpecialsSettings = gql`
	query GetEnterpriseSpecialsSettings($enterpriseId: ID!) {
		getEnterpriseSpecialsSettings(enterpriseId: $enterpriseId) {
			discountStacking
			discountPrecedence
			enableIndividualDiscountStacking
			enableIndividualSpecialPrecedence
			nonStackingBehavior
			permissionEnabled
			stackingBehavior
		}
	}
`;

module.exports.getSpecialsHistory = gql`
	query GetSpecialsHistory($specialId: ID!) {
		getSpecialsHistory(specialId: $specialId) {
			id
			versions {
				...specialData
			}
		}
	}
`;

module.exports.createPlusApiKeyV2 = gql`
	mutation CreatePlusApiKeyV2($dispensaryId: String!, $keyType: PlusApiKeyType!) {
		createPlusApiKeyV2(dispensaryId: $dispensaryId, keyType: $keyType) {
			id
		}
	}
`;

module.exports.createPlusEnterpriseApiKey = gql`
	mutation CreatePlusEnterpriseApiKey($enterpriseId: String!, $keyType: PlusApiKeyType!) {
		createPlusEnterpriseApiKey(enterpriseId: $enterpriseId, keyType: $keyType) {
			id
		}
	}
`;

module.exports.expirePlusApiKey = gql`
	mutation ExpirePlusApiKey($id: String!) {
		expirePlusApiKey(id: $id) {
			id
		}
	}
`;

module.exports.expirePlusEnterpriseApiKey = gql`
	mutation ExpirePlusEnterpriseApiKey($id: String!) {
		expirePlusEnterpriseApiKey(id: $id) {
			id
		}
	}
`;

module.exports.filteredDispensaries = gql`
	query GetEnterpriseIdForApiKeys($dispensaryFilter: dispensariesFilterInput!) {
		filteredDispensaries(filter: $dispensaryFilter) {
			retailer {
				enterpriseId
			}
		}
	}
`;

module.exports.getPlusApiKeys = gql`
	query GetPlusApiKeys($dispensaryId: String!) {
		getPlusApiKeys(dispensaryId: $dispensaryId) {
			createdAt
			fresh
			id
			key
			keyType
			lastRequestAt
		}
	}
`;

module.exports.getPlusEnterpriseApiKeys = gql`
	query GetPlusEnterpriseApiKeys($enterpriseId: String!) {
		getPlusEnterpriseApiKeys(enterpriseId: $enterpriseId) {
			createdAt
			fresh
			id
			key
			keyType
			lastRequestAt
		}
	}
`;

module.exports.getInvoicePdf = gql`
	query GetInvoicePDF($id: String!) {
		getInvoicePdf(id: $id) {
			downloadUrl
		}
	}
`;

module.exports.editCustomerV2 = gql`
	mutation EditCustomerV2($billingContactEmails: [String!], $billingNotificationEnabled: Boolean, $chargebeeCustomerId: String!) {
		editCustomerV2(
			billingContactEmails: $billingContactEmails
			billingNotificationEnabled: $billingNotificationEnabled
			chargebeeCustomerId: $chargebeeCustomerId
		) {
			message
			success
		}
	}
`;

module.exports.filteredDispensaries = gql`
	query GetEnterpriseBillingVersion($dispensaryId: String!) {
		filteredDispensaries(filter: {cNameOrID: $dispensaryId}) {
			retailer {
				id
				enterprise {
					id
					billingVersion
				}
			}
		}
	}
`;

module.exports.addBankPaymentMethodV2 = gql`
	mutation AddBankPaymentMethodV2($chargebeeCustomerId: String!, $publicToken: String!, $accountId: String!) {
		addBankPaymentMethodV2(
			chargebeeCustomerId: $chargebeeCustomerId
			publicToken: $publicToken
			accountId: $accountId
		) {
			success
			message
		}
	}
`;

module.exports.addPaymentMethodV2 = gql`
	mutation AddPaymentMethodV2($chargebeeCustomerId: String!, $token: String!) {
		addPaymentMethodV2(chargebeeCustomerId: $chargebeeCustomerId, token: $token) {
			message
			success
		}
	}
`;

module.exports.associateRetailers = gql`
	mutation AddRetailersToBillingGroup($retailerIds: [ID]!) {
		associateRetailers(retailerIds: $retailerIds) {
			success
			message
		}
	}
`;

module.exports.deleteSubscription = gql`
	mutation DeleteSubscription($retailerIds: [ID]!) {
		deleteSubscription(retailerIds: $retailerIds) {
			success
			message
		}
	}
`;

module.exports.pauseSubscription = gql`
	mutation PauseSubscription($retailerIds: [ID]!) {
		pauseSubscription(retailerIds: $retailerIds) {
			success
			message
		}
	}
`;

module.exports.dissociateRetailers = gql`
	mutation RemoveRetailersFromBillingGroup($retailerIds: [ID]!) {
		dissociateRetailers(retailerIds: $retailerIds) {
			success
			message
		}
	}
`;

module.exports.resumeSubscription = gql`
	mutation ResumeSubscription($retailerIds: [ID]!) {
		resumeSubscription(retailerIds: $retailerIds) {
			success
			message
		}
	}
`;

module.exports.setupRetailerBankPaymentMethod = gql`
	mutation SetupRetailerBankPaymentMethod($retailerIds: [ID]!, $accountId: String!, $token: String!) {
		setupRetailerBankPaymentMethod(
			retailerIds: $retailerIds
			accountId: $accountId
			token: $token
		) {
			success
			message
		}
	}
`;

module.exports.setupRetailerCreditPaymentMethod = gql`
	mutation SetupRetailerCreditPaymentMethod($retailerIds: [ID]!, $token: String!) {
		setupRetailerCreditPaymentMethod(retailerIds: $retailerIds, token: $token) {
			success
			message
		}
	}
`;

module.exports.updateBillingNotifications = gql`
	mutation UpdateBillingNotifications($retailerIds: [ID]!, $billingContactEmails: [String]!, $billingNotificationEnabled: Boolean!) {
		updateBillingNotifications(
			retailerIds: $retailerIds
			billingContactEmails: $billingContactEmails
			billingNotificationEnabled: $billingNotificationEnabled
		) {
			success
			message
		}
	}
`;

module.exports.updateChargebeeSubscription = gql`
	mutation UpdateChargebeeSubscription($billingPeriod: BillingPeriod, $chargebeeSubscriptionId: String!, $endFreeTrial: Boolean, $freeTrialEndDate: Int, $manualPayments: Boolean, $pauseSubscription: Boolean, $priceInCents: Int) {
		updateChargebeeSubscription(
			billingPeriod: $billingPeriod
			chargebeeSubscriptionId: $chargebeeSubscriptionId
			endFreeTrial: $endFreeTrial
			freeTrialEndDate: $freeTrialEndDate
			manualPayments: $manualPayments
			pauseSubscription: $pauseSubscription
			priceInCents: $priceInCents
		) {
			message
			success
		}
	}
`;

module.exports.updateSubscriptionBillingPeriod = gql`
	mutation UpdateSubscriptionBillingPeriod($retailerIds: [ID]!, $billingPeriod: BillingPeriod!) {
		updateSubscriptionBillingPeriod(
			retailerIds: $retailerIds
			billingPeriod: $billingPeriod
		) {
			success
			message
		}
	}
`;

module.exports.updateSubscriptionManualPayments = gql`
	mutation UpdateSubscriptionManualPayments($retailerIds: [ID]!, $manualPayments: Boolean!) {
		updateSubscriptionManualPayments(
			retailerIds: $retailerIds
			manualPayments: $manualPayments
		) {
			success
			message
		}
	}
`;

module.exports.updateSubscriptionPrice = gql`
	mutation UpdateSubscriptionPrice($retailerIds: [ID]!, $priceInCents: String!) {
		updateSubscriptionPrice(retailerIds: $retailerIds, priceInCents: $priceInCents) {
			success
			message
		}
	}
`;

module.exports.updateSubscriptionTrial = gql`
	mutation UpdateSubscriptionTrial($retailerIds: [ID]!, $endDate: String) {
		updateSubscriptionTrial(retailerIds: $retailerIds, endDate: $endDate) {
			success
			message
		}
	}
`;

module.exports.getChargebeeHostedPage = gql`
	query GetChargebeeHostedPage($chargebeeCustomerId: String!, $pageType: String!) {
		getChargebeeHostedPage(
			chargebeeCustomerId: $chargebeeCustomerId
			pageType: $pageType
		) {
			id
			type
			url
			state
			embed
			createdAt
			expiresAt
			updatedAt
			object
		}
	}
`;

module.exports.setupBillingV2 = gql`
	mutation SetupBillingV2($customerName: String!, $dispensaryIds: [String!]!) {
		setupBillingV2(customerName: $customerName, dispensaryIds: $dispensaryIds) {
			message
			success
		}
	}
`;

module.exports.setupRetailerBilling = gql`
	mutation SetupRetailerBilling($retailerIds: [ID]!) {
		setupRetailerBilling(retailerIds: $retailerIds) {
			success
		}
	}
`;

module.exports.deleteDeviceV2 = gql`
	mutation DeleteDeviceV2($id: ID!) {
		deleteDeviceV2(id: $id) {
			_id
		}
	}
`;

module.exports.consumeDeviceAccessCode = gql`
	mutation ConsumeDeviceAccessCode($accessCode: String!, $dispensaryId: String!) {
		consumeDeviceAccessCode(accessCode: $accessCode, dispensaryId: $dispensaryId) {
			accessCode
			channel
			channelKey
		}
	}
`;

module.exports.updateAutoPrintDevicesV2 = gql`
	mutation UpdateAutoPrintDevicesV2($dispensaryId: String!, $deviceIds: [String!]!) {
		updateAutoPrintDevicesV2(dispensaryId: $dispensaryId, deviceIds: $deviceIds) {
			message
			success
		}
	}
`;

module.exports.createReservationSlots = gql`
	mutation createReservationSlots($input: ReservationSlotsCreateInput!) {
		createReservationSlots(input: $input) {
			success
		}
	}
`;

module.exports.deleteSpecialHours = gql`
	mutation deleteSpecialHours($dispensaryId: String!, $specialHoursIds: [ID]!) {
		deleteSpecialHours(
			dispensaryId: $dispensaryId
			specialHoursIds: $specialHoursIds
		) {
			success
		}
	}
`;

module.exports.updateHoursSettings = gql`
	mutation updateHoursSettings($input: HoursSettingsUpdateInput!) {
		updateHoursSettings(input: $input) {
			success
		}
	}
`;

module.exports.createIntegration = gql`
	mutation CreateIntegration($input: IntegrationsUpdateInput!) {
		createIntegration(integration: $input) {
			adapter
			_id
		}
	}
`;

module.exports.hubspotPipelineProperties = gql`
	query HubspotCrmPipelines($integrationId: String!) {
		hubspotPipelineProperties(integrationId: $integrationId) {
			pipelines {
				id
				value
				stages {
					id
					value
				}
			}
		}
	}
`;

module.exports.hubspotCrmProperties = gql`
	query HubspotCrmProperties($integrationId: String!) {
		hubspotCrmProperties(integrationId: $integrationId) {
			localProperties {
				contact {
					id
					value
				}
				deal {
					id
					value
				}
				product {
					id
					value
				}
			}
			foreignProperties {
				contact {
					id
					value
				}
				deal {
					id
					value
				}
				product {
					id
					value
				}
			}
		}
	}
`;

module.exports.integrationsDeleteInArma = gql`
	mutation IntegrationsDeleteInArma($integrationId: String!) {
		integrationsDeleteInArma(integrationId: $integrationId) {
			message
			success
		}
	}
`;

module.exports.integrationsDelete = gql`
	mutation IntegrationsDelete($integrationId: String!) {
		integrationsDelete(integrationId: $integrationId) {
			message
			success
		}
	}
`;

module.exports.updateIntegration = gql`
	mutation UpdateIntegration($integrationId: String!, $integration: IntegrationsUpdateInput!) {
		updateIntegration(integrationId: $integrationId, integration: $integration) {
			adapter
			_id
		}
	}
`;

module.exports.integrationsWipeMenuInArma = gql`
	mutation IntegrationsWipeMenuInArma($dispensaryId: String!, $integrationId: String!) {
		integrationsWipeMenuInArma(
			dispensaryId: $dispensaryId
			integrationId: $integrationId
		) {
			success
			message
		}
	}
`;

module.exports.integrationsWipeMenu = gql`
	mutation IntegrationsWipeMenu($integrationId: String!) {
		integrationsWipeMenu(integrationId: $integrationId) {
			success
			message
		}
	}
`;

module.exports.getReservationSlotsByOrderType = gql`
	query ReservationSlotsByOrderType($dispensaryId: ID!, $reservationType: String) {
		getReservationSlotsByOrderType(
			dispensaryId: $dispensaryId
			reservationType: $reservationType
		) {
			inStorePickup {
				maxReservationSlotsByDay {
					...maxReservationSlotsByDayFragment
				}
				maxReservationSlotsByDate {
					...maxReservationSlotFragment
				}
			}
			curbsidePickup {
				maxReservationSlotsByDay {
					...maxReservationSlotsByDayFragment
				}
				maxReservationSlotsByDate {
					...maxReservationSlotFragment
				}
			}
			driveThruPickup {
				maxReservationSlotsByDay {
					...maxReservationSlotsByDayFragment
				}
				maxReservationSlotsByDate {
					...maxReservationSlotFragment
				}
			}
			delivery {
				maxReservationSlotsByDay {
					...maxReservationSlotsByDayFragment
				}
				maxReservationSlotsByDate {
					...maxReservationSlotFragment
				}
			}
		}
	}
			
`;

module.exports.getRetailerEnrollmentStatus = gql`
	query GetRetailerEnrollmentStatus($entityId: String!, $entityType: EntityTypes!) {
		getRetailerEnrollmentStatus(entityId: $entityId, entityType: $entityType) {
			enrollment {
				status
			}
		}
	}
`;

module.exports.updateOrderingSettings = gql`
	mutation updateOrderingSettings($input: OrderingSettingsUpdateInput!) {
		updateOrderingSettings(input: $input) {
			success
		}
	}
`;

module.exports.updateReservationSlots = gql`
	mutation updateReservationSlots($input: ReservationSlotsUpdateInput!) {
		updateReservationSlots(input: $input) {
			success
		}
	}
`;

module.exports.filteredDispensaries = gql`
	query GetSeoSettings($dispensaryId: String!) {
		filteredDispensaries(filter: {cNameOrID: $dispensaryId}) {
			seoSettings {
				enabled
			}
		}
	}
`;

module.exports.updateSeoSettings = gql`
	mutation UpdateSeoSettings($dispensaryId: String!, $input: UpdateSeoSettingsInput!) {
		updateSeoSettings(dispensaryId: $dispensaryId, input: $input) {
			success
			message
		}
	}
`;

module.exports.enterpriseSpecials = gql`
	query GetEnterpriseSpecials($enterpriseId: ID!) {
		enterpriseSpecials(enterpriseId: $enterpriseId) {
			active
			complete
			createdAt
			dispensaryId
			endDay
			endStamp
			enterpriseId
			enterpriseSpecialId
			id
			inactiveDispensaries
			isRecurring
			localTime
			name
			recurring {
				days
				endDate
				endTime
				setEndDate
				startTime
			}
			scope
			specialType
			startDay
			startStamp
			timezone
			updatedAt
			version
		}
	}
`;

module.exports.getEnterprise = gql`
	query GetEnterprise($enterpriseId: ID!) {
		getEnterprise(id: $enterpriseId) {
			id
			billingVersion
			retailers {
				id
				dispensaryId
			}
			uniqueName
		}
	}
`;

module.exports.getEnterpriseByName = gql`
	query GetEnterpriseByName($uniqueName: ID!) {
		getEnterpriseByName(uniqueName: $uniqueName) {
			id
			billingVersion
			retailers {
				id
				dispensaryId
				profile {
					location {
						city
						state
					}
				}
			}
			uniqueName
		}
	}
`;

module.exports.getRetailerByDispensaryId = gql`
	query GetRetailerByDispensaryId($dispensaryIds: [ID!]!) {
		getRetailerByDispensaryId(dispensaryIds: $dispensaryIds) {
			id
		}
	}
`;

module.exports.getRetailersByEnterpriseId = gql`
	query GetRetailersByEnterpriseId($enterpriseIds: [ID!]!) {
		getRetailersByEnterpriseId(enterpriseIds: $enterpriseIds) {
			dispensaryId
			name
			profile {
				location {
					city
					state
				}
				medicalDispensary
				recDispensary
			}
		}
	}
`;

module.exports.getEnterprise = gql`
	query CreateUpdateBillingGroup($id: ID!) {
		getEnterprise(id: $id) {
			id
			retailers {
				id
				name
				profile {
					location {
						city
						state
					}
				}
				status
				retailerGroups {
					id
					name
				}
			}
			retailerGroups {
				notificationEmails
				groupType
				id
				name
				retailers {
					id
				}
			}
		}
	}
`;

module.exports.createBillingGroup = gql`
	mutation CreateBillingGroup($billingGroup: CreateBillingGroupInput!) {
		createBillingGroup(billingGroup: $billingGroup) {
			success
			message
		}
	}
`;

module.exports.getRetailerGroup = gql`
	query RetailerBillingGroupOverview($id: ID!) {
		getRetailerGroup(id: $id) {
			name
			retailers {
				id
				name
			}
		}
	}
`;

module.exports.getEnterprise = gql`
	query BillingOverview($id: ID!) {
		getEnterprise(id: $id) {
			createdAt
			id
			name
			phone
			primaryContactId
			uniqueName
			updatedAt
			website
			retailers {
				accountTier
				createdAt
				dispensaryId
				id
				medLicense
				name
				phone
				profile {
					location {
						city
						state
					}
				}
				recLicense
				status
				updatedAt
				retailerGroups {
					id
					name
				}
			}
			retailerGroups {
				notificationEmails
				groupType
				id
				name
				retailers {
					id
				}
			}
		}
	}
`;

module.exports.getSubscriptionsV2 = gql`
	query RetailerBillingOverview($retailers: [RetailerInput]!) {
		getSubscriptionsV2(retailers: $retailers) {
			chargebeePlan {
				period
				periodUnit
			}
			chargebeeSubscription {
				...InvoicesTableInvoices
				currentTermEnd
				currentTermStart
				nextBillingAt
				planAmount
				planId
				status
				trialEnd
			}
			dispensaryBilling {
				...BillToTextPaymentSources
			}
			manualPayments
		}
	}
			
`;

module.exports.setupRetailerBilling = gql`
	mutation ActivateEnterpriseRetailerBilling($retailerIds: [ID!]!) {
		setupRetailerBilling(retailerIds: $retailerIds) {
			success
		}
	}
`;

module.exports.getSubscriptionsV2 = gql`
	query GetRetailerBillingSettings($retailers: [RetailerInput!]!) {
		getSubscriptionsV2(retailers: $retailers) {
			dispensaryBilling {
				chargebeeCustomer {
					id
					contacts {
						email
					}
				}
				paymentSources {
					card {
						brand
						last4
					}
					type
				}
			}
			chargebeePlan {
				period
				periodUnit
			}
			chargebeeSubscription {
				status
			}
			manualPayments
		}
	}
`;

module.exports.getRetailer = gql`
	query GetBillingRetailer($retailerId: ID!) {
		getRetailer(id: $retailerId) {
			id
			name
			dispensaryId
			status
			retailerGroups {
				groupType
			}
		}
	}
`;

module.exports.setupRetailerBankPaymentMethod = gql`
	mutation SetRetailerBankPayment($retailerIds: [ID!]!, $accountId: String!, $token: String!) {
		setupRetailerBankPaymentMethod(
			retailerIds: $retailerIds
			accountId: $accountId
			token: $token
		) {
			success
			message
		}
	}
`;

module.exports.updateBillingNotifications = gql`
	mutation SetRetailerBillingNotifications($retailerIds: [ID!]!, $notificationEmails: [String]!, $billingNotificationEnabled: Boolean!) {
		updateBillingNotifications(
			retailerIds: $retailerIds
			billingContactEmails: $notificationEmails
			billingNotificationEnabled: $billingNotificationEnabled
		) {
			success
			message
		}
	}
`;

module.exports.updateSubscriptionBillingPeriod = gql`
	mutation SetRetailerBillingPeriod($retailerIds: [ID!]!, $billingPeriod: BillingPeriod!) {
		updateSubscriptionBillingPeriod(
			retailerIds: $retailerIds
			billingPeriod: $billingPeriod
		) {
			success
			message
		}
	}
`;

module.exports.setupRetailerCreditPaymentMethod = gql`
	mutation SetRetailerCreditCardPayment($retailerIds: [ID!]!, $token: String!) {
		setupRetailerCreditPaymentMethod(retailerIds: $retailerIds, token: $token) {
			success
			message
		}
	}
`;

module.exports.filteredProducts = gql`
	query AdminPrintedMenuProducts($productsFilter: productsFilterInput!, $page: Int, $perPage: Int) {
		filteredProducts(filter: $productsFilter, page: $page, perPage: $perPage) {
			products {
				id
				_id
				DispensaryID
				enterpriseProductId
				Name
				Prices
				Options
				medicalOnly
				recOnly
				recPrices
				medicalPrices
				Image
				images {
					_id
					origin
					url
					active
				}
				stockImage
				special
				specialData {
					bogoSpecials {
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
							targetPrice
							subcategoryIds
							subcategoryNames
							weight
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
						source
						sourceId
						specialId
						specialRestrictions
						specialType
						stackingMode
						targetPrice
					}
					discount
					percentDiscount
				}
				recSpecialPrices
				medicalSpecialPrices
				featured {
					current
				}
				brandId
				brand {
					id
					name
					imageUrl
				}
				brandName
				brandLogo
				Status
				type
				strainType
				updatedAt
				createdAt
				CBD
				CBDContent {
					unit
					range
				}
				THC
				THCContent {
					unit
					range
				}
				weight
			}
	queryInfo {
				totalCount
			}
		}
	}
`;

module.exports.getExport = gql`
	query GetExport($id: String!) {
		getExport(id: $id) {
			url
		}
	}
`;

module.exports.meAdmin = gql`
	query MeAdmin {
		meAdmin {
			_id
			createdAt
			chainDispensaryIds
			enterpriseId
			emails {
				address
			}
			dispensary {
				chain
				customDomainSettings {
					domain
				}
				embeddedMenuUrl
				id
				name
				location {
					city
					state
					country
					zipcode
				}
				phone
				status
				tier
				timezone
			}
			profile {
				audioNotificationsOnNewArrivalsDisabled
				audioNotificationsOnNewOrdersDisabled
				browserNotification
				chainID
				desktopNotification
				dispensaryId
				emailNotifications
				firstName
				fullName
				lastName
				isWeeklyReportEnabled
				permissions {
					allLocations
					billing
					analytics
					customers
					dispensaryIds
					driver
					enterpriseAdmin
					enterpriseSpecials
					menu
					menuReview
					messaging
					superMenuReview
					orders
					promote
					settings
					users
					tasks
					techSupportFeatures
				}
				phone
				roleAtDispensary
				streamTokens {
					dispensaryId
					token
				}
				textNotifications
				type
				firstViewedTOS
				acceptedTOS
			}
			zendeskWidgetToken
			zendeskSingleSignOnToken
		}
	}
`;

module.exports.getOrders = gql`
	query GetOrders($input: getOrdersInput!) {
		getOrders(input: $input) {
			orders {
				createdAt
				customerId
				customerEmail
				customerName
				customerPhone
				firstName
				lastName
				delivery
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
				dispensaryId
				dispensaryName
				dispoTimezone
				deliveryOption
				duration
				effectiveStatus
				orderId
				orderType
				status
				reopened
				totalCost
				isAnonymous
				isKioskOrder
				isAfterHoursOrder
				_id
				fleetManagementTask {
					id
					adapter
				}
				pos {
					externalID
					failureAcks {
						terminal
						web
					}
					failureReason
					failureType
					humanReadableError
					name
				}
				reservation {
					startTimeISO
					endTimeISO
				}
			}
		}
	}
`;

module.exports.revertBrandMerge = gql`
	mutation RevertBrandMerge($id: String!) {
		revertBrandMerge(id: $id) {
			id
		}
	}
`;

module.exports.getBrandMergeHistories = gql`
	query BrandMergeHistoryIndex($filters: brandMergeHistoriesFilters, $page: brandMergeHistoriesPagination, $sort: brandMergeHistoriesSort) {
		getBrandMergeHistories(filters: $filters, page: $page, sort: $sort) {
			brandMergeHistories {
				id
				sourceBrand {
					id
					name
					dispensary {
						id
						name
					}
				}
				destinationBrand {
					id
					name
					dispensary {
						id
						name
					}
				}
				createdAt
				revertedAt
				user {
					email
				}
			}
	queryInfo {
				totalCount
			}
		}
	}
`;

module.exports.mergeBrands = gql`
	mutation MergeBrands($collisionIds: [String!]!) {
		mergeBrands(ids: $collisionIds) {
			success
		}
	}
`;

module.exports.activeDispensaries = gql`
	query GetActiveDispensaries($params: activeDispensariesInput) {
		activeDispensaries(params: $params) {
			dispensaries {
				_id
				profile {
					name
				}
			}
		}
	}
`;

module.exports.getBrandCollisions = gql`
	query GetBrandCollisions($filters: brandCollisionFilters, $sort: brandCollisionsSort, $pagination: pagination) {
		getBrandCollisions(filters: $filters, sort: $sort, pagination: $pagination) {
			brandCollisions {
				createdAt
				id
				isAllowed
				firstBrand {
					dispensary {
						id
						name
					}
					id
					name
					productsCount
				}
				secondBrand {
					dispensary {
						id
						name
					}
					id
					name
					productsCount
				}
			}
	queryInfo {
				totalCount
			}
		}
	}
`;

module.exports.filteredDispensaries = gql`
	query GetFilteredDispensaries($filter: dispensariesFilterInput) {
		filteredDispensaries(filter: $filter) {
			id
			name
		}
	}
`;

module.exports.mergeBrand = gql`
	mutation MergeBrand($id: String!, $destinationBrandId: String!) {
		mergeBrand(id: $id, destinationBrandId: $destinationBrandId) {
			id
		}
	}
`;

module.exports.updateBrandCollision = gql`
	mutation UpdateBrandCollision($id: String!, $input: brandCollisionInput!) {
		updateBrandCollision(id: $id, brandCollision: $input) {
			id
		}
	}
`;

module.exports.searchBrandsV2 = gql`
	query BrandMergeToolIndex($filters: searchBrandsFilters, $pagination: paginationInput, $search: String, $sort: searchBrandsSort) {
		searchBrandsV2(
			filters: $filters
			pagination: $pagination
			search: $search
			sort: $sort
		) {
			brands {
				id
				brandCollisions {
					createdAt
					id
					isAllowed
					firstBrand {
						dispensary {
							id
							name
						}
						id
						name
						productsCount
					}
					secondBrand {
						dispensary {
							id
							name
						}
						id
						name
						productsCount
					}
				}
			}
	queryInfo {
				totalCount
			}
		}
	}
`;

module.exports.verifyBucketProducts = gql`
	mutation VerifyBucketProducts($ids: [String!]!) {
		verifyBucketProducts(ids: $ids) {
			message
			success
		}
	}
`;

module.exports.searchBucketProducts = gql`
	query GetBulkBucketProductReview($pagination: paginationInput!, $filter: SearchBucketProductFilter, $sort: SearchBucketProductSort) {
		searchBucketProducts(pagination: $pagination, filter: $filter, sort: $sort) {
			bucketProducts {
				id
				reviewedAt
				reviewedByUser {
					_id
					fullName
					firstName
					lastName
				}
				product {
					CBDContent {
						unit
						range
					}
					Status
					DispensaryID
					id
					libraryProduct {
						brand {
							name
						}
						category
						cbdContent {
							unit
							range
						}
						name
						thcContent {
							unit
							range
						}
					}
					POSMetaData {
						canonicalName
						canonicalBrandName
						canonicalCategory
					}
					THCContent {
						unit
						range
					}
				}
				verified
				oldProductData {
					CBDContent {
						unit
						range
					}
					THCContent {
						unit
						range
					}
					Name
					brand {
						name
					}
					brandId
					brandName
					POSMetaData {
						canonicalName
						canonicalBrandName
						canonicalCategory
					}
					type
					subcategory
				}
			}
			meta {
				totalCount
				reviewers {
					_id
					fullName
					firstName
					lastName
				}
			}
		}
	}
`;

module.exports.checkInBucketV2 = gql`
	mutation CheckInBucketV2($uuid: String!) {
		checkInBucketV2(uuid: $uuid) {
			id
		}
	}
`;

module.exports.checkOutBucketV2 = gql`
	mutation CheckOutBucketV2($bucketId: String!, $uuid: String!) {
		checkOutBucketV2(bucketId: $bucketId, uuid: $uuid) {
			completedReviewsCount
			checkedOutAt
			checkedOutBy {
				_id
				firstName
				lastName
			}
			id
			name
			products {
				...adminContentBaseProductFragment
				brand {
					_id
					id
					name
				}
				matchedLibraryItems {
					_id
					name
					score
				}
				dispensary {
					id
					location {
						state
					}
					medicalDispensary
					medicalOnly
					name
					recDispensary
					storeSettings {
						isolatedMenus
					}
					timezone
				}
				libraryProduct {
					id
					name
				}
				speculativeEdits {
					...adminContentBaseProductFragment
				}
			}
			productsCount
			teamName
		}
	}
`;

module.exports.checkOutBucketV3 = gql`
	mutation CheckOutBucketV3($bucketId: String!, $uuid: String!) {
		checkOutBucketV3(bucketId: $bucketId, uuid: $uuid) {
			completedReviewsCount
			checkedOutAt
			checkedOutBy {
				_id
				firstName
				lastName
			}
			id
			name
			productIds
			productsCount
			teamName
		}
	}
`;

module.exports.closeBucket = gql`
	mutation CloseBucket($id: String!) {
		closeBucket(id: $id) {
			id
		}
	}
`;

module.exports.connectProductPreview = gql`
	mutation ConnectProductPreview($id: String!, $libraryProductId: String!) {
		connectProductPreview(id: $id, libraryProductId: $libraryProductId) {
			previewProduct {
				product {
					_id
					id
					additionalOptions
					brand {
						id
						imageUrl
						name
					}
					brandId
					brandLogo
					brandName
					cbdContent {
						range
						unit
					}
					cName
					description
					descriptionHtml
					dispensaryId
					dispensaryName
					duplicatedProductId
					effects
					image
					integrationKey
					isBelowKioskThreshold
					isBelowThreshold
					matchedLibraryItems {
						_id
					}
					matchedLibraryItemsConfidence
					medicalOnly
					medicalPrices
					name
					options
					overrides
					posMetaData {
						canonicalName
						canonicalCategory
						children {
							option
							quantity
							price
							quantityAvailable
						}
					}
					prices
					recOnly
					recPrices
					strainType
					status
					subcategory
					thcContent {
						range
						unit
					}
					type
					weight
				}
				productImages {
					_id
					url
					origin
					active
					label
					description
				}
				productBatch {
					id
				}
				terpenes {
					id
					terpeneId
					name
					unit
					active
				}
				appliedLibraryAttributes {
					additionalOptions
					brand {
						id
						imageUrl
						name
					}
					brandId
					brandLogo
					brandName
					cbdContent {
						range
						unit
					}
					cName
					description
					descriptionHtml
					dispensaryId
					dispensaryName
					duplicatedProductId
					effects
					image
					integrationKey
					isBelowKioskThreshold
					isBelowThreshold
					matchedLibraryItems {
						_id
					}
					matchedLibraryItemsConfidence
					medicalOnly
					medicalPrices
					modifiedAttributes
					name
					options
					posMetaData {
						children {
							canonicalName
							option
						}
					}
					prices
					recOnly
					recPrices
					strainType
					status
					subcategory
					thcContent {
						range
						unit
					}
					type
					weight
				}
			}
		}
	}
`;

module.exports.createBucketV2 = gql`
	mutation CreateBucketV2($bucket: createBucketInput!) {
		createBucketV2(bucket: $bucket) {
			id
		}
	}
`;

module.exports.createBucketV3 = gql`
	mutation CreateBucketV3($bucket: createBucketInputV3!) {
		createBucketV3(bucket: $bucket) {
			id
		}
	}
`;

module.exports.disconnectBucketProduct = gql`
	mutation DisconnectBucketProduct($bucketId: String!, $productId: String!) {
		disconnectBucketProduct(bucketId: $bucketId, productId: $productId) {
			message
			success
		}
	}
`;

module.exports.skipBucketProductV2 = gql`
	mutation SkipBucketProductV2($bucketId: String!, $productId: String!, $skipReasons: [SkipReasonEnum!]!) {
		skipBucketProductV2(
			bucketId: $bucketId
			productId: $productId
			skipReasons: $skipReasons
		) {
			message
			success
		}
	}
`;

module.exports.skipBucketProduct = gql`
	mutation SkipBucketProduct($bucketId: String!, $productId: String!) {
		skipBucketProduct(bucketId: $bucketId, productId: $productId) {
			message
			success
		}
	}
`;

module.exports.connectNewProductPreview = gql`
	query ConnectNewProductPreview($dispensaryId: String!, $libraryProductId: String!) {
		connectNewProductPreview(
			dispensaryId: $dispensaryId
			libraryProductId: $libraryProductId
		) {
			previewProduct {
				product {
					_id
					id
					additionalOptions
					brand {
						id
						imageUrl
						name
					}
					brandId
					brandLogo
					brandName
					cbdContent {
						range
						unit
					}
					cName
					description
					descriptionHtml
					dispensaryId
					dispensaryName
					duplicatedProductId
					effects
					image
					integrationKey
					isBelowKioskThreshold
					isBelowThreshold
					matchedLibraryItems {
						_id
					}
					matchedLibraryItemsConfidence
					medicalOnly
					medicalPrices
					name
					options
					overrides
					posMetaData {
						canonicalName
						canonicalCategory
						children {
							option
							quantity
							price
							quantityAvailable
						}
					}
					prices
					recOnly
					recPrices
					strainType
					status
					subcategory
					thcContent {
						range
						unit
					}
					type
					weight
				}
				productImages {
					_id
					url
					origin
					active
					label
					description
				}
				productBatch {
					id
				}
				terpenes {
					id
					terpeneId
					name
					unit
					active
				}
				appliedLibraryAttributes {
					additionalOptions
					brand {
						id
						imageUrl
						name
					}
					brandId
					brandLogo
					brandName
					cbdContent {
						range
						unit
					}
					cName
					description
					descriptionHtml
					dispensaryId
					dispensaryName
					duplicatedProductId
					effects
					image
					integrationKey
					isBelowKioskThreshold
					isBelowThreshold
					matchedLibraryItems {
						_id
					}
					matchedLibraryItemsConfidence
					medicalOnly
					medicalPrices
					modifiedAttributes
					name
					options
					posMetaData {
						children {
							canonicalName
							option
						}
					}
					prices
					recOnly
					recPrices
					strainType
					status
					subcategory
					thcContent {
						range
						unit
					}
					type
					weight
				}
			}
		}
	}
`;

module.exports.contentStatistics = gql`
	query ContentStatistics {
		contentStatistics {
			connectedPercentage
			menuScore
		}
	}
`;

module.exports.getBuckets = gql`
	query GetBuckets($sort: brandsSortInput) {
		getBuckets(sort: $sort) {
			...bucketListFragment
		}
	}
`;

module.exports.filteredProducts = gql`
	query GetProduct($productsFilter: productsFilterInput!) {
		filteredProducts(filter: $productsFilter) {
			products {
				...adminContentBaseProductFragment
				brand {
					_id
					id
					name
				}
				matchedLibraryItems {
					_id
					name
					score
				}
				dispensary {
					id
					location {
						state
					}
					medicalDispensary
					medicalOnly
					name
					recDispensary
					storeSettings {
						isolatedMenus
					}
					timezone
				}
				libraryProduct {
					id
					name
				}
				speculativeEdits {
					...adminContentBaseProductFragment
				}
			}
		}
	}
`;

module.exports.getBucket = gql`
	query RefreshBucket($id: String!) {
		getBucket(id: $id) {
			...bucketListFragment
		}
	}
`;

module.exports.copyLibraryProduct = gql`
	mutation CopyLibraryProduct($id: String!, $stateLibraryIds: [String!]!) {
		copyLibraryProduct(id: $id, stateLibraryIds: $stateLibraryIds) {
			libraryProducts {
				dispensaryId
			}
			meta {
				errors {
					type
					errors
					state_library_id
				}
			}
		}
	}
`;

module.exports.createBucketForLibraryItem = gql`
	mutation CreateBucketForLibraryItem($libraryItemId: ID!) {
		createBucketForLibraryItem(libraryItemId: $libraryItemId) {
			id
		}
	}
`;

module.exports.deleteLibraryProduct = gql`
	mutation DeleteLibraryProduct($id: String!) {
		deleteLibraryProduct(id: $id) {
			id
		}
	}
`;

module.exports.updateLibraryProduct = gql`
	mutation UpdateLibraryProduct($id: String!, $updates: UpdatedLibraryProduct!) {
		updateLibraryProduct(id: $id, updates: $updates) {
			libraryProduct {
				dispensaryId
			}
		}
	}
`;

module.exports.findLibraryProducts = gql`
	query FindLibraryProducts($id: String!) {
		findLibraryProducts(id: $id) {
			libraryProducts {
				dispensaryId
			}
		}
	}
`;

module.exports.getLibraryProduct = gql`
	query GetLibraryProduct($id: String!) {
		getLibraryProduct(id: $id) {
			id
			brand {
				id
				name
				isGlobal
				_id
			}
			category
			cbdContent {
				unit
				range
			}
			connectedCount
			description
			descriptionHtml
			dispensaryId
			effects
			gtin
			image
			images {
				_id
				url
				active
				origin
			}
			name
			options
			prices
			productTemplate
			sku
			strainType
			stockImage
			subcategory
			productBatchId
			cannabinoids {
				cannabinoidId
				cannabinoid {
					id
					description
					name
				}
				unit
				value
				active
			}
			terpenes {
				name
				id
				terpeneId
				unit
				value
				active
			}
			thcContent {
				unit
				range
			}
		}
	}
`;

module.exports.productChangeEvents = gql`
	query GetLibraryProductChangeEvents($productId: ID!) {
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

module.exports.getStateLibraries = gql`
	query StateLibrariesIndex {
		getStateLibraries {
			id
			name
			state
		}
	}
`;

module.exports.libraryProductChangeImpactV2 = gql`
	query LibraryProductChangeImpactV2($id: String!, $updates: UpdatedLibraryProduct!) {
		libraryProductChangeImpactV2(id: $id, updates: $updates) {
			totalCount {
				count
			}
		}
	}
`;

module.exports.libraryProductChangeImpactV3 = gql`
	mutation LibraryProductChangeImpactV3($id: String!, $updates: UpdatedLibraryProduct!) {
		libraryProductChangeImpactV3(id: $id, updates: $updates) {
			totalCount {
				count
			}
		}
	}
`;

module.exports.searchLibraryProducts = gql`
	query LibraryProductsIndex($filters: searchLibraryProductsFilters, $pagination: paginationInput, $search: String, $sort: searchLibraryProductsSort) {
		searchLibraryProducts(
			filters: $filters
			pagination: $pagination
			search: $search
			sort: $sort
		) {
			libraryProducts {
				brand {
					id
					isGlobal
					name
				}
				category
				connectedCount
				createdAt
				createdBy {
					firstName
					fullName
					lastName
				}
				description
				dispensaryId
				id
				menuScore
				name
				subcategory
				updatedAt
				updatedByBrand
			}
			meta {
				totalCount
			}
		}
	}
`;

module.exports.changeRequestApproveProduct = gql`
	mutation ApproveChangeRequest($id: String!) {
		changeRequestApproveProduct(id: $id) {
			id
		}
	}
`;

module.exports.changeRequestLockProduct = gql`
	mutation LockChangeRequest($id: String!) {
		changeRequestLockProduct(id: $id) {
			id
		}
	}
`;

module.exports.changeRequestRejectProduct = gql`
	mutation RejectContentChangeRequest($id: String!, $rejectionReasons: [RejectionReasons!]!, $feedback: String!) {
		changeRequestRejectProduct(
			id: $id
			rejectionReasons: $rejectionReasons
			feedback: $feedback
		) {
			id
		}
	}
`;

module.exports.changeRequestUnlockProduct = gql`
	mutation UnlockChangeRequest($id: String!) {
		changeRequestUnlockProduct(id: $id) {
			id
			approvalStatus
		}
	}
`;

module.exports.searchProductChangeRequests = gql`
	query SearchProductChangeRequests($filters: ContentChangeRequestFilters, $pagination: paginationInput, $sort: ContentChangeRequestSort) {
		searchProductChangeRequests(
			filters: $filters
			pagination: $pagination
			sort: $sort
		) {
			contentChangeRequests {
				id
				brand {
					id
					isGlobal
					name
				}
				createdAt
				createdBy {
					firstName
					fullName
					lastName
				}
				updatedAt
				approvedAt
				rejectedAt
				approvalStatus
				actionType
				authorId
				reviewerId
				brandId
				productId
				product {
					id
					connectedCount
				}
				complianceRegionId
				feedback
				dispensary {
					id
					location {
						state
					}
				}
				computedAttributes {
					actionType
					approvalStatus
					authorId
					brandId
					brandName
					category
					complianceRegionId
					connectedCount
					createdAt
					createdBy
					productId
					productName
					reviewerId
					score
					state
					subcategory
					updatedAt
				}
				contentAttributes {
					brandId
					menu_score
					category
					connectedCount
					description
					effects
					image
					medicalOnly
					name
					prices
					recOnly
					strainType
					subcategory
					cbdContent {
						unit
						range
					}
					thcContent {
						unit
						range
					}
				}
			}
			meta {
				totalCount
				filters {
					score {
						label
						value
					}
					approvalStatus {
						label
						value
					}
					state {
						label
						value
					}
					brand {
						label
						value
					}
				}
			}
		}
	}
`;

module.exports.changeRequestProduct = gql`
	query GetProductChangeRequest($id: String!) {
		changeRequestProduct(id: $id) {
			id
			updatedAt
			approvedAt
			contentAttributes {
				brand {
					id
					name
					isGlobal
				}
				category
				connectedCount
				description
				effects
				image
				name
				options
				prices
				strainType
				subcategory
				cbdContent {
					unit
					range
				}
				thcContent {
					unit
					range
				}
			}
		}
	}
`;

module.exports.productFilters = gql`
	query ProductFilters {
		productFilters {
			dispensaryDropdownOptions {
				key
				label
				state
				status
				value
			}
			chainDropdownOptions {
				key
				label
				value
			}
			statesDropdownOptions {
				key
				label
				value
			}
		}
	}
`;

module.exports.superProducts = gql`
	query SuperProducts($filter: superProductsInput!) {
		superProducts(filter: $filter) {
			products {
				_id
				id
				brand {
					id
					name
				}
				brandId
				brandName
				dispensary {
					id
					name
				}
				DispensaryID
				matchedLibraryItemsConfidence
				Name
				score
				strainType
				type
			}
	queryInfo {
				totalCount
			}
		}
	}
`;

module.exports.filteredCoupons = gql`
	query FilteredCouponsForSuperAdmin($filter: couponsFilterInput, $sort: couponsSortInput, $pagination: couponsPaginationInput) {
		filteredCoupons(filter: $filter, sort: $sort, pagination: $pagination) {
	queryInfo {
				totalCount
			}
			coupons {
				_id
				active
				addedDate
				code
				dispensary
				expDate
				fixedDiscountInCents
				numUses
				percentDiscount
				reimbursed
			}
		}
	}
`;

module.exports.getConsumerUser = gql`
	query GetUser($id: String!) {
		getConsumerUser(id: $id) {
			_id
			email
			profile {
				phone
				textNotifications
				emailNotifications
				emailOptIn
			}
			customers {
				_id
				emailSubscription
				dispensaryName
			}
		}
	}
`;

module.exports.dispensaryUpdateStatus = gql`
	mutation DispensaryUpdateStatus($input: dispensaryUpdateStatusInput!) {
		dispensaryUpdateStatus(input: $input) {
			success
		}
	}
`;

module.exports.createRetailerAgent = gql`
	mutation DispensaryInfoModalCreateRetailerAgent($userId: String!, $position: String!, $retailerId: String!) {
		createRetailerAgent(
			userId: $userId
			position: $position
			retailerId: $retailerId
		) {
			id
			userId
			userName
			retailerId
			position
			dispensaryId
		}
	}
`;

module.exports.destroyRetailerAgent = gql`
	mutation DispensaryInfoModalDestroyRetailerAgent($id: String!) {
		destroyRetailerAgent(id: $id) {
			success
			message
		}
	}
`;

module.exports.filteredDispensaries = gql`
	query DispensaryInfoModalFilteredDispensaries($dispensaryFilter: dispensariesFilterInput!) {
		filteredDispensaries(filter: $dispensaryFilter) {
			retailer {
				id
			}
			id
			name
			address
			firstActiveAt
			email
			notes
			phone
			deliveryInfo {
				withinBounds
				fee
				minimum
				feeVaries
				minimumVaries
			}
			feeTiers {
				fee
				feeType
				max
				min
				percentFee
			}
			deliveryMin
			hideFromCCT
			timezone
			terminals {
				lastSeenAt
			}
			effectiveHours {
				deliveryHours {
					...hourSetFragment
				}
				pickupHours {
					...hourSetFragment
				}
			}
			superAdmins {
				name
				role
				userId
			}
			orderTypesConfig {
				delivery {
					enabled
				}
			}
			paymentTypesAccepted {
				aeropay
				alt36
				canPay
				cash
				check
				creditCardAtDoor
				creditCardByPhone
				debit
				linx
				payOnlineChase
				payOnlineHypur
				payOnlineMerrco
				payOnlineMoneris
				paytender
			}
		}
	}
`;

module.exports.filteredUsers = gql`
	query DispensaryInfoModalFilteredUsers($usersFilter: usersFilterInput!) {
		filteredUsers(filter: $usersFilter) {
			_id
			fullName
			firstName
			lastName
			availableRetailerAgentPositions
		}
	}
`;

module.exports.retailerAgents = gql`
	query DispensaryInfoModalRetailerAgents($filter: retailerAgentFilterInput) {
		retailerAgents(filter: $filter) {
			id
			userId
			userName
			retailerId
			position
			dispensaryId
		}
	}
`;

module.exports.getOrders = gql`
	query SuperGetOrders($input: getOrdersInput!) {
		getOrders(input: $input) {
			orders {
				_id
				createdAt
				customerId
				customerName
				delivery
				deliveryInfo {
					address
					apartmentNum
					deliveryAddress
					deliveryOption
					lastSearchedAddress
					nonDeliveryAddress
				}
				dispensaryId
				dispensaryName
				dispoTimezone
				duration
				durationEstimates {
					delivery {
						highInMinutes
						lowInMinutes
					}
					pickup {
						highInMinutes
						lowInMinutes
					}
				}
				isAnonymous
				isAfterHoursOrder
				isKioskOrder
				orderId
				status
				totalCost
			}
		}
	}
`;

module.exports.updateChainDispensariesImage = gql`
	mutation UpdateChainDispensariesImage($dispensaryId: String!, $imageVariantKey: ImageVariantKeyEnum!) {
		updateChainDispensariesImage(
			dispensaryId: $dispensaryId
			image_variant_keys: [$imageVariantKey]
		) {
			success
			message
		}
	}
`;

module.exports.filteredUsers = gql`
	query SuperAdminsTable {
		filteredUsers(filter: {superadmin: true}) {
			_id
			email
			fullName
			firstName
			lastName
			permissions {
				menuReview
				superMenuReview
			}
		}
	}
`;

module.exports.importCustomerCSV = gql`
	mutation ImportCustomerCSV($dispensaryId: String!, $CSV: String!) {
		importCustomerCSV(dispensaryId: $dispensaryId, CSV: $CSV) {
			success
			message
		}
	}
`;

module.exports.importDeliveryZipCodes = gql`
	mutation ImportDeliveryZipCodes($dispensaryId: String!, $csv: String!) {
		importDeliveryZipCodes(dispensaryId: $dispensaryId, csv: $csv) {
			success
			message
		}
	}
`;

module.exports.deleteFirebaseServiceAccount = gql`
	mutation DeleteFirebaseServiceAccount($dispensaryId: String!) {
		deleteFirebaseServiceAccount(dispensaryId: $dispensaryId) {
			success
			message
		}
	}
`;

module.exports.getFirebaseServiceAccount = gql`
	query GetFirebaseServiceAccount($dispensaryId: String!) {
		getFirebaseServiceAccount(dispensary_id: $dispensaryId) {
			id
			clientEmail
			clientId
			dispensaryId
			privateKeyId
			privateKey
			projectId
			createdAt
			updatedAt
		}
	}
`;

module.exports.updateFirebaseServiceAccounts = gql`
	mutation UpdateFirebaseServiceAccounts($clientEmail: String!, $clientId: String!, $dispensaryId: String!, $privateKeyId: String!, $privateKey: String!, $projectId: String!) {
		updateFirebaseServiceAccounts(
			clientId: $clientId
			clientEmail: $clientEmail
			dispensaryId: $dispensaryId
			privateKey: $privateKey
			privateKeyId: $privateKeyId
			projectId: $projectId
		) {
			success
			message
		}
	}
`;

module.exports.updateCname = gql`
	mutation UpdateCname($dispensaryId: String!, $cname: String!) {
		updateCname(dispensaryId: $dispensaryId, cname: $cname) {
			success
			message
		}
	}
`;

module.exports.updateUserEmail = gql`
	mutation UpdateUserEmail($currentEmail: String!, $newEmail: String!) {
		updateUserEmail(currentEmail: $currentEmail, newEmail: $newEmail) {
			success
			message
		}
	}
`;

module.exports.updateUserPermissions = gql`
	mutation UpdateUserPermissions($email: String!, $permission: String!) {
		updateUserPermissions(email: $email, permission: $permission) {
			success
			message
		}
	}
`;

module.exports.updateUserRoleV2 = gql`
	mutation UpdateUserRoleV2($email: String!, $role: UserRoles!) {
		updateUserRoleV2(email: $email, role: $role) {
			success
			message
		}
	}
`;

module.exports.updateUserRole = gql`
	mutation UpdateUserRole($email: String!, $role: String!) {
		updateUserRole(email: $email, role: $role) {
			success
			message
		}
	}
`;

module.exports.brandFragmentForDropdown = gql`
	fragment brandFragmentForDropdown on Brand {
		_id
		id
		name
		imageUrl
	}
`;

module.exports.addSubscriptionToChain = gql`
	mutation AddSubscriptionToChain($dispensaryIds: [String]!, $chargebeeCustomerId: String!) {
		addSubscriptionToChain(dispensaryIds: $dispensaryIds, chargebeeCustomerId: $chargebeeCustomerId) {
			message
			success
		}
	}
`;

module.exports.removeSubscriptionFromChain = gql`
	mutation RemoveSubscriptionFromChain($ids: [String]!, $chargebeeCustomerId: String!) {
		removeSubscriptionFromChain(ids: $ids, chargebeeCustomerId: $chargebeeCustomerId) {
			message
			success
		}
	}
`;

module.exports.getBillingSubscriptions = gql`
	query GetChainBillingInfo($dispensaries: [String!]) {
		getBillingSubscriptions(dispensaries: $dispensaries) {
			dispensaryBilling {
				chain
				chargebeeCustomerId
			}
		}
	}
`;

module.exports.deliveryZonesFragment = gql`
	fragment deliveryZonesFragment on DeliveryOrderingSettings {
		deliveryZones {
			name
			area {
				type
				features {
					type
					geometry {
						type
						coordinates
					}
				}
			}
			feeInCents
			minimumInCents
			feeType
			percentFee
		}
	}
`;

module.exports.hourSetFragment = gql`
	fragment hourSetFragment on Dispensaries_profile_hours {
		Monday {
			active
			end
			start
		}
		Tuesday {
			active
			end
			start
		}
		Wednesday {
			active
			end
			start
		}
		Thursday {
			active
			end
			start
		}
		Friday {
			active
			end
			start
		}
		Saturday {
			active
			end
			start
		}
		Sunday {
			active
			end
			start
		}
	}
`;

module.exports.hoursForDay = gql`
	fragment hoursForDay on dayBounds {
		active
		end
		start
	}
`;

module.exports.paymentTypesFragment = gql`
	fragment paymentTypesFragment on PaymentTypesConfig {
		alt36
		check
		creditCardAtDoor
		payOnlineChase
		payOnlineHypur
		payOnlineMerrco
		payOnlineMoneris
		creditCardByPhone
		debit
		dutchiePay
		cash
		linx
		canPay
		paytender
		aeropay
	}
`;

module.exports.taxProperties = gql`
	fragment taxProperties on Dispensaries_TaxConfig_Tax {
		id
		type
		name
		rate
		potencyRate
		potency
		medical
		recreational
		taxBasis
		stages {
			op
			type
		}
		applyTo {
			types
			hemp
		}
		order
		deliveryPolicy
		includeStateSalesTaxInDestinationRate
	}
`;

module.exports.resetPasswordV2 = gql`
	mutation ResetPasswordV2($input: resetPasswordInput!) {
		resetPasswordV2(input: $input) {
			message
			success
		}
	}
`;

module.exports.sendPasswordResetEmailV2 = gql`
	mutation SendPasswordResetEmailV2($email: String!) {
		sendPasswordResetEmailV2(email: $email) {
			message
			success
		}
	}
`;

module.exports.setPasswordV2 = gql`
	mutation SetPasswordV2($input: setPasswordInput!) {
		setPasswordV2(input: $input) {
			message
			success
		}
	}
`;

module.exports.updatePasswordV2 = gql`
	mutation UpdatePasswordV2($oldPassword: String!, $newPassword: String!) {
		updatePasswordV2(oldPassword: $oldPassword, newPassword: $newPassword) {
			accessToken
		}
	}
`;

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

module.exports.adminIdentityFragment = gql`
	fragment adminIdentityFragment on LoginAdmin {
		accessToken
		user {
			_id
			createdAt
			emails {
				address
			}
			profile {
				browserNotification
				chainID
				desktopNotification
				dispensaryId
				emailNotifications
				emailOptIn
				firstName
				fullName
				lastName
				permissions {
					allLocations
					billing
					analytics
					customers
					driver
					enterpriseAdmin
					enterpriseSpecials
					menu
					menuReview
					superMenuReview
					orders
					promote
					settings
					users
					tasks
				}
				phone
				textNotifications
				type
			}
		}
	}
`;

module.exports.logout = gql`
	mutation Logout {
		logout {
			message
			success
		}
	}
`;

module.exports.updateUser = gql`
	mutation UpdateUser($input: usersUpdateInput!) {
		updateUser(user: $input) {
			audioNotificationsOnNewArrivalsDisabled
			audioNotificationsOnNewOrdersDisabled
			chainID
			createdAt
			createdBy
			dispensaryId
			email
			fullName
			isWeeklyReportEnabled
			permissions {
				allLocations
				analytics
				billing
				customers
				dispensaryIds
				driver
				menu
				menuReview
				orders
				promote
				settings
				superMenuReview
				users
			}
			phone
			roleAtDispensary
			textNotifications
			type
			unsubscribedDispensaries
		}
	}
`;

module.exports.createBrandV2 = gql`
	mutation CreateDispensaryBrand($name: String!, $dispensaryId: String!) {
		createBrandV2(brand: { name: $name, dispensaryId: $dispensaryId }) {
			id
			name
		}
	}
`;

module.exports.getMenuSections = gql`
	query GetMenuSectionsForEmbed($dispensaryId: String!) {
		getMenuSections(dispensaryId: $dispensaryId) {
			id
			label
			sectionType
		}
	}
`;

module.exports.createMenuSection = gql`
	mutation CreateMenuSection($menuSection: menuSectionCreateInput!) {
		createMenuSection(menuSection: $menuSection) {
			id
		}
	}
`;

module.exports.destroyMenuSection = gql`
	mutation DestroyMenuSection($id: String!, $dispensaryId: String) {
		destroyMenuSection(id: $id, dispensaryId: $dispensaryId) {
			message
			success
		}
	}
`;

module.exports.filteredProducts = gql`
	query GetMenuSectionProductsAdmin($filter: productsFilterInput!) {
		filteredProducts(filter: $filter) {
			products {
				Name
				brand {
					id
					name
				}
				_id
				id
				featured {
					current
				}
				type
				subcategory
				special
			}
		}
	}
`;

module.exports.getMenuSections = gql`
	query GetMenuSections($dispensaryId: String!) {
		getMenuSections(dispensaryId: $dispensaryId) {
			brandId
			category
			id
			label
			linkLabel
			position
			subcategory
			sectionType
			sectionName
			products
		}
	}
`;

module.exports.sortMenuSections = gql`
	mutation SortMenuSections($dispensaryId: String!, $ids: [String!]!) {
		sortMenuSections(dispensaryId: $dispensaryId, ids: $ids) {
			message
			success
		}
	}
`;

module.exports.updateMenuSection = gql`
	mutation UpdateMenuSection($id: ID!, $menuSection: menuSectionUpdateInput!) {
		updateMenuSection(id: $id, menuSection: $menuSection) {
			id
		}
	}
`;

module.exports.getExport = gql`
	query GetExport($id: String!) {
		getExport(id: $id) {
			url
		}
	}
`;

module.exports.meAdmin = gql`
	query MeAdmin {
		meAdmin {
			_id
			createdAt
			chainDispensaryIds
			enterpriseId
			emails {
				address
			}
			dispensary {
				chain
				customDomainSettings {
					domain
				}
				embeddedMenuUrl
				id
				name
				location {
					city
					state
					country
					zipcode
				}
				phone
				status
				tier
				timezone
			}
			profile {
				audioNotificationsOnNewArrivalsDisabled
				audioNotificationsOnNewOrdersDisabled
				browserNotification
				chainID
				desktopNotification
				dispensaryId
				emailNotifications
				firstName
				fullName
				lastName
				isWeeklyReportEnabled
				permissions {
					allLocations
					billing
					analytics
					customers
					dispensaryIds
					driver
					enterpriseAdmin
					enterpriseSpecials
					menu
					menuReview
					messaging
					superMenuReview
					orders
					promote
					settings
					users
					tasks
					techSupportFeatures
				}
				phone
				roleAtDispensary
				streamTokens {
					dispensaryId
					token
				}
				textNotifications
				type
				firstViewedTOS
				acceptedTOS
			}
			zendeskWidgetToken
			zendeskSingleSignOnToken
		}
	}
`;

module.exports.getOrders = gql`
	query GetOrders($input: getOrdersInput!) {
		getOrders(input: $input) {
			orders {
				createdAt
				customerId
				customerEmail
				customerName
				customerPhone
				firstName
				lastName
				delivery
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
				dispensaryId
				dispensaryName
				dispoTimezone
				deliveryOption
				duration
				effectiveStatus
				orderId
				orderType
				status
				reopened
				totalCost
				isAnonymous
				isKioskOrder
				isAfterHoursOrder
				_id
				fleetManagementTask {
					id
					adapter
				}
				pos {
					externalID
					failureAcks {
						terminal
						web
					}
					failureReason
					failureType
					humanReadableError
					name
				}
				reservation {
					startTimeISO
					endTimeISO
				}
			}
		}
	}
`;

module.exports.contentStatistics = gql`
	query ContentStatistics {
		contentStatistics {
			connectedPercentage
			menuScore
		}
	}
`;
*/
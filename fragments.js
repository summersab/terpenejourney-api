const gql = require('graphql-tag');

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

module.exports.specialHoursDayFragment = gql`
	${module.exports.hoursForDay}
	fragment specialHoursDayFragment on SpecialHoursDay {
		date
		hours {
			...hoursForDay
		}
	}
`;

module.exports.specialHoursFragment = gql`
	${module.exports.specialHoursDayFragment}
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

module.exports.weeklyHoursFragment = gql`
	${module.exports.hoursForDay}
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

module.exports.baseDispensaryFragment = gql`
	${module.exports.hourSetFragment}
	${module.exports.paymentTypesFragment}
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

module.exports.curbsidePickupOrderingSettingsFragment = gql`
	${module.exports.baseOrderingSettingsFragment}
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
	${module.exports.baseOrderingSettingsFragment}
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

module.exports.driveThruPickupOrderingSettingsFragment = gql`
	${module.exports.baseOrderingSettingsFragment}
	fragment driveThruPickupOrderingSettingsFragment on DriveThruPickupOrderingSettings {
		...baseOrderingSettingsFragment
		orderMinimum {
			enabled
			minimumInCents
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

module.exports.hoursSettingsForOrderTypeFragment = gql`
	${module.exports.weeklyHoursFragment}
	${module.exports.specialHoursFragment}
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

module.exports.kioskOrderingSettingsFragment = gql`
	${module.exports.paymentTypesFragment}
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

module.exports.maxReservationSlotsByDayFragment = gql`
	${module.exports.maxReservationSlotFragment}
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

module.exports.retailerFragment = gql`
	fragment retailerFragment on Retailer {
		address,
		description,
		id,
		menuTypes,
		name
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

module.exports.terpeneFragment = gql`
	fragment terpeneFragment on Terpene {
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

module.exports.activeTerpeneFragment = gql`
	${module.exports.terpeneFragment}
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
	`;

module.exports.activeCannabinoidFragment = gql`
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
	`;

module.exports.productFragment = gql`
	${module.exports.activeTerpeneFragment}
	${module.exports.activeCannabinoidFragment}
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
`;

module.exports.customerFragment = gql`
	fragment customerFragment on Customer {
		birthdate
		email
		guest
		id
		medicalCard {
			expirationDate
			number
			photo
			state
		}
		name
		optIns {
			marketing
			orderStatus
			specials
		}
		phone
	}
`;

module.exports.orderFragment = gql`
	${module.exports.customerFragment}
	${module.exports.productFragment}
	fragment orderFragment on Order {
		createdAt
		customer {
			...customerFragment
		}
		customerId
		delivery
		dispensaryName
		foreignId
		id
		items {
			option
			price
			product {
				...productFragment
			}
			productId
			quantity
			subtotal
		}
		medical
		metadata
		orderNumber
		paymentMethod
		pickup
		recreational
		reservationDate {
			startTime
			endTime
		}
		status
		subtotal
		tax
		total
	}
`;
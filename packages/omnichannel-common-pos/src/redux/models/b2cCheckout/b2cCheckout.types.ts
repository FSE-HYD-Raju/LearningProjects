import { PostalAddress, ProductOffering, BasketItem, PostalAddressValidationErrorsType, ContactMediaType, ErrorType } from "../../types";

export type ProductWrapper = {
	product: ProductOffering;
	configurations: object;
	parentBasketItem: BasketItem;
	basketId: string;
	hasCustomer: boolean;
	targetAgreementId?: string;
	hasTopUps?: boolean;
};

export type Identifications = {
	identificationId: string;
	identificationIssuingAuthority: string;
	identificationIssuingAuthorityCountry?: string;
	identificationIssuingDate?: Date;
	identificationExpiryDate?: Date;
	identificationType: string;
};

export type StoredCustomerType = {
	id?: string;
	email: string;
	phoneNumber: string;
	firstName: string;
	lastName: string;
	gender: string;
	birthDay: string | Date | undefined;
	mobileNumber: string;
	address: Partial<PostalAddress>;
	identifications: Identifications;
	fiscalCode?: string;
	updated?: boolean;
};

export type B2CCheckoutState = {
	isDeliveryToNewAddress: boolean;
	basketId: string;
	storedCustomer: StoredCustomerType;
	initiatedByLogin: boolean;
	contactFormIsValid: boolean;
	personalFormIsValid: boolean;
	fiscalCodeFormIsvalid: boolean;
	documentsFormIsValid: boolean;
	addressFormIsValid: boolean;
	address: Partial<PostalAddress>;
	deliveryAddressRole: ContactMediaType;
	validatingAddress: boolean;
	validatingIdentification: boolean;
	identificationValidationError?: ErrorType;
	storedDeliveryAddress: Partial<PostalAddress>;
	storedDeliveryProduct: ProductWrapper;
	addressValidationError: PostalAddressValidationErrorsType;
	validationsBySource: Record<string, boolean>;
	triggerFormValidation?: Date;
	showB2CDeliveryModal: boolean;
	B2CDefaultStore?: Record<string, any>;
	B2CDeliveryType?: Record<string, any>;
	B2CDeliveryMethodId?: string;
};

export const ID_ALREADY_EXIST = "user-id-is-already-exist";
export const ID_BELONGS_TO_DIFFERENT_USER = "user-id-belongs-to-different-user";
export const ID_DATA_MISSED = "identification-data-missed";

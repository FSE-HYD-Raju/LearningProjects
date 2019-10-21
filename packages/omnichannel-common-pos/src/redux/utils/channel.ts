"use strict";

const CHANNEL_NAMES = {
	B2C: "b2c",
	POS: "pos",
	CMS_ADMIN: "cms_admin",
	TELESALES: "telesales"
};
enum B2C_SUB_CHANNEL_ENUM {
	eCare,
	eShop
}
type B2C_SUB_CHANNEL = keyof typeof B2C_SUB_CHANNEL_ENUM;

const getCurrentChannelName = (): string | void => process && process.env && process.env.omnichannel;

const isChannelB2c = (): boolean => getCurrentChannelName() === CHANNEL_NAMES.B2C;
const isChannelPos = (): boolean => getCurrentChannelName() === CHANNEL_NAMES.POS;
const isChannelCmsAdmin = (): boolean => getCurrentChannelName() === CHANNEL_NAMES.CMS_ADMIN;
const isChannelTelesales = (): boolean => getCurrentChannelName() === CHANNEL_NAMES.TELESALES;

const getB2cSubChannelGuess = (): B2C_SUB_CHANNEL | undefined => {
	const pathname = (window.location && window.location.pathname) || "/";
	if (!isChannelB2c()) {
		return undefined;
	}
	return pathname.startsWith("/digilife") ? "eCare" : "eShop";
};

export {
	B2C_SUB_CHANNEL_ENUM,
	B2C_SUB_CHANNEL,
	getB2cSubChannelGuess,
	CHANNEL_NAMES,
	getCurrentChannelName,
	isChannelB2c,
	isChannelPos,
	isChannelCmsAdmin,
	isChannelTelesales
};

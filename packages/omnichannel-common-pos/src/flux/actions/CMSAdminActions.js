import BaseActions from "./BaseActions";
import _ from "lodash";

import ErrorCodes from "../../utils/ErrorCodes";
import { isChannelCmsAdmin } from "../../utils/Channel.utils";
import { ErrorContainer } from "../../redux/services";
import actions from "../../redux/actions";
import { CmsUtils as Utils } from "../../redux/models/cms/cms.utils";

const lockKeyForCmsInit = "initializingCms";
export default class CMSAdminActions extends BaseActions {
	initData() {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const cmsInitializing = sessionStorage.getItem(
					lockKeyForCmsInit
				);
				if (cmsInitializing) {
					return Promise.resolve(false);
				}
				sessionStorage.setItem(lockKeyForCmsInit, true);

				if (alt.reduxStore.getState().consul.skipCmsRequests) {
					dispatch();
					return false;
				}

				return alt.axios
					.all([
						alt.cmsApiCalls.get("/cms-admin/publishTargets", false, true),
						alt.cmsApiCalls.get(
							"/cms-admin/contentitems",
							false,
							true
						),
						alt.cmsApiCalls.get("/cms-admin/segments", false, true),
						alt.cmsApiCalls.get("/cms-admin/widgets", false, true),
						alt.cmsApiCalls.get("/cms-admin/contentspot/all", false, true)
					])
					.then(
						alt.axios.spread(
							(
								publishTargets,
								contentItemsAndTemplates,
								segments,
								widgets,
								contentSpots
							) => {
								const targets = {};
								_.forIn(publishTargets, function(value) {
									targets[value.name] = value;
								});
								const data = {
									publishTargets: targets,
									contentItemsAndTemplates,
									segments,
									widgets,
									contentSpots
								};
								dispatch(data);

								if (!isChannelCmsAdmin()) {
									const targetForChannel = Utils.getListItemById(
										publishTargets,
										"name",
										Utils.getCurrentPublishTargetKey()
									);
									this.selectTarget(targetForChannel);
									this.selectLanguage("eng");
								}
								sessionStorage.removeItem(lockKeyForCmsInit);
								return data;
							}
						)
					);
			});
	}

	getPublishTargets() {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const publishTargets = await alt.cmsApiCalls.get(
					"/cms-admin/publishTargets"
				);
				dispatch(publishTargets);
				return Promise.resolve(publishTargets);
			});
	}

	saveContentSpot(spot) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				await alt.cmsApiCalls.postREST(
					"/cms-admin/contentspot/save",
					_.omit(spot, "rules")
				);
				dispatch(spot);
				return Promise.resolve(spot);
			});
	}

	getContentForPreview(contentItemId = null, refreshCache = false) {
		if (!contentItemId) {
			return null;
		}
		const reqUrl =
			"/cms-admin/contentitem/preview" +
			Utils.constructQueryString({ contentItemId, refreshCache });
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const data = await alt.cmsApiCalls.get(reqUrl, false, false);
				return Promise.resolve(dispatch(data));
			});
	}

	selectTarget(target) {
		return target;
	}

	selectLanguage(language) {
		return language;
	}

	// --------------------------- MENUS -----------------------------
	getMenus(publishTarget) {
		const reqUrl = "/cms-admin/menus?publishTarget=" + publishTarget;
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const response = await alt.cmsApiCalls.get(reqUrl);
				return Promise.resolve(dispatch(response));
			});
	}

	saveMenu(menu, successMessage, errorMessage) {
		const reqUrl = "/cms-admin/menus/save";

		let stringifiedItems = null;
		if (menu.items && menu.items.length > 0) {
			stringifiedItems = JSON.stringify(menu.items);
		}

		const data = {
			items: stringifiedItems,
			name: menu.name,
			id: menu.id,
			publishTarget: menu.publishTarget
		};
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const response = await alt.cmsApiCalls.putREST(
					reqUrl,
					data,
					false
				);
				const isError = response instanceof ErrorContainer;
				if (successMessage && errorMessage) {
					if (isError) {
						alt.reduxStore.dispatch(actions.toaster.showError(errorMessage));
					} else {
						alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
					}
				}

				if (!isError) {
					// Parse the item array
					let parsedMenu = null;
					if (response.data) {
						parsedMenu = response.data;
						if (parsedMenu.items && parsedMenu.items.length > 0) {
							parsedMenu.items = JSON.parse(parsedMenu.items);
						} else {
							parsedMenu.items = [];
						}
					}
					if (parsedMenu) {
						return Promise.resolve(
							dispatch({
								savedMenu: parsedMenu
							})
						);
					}
					return Promise.resolve(false);
				}
				return Promise.resolve(false);
			});
	}

	deleteMenu(menuId, successMessage, errorMessage) {
		const reqUrl = "/cms-admin/menus/delete?menuId=" + menuId;
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const response = await alt.cmsApiCalls.delete(
					reqUrl,
					true,
					true
				);

				const isError = response instanceof ErrorContainer;
				if (!isError) {
					dispatch({ deletedMenuId: menuId });
				}

				if (successMessage && errorMessage) {
					if (isError) {
						alt.reduxStore.dispatch(actions.toaster.showError(errorMessage));
					} else {
						alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
					}
				}
				return Promise.resolve();
			});
	}

	deleteContentItem(contentItemId, useTheForce, successMessage, errorMessage) {
		const reqUrl = "/cms-admin/contentitem/delete?contentItemId=" + contentItemId;
		const headers = useTheForce ? { "X-FORCE-DELETE": true } : {};
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const response = await alt.cmsApiCalls.delete(reqUrl, false, true, headers);

				const isError = response instanceof ErrorContainer;

				if(isError && response.status === 422) {
					return Promise.resolve(dispatch({
						contentItemId,
						errors: response.errors
					}));
				} else if(isError) {
					alt.reduxStore.dispatch(actions.toaster.showError(errorMessage));

					return Promise.resolve(dispatch({}));
				} else {
					alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
					return Promise.resolve(dispatch({ deletedItemId: contentItemId }));
				}
			});
	}

	getPageRevisions(contentItemId) {
		const reqUrl =
			"/cms-admin/contentitem/revisions?contentItemId=" + contentItemId;

		return (dispatch, alt) =>
			alt.resolve(async () => {
				const data = await alt.cmsApiCalls.get(reqUrl, false, true);
				return Promise.resolve(dispatch(data));
			});
	}

	saveContentItem(
		name,
		content,
		id,
		modified = null,
		successMessage = "",
		isTemplate = false
	) {
		const reqUrl = "/cms-admin/contentitem/save";
		const data = { name, content, id, modified, isTemplate };
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const response = await alt.cmsApiCalls.postREST(
					reqUrl,
					data,
					true,
					true
				);
				dispatch({
					addedPage: response.data
				});
				alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
				return Promise.resolve();
			});
	}

	copyContentItemToLanguage(contentItemId, languages, successMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const data = {
					contentItemId,
					languages
				};
				const reqUrl = "/cms-admin/contentitem/copy";
				const response = await alt.cmsApiCalls.postREST(
					reqUrl,
					data,
					true,
					true
				);
				dispatch({
					addedContentItems: response.data
				});
				alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
				return Promise.resolve();
			});
	}

	getContentItemsAndTemplates() {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = "/cms-admin/contentitems?refreshCache=false";
				let data = await alt.cmsApiCalls.get(reqUrl);

				// If error response received, dispatch an empty array
				if (data instanceof ErrorContainer) {
					data = [];
				}

				return Promise.resolve(dispatch(data));
			});
	}

	toggleContentPageModal() {
		return true;
	}

	getContentPages(publishTarget, language) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = `/cms-admin/contentpages?publishTarget=${publishTarget}&language=${language}`;
				let data = await alt.cmsApiCalls.get(reqUrl);

				// If error response received, dispatch an empty array
				if (data instanceof ErrorContainer) {
					data = [];
				}

				return Promise.resolve(dispatch(data));
			}, true);
	}

	saveContentPage(data, successMessage, errorExistedMsg, errorInSaveMsg) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = "/cms-admin/contentpage";
				const response = await alt.cmsApiCalls.postREST(
					reqUrl,
					data,
					true,
					true
				);
				let success = true;
				if (successMessage) {
					if (response instanceof ErrorContainer) {
						// If already existed
						if (response.status === ErrorCodes.HTTP_CONFLICT_ERROR) {
							success = false;
							alt.reduxStore.dispatch(actions.toaster.showError(errorExistedMsg));
						} else {
							alt.reduxStore.dispatch(actions.toaster.showError(errorInSaveMsg));
						}
					} else {
						alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
					}
				}

				return Promise.resolve(
					dispatch({
						savedPage: response.data,
						success
					})
				);
			});
	}

	resetContentPageSaveSuccess() {
		return true;
	}

	deleteContentPage(contentPageId, useTheForce, successMessage, errorMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = `/cms-admin/contentpage?id=${contentPageId}`;
				const headers = useTheForce ? { "X-FORCE-DELETE": true } : {};
				const response = await alt.cmsApiCalls.delete(
					reqUrl,
					true,
					true,
					headers
				);

				const isError = response instanceof ErrorContainer;

				if(isError && response.status === 422) {
					return Promise.resolve(dispatch({
						contentPageId,
						errors: response.errors
					}));
				} else if(isError) {
					alt.reduxStore.dispatch(actions.toaster.showError(errorMessage));
					return Promise.resolve(dispatch({}));
				} else {
					alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
					return Promise.resolve(dispatch({ deletedPageId: contentPageId }));
				}
			});
	}

	//----------------------------SPOTS------------------------------
	getContentSpots() {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const data = await alt.cmsApiCalls.get(
					"/cms-admin/contentspot/all",
					false
				);
				return Promise.resolve(dispatch(data));
			});
	}

	getRulesForSpot(publishTarget, fragment, contentItemId) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				let reqUrl = `/cms-admin/rules?publishTarget=${publishTarget}&fragment=${fragment}`;
				if (contentItemId) {
					reqUrl += "&contentItemId=" + contentItemId;
				}
				const response = await alt.cmsApiCalls.get(reqUrl, false);

				const payload = {};
				payload.key = Utils.parseContentSpotKey(
					publishTarget,
					fragment
				);
				payload.data = response;
				return Promise.resolve(dispatch(payload));
			});
	}

	getAllContentSpotRules() {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const allContentSpotRules = await alt.cmsApiCalls.get(
					"/cms-admin/rules/all",
					false
				);
				dispatch(allContentSpotRules);
			});
	}

	getAllContentSpotsWithRules() {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				return alt.axios
					.all([
						alt.cmsApiCalls.get("/cms-admin/rules/all", false),
						alt.cmsApiCalls.get("/cms-admin/contentspot/all", false)
					])
					.then(
						alt.axios.spread(
							(allContentSpotRules, contentSpots) => {
								const data = {
									allContentSpotRules,
									contentSpots
								};
								return dispatch(data);
							}
						)
					);
			});
	}

	addRule(rule) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = "/cms-admin/rules/add";
				const response = await alt.cmsApiCalls.postREST(
					reqUrl,
					rule,
					false
				);
				const payload = {};
				payload.data = response.data;

				payload.key = Utils.parseContentSpotKey(
					rule.key.publishTarget,
					rule.key.fragment
				);
				alt.reduxStore.dispatch(actions.cms.getCurrentContent(
					rule.publishTarget,
					rule.fragment,
					alt.stores.CMSAdminStore.previewData
				));

				return Promise.resolve(dispatch(payload));
			});
	}

	saveRules(rules, publishTarget, fragment) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = "/cms-admin/rules";
				const response = await alt.cmsApiCalls.postREST(
					reqUrl,
					rules,
					false
				);
				const payload = {};
				payload.key = Utils.parseContentSpotKey(
					publishTarget,
					fragment
				);
				payload.data = response.data;
				alt.reduxStore.dispatch(actions.cms.getCurrentContent(
					publishTarget,
					fragment,
					alt.stores.CMSAdminStore.previewData
				));

				return Promise.resolve(dispatch(payload));
			});
	}

	deleteRule(id, key, successMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = `/cms-admin/rules/delete?ruleId=${id}`;
				await alt.cmsApiCalls.delete(reqUrl, true, true);
				dispatch({
					key,
					deletedRuleId: id
				});

				alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));

				const { publishTarget, fragment } = Utils.splitContentSpotKey(key);
				alt.reduxStore.dispatch(actions.cms.getCurrentContent(
					publishTarget,
					fragment,
					alt.stores.CMSAdminStore.previewData
				));
				return Promise.resolve();
			});
	}

	getSegments() {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				let data = await alt.cmsApiCalls.get("/cms-admin/segments", false);

				// If error response received, dispatch an empty array
				if (data instanceof ErrorContainer) {
					data = [];
				}

				if (data.criteriadata) {
					data.criteriadata = JSON.parse(data.criteriadata);
				} else {
					data.criteriadata = {};
				}

				return Promise.resolve(dispatch(data));
			});
	}

	getSegmentConfig() {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				let data = await alt.cmsApiCalls.get(
					"/cms-admin/segments/configs",
					false
				);

				// If error response received, dispatch an empty array
				if (data instanceof ErrorContainer) {
					data = [];
				}

				dispatch(data);
			});
	}

	saveSegment(segment, successMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				if (segment && segment.criteriadata) {
					segment.criteriadata = JSON.stringify(segment.criteriadata);
				}
				const payload = await alt.cmsApiCalls.postREST(
					"/cms-admin/segments/save",
					segment,
					false
				);
				dispatch({
					savedSegment: payload.data
				});

				alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
				return Promise.resolve();
			});
	}

	deleteSegment(id, useTheForce, successMessage, errorMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = `/cms-admin/segments/delete?segmentId=${id}`;
				const headers = useTheForce ? { "X-FORCE-DELETE": true } : {};
				const response = await alt.cmsApiCalls.delete(reqUrl, false, true, headers);

				const isError = response instanceof ErrorContainer;

				if(isError && response.status === 422) {
					return Promise.resolve(dispatch({
						segmentId: id,
						errors: response.errors
					}));
				} else if(isError) {
					alt.reduxStore.dispatch(actions.toaster.showError(errorMessage));
					return Promise.resolve(dispatch({}));
				} else {
					alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
					return Promise.resolve(dispatch({ deletedSegmentId: id }));
				}
			});
	}

	cloneSegment(segment, successMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const payload = await alt.cmsApiCalls.postREST(
					"/cms-admin/segments/clone",
					segment,
					false
				);
				dispatch({
					copySegment: payload.data
				});

				alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
				return Promise.resolve();
			});
	}

	getWidgets() {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				let data = await alt.cmsApiCalls.get("/cms-admin/widgets", false);

				// If error response received, dispatch an empty array
				if (data instanceof ErrorContainer) {
					data = [];
				}

				return Promise.resolve(dispatch(data));
			});
	}

	getWidgetById(id) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				let data = await alt.cmsApiCalls.get(`/cms/widgets/${id}`);
				if (data instanceof ErrorContainer) {
					data = false;
				}
				dispatch(data);
			});
	}

	getMenuById(id) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				let data = await alt.cmsApiCalls.get(`/cms/menus/${id}`);
				if (data instanceof ErrorContainer) {
					data = false;
				}
				dispatch(data);
			});
	}

	saveWidget(widget, successMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const payload = await alt.cmsApiCalls.postREST(
					"/cms-admin/widgets/save",
					_.omit(widget, "isValidJs"),
					false
				);
				dispatch({
					savedWidget: payload.data
				});

				alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
				return Promise.resolve();
			});
	}

	deleteWidget(id, successMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = `/cms-admin/widgets/delete?widgetId=${id}`;
				await alt.cmsApiCalls.delete(reqUrl, false, true);

				dispatch({
					deletedWidgetId: id
				});

				alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
				return Promise.resolve();
			});
	}

	toggleLiveEdit() {
		return true;
	}

	endLiveEditMode() {
		return true;
	}

	setPreviewData(data) {
		return data;
	}

	selectContentSpot(selectedContentSpot) {
		return selectedContentSpot;
	}

	togglePreviewContentInModal(isOpen) {
		return isOpen;
	}

	getAssets() {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				let data = await alt.cmsApiCalls.get("/cms-admin/assets", false);

				// If error response received, dispatch an empty array
				if (data instanceof ErrorContainer) {
					data = [];
				}

				return Promise.resolve(dispatch(data));
			});
	}

	saveAsset(asset, successMessage, failureMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const payload = await alt.cmsApiCalls.postREST(
					"/cms-admin/assets/save",
					asset,
					false
				);

				const isError = payload instanceof ErrorContainer;
				if (!isError) {
					dispatch({
						savedAsset: payload.data
					});
				}

				isError
					? alt.reduxStore.dispatch(actions.toaster.showError(failureMessage))
					: alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
				return Promise.resolve();
			});
	}

	deleteAsset(id, successMessage, failureMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = `/cms-admin/assets/delete?assetId=${id}`;
				const response = await alt.cmsApiCalls.delete(
					reqUrl,
					false,
					true
				);

				const isError = response instanceof ErrorContainer;
				if (!isError) {
					dispatch({
						deletedAssetId: id
					});
				}

				isError
					? alt.reduxStore.dispatch(actions.toaster.showError(failureMessage))
					: alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
				return Promise.resolve();
			});
	}

	closeAssetLibraryModal() {
		return false;
	}

	openAssetLibraryModal(
		selectAssetFunction = () => {},
		showSizeSelect = false
	) {
		return {
			selectAssetFunction,
			showSizeSelect
		};
	}

	saveStyles(styles, successMessage, errorMessage) {
		return (dispatch, alt) =>
			alt.resolve(async () => {
				const reqUrl = "/cms-admin/styles/save";
				const response = await alt.cmsApiCalls.postREST(reqUrl, styles);

				const isError = response instanceof ErrorContainer;

				if (isError) {
					alt.reduxStore.dispatch(actions.toaster.showError(errorMessage));
					return Promise.resolve(false);
				} else {
					alt.reduxStore.dispatch(actions.toaster.showSuccess(successMessage));
					return Promise.resolve(dispatch(response));
				}
			});
	}
}

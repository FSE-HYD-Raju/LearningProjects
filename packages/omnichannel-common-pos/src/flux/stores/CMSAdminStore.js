import get from "lodash/get";
import forEach from "lodash/forEach";
import isArray from "lodash/isArray";
import isNull from "lodash/isNull";
import BaseStore from "./BaseStore";
import R from "ramda";
import { CmsUtils as Utils } from "../../redux/models/cms/cms.utils";
import cloneDeep from "lodash/cloneDeep";

export default class CMSAdminStore extends BaseStore {
	constructor() {
		super();
		this.bindActions(this.alt.actions.CMSAdminActions);
		this.state = {
			roles: ["contentcreator", "leadcontentcreator", "contentmanager"],
			deviceTypes: {
				iphone: {
					width: 375,
					widthCSS: "375px",
					height: 667,
					heightCSS: "667px"
				},
				ipad: {
					width: 768,
					widthCSS: "768px",
					height: 1024,
					heightCSS: "1024px"
				},
				"android phone": {
					width: 412,
					widthCSS: "412px",
					height: 732,
					heightCSS: "732px"
				},
				"android tablet": {
					width: 800,
					widthCSS: "800px",
					height: 1280,
					heightCSS: "1280px"
				},
				"windows phone": {
					width: 360,
					widthCSS: "360px",
					height: 640,
					heightCSS: "640px"
				}
			},
			selectedLanguage: null,
			userId: null,
			contentSpots: [],
			publishTargets: null,
			selectedPublishTarget: null,
			contentItemsAndTemplates: [],
			contentPages: [],
			showContentPageModal: false,
			rules: {},
			allContentSpotRules: [],
			segments: [],
			segmentTypes: ["PREDEFINED", "DYNAMIC"],
			segmentConfig: null,
			spotModalOpen: false,
			liveEditEnabled: true,
			previewContentInModal: false,
			assets: [],
			siteMenus: [],
			cmsInitialized: false,
			widgets: []
		};

		this.exportPublicMethods({
			getContentSpotsForPublishTarget: this
				.getContentSpotsForPublishTarget,
			getContentItemsAndTemplatesForLanguage: this
				.getContentItemsAndTemplatesForLanguage,
			getContentItemsForLanguage: this.getContentItemsForLanguage,
			getTemplatesForLanguage: this.getTemplatesForLanguage,
			getSelectedLanguage: this.getSelectedLanguage,
			getPreviewContentInModal: this.getPreviewContentInModal,
			getSegments: this.getSegments,
			getSegmentConfig: this.getSegmentConfig,
			getAllContentSpotRules: this.getAllContentSpotRules,
			getAllContentSpotsWithRules: this.getAllContentSpotsWithRules
		});
	}

	initData = ({
		publishTargets,
		contentItemsAndTemplates,
		segments,
		segmentConfig,
		widgets,
		contentSpots
	}) => {
		this.setState({
			publishTargets,
			contentItemsAndTemplates,
			segments,
			segmentConfig,
			widgets,
			contentSpots,
			cmsInitialized: true
		});
	};

	getContentSpotsForPublishTarget = () => {
		const publishTargetKey = Utils.getCurrentPublishTargetKey(
			this.state.selectedPublishTarget
		);

		if (publishTargetKey) {
			const contentSpotsForPublishTarget = get(
				this,
				`state.contentSpots[${publishTargetKey}]`
			);

			return contentSpotsForPublishTarget
				? contentSpotsForPublishTarget
				: [];
		} else {
			return [];
		}
	};

	getContentItemsForLanguage = () => {
		const items = this.getContentItemsAndTemplatesForLanguage();
		if (!items) {
			return [];
		}
		return R.filter(item => !item.isTemplate, items);
	};

	getTemplatesForLanguage = () => {
		const items = this.getContentItemsAndTemplatesForLanguage();
		if (!items) {
			return [];
		}
		return R.filter(item => item.isTemplate, items);
	};

	getContentItemsAndTemplatesForLanguage = () => {
		if (!this.state.contentItemsAndTemplates) {
			return [];
		}
		const itemsAndTemplatesForLanguage = get(
			this,
			`state.contentItemsAndTemplates[${this.getSelectedLanguage()}]`
		);

		return itemsAndTemplatesForLanguage ? itemsAndTemplatesForLanguage : [];
	};

	getSelectedLanguage = () => {
		if (this.state.selectedLanguage) {
			return this.state.selectedLanguage;
		}

		const { ConsulStore, UserStore } = this.alt.stores;
		return (
			ConsulStore.locale ||
			(UserStore.user && UserStore.user.locale) ||
			"eng"
		);
	};

	getContentForPreview = content => {
		this.setState({
			previewContent: content
		});
	};

	updatePreview = response => {
		if (response.data) {
			let deviceType = this.state.deviceType;
			if (response.previewData.Device) {
				deviceType = this.state.deviceTypes[
					response.previewData.Device.value
				];
			}
			this.setState({
				deviceType,
				deviceChanged: !this.state.deviceChanged
			});
		}
	};

	getPreviewContentInModal = () => {
		return this.state.previewContentInModal;
	};

	togglePreviewContentInModal = isOpen => {
		this.setState({
			previewContentInModal: isOpen
		});
	};

	selectTarget = selectedPublishTarget => {
		this.setState({ selectedPublishTarget });
	};

	selectLanguage = selectedLanguage => {
		this.setState({ selectedLanguage });
	};

	// ------- MENUS -------
	getMenus = menus => {
		if (menus) {
			this.setState({
				siteMenus: menus
			});
		} else {
			this.setState({
				siteMenus: []
			});
		}
	};

	getMenuById = menu => {
		if (menu) {
			this.appendMenuItem(menu);
		}
	};

	saveMenu = data => {
		if (data.savedMenu) {
			this.appendMenuItem(data.savedMenu);
		}
	};

	deleteMenu = data => {
		const modifiedMenus = this.state.siteMenus.filter(
			item => item.id !== data.deletedMenuId
		);

		this.setState({
			siteMenus: modifiedMenus
		});
	};

	/**
	 * Pushes the provided menu item to the menu items list. If a menu with
	 * matching id if already on the list, that item gets replaced, otherwise
	 * the item is added on the list as a new item. Updates the component state.
	 */
	appendMenuItem = aMenuItem => {
		if (aMenuItem) {
			const menuItem = R.clone(aMenuItem);
			const existingMenus = this.state.siteMenus;
			const modifiedMenus = [];

			let found = false;
			forEach(existingMenus, menu => {
				if (menu.id === menuItem.id) {
					modifiedMenus.push(menuItem);
					found = true;
				} else {
					modifiedMenus.push(menu);
				}
			});

			if (!found) {
				modifiedMenus.push(menuItem);
			}

			this.setState({
				siteMenus: modifiedMenus
			});
		}
	};

	// ------- PAGES -------
	updatePagesStateAndClearRulesIfNeeded = (
		contentItemsAndTemplates,
		clearRules
	) => {
		const propertiesToUpdate = {
			contentItemsAndTemplates
		};

		if (clearRules) {
			propertiesToUpdate.rules = {};
		}
		this.setState(propertiesToUpdate);
	};

	getPageRevisions = response => {
		this.setState({
			revisions: response
		});
	};

	deleteContentItem = payload => {
		const { contentItemsAndTemplates } = this.state;
		const lang = this.alt.stores.CMSAdminStore.state.selectedLanguage;
		contentItemsAndTemplates[lang] = contentItemsAndTemplates[lang]
			.map(item => {
				const errors = payload.errors;
				const error = errors && errors[0] && errors[0].error === "linked-items-exist" ? errors[0] : {};
				if(item.id === payload.contentItemId) {
					return {
						...item,
						pages: error.pages,
						rules: error.rules,
						spots: error.spots
					};
				} else {
					return item;
				}
			})
			.filter(
				item => item.id !== payload.deletedItemId
			);
		const clearRules = true;
		this.updatePagesStateAndClearRulesIfNeeded(
			contentItemsAndTemplates,
			clearRules
		);
	};

	saveContentItem = ({ addedPage }) => {
		if (addedPage) {
			const { contentItemsAndTemplates } = this.state;
			let contentItemsAndTemplatesForLanguage =
				contentItemsAndTemplates[addedPage.language];

			contentItemsAndTemplatesForLanguage = contentItemsAndTemplatesForLanguage.filter(
				o => o.id !== addedPage.id
			);

			contentItemsAndTemplatesForLanguage.push(addedPage);
			contentItemsAndTemplates[
				addedPage.language
			] = contentItemsAndTemplatesForLanguage;
			this.updatePagesStateAndClearRulesIfNeeded(
				contentItemsAndTemplates
			);
		}
	};

	copyContentItemToLanguage = ({ addedContentItems }) => {
		const { contentItemsAndTemplates } = this.state;

		for (const contentItem of addedContentItems) {
			contentItemsAndTemplates[contentItem.language].push(contentItem);
		}

		this.updatePagesStateAndClearRulesIfNeeded(contentItemsAndTemplates);
	};

	getContentPages = contentPages => {
		this.setState({
			contentPages
		});
	};

	getContentItemsAndTemplates = contentItemsAndTemplates => {
		this.setState({
			contentItemsAndTemplates
		});
	};

	toggleContentPageModal = () => {
		this.setState({
			showContentPageModal: !this.state.showContentPageModal
		});
	};

	saveContentPage = ({ savedPage, success }) => {
		if (success && savedPage) {
			const oldContentPages = this.state.contentPages;
			const modifiedContentPages = [];
			let found = false;
			forEach(oldContentPages, (value, index) => {
				if (value.id === savedPage.id) {
					modifiedContentPages[index] = savedPage;
					found = true;
				} else {
					modifiedContentPages[index] = value;
				}
			});

			if (!found) {
				modifiedContentPages.push(savedPage);
			}

			this.setState({
				contentPages: modifiedContentPages,
				showContentPageModal: false,
				contentPageSaveSuccess: true
			});
		} else {
			this.setState({
				contentPageSaveSuccess: false
			});
		}
	};

	resetContentPageSaveSuccess = () => {
		this.setState({
			contentPageSaveSuccess: false
		});
	};

	deleteContentPage = payload => {
		const modifiedContentPages = this.state.contentPages.map(item => {
			// in case of failed delete due linked menus, put linked menus to store
			const errors = payload.errors;
			const menus = (errors && errors[0] && errors[0].error === "linked-items-exist") ?
							errors[0].menus : undefined;

			if(item.id === payload.contentPageId) {
				return {
					...item,
					menus
				};
			} else {
				return item;
			}
		}).filter(
			// in case of succesful delete, remove deleted page from store
			item => item.id !== payload.deletedPageId
		);

		this.setState({
			contentPages: modifiedContentPages
		});
	};

	// ------- SPOTS -------
	getContentSpots = response => {
		this.setState({
			contentSpots: response
		});
	};

	getAllContentSpotRules = response => {
		this.setState({
			allContentSpotRules: response
		});
	};

	getAllContentSpotsWithRules = ({ contentSpots, allContentSpotRules }) => {
		const publishTargetKey = Utils.getCurrentPublishTargetKey(
			this.state.selectedPublishTarget
		);

		const spots = contentSpots ? contentSpots[publishTargetKey] : [];

		if (spots && Array.isArray(spots)) {
			spots.forEach(function(spot) {
				const { publishTarget, fragment } = Utils.splitContentSpotKey(
					spot.key
				);

				const contentSpotRules = allContentSpotRules.filter(
					rule =>
						rule.publishTarget.toLowerCase() ===
							publishTarget.toLowerCase() &&
						rule.fragment.toLowerCase() ===
							fragment.toLowerCase() &&
						rule.state === "LIVE"
				);
				spot.rules = contentSpotRules;
			});
		}

		this.setState({
			contentSpots
		});
	};

	getRulesForSpot = response => {
		const rules = this.state.rules;
		rules[response.key] = response.data;
		this.setState({
			rules
		});
	};

	saveRules = response => {
		this.updateRulesState(response);
	};

	addRule = response => {
		this.updateRulesState(response);
	};

	updateRulesState = response => {
		const rules = this.state.rules;
		rules[response.key] = response.data;
		this.setState({
			rules
		});
	};

	deleteRule = payload => {
		const rules = this.state.rules;
		const modifiedRules = rules[payload.key].filter(
			item => item.id !== payload.deletedRuleId
		);
		rules[payload.key] = modifiedRules;

		this.setState({
			rules
		});
	};

	getWidgets = data => {
		this.setState({
			widgets: data
		});
	};

	getWidgetById = widget => {
		if (widget) {
			this.updateWidgetStateWithWidget(widget);
		}
	};

	saveWidget = ({ savedWidget }) => {
		this.updateWidgetStateWithWidget(savedWidget);
	};

	updateWidgetStateWithWidget = widget => {
		let { widgets } = this.state;
		widgets = widgets.filter(o => o.id !== widget.id);

		widgets.push(widget);

		this.setState({ widgets });
	};

	deleteWidget = ({ deletedWidgetId }) => {
		const widgets = this.state.widgets.filter(
			item => item.id !== deletedWidgetId
		);
		this.setState({
			widgets
		});
	};

	toggleLiveEdit = () => {
		this.setState({
			liveEditEnabled: !this.state.liveEditEnabled
		});
	};

	endLiveEditMode = () => {
		this.setState({
			liveEditEnabled: false
		});
	};

	setPreviewData = previewData => {
		this.setState({ previewData });
	};

	selectContentSpot(selectedContentSpot) {
		this.setState({
			selectedContentSpot: cloneDeep(selectedContentSpot)
		});
	}

	getAssets(data) {
		this.setState({
			assets: data
		});
	}

	deleteAsset = payload => {
		const filteredAssets = this.state.assets.filter(
			item => item.id !== payload.deletedAssetId
		);
		this.setState({
			assets: filteredAssets
		});
	};

	saveAsset = payload => {
		if (payload && payload.savedAsset) {
			if (
				isArray(this.state.assets) &&
				this.state.assets.length > 0 &&
				!isNull(payload.savedAsset)
			) {
				const assets = this.state.assets.map(asset => {
					if (asset.id === payload.savedAsset.id) {
						return payload.savedAsset;
					} else {
						return asset;
					}
				});
				this.setState({
					assets
				});
			}
		}
	};

	getSegments = data => {
		this.setState({
			segments: data
		});
	};

	getSegmentConfig = data => {
		this.setState({
			segmentConfig: {
				json: data.platform_browser_metaData,
			}
		});
	};

	saveSegment = ({ savedSegment }) => {
		let { segments } = this.state;
		segments = segments.filter(o => o.id !== savedSegment.id);

		segments.push(savedSegment);

		this.setState({ segments });
	};

	deleteSegment = (payload) => {

		const segments = this.state.segments
			.map(segment => {
				const errors = payload.errors;
				const rules = (errors && errors[0] && errors[0].error === "linked-items-exist") ?
					errors[0].rules : undefined;
				if(segment.id === payload.segmentId) {
					return {
						...segment,
						rules
					};
				} else {
					return segment;
				}
			})
			.filter(
				item => item.id !== payload.deletedSegmentId
			);
		this.setState({
			segments
		});
	};

	cloneSegment = ({ clonedSegment }) => {
		let { segments } = this.state;
		segments = segments.filter(o => o.id !== clonedSegment.id);

		segments.push(clonedSegment);

		this.setState({ segments });
	};

	closeAssetLibraryModal = () => {
		this.setState({
			selectAssetFunction: null,
			showSizeSelect: false
		});
	};

	openAssetLibraryModal = ({ selectAssetFunction, showSizeSelect }) => {
		this.setState({
			selectAssetFunction,
			showSizeSelect
		});
	};

	getPublishTargets(publishTargets) {
		this.setState({ publishTargets });
	}

	saveContentSpot = (savedContentSpot) => {
		const { contentSpots } = this.state;
		const { selectedPublishTarget } = this.state;
		if(contentSpots) {
			let contentSpotsForCurrentTarget = contentSpots[selectedPublishTarget];
			if(contentSpotsForCurrentTarget) {
				contentSpotsForCurrentTarget = contentSpotsForCurrentTarget.filter(o => o.id !== savedContentSpot.id);

				contentSpotsForCurrentTarget.push(savedContentSpot);
				contentSpots[selectedPublishTarget] = contentSpotsForCurrentTarget;
			}
			this.setState({ contentSpots });
		}
	}
}

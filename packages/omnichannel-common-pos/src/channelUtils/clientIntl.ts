import { addLocaleData } from "react-intl";
import flatpickr from "flatpickr";
import * as moment from "moment";
const isClient = require("../utils/isClient");

export default function clientIntl(locale: string) {
	switch (locale) {
		case "af":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/af.js");
			}
			addLocaleData(require("react-intl/locale-data/af.js"));
			require("moment/locale/af.js");
			break;
		case "bez":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/bez.js");
			}
			addLocaleData(require("react-intl/locale-data/bez.js"));
			break;
		case "chr":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/chr.js");
			}
			addLocaleData(require("react-intl/locale-data/chr.js"));
			break;
		case "dyo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/dyo.js");
			}
			addLocaleData(require("react-intl/locale-data/dyo.js"));
			break;
		case "ff":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ff.js");
			}
			addLocaleData(require("react-intl/locale-data/ff.js"));
			break;
		case "ig":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ig.js");
			}
			addLocaleData(require("react-intl/locale-data/ig.js"));
			break;
		case "jmc":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/jmc.js");
			}
			addLocaleData(require("react-intl/locale-data/jmc.js"));
			break;
		case "kk":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kk.js");
			}
			addLocaleData(require("react-intl/locale-data/kk.js"));
			require("moment/locale/kk.js");
			break;
		case "luo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/luo.js");
			}
			addLocaleData(require("react-intl/locale-data/luo.js"));
			break;
		case "nl":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/nl.js");
			}
			addLocaleData(require("react-intl/locale-data/nl.js"));
			require("moment/locale/nl.js");
			break;
		case "or":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/or.js");
			}
			addLocaleData(require("react-intl/locale-data/or.js"));
			break;
		case "rof":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/rof.js");
			}
			addLocaleData(require("react-intl/locale-data/rof.js"));
			break;
		case "sq":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/sq.js");
			}
			addLocaleData(require("react-intl/locale-data/sq.js"));
			require("moment/locale/sq.js");
			break;
		case "ti":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ti.js");
			}
			addLocaleData(require("react-intl/locale-data/ti.js"));
			break;
		case "ur":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ur.js");
			}
			addLocaleData(require("react-intl/locale-data/ur.js"));
			require("moment/locale/ur.js");
			break;
		case "yav":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/yav.js");
			}
			addLocaleData(require("react-intl/locale-data/yav.js"));
			break;
		case "agq":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/agq.js");
			}
			addLocaleData(require("react-intl/locale-data/agq.js"));
			break;
		case "bg":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/bg.js");
			}
			addLocaleData(require("react-intl/locale-data/bg.js"));
			require("moment/locale/bg.js");
			break;
		case "ckb":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ckb.js");
			}
			addLocaleData(require("react-intl/locale-data/ckb.js"));
			break;
		case "dz":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/dz.js");
			}
			addLocaleData(require("react-intl/locale-data/dz.js"));
			break;
		case "fi":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/fi.js");
			}
			addLocaleData(require("react-intl/locale-data/fi.js"));
			require("moment/locale/fi.js");
			break;
		case "guz":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/guz.js");
			}
			addLocaleData(require("react-intl/locale-data/guz.js"));
			break;
		case "ii":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ii.js");
			}
			addLocaleData(require("react-intl/locale-data/ii.js"));
			break;
		case "kkj":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kkj.js");
			}
			addLocaleData(require("react-intl/locale-data/kkj.js"));
			break;
		case "kw":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kw.js");
			}
			addLocaleData(require("react-intl/locale-data/kw.js"));
			break;
		case "luy":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/luy.js");
			}
			addLocaleData(require("react-intl/locale-data/luy.js"));
			break;
		case "mr":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mr.js");
			}
			addLocaleData(require("react-intl/locale-data/mr.js"));
			require("moment/locale/mr.js");
			break;
		case "nmg":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/nmg.js");
			}
			addLocaleData(require("react-intl/locale-data/nmg.js"));
			break;
		case "os":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/os.js");
			}
			addLocaleData(require("react-intl/locale-data/os.js"));
			break;
		case "ru":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ru.js");
			}
			addLocaleData(require("react-intl/locale-data/ru.js"));
			require("moment/locale/ru.js");
			break;
		case "shi":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/shi.js");
			}
			addLocaleData(require("react-intl/locale-data/shi.js"));
			break;
		case "sr":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/sr.js");
			}
			addLocaleData(require("react-intl/locale-data/sr.js"));
			break;
		case "uz":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/uz.js");
			}
			addLocaleData(require("react-intl/locale-data/uz.js"));
			require("moment/locale/uz.js");
			break;
		case "yi":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/yi.js");
			}
			addLocaleData(require("react-intl/locale-data/yi.js"));
			break;
		case "ak":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ak.js");
			}
			addLocaleData(require("react-intl/locale-data/ak.js"));
			break;
		case "cs":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/cs.js");
			}
			addLocaleData(require("react-intl/locale-data/cs.js"));
			require("moment/locale/cs.js");
			break;
		case "ebu":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ebu.js");
			}
			addLocaleData(require("react-intl/locale-data/ebu.js"));
			break;
		case "fil":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/fil.js");
			}
			addLocaleData(require("react-intl/locale-data/fil.js"));
			break;
		case "gv":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/gv.js");
			}
			addLocaleData(require("react-intl/locale-data/gv.js"));
			break;
		case "kl":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kl.js");
			}
			addLocaleData(require("react-intl/locale-data/kl.js"));
			break;
		case "ky":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ky.js");
			}
			addLocaleData(require("react-intl/locale-data/ky.js"));
			require("moment/locale/ky.js");
			break;
		case "lv":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/lv.js");
			}
			addLocaleData(require("react-intl/locale-data/lv.js"));
			require("moment/locale/lv.js");
			break;
		case "ms":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ms.js");
			}
			addLocaleData(require("react-intl/locale-data/ms.js"));
			require("moment/locale/ms.js");
			break;
		case "nn":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/nn.js");
			}
			addLocaleData(require("react-intl/locale-data/nn.js"));
			require("moment/locale/nn.js");
			break;
		case "pa":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/pa.js");
			}
			addLocaleData(require("react-intl/locale-data/pa.js"));
			break;
		case "rw":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/rw.js");
			}
			addLocaleData(require("react-intl/locale-data/rw.js"));
			break;
		case "si":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/si.js");
			}
			addLocaleData(require("react-intl/locale-data/si.js"));
			require("moment/locale/si.js");
			break;
		case "tk":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/tk.js");
			}
			addLocaleData(require("react-intl/locale-data/tk.js"));
			break;
		case "vai":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/vai.js");
			}
			addLocaleData(require("react-intl/locale-data/vai.js"));
			break;
		case "yo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/yo.js");
			}
			addLocaleData(require("react-intl/locale-data/yo.js"));
			require("moment/locale/yo.js");
			break;
		case "am":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/am.js");
			}
			addLocaleData(require("react-intl/locale-data/am.js"));
			break;
		case "bm":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/bm.js");
			}
			addLocaleData(require("react-intl/locale-data/bm.js"));
			require("moment/locale/bm.js");
			break;
		case "cu":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/cu.js");
			}
			addLocaleData(require("react-intl/locale-data/cu.js"));
			break;
		case "ee":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ee.js");
			}
			addLocaleData(require("react-intl/locale-data/ee.js"));
			break;
		case "fo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/fo.js");
			}
			addLocaleData(require("react-intl/locale-data/fo.js"));
			require("moment/locale/fo.js");
			break;
		case "ha":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ha.js");
			}
			addLocaleData(require("react-intl/locale-data/ha.js"));
			break;
		case "ka":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ka.js");
			}
			addLocaleData(require("react-intl/locale-data/ka.js"));
			require("moment/locale/ka.js");
			break;
		case "kln":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kln.js");
			}
			addLocaleData(require("react-intl/locale-data/kln.js"));
			break;
		case "lag":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/lag.js");
			}
			addLocaleData(require("react-intl/locale-data/lag.js"));
			break;
		case "mas":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mas.js");
			}
			addLocaleData(require("react-intl/locale-data/mas.js"));
			break;
		case "mt":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mt.js");
			}
			addLocaleData(require("react-intl/locale-data/mt.js"));
			require("moment/locale/mt.js");
			break;
		case "nnh":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/nnh.js");
			}
			addLocaleData(require("react-intl/locale-data/nnh.js"));
			break;
		case "rwk":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/rwk.js");
			}
			addLocaleData(require("react-intl/locale-data/rwk.js"));
			break;
		case "sk":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/sk.js");
			}
			addLocaleData(require("react-intl/locale-data/sk.js"));
			require("moment/locale/sk.js");
			break;
		case "zgh":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/zgh.js");
			}
			addLocaleData(require("react-intl/locale-data/zgh.js"));
			break;
		case "ar":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ar.js");
			}
			addLocaleData(require("react-intl/locale-data/ar.js"));
			require("moment/locale/ar.js");
			break;
		case "bn":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/bn.js");
			}
			addLocaleData(require("react-intl/locale-data/bn.js"));
			require("moment/locale/bn.js");
			break;
		case "cy":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/cy.js");
			}
			addLocaleData(require("react-intl/locale-data/cy.js"));
			require("moment/locale/cy.js");
			break;
		case "el":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/el.js");
			}
			addLocaleData(require("react-intl/locale-data/el.js"));
			require("moment/locale/el.js");
			break;
		case "fr":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/fr.js");
			}
			addLocaleData(require("react-intl/locale-data/fr.js"));
			require("moment/locale/fr.js");
			break;
		case "haw":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/haw.js");
			}
			addLocaleData(require("react-intl/locale-data/haw.js"));
			break;
		case "is":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/is.js");
			}
			addLocaleData(require("react-intl/locale-data/is.js"));
			require("moment/locale/is.js");
			break;
		case "kab":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kab.js");
			}
			addLocaleData(require("react-intl/locale-data/kab.js"));
			break;
		case "km":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/km.js");
			}
			addLocaleData(require("react-intl/locale-data/km.js"));
			require("moment/locale/km.js");
			break;
		case "lb":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/lb.js");
			}
			addLocaleData(require("react-intl/locale-data/lb.js"));
			require("moment/locale/lb.js");
			break;
		case "mer":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mer.js");
			}
			addLocaleData(require("react-intl/locale-data/mer.js"));
			break;
		case "mua":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mua.js");
			}
			addLocaleData(require("react-intl/locale-data/mua.js"));
			break;
		case "pl":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/pl.js");
			}
			addLocaleData(require("react-intl/locale-data/pl.js"));
			require("moment/locale/pl.js");
			break;
		case "sah":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/sah.js");
			}
			addLocaleData(require("react-intl/locale-data/sah.js"));
			break;
		case "sl":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/sl.js");
			}
			addLocaleData(require("react-intl/locale-data/sl.js"));
			require("moment/locale/sl.js");
			break;
		case "vi":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/vi.js");
			}
			addLocaleData(require("react-intl/locale-data/vi.js"));
			require("moment/locale/vi.js");
			break;
		case "zh":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/zh.js");
			}
			addLocaleData(require("react-intl/locale-data/zh.js"));
			break;
		case "as":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/as.js");
			}
			addLocaleData(require("react-intl/locale-data/as.js"));
			break;
		case "bo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/bo.js");
			}
			addLocaleData(require("react-intl/locale-data/bo.js"));
			require("moment/locale/bo.js");
			break;
		case "da":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/da.js");
			}
			addLocaleData(require("react-intl/locale-data/da.js"));
			require("moment/locale/da.js");
			break;
		case "en":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/en.js");
			}
			addLocaleData(require("react-intl/locale-data/en.js"));
			const { english } = require("flatpickr/dist/l10n/default.js");
			flatpickr.localize(english);
			break;
		case "fur":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/fur.js");
			}
			addLocaleData(require("react-intl/locale-data/fur.js"));
			break;
		case "he":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/he.js");
			}
			addLocaleData(require("react-intl/locale-data/he.js"));
			require("moment/locale/he.js");
			break;
		case "it":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/it.js");
			}
			addLocaleData(require("react-intl/locale-data/it.js"));
			require("moment/locale/it.js");
			const { Italian } = require("flatpickr/dist/l10n/it.js");
			flatpickr.localize(Italian);
			break;
		case "kn":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kn.js");
			}
			addLocaleData(require("react-intl/locale-data/kn.js"));
			require("moment/locale/kn.js");
			break;
		case "lg":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/lg.js");
			}
			addLocaleData(require("react-intl/locale-data/lg.js"));
			break;
		case "mfe":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mfe.js");
			}
			addLocaleData(require("react-intl/locale-data/mfe.js"));
			break;
		case "my":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/my.js");
			}
			addLocaleData(require("react-intl/locale-data/my.js"));
			require("moment/locale/my.js");
			break;
		case "prg":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/prg.js");
			}
			addLocaleData(require("react-intl/locale-data/prg.js"));
			break;
		case "saq":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/saq.js");
			}
			addLocaleData(require("react-intl/locale-data/saq.js"));
			break;
		case "sv":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/sv.js");
			}
			addLocaleData(require("react-intl/locale-data/sv.js"));
			require("moment/locale/sv.js");
			break;
		case "to":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/to.js");
			}
			addLocaleData(require("react-intl/locale-data/to.js"));
			break;
		case "vo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/vo.js");
			}
			addLocaleData(require("react-intl/locale-data/vo.js"));
			break;
		case "zu":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/zu.js");
			}
			addLocaleData(require("react-intl/locale-data/zu.js"));
			break;
		case "asa":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/asa.js");
			}
			addLocaleData(require("react-intl/locale-data/asa.js"));
			break;
		case "br":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/br.js");
			}
			addLocaleData(require("react-intl/locale-data/br.js"));
			require("moment/locale/br.js");
			break;
		case "dav":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/dav.js");
			}
			addLocaleData(require("react-intl/locale-data/dav.js"));
			break;
		case "eo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/eo.js");
			}
			addLocaleData(require("react-intl/locale-data/eo.js"));
			require("moment/locale/eo.js");
			break;
		case "fy":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/fy.js");
			}
			addLocaleData(require("react-intl/locale-data/fy.js"));
			require("moment/locale/fy.js");
			break;
		case "hi":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/hi.js");
			}
			addLocaleData(require("react-intl/locale-data/hi.js"));
			require("moment/locale/hi.js");
			break;
		case "kam":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kam.js");
			}
			addLocaleData(require("react-intl/locale-data/kam.js"));
			break;
		case "ko":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ko.js");
			}
			addLocaleData(require("react-intl/locale-data/ko.js"));
			require("moment/locale/ko.js");
			break;
		case "lkt":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/lkt.js");
			}
			addLocaleData(require("react-intl/locale-data/lkt.js"));
			break;
		case "mg":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mg.js");
			}
			addLocaleData(require("react-intl/locale-data/mg.js"));
			break;
		case "mzn":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mzn.js");
			}
			addLocaleData(require("react-intl/locale-data/mzn.js"));
			break;
		case "ps":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ps.js");
			}
			addLocaleData(require("react-intl/locale-data/ps.js"));
			break;
		case "sbp":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/sbp.js");
			}
			addLocaleData(require("react-intl/locale-data/sbp.js"));
			break;
		case "sw":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/sw.js");
			}
			addLocaleData(require("react-intl/locale-data/sw.js"));
			require("moment/locale/sw.js");
			break;
		case "tr":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/tr.js");
			}
			addLocaleData(require("react-intl/locale-data/tr.js"));
			require("moment/locale/tr.js");
			break;
		case "vun":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/vun.js");
			}
			addLocaleData(require("react-intl/locale-data/vun.js"));
			break;
		case "ast":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ast.js");
			}
			addLocaleData(require("react-intl/locale-data/ast.js"));
			break;
		case "brx":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/brx.js");
			}
			addLocaleData(require("react-intl/locale-data/brx.js"));
			break;
		case "de":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/de.js");
			}
			addLocaleData(require("react-intl/locale-data/de.js"));
			require("moment/locale/de.js");
			break;
		case "es":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/es.js");
			}
			addLocaleData(require("react-intl/locale-data/es.js"));
			require("moment/locale/es.js");
			break;
		case "ga":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ga.js");
			}
			addLocaleData(require("react-intl/locale-data/ga.js"));
			break;
		case "hr":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/hr.js");
			}
			addLocaleData(require("react-intl/locale-data/hr.js"));
			require("moment/locale/hr.js");
			break;
		case "kok":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kok.js");
			}
			addLocaleData(require("react-intl/locale-data/kok.js"));
			break;
		case "ln":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ln.js");
			}
			addLocaleData(require("react-intl/locale-data/ln.js"));
			break;
		case "mgh":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mgh.js");
			}
			addLocaleData(require("react-intl/locale-data/mgh.js"));
			break;
		case "pt":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/pt.js");
			}
			addLocaleData(require("react-intl/locale-data/pt.js"));
			require("moment/locale/pt.js");
			break;
		case "az":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/az.js");
			}
			addLocaleData(require("react-intl/locale-data/az.js"));
			require("moment/locale/az.js");
			break;
		case "bs":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/bs.js");
			}
			addLocaleData(require("react-intl/locale-data/bs.js"));
			require("moment/locale/bs.js");
			break;
		case "dje":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/dje.js");
			}
			addLocaleData(require("react-intl/locale-data/dje.js"));
			break;
		case "et":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/et.js");
			}
			addLocaleData(require("react-intl/locale-data/et.js"));
			require("moment/locale/et.js");
			break;
		case "gd":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/gd.js");
			}
			addLocaleData(require("react-intl/locale-data/gd.js"));
			require("moment/locale/gd.js");
			break;
		case "hsb":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/hsb.js");
			}
			addLocaleData(require("react-intl/locale-data/hsb.js"));
			break;
		case "ja":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ja.js");
			}
			addLocaleData(require("react-intl/locale-data/ja.js"));
			require("moment/locale/ja.js");
			break;
		case "kde":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kde.js");
			}
			addLocaleData(require("react-intl/locale-data/kde.js"));
			break;
		case "ks":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ks.js");
			}
			addLocaleData(require("react-intl/locale-data/ks.js"));
			break;
		case "lo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/lo.js");
			}
			addLocaleData(require("react-intl/locale-data/lo.js"));
			require("moment/locale/lo.js");
			break;
		case "mgo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mgo.js");
			}
			addLocaleData(require("react-intl/locale-data/mgo.js"));
			break;
		case "naq":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/naq.js");
			}
			addLocaleData(require("react-intl/locale-data/naq.js"));
			break;
		case "nus":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/nus.js");
			}
			addLocaleData(require("react-intl/locale-data/nus.js"));
			break;
		case "qu":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/qu.js");
			}
			addLocaleData(require("react-intl/locale-data/qu.js"));
			break;
		case "se":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/se.js");
			}
			addLocaleData(require("react-intl/locale-data/se.js"));
			require("moment/locale/se.js");
			break;
		case "smn":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/smn.js");
			}
			addLocaleData(require("react-intl/locale-data/smn.js"));
			break;
		case "ta":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ta.js");
			}
			addLocaleData(require("react-intl/locale-data/ta.js"));
			require("moment/locale/ta.js");
			break;
		case "twq":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/twq.js");
			}
			addLocaleData(require("react-intl/locale-data/twq.js"));
			break;
		case "wae":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/wae.js");
			}
			addLocaleData(require("react-intl/locale-data/wae.js"));
			break;
		case "bas":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/bas.js");
			}
			addLocaleData(require("react-intl/locale-data/bas.js"));
			break;
		case "ca":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ca.js");
			}
			addLocaleData(require("react-intl/locale-data/ca.js"));
			require("moment/locale/ca.js");
			break;
		case "dsb":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/dsb.js");
			}
			addLocaleData(require("react-intl/locale-data/dsb.js"));
			break;
		case "eu":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/eu.js");
			}
			addLocaleData(require("react-intl/locale-data/eu.js"));
			require("moment/locale/eu.js");
			break;
		case "gl":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/gl.js");
			}
			addLocaleData(require("react-intl/locale-data/gl.js"));
			require("moment/locale/gl.js");
			break;
		case "hu":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/hu.js");
			}
			addLocaleData(require("react-intl/locale-data/hu.js"));
			require("moment/locale/hu.js");
			break;
		case "kea":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/kea.js");
			}
			addLocaleData(require("react-intl/locale-data/kea.js"));
			break;
		case "ksb":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ksb.js");
			}
			addLocaleData(require("react-intl/locale-data/ksb.js"));
			break;
		case "lrc":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/lrc.js");
			}
			addLocaleData(require("react-intl/locale-data/lrc.js"));
			break;
		case "mk":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mk.js");
			}
			addLocaleData(require("react-intl/locale-data/mk.js"));
			require("moment/locale/mk.js");
			break;
		case "nb":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/nb.js");
			}
			addLocaleData(require("react-intl/locale-data/nb.js"));
			require("moment/locale/nb.js");
			break;
		case "rm":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/rm.js");
			}
			addLocaleData(require("react-intl/locale-data/rm.js"));
			break;
		case "seh":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/seh.js");
			}
			addLocaleData(require("react-intl/locale-data/seh.js"));
			break;
		case "te":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/te.js");
			}
			addLocaleData(require("react-intl/locale-data/te.js"));
			require("moment/locale/te.js");
			break;
		case "tzm":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/tzm.js");
			}
			addLocaleData(require("react-intl/locale-data/tzm.js"));
			require("moment/locale/tzm.js");
			break;
		case "be":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/be.js");
			}
			addLocaleData(require("react-intl/locale-data/be.js"));
			require("moment/locale/be.js");
			break;
		case "ce":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ce.js");
			}
			addLocaleData(require("react-intl/locale-data/ce.js"));
			break;
		case "dua":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/dua.js");
			}
			addLocaleData(require("react-intl/locale-data/dua.js"));
			break;
		case "ewo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ewo.js");
			}
			addLocaleData(require("react-intl/locale-data/ewo.js"));
			break;
		case "gsw":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/gsw.js");
			}
			addLocaleData(require("react-intl/locale-data/gsw.js"));
			break;
		case "hy":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/hy.js");
			}
			addLocaleData(require("react-intl/locale-data/hy.js"));
			break;
		case "jgo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/jgo.js");
			}
			addLocaleData(require("react-intl/locale-data/jgo.js"));
			break;
		case "khq":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/khq.js");
			}
			addLocaleData(require("react-intl/locale-data/khq.js"));
			break;
		case "ksf":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ksf.js");
			}
			addLocaleData(require("react-intl/locale-data/ksf.js"));
			break;
		case "lt":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/lt.js");
			}
			addLocaleData(require("react-intl/locale-data/lt.js"));
			require("moment/locale/lt.js");
			break;
		case "ml":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ml.js");
			}
			addLocaleData(require("react-intl/locale-data/ml.js"));
			require("moment/locale/ml.js");
			break;
		case "nd":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/nd.js");
			}
			addLocaleData(require("react-intl/locale-data/nd.js"));
			break;
		case "nyn":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/nyn.js");
			}
			addLocaleData(require("react-intl/locale-data/nyn.js"));
			break;
		case "rn":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/rn.js");
			}
			addLocaleData(require("react-intl/locale-data/rn.js"));
			break;
		case "ses":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ses.js");
			}
			addLocaleData(require("react-intl/locale-data/ses.js"));
			break;
		case "sn":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/sn.js");
			}
			addLocaleData(require("react-intl/locale-data/sn.js"));
			break;
		case "teo":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/teo.js");
			}
			addLocaleData(require("react-intl/locale-data/teo.js"));
			break;
		case "ug":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ug.js");
			}
			addLocaleData(require("react-intl/locale-data/ug.js"));
			break;
		case "bem":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/bem.js");
			}
			addLocaleData(require("react-intl/locale-data/bem.js"));
			break;
		case "cgg":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/cgg.js");
			}
			addLocaleData(require("react-intl/locale-data/cgg.js"));
			break;
		case "fa":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/fa.js");
			}
			addLocaleData(require("react-intl/locale-data/fa.js"));
			require("moment/locale/fa.js");
			break;
		case "gu":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/gu.js");
			}
			addLocaleData(require("react-intl/locale-data/gu.js"));
			require("moment/locale/gu.js");
			break;
		case "id":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/id.js");
			}
			addLocaleData(require("react-intl/locale-data/id.js"));
			require("moment/locale/id.js");
			break;
		case "ki":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ki.js");
			}
			addLocaleData(require("react-intl/locale-data/ki.js"));
			break;
		case "ksh":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ksh.js");
			}
			addLocaleData(require("react-intl/locale-data/ksh.js"));
			break;
		case "lu":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/lu.js");
			}
			addLocaleData(require("react-intl/locale-data/lu.js"));
			break;
		case "mn":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/mn.js");
			}
			addLocaleData(require("react-intl/locale-data/mn.js"));
			break;
		case "ne":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ne.js");
			}
			addLocaleData(require("react-intl/locale-data/ne.js"));
			require("moment/locale/ne.js");
			break;
		case "om":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/om.js");
			}
			addLocaleData(require("react-intl/locale-data/om.js"));
			break;
		case "ro":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/ro.js");
			}
			addLocaleData(require("react-intl/locale-data/ro.js"));
			require("moment/locale/ro.js");
			break;
		case "sg":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/sg.js");
			}
			addLocaleData(require("react-intl/locale-data/sg.js"));
			break;
		case "so":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/so.js");
			}
			addLocaleData(require("react-intl/locale-data/so.js"));
			break;
		case "th":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/th.js");
			}
			addLocaleData(require("react-intl/locale-data/th.js"));
			require("moment/locale/th.js");
			break;
		case "uk":
			if (isClient && (window as any).Intl) {
				require("intl/locale-data/jsonp/uk.js");
			}
			addLocaleData(require("react-intl/locale-data/uk.js"));
			require("moment/locale/uk.js");
			break;
		default:
	}
	moment.locale(locale);
}

import { layoutConfig, variant } from "./data";
import moment from "moment/moment";

export function numberWithCommas(x) {
	return x.toString().replace(/.(?=(?:.{3})+$)/g, "$& ");
}

export function getColumnWidth(id) {
	return layoutConfig.columnsWidth[id];
}

export function getVariantConfig(id) {
	return variant[id];
}

export function hexToHSL(H) {
	// Convert hex to RGB first
	let r = 0,
		g = 0,
		b = 0;
	if (H.length == 4) {
		r = "0x" + H[1] + H[1];
		g = "0x" + H[2] + H[2];
		b = "0x" + H[3] + H[3];
	} else if (H.length == 7) {
		r = "0x" + H[1] + H[2];
		g = "0x" + H[3] + H[4];
		b = "0x" + H[5] + H[6];
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta == 0) h = 0;
	else if (cmax == r) h = ((g - b) / delta) % 6;
	else if (cmax == g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return { h, s, l };
}

export function firebaseError(error) {
	if (error === "auth/invalid-email") return "Emailová adresa nieje správna";
	if (error === "auth/user-disabled") return "Používateľ zablokovaný";
	if (error === "auth/user-not-found") return "Používateľ sa nenašiel";
	if (error === "auth/wrong-password") return "Nesprávne heslo";
	if (error === "auth/too-many-requests")
		return "Príliš veľa nesprávnych pokusov o prihlásenie";
	if (error === "auth/email-already-in-use") return "Tento email sa už používa";
	if (error === "auth/weak-password")
		return "Heslo je príliš slabé (minimálne 6 znakov)";

	return error;
}

export const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

export function getLastModified(date) {
	var lastModified = moment(date);
	var now = moment();

	if (now.diff(lastModified, "days") == 0) {
		var hDif = now.diff(lastModified, "hours");
		if (hDif < 1) {
			var mdif = now.diff(lastModified, "minutes");
			if (mdif < 2) return "teraz";
			else {
				return mdif + " minút dozadu";
			}
		} else if (hDif < 10) {
			return hDif + " hodín dozadu";
		} else {
			return " dnes";
		}
	} else if (now.diff(lastModified, "days") == 1) {
		return " včera";
	} else if (now.diff(lastModified, "days") <= 7) {
		return now.diff(lastModified, "days") + " dní dozadu";
	} else if (now.diff(lastModified, "months") == 1) {
		return " tento mesiac";
	} else if (now.diff(lastModified, "years") == 0) {
		return now.diff(lastModified, "months") + " mesiacov dozadu";
	} else {
		return " viac ako rok dozadu";
	}
}

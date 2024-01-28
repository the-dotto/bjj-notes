import dayjs from 'dayjs'
import PluginLocalizedFormat from 'dayjs/plugin/localizedFormat'

class DateService {
	private readonly formats = {
		display: 'dddd, MMMM D, YYYY'
	}

	constructor() {
		dayjs.extend(PluginLocalizedFormat);
	}

	public getCurrentDateForDisplay() {
		return dayjs().format(this.formats.display);
	}
};

export const DATE_SERVICE = new DateService();
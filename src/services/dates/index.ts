import dayjs, { Dayjs } from 'dayjs'
import PluginLocalizedFormat from 'dayjs/plugin/localizedFormat'

type UnparsedDate = Dayjs | Date | string;
class DateService {
	private readonly formats = {
		display: 'dddd, MMMM D, YYYY',
		timestamp: 'h:mm:ss - dd, MMM D, YYYY',
		day: 'dddd',
	}

	constructor() {
		dayjs.extend(PluginLocalizedFormat);
	}

	public format(format: keyof typeof this.formats, date?: UnparsedDate) {
		return dayjs(undefined).format(this.formats[format]);
	}

	public toDate(date: UnparsedDate) {
		return dayjs(date).toDate();
	}

	public getCurrentWeekStartAndEnd() {
		const date = dayjs();
		const start = date.startOf('week')
		const end = date.endOf('week')

		return { start, end };
	};

	public getCurrentWeekDates() {
		const { start, end } = this.getCurrentWeekStartAndEnd();
		const dates = []

		let currentDate = start;

		while (currentDate <= end) {
			dates.push(currentDate);
			currentDate = currentDate.add(1, 'day');
		}
		return dates;
	};

	public isSameDay(date1: UnparsedDate, date2: UnparsedDate) {
		return dayjs(date1).isSame(date2, 'day');
	}
};

export const DATE_SERVICE = new DateService();
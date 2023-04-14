import { useState } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export type DateType = {
    dates?: Date[];
};

const generateDates = (date: number ): number[] => {
    let dates = []

    for (let i = 1; i <= date; i++){
        dates.push(i)
    }

    return dates;
}

const getDateObj = (...args: number[]): Date => new Date(...args)

export const App = ({ dates = [] }: DateType) => {
    const [dateObj, setDateObj] = useState<Date>(getDateObj());

    const currentYear = dateObj.getFullYear();

    const currentMonth = dateObj.getMonth();

    const currentMonthDate = dateObj.getDate();

    const previousMonthName = MONTHS[currentMonth === 0 ? 11 : currentMonth - 1];

    const currentMonthName = MONTHS[currentMonth];

    const nextMonthName = MONTHS[currentMonth === 11 ? 0 : currentMonth + 1];

    const previousMonthLastDate = getDateObj(currentYear, currentMonth, 0).getDate();

    const previousMonthDates = generateDates(previousMonthLastDate)

    const lastDay = getDateObj(currentYear, currentMonth + 1, 0).getDate();

    const firstDayIndex = getDateObj(currentYear, currentMonth, 1).getDay();

    const lastDayIndex = getDateObj(currentYear, currentMonth, lastDay).getDay();

    const currentMonthDates = generateDates(lastDay + firstDayIndex).map((_, idx) => ({
        month: currentMonthName,
        date: idx - (firstDayIndex - 1),
    }));

    const negativeNumberLength = currentMonthDates.filter(({ date }) => date < 1).length;

    currentMonthDates?.map(({ date }, idx) => {
        if (date < 1) {
            currentMonthDates[idx].date = previousMonthDates[previousMonthDates.length - (negativeNumberLength - idx)];
            currentMonthDates[idx].month = previousMonthName;
        }
        return date;
    });

    currentMonthDates.push(
        ...generateDates(14 - (lastDayIndex + 1)).map((_, idx) => ({ month: nextMonthName, date: idx + 1 }))
    );

    const absentDates = dates.map((item) => ({
        selectedMonth: MONTHS[item.getMonth()],
        selectedDate: item.getDate(),
        selectedYear: item.getFullYear(),
    }));

    let month: number = currentMonth;
    let year: number = currentYear;

    const handleNextMonth = (type?: string) => () => {
        switch (type) {
            case "year":
                year += 1;
                break;
            default:
                month += 1;
        }
        setDateObj(getDateObj(year, month, currentMonthDate));
    };

    const handlePreviousMonth = (type?: string) => () => {
        switch (type) {
            case "year":
                year -= 1;
                break;
            default:
                month -= 1;
        }
        setDateObj(getDateObj(year, month, currentMonthDate));
    };

    return (
        <div className="px-2 sm:px-5">
            <div className="flex justify-center gap-5 my-5 relative">
                <h1 className="text-xl font-medium text-center m-auto">
                    {currentMonthName} - {currentYear}
                </h1>
                <button
                    className="text-black text-base sm:text-lg font-bold w-7 h-7 absolute left-1 sm:left-8"
                    onClick={handlePreviousMonth()}>
                    &lt;
                </button>
                <button
                    className="text-black text-base sm:text-lg font-bold w-7 h-7 absolute left-12 sm:left-32"
                    onClick={handlePreviousMonth("year")}>
                    &lt;&lt;
                </button>

                <button
                    className="text-black text-base sm:text-lg font-bold w-7 h-7 absolute right-12 sm:right-32"
                    onClick={handleNextMonth("year")}>
                    &gt;&gt;
                </button>
                <button
                    className="text-black text-base sm:text-lg font-bold w-7 h-7 absolute right-1 sm:right-8"
                    onClick={handleNextMonth()}>
                    &gt;
                </button>
            </div>
            <ul className="text-center list-none w-full grid grid-cols-7 mb-5 bg-blue-100 rounded-lg py-2 px-1 gap-2 sm:gap-5 lg:gap-10">
                {DAYS?.map((item) => {
                    return (
                        <li key={item} className="text-md md:text-xl font-medium">
                            {item}
                        </li>
                    );
                })}
            </ul>
            <ul className="text-center list-none w-full grid grid-cols-7 gap-2 sm:gap-5 lg:gap-10">
                {currentMonthDates.slice(0, 42).map(({ date, month }) => {
                    return (
                        <li className="flex justify-center items-center" key={month + date}>
                            <h5
                                className={`w-4 h-4 sm:w-10 sm:h-10 flex justify-center items-center text-sm font-medium sm:text-xl p-4 sm:p-5 border-2 border-solid border-blue-500 rounded-full ${
                                    currentMonthName !== month ? "border-blue-100 text-gray-300" : ""
                                } ${
                                    absentDates?.find(
                                        ({ selectedDate, selectedMonth, selectedYear }) =>
                                            selectedMonth === month &&
                                            selectedDate === date &&
                                            selectedYear === currentYear
                                    )
                                        ? "bg-blue-500 text-white border-blue-600"
                                        : ""
                                }
                                `}>
                                {date}
                            </h5>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

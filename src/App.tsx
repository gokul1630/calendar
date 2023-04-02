import { useState } from "react";
import clsx from "clsx";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const App = () => {
    const [dateObj, setDateObj] = useState<Date>(new Date());

    const currentYear = dateObj.getFullYear();

    const currentMonth = dateObj.getMonth();

    const currentMonthDate = dateObj.getDate();

    const previousMonth = MONTHS[currentMonth === 0 ? 11 : currentMonth - 1];

    const currentMonthName = MONTHS[currentMonth];

    const nextMonthName = MONTHS[currentMonth === 11 ? 0 : currentMonth + 1];

    const previousMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();

    const previousMonthDates = [...Array(previousMonthLastDate)].map((_, i) => i + 1);

    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    const lastDayIndex = new Date(currentYear, currentMonth, lastDay).getDay();

    const currentMonthDates = [...Array(lastDay + firstDayIndex)].map((_, idx) => ({
        month: currentMonthName,
        date: idx - (firstDayIndex - 1),
    }));

    const negativeNumberLength = currentMonthDates.filter(({ date }) => date < 1).length;

    currentMonthDates?.map(({ date }, idx) => {
        if (date < 1) {
            currentMonthDates[idx].date = previousMonthDates[previousMonthDates.length - (negativeNumberLength - idx)];
            currentMonthDates[idx].month = previousMonth;
        }
        return date;
    });

    currentMonthDates.push(
        ...[...Array(7 - (lastDayIndex + 1))].map((_, idx) => ({ month: nextMonthName, date: idx + 1 }))
    );

    return (
        <div className="px-5">
            <div className="flex justify-center gap-5 my-5">
                <h1 className="text-xl font-medium text-center m-auto">
                    {currentMonthName} - {currentYear}
                </h1>
                <button
                    className="bg-fuchsia-500 rounded-full p-2 text-white"
                    onClick={() => {
                        if (currentMonth < 1) {
                            setDateObj((state) => new Date(state.getFullYear(), state.getMonth() - 1, state.getDate()));
                        } else {
                            setDateObj((state) => new Date(state.getFullYear(), state.getMonth() - 1, state.getDate()));
                        }
                    }}>
                    Prev
                </button>

                <button
                    className="bg-fuchsia-500 rounded-full p-2 text-white"
                    onClick={() => {
                        if (currentMonth > 11) {
                            setDateObj(new Date(currentYear + 1, currentMonth + 1, currentMonthDate));
                        } else {
                            setDateObj(new Date(currentYear, currentMonth + 1, currentMonthDate));
                        }
                    }}>
                    Next
                </button>
            </div>

            <ul className="text-center list-none w-full grid grid-cols-7 grid-rows-none gap-5">
                {DAYS?.map((item) => {
                    return (
                        <li key={item} className="text-xl font-medium px-5">
                            {item}
                        </li>
                    );
                })}

                {currentMonthDates.map(({ date, month }) => {
                    const currentDate = date > 0 && date;
                    return (
                        <li className="flex justify-center items-center" key={month + date}>
                            <h5
                                className={clsx(
                                    "w-10 h-10 flex justify-center items-center text-xl p-5 border-2 border-solid border-fuchsia-500 rounded-full",
                                    currentDate === currentMonthDate && month === currentMonthName
                                        ? "bg-fuchsia-300 text-white"
                                        : ""
                                )}>
                                {date && date}
                            </h5>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

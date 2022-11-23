import dayjs from 'dayjs';

const range = (from: number, to: number, step: number) =>
    [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

export const days: number[] = range(1, 31, 1);
export const years: number[] = range(2022, 2100, 5)
export const months =
    [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ]

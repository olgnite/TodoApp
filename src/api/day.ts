import dayjs from 'dayjs';

export const currentDate = dayjs().toDate().getTime();

/**
 * Функция устанавливает и возвращает время в миллисекундах
 * @param {string} [year=''] - год
 * @param {string} [month=''] - месяц
 * @param {string} [date=''] - дата
 * @param {string} [time=''] - время
 * @returns {number}
 */
export const setDate = (year: string = '', month: string = '', date: string = '', time: string = '') => {
    return dayjs(`${year}-${month}-${date} ${time}`).toDate().getTime();
}
import { FC, SelectHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { days, months, years } from "../../base";
import { ITodo } from "../../types/todo.interface";
import styles from './DateSelect.module.scss';


interface IDateSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    register: UseFormRegister<ITodo>
}

/**
 * Функциональный компонент
 * DateSelect 
 * @returns {tsx}
 */
const DateSelect: FC<IDateSelectProps> = ({ register }) => {

    return (
        <>
            <label htmlFor="dateCompleted"></label>
            <select {...register('day')}>
                {days.map((d) => <option key={'__id__' + d} value={d}>{d}</option>)}
            </select>
            <select {...register('month')}>
                {months.map((m, i) => <option key={'__id__' + m} value={i + 1}>{m}</option>)}
            </select>
            <select {...register('year')}>
                {years.map((y) => <option key={'__id__' + y} value={y}>{y}</option>)}
            </select>
            <div className={styles.time}>
                <label htmlFor="time">Формат - 11:00</label>
                <input
                    type="text"
                    placeholder='Время завершения'
                    {...register('time')}
                />
            </div>
        </>);
};

export default DateSelect;

import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { days, months, years } from '../../base'
import styles from './TodoSelect.module.scss'

interface IDate {
    day: string
    month: string
    year: string
    time: string
}

/**
 * Функциональный компонент
 * Возвращает select date
 * @returns {tsx}
 */
const TodoSelect: FC = () => {
    const { register } = useForm<IDate>();

    return (
        <>
            <div className={styles.date}>
                <label htmlFor="dateCompleted">Дата завершения</label>
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
            </div>
        </>
    )
}

export default TodoSelect
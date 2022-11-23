import { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { currentDate, setDate } from '../../api/day';
import { completedTodoDate, updateTodo } from '../../api/firebaseRequest';
import { days, months, years } from '../../base';
import contextTodo from '../../Context/TodoContext';
import { ITodo } from '../../types/todo.interface';
import styles from './TodoEdit.module.scss';

interface IPropTodo {
    todo: ITodo
}

/**
 * Функциональный компонент
 * Возвращает форму редактирования todo
 * @param {{ todo: IPropTodo; }} { todo }
 * @returns {tsx}
 */
const TodoEdit: FC<IPropTodo> = ({ todo }) => {
    let dateState = setDate(todo.year, todo.month, todo.day, todo.time);
    const [completedDate, setCompletedDate] = useState(true);
    const [selectedFile, setSelectedFile] = useState<string[]>([]);
    const [showTodo, setShowTodo] = useContext(contextTodo);
    const { register, handleSubmit, setValue } = useForm<ITodo>();

    /**
     * Функция позволяет отправить отредактированную форму в firebase
     * @param {{ 
     * title: string; 
     * description: string; 
     * file: string; 
     * id: string; }} {
            title,
            description,
            file,
            id,
        }
     */
    const editHandler: SubmitHandler<ITodo> = ({
        title,
        description,
        day,
        month,
        year,
        time,
        id,
    }) => {
        currentDate > dateState ? setCompletedDate(true) : setCompletedDate(false)
        console.log(currentDate, 'Текущие');
        console.log(dateState, 'Set');
        setShowTodo(true)
        updateTodo({
            title,
            description,
            day,
            month,
            year,
            time,
            completed: completedDate,
            file: selectedFile,
            id
        })
    }

    /**
     * Функция добавляет выбранные файлы в state (selectedFile)
     * Проверяем выбрал ли пользователь файлы
     * Циклом идем по длине массива из файлов
     * Добавляем имена всех файлов в новый массив и state
     * @param {*} e
     */
    const handleChangeAddFile = (e: any) => {
        e.preventDefault();

        if (e.target.files) {
            let pendingFiles: string[] = [...selectedFile];
            for (let i = 0; i < e.target.files.length; i++) {
                pendingFiles.push(e.target.files[i].name);
                setSelectedFile(pendingFiles);
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            {!showTodo && <div className={styles.block}>
                <form onSubmit={handleSubmit(editHandler)}>
                    <div>
                        <div>
                            <input
                                type="text"
                                defaultValue={todo.title}
                                placeholder="Название"
                                {...register('title', { required: true })}
                            />
                        </div>
                        <div>
                            <input
                                defaultValue={todo.description}
                                placeholder="Описание"
                                {...register('description', { required: true })}
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleChangeAddFile(e)} />
                        </div>
                        <div>
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
                                <input type="text" placeholder='Время завершения' {...register('time')} />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => { setValue("id", todo.id) }}
                        style={{ marginRight: '10px' }}
                    >
                        Сохранить
                    </button>
                    <button onClick={() => setShowTodo(true)}>Назад</button>
                </form>
            </div>}
        </div>
    )
}

export default TodoEdit
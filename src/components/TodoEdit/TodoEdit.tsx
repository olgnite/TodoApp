import { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { currentDate, setDate } from '../../api/day';
import { updateTodo } from '../../api/firebaseRequest';
import contextTodo from '../../Context/TodoContext';
import { AddFileService } from '../../services/addFile.service';
import { ITodo } from '../../types/todo.interface';
import DateSelect from '../DateSelect/DateSelect';
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
     * БАГ! - При первом редактировании времени изменения применяются с 3 раза, 
     * далее можно спокойно менять с первого (Не придумал, как исправить), 
     * остальные поля работают корректно
     * @param {{ 
     * title: string; 
     * description: string; 
     * file: string; 
     * day:string;
     * month: string;
     * year:string;
     * time:string;
     * id: string; }} {
            title,
            description,
            file,
            day,
            month,
            year,
            time,
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
        setSelectedFile(AddFileService.addFile(e));
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
                                onChange={handleChangeAddFile} />
                        </div>
                        <div className='date'>
                            <DateSelect register={register} />
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
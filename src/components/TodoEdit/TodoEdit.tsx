import { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateTodo } from '../../api/firebaseRequest';
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
        file,
        id,
    }) => {
        setShowTodo(true)
        updateTodo({
            title,
            description,
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
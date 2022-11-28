import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createTodo } from '../../api/firebaseRequest';
import { useRequestTodo } from '../../hooks/requestTodo';
import { ITodo } from '../../types/todo.interface';
import TodoItem from '../TodoItem';
import TodoSelect from '../TodoSelect/TodoSelect';
import styles from './TodoForm.module.scss';

/**
 * Функциональный компонент
 * Форма todo 
 * Возвращает форму todo
 * @returns {tsx}
 */
const TodoForm: FC = () => {
    const { register, handleSubmit, reset } = useForm<ITodo>()
    const [selectedFile, setSelectedFile] = useState<string[]>([]);
    const todos = useRequestTodo();

    /**
     * Функция создает todo в firebase
     * После создания очищает все поля формы
     * @param {ITodo} data
     */
    const createTodoHandler: SubmitHandler<ITodo> = (data: ITodo) => {
        createTodo({
            ...data,
            file: selectedFile,
            completed: false
        });
        setSelectedFile([])
        reset();
    }

    /**
     *  Функция добавляет выбранные файлы в state (selectedFile)
     *  Проверяем выбрал ли пользователь файлы
     *  Циклом идем по длине массива из файлов
     *  Добавляем имена всех файлов в новый массив и state
     * @param {*} e
     */
    const handleChangeAddFile = (e: any) => {
        e.preventDefault();

        if (e.target.files) {
            let pendingFiles: string[] = selectedFile;
            [...e.target.files].forEach((_: any, i: number) => {
                pendingFiles.push(e.target.files[i].name);
                setSelectedFile(pendingFiles);
            });
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                <h1 className={styles.header}>Todo App</h1>
                <form onSubmit={handleSubmit(createTodoHandler)}>
                    <div style={{ marginBottom: '10px' }}>
                        <div className={styles.title}>
                            <input
                                type="text"
                                placeholder='Название задачи'
                                {...register('title', { required: true })}
                            />
                        </div>
                        <div className={styles.description}>
                            <input
                                type="text"
                                placeholder='Описание задачи'
                                {...register('description', { required: true })}
                            />
                        </div>
                        <div>
                            <TodoSelect />
                            <div>
                                <input type="file"
                                    multiple
                                    onChange={handleChangeAddFile}
                                    className={styles.btnFile} />
                                {selectedFile.map((f) => (<p key={'__id__' + f}>{f}</p>))}
                            </div>
                        </div>
                    </div>
                    <button type="submit" style={{ marginBottom: '10px' }} className={styles.btn}>
                        Добавить
                    </button>
                </form>
                <div className='content'>
                    {todos.map((t) => (<TodoItem key={t.id} todo={t}/>))}
                </div>
            </div>
        </>
    )
}

export default TodoForm
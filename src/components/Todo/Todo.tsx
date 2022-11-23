import dayjs from 'dayjs'
import { FC, useContext } from 'react'
import { currentDate, setDate } from '../../api/day'
import { completedTodo, completedTodoDate, deleteTodo } from '../../api/firebaseRequest'
import contextTodo from '../../Context/TodoContext'
import { ITodo } from '../../types/todo.interface'
import styles from './Todo.module.scss'

interface IPropTodo {
    todo: ITodo
}

/**
 * Функциональный компонент 
 * Возвращает индивидуальную todo
 * @param {IPropTodo} { todo }
 * @returns {tsx}
 */
const Todo: FC<IPropTodo> = ({ todo }: IPropTodo) => {
    const [showTodo, setShowTodo] = useContext(contextTodo);

    const dateState = setDate(todo.year, todo.month, todo.day, todo.time);
    const dateFormat = dayjs(dateState).format('MMM D, YYYY h:mm A');

    /**
     * Функция сравнивает текущее и установленное время, 
     * завершает задачу по истечению времени
     */
    const completedByDateHandler = () => {
        if (currentDate > dateState) {
            completedTodoDate({
                ...todo,
                completed: true
            })
        }
    }

    /**
     * Функция завершает задачу по checkbox
     */
    const completeByCheckboxHandler = () => {
        completedTodo(todo);
    }

    /**
     * Функция удаляет задачу по нажатию на кнопку "Удалить"
     */
    const deleteHandler = () => {
        deleteTodo(todo.id);
    }

    return (
        <div className={styles.wrapper}>
            {showTodo && <div className={styles.block}>
                <div className={styles.fieldCard}>
                    <h2 className={styles.title}>Название: {todo.title}</h2>
                    <p>Описание: {todo.description}</p>
                    <p>Дата завершения: {dateFormat}</p>
                    <p>Прикрепленные файлы: {`${todo.file}\n`}</p>
                </div>
                <button onClick={deleteHandler}>Удалить</button>
                <button
                    onClick={() => setShowTodo(false)}
                    style={{ marginRight: '10px' }}
                >
                    Редактировать
                </button>
                <>
                    {todo.completed === false && completedByDateHandler()}
                    {todo.completed === false && <input type="checkbox" onClick={completeByCheckboxHandler} />}
                    <div style={{ marginLeft: "-20px", marginTop: "10px" }}>
                        {todo.completed
                            ? <label htmlFor="checkbox">Выполнено/Время выполнения истекло</label>
                            : <label htmlFor="checkbox">Не выполнено</label>}
                    </div>
                </>
            </div>}
        </div>
    )
}

export default Todo
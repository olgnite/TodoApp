import { FC, useState } from 'react';
import Context from '../Context/TodoContext';
import { ITodo } from '../types/todo.interface';
import Todo from './Todo/Todo';
import TodoEdit from './TodoEdit/TodoEdit';

interface IPropTodo {
    todo: ITodo
}

/**
 * Функциональный компонент
 * Возвращает context 
 * <Todo></Todo> и <TodoEdit></TodoEdit> находятся на одном уровне, 
 * что позволяет декомпозировать форму редактирования и отображения контента
 * @param {{ todo: IPropTodo; }} { todo }
 * @returns {*}
 */
const TodoItem: FC<IPropTodo> = ({ todo }) => {
    return (
        <Context.Provider value={useState(true)}>
            <Todo todo={todo}></Todo>
            <TodoEdit todo={todo}></TodoEdit>
        </Context.Provider>

    )
}

export default TodoItem
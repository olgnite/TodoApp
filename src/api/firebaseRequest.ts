import { ITodo } from './../types/todo.interface';
import { db } from './firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

/**
 * Функция создает и добавляет todo в firebase
 * @async
 * @param {ITodo} { todo }
 * @returns {*}
 */
export const createTodo = async (todo: ITodo) => {
    await addDoc(collection(db, 'todos'), {
        title: todo.title,
        description: todo.description,
        day: todo.day,
        month: todo.month,
        year: todo.year,
        time: todo.time,
        file: todo.file,
        completed:  todo.completed
    })
}

/**
 * Функция обновляет state firebase по установленному времени
 * @async
 * @param {ITodo} todo
 * @returns {*}
 */
export const completedTodoDate = async (todo: ITodo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
        completed: todo.completed
    })
}

/**
 * Функция обновляет state firebase по checkbox
 * @async
 * @param {ITodo} todo
 * @returns {*}
 */
export const completedTodo = async (todo: ITodo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed
    })
}

/**
 * Функция обновляет state firebase после того, как отредактировали форму
 * @async
 * @param {ITodo} todo
 * @returns {*}
 */
export const updateTodo = async (todo: ITodo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
        title: todo.title,
        description: todo.description,
        day: todo.day,
        month: todo.month,
        year: todo.year,
        time: todo.time,
        file: todo.file,
        completed: todo.completed,
        id: todo.id,
    })
}

/**
 * Функция удаляет todo из state firebase по id элемента
 * @async
 * @param {string} id
 * @returns {*}
 */
export const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id))
}

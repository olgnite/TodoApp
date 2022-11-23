import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../api/firebase";
import { ITodo } from "../types/todo.interface";

/**
 * Хук достает данные из state firebase
 * @returns {Itodo[]}
 */
export const useRequestTodo = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'todos'))
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let todos: any[] = [];
            QuerySnapshot.forEach((doc) => {
                todos.push({ ...doc.data(), id: doc.id })
                setTodos(todos)
            });
        })
        return () => unsubscribe();
    }, [])
    return todos
}
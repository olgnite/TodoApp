import { FC } from 'react'
import TodoForm from './TodoForm/TodoForm'

/**
 * Функциональный компонент
 * @returns {tsx}
 */
const Layout: FC = () => {
    return (
        <div className='App'>
            <TodoForm></TodoForm>
        </div>
    )
}

export default Layout
import React from 'react';
import './FormTodo.css';

const inputTodoRef = React.createRef();

function FormTodo({onAddTodo}) {

    return (
        <section className="form form-todo">

            <form method="post">

                <div>
                    <label htmlFor="todo" className="hidden">todo value</label>
                    <input
                        ref={inputTodoRef}
                        type="text"
                        name="todo"
                        id="todo"
                        placeholder="entrer la todo"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        onClick={e => {
                            onAddTodo( e , inputTodoRef.current.value );
                        } }
                    >
                        valider
                    </button>
                </div>

            </form>

        </section>
    );
}

export default FormTodo;
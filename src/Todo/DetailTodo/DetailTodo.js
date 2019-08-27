import React , {useState} from 'react';
import './DetailTodo.css';


/**
* git expemples repository :  
* <https://github.com/FortAwesome/react-fontawesome/blob/master/examples/create-react-app/src/App.js#L63>
* Font icons (svg) react lib
*/

import { library } from '@fortawesome/fontawesome-svg-core' ;
import { fas } from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add( fas ) ;

const textareaRef = React.createRef();

function DetailTodo({todo,onClose,onChangeTodo}) {

    const 
        [read , setRead] = useState( true ),
        [textareaVal , setTextareaVal] = useState( todo.text )
    ;

    return (
        <section className="detail-todo">
            
            <div className="wrap-close-detail-todo">
                <FontAwesomeIcon
                    icon={['fas','times']}
                    size='2x'
                    className="close-detail-todo"
                    onClick={onClose}
                />
            </div>

            <section
                className={`wrap-todo-detail wrap-write-todo ${!read ? 'visible':'hidden'} `}
            >
                <form method="post">
                    <div>
                        <textarea ref={textareaRef} value={textareaVal} onChange={e => {
                            setTextareaVal( e.target.value );
                        }} />
                        {/*
                            {
                                errorChangeTodo &&
                                <span className="error error-field">
                                    {errorChangeTodo}
                                </span>
                            }
                        */}
                    </div>
                    <div>
                        <button
                            type="submit"
                            onClick={e => {
                                e.preventDefault();
                           
                                setRead(true);

                                // save change todo
                                const val = textareaRef.current.value
                                
                                // check length val
                                // if:
                                todo.change = val;
                                onChangeTodo(e ,  todo );
                                onClose();
                                // else: 
                                    // setErrorChangeTodo( "fix val error" );
                            }}
                        >
                            modifier
                        </button>
                    </div>
                </form>
            </section>
            
            <section
                className={`wrap-todo-detail wrap-read-todo ${read ? 'visible':'hidden'}`}
                id={todo.id}
            >
                <p>
                    {todo.text}
                </p>
                <p className="wrap-icon-rewrite-todo">
                    <FontAwesomeIcon
                        icon={['fas','pencil-alt']}
                        size='1x'
                        className="rewrite-todo"
                        onClick={() => setRead( false )}
                    />
                </p>
            </section>

        </section>
    );
}

export default DetailTodo;
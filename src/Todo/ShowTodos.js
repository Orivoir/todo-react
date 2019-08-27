import React , {useState} from 'react';
import './ShowTodos.css';
import DetailTodo from './DetailTodo/DetailTodo';

/**
* git expemples repository :  
* <https://github.com/FortAwesome/react-fontawesome/blob/master/examples/create-react-app/src/App.js#L63>
* Font icons (svg) react lib
*/

import { library } from '@fortawesome/fontawesome-svg-core' ;
import { fas } from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add( fas ) ;

function ShowTodos({list,onRemoveTodo}){

    const [detailTodo , setDetailTodo] = useState(null) ;

    return (
        <article className="show-todos">

            <ul className="list-todo">
                {
                    list.map( item => (
                        <li
                            className="item-todo"
                            key={ JSON.parse(item).id }
                        >
                            <p
                                className="text-todo"
                            >
                                {
                                    JSON.parse(item).text.length < 15 ?
                                        JSON.parse(item).text :
                                        JSON.parse(item).text.slice( 0 , 15 ) + ' ...'
                                }
                            </p>
                            <ul className="list-set-todo">
                                
                                <li
                                    className="item-set-todo"
                                    onClick={() => {
                                            setDetailTodo(
                                                <DetailTodo
                                                    onClose={() => setDetailTodo( null )} todo={JSON.parse(item)}
                                                    // onChangeTodo={}
                                                />
                                            );
                                        }
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={['fas','eye']}
                                        size="1x"
                                        className="icon-see"
                                    />
                                </li>

                                <li
                                    className="item-set-todo"
                                    onClick={e => onRemoveTodo(e , JSON.parse(item) ) }
                                >
                                    <FontAwesomeIcon
                                        icon={['fas','times']}
                                        size="1x"
                                        className="icon-remove"
                                    />
                                </li>
                            </ul>
                        </li>
                    ) )
                }
            </ul>
            
            { detailTodo }

        </article>
    );
}

export default ShowTodos;
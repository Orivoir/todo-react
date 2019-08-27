import React from 'react';
import DocumentTitle from 'react-document-title';
import User from './User';
import FormTodo from './FormTodo';
import './Todo.css';

export default class Todo extends React.Component {

    state = {

        todos: []
    } ;

    constructor( props ) {

        super( props ) ;

        const countTodos = parseInt(sessionStorage.getItem('countTodo')) ;

        if( !isNaN( countTodos ) ) {

            // Get all todos save in sessionStorage

            let currentTodo = null;

            // Generate sequential number array [0,1,2,...]
            Array.from( Array( countTodos ).keys() )
                // Iter "this" sequential
                .map( key => {
                    currentTodo = sessionStorage.getItem( `todo-${key}` ) ;

                    if( typeof currentTodo === 'string' ) {
                        // Component is not mounted "setState" method do not exists
                        this.state.todos = [ ...this.state.todos , currentTodo ];
                        return true;
                    }
                    return false;
                })
            ;
        }

        this.onSaveTodo = this.onSaveTodo.bind( this ); 
    }

    /**
     * 
     * @param {SyntheticEvent} e 
     * @param {String} todo 
     */
    onSaveTodo( e , todo ) {

        e.preventDefault() ;

        if( !(typeof todo === 'string') ) {
            console.warn("debug : onSaveTodo , arg2 must be an String but is : " + typeof todo );
            return ;
        }

        const countTodos = this.state.todos.length;
        
        // Push new todo in sessionStorage
        sessionStorage.setItem( `todo-${countTodos}` , todo );

        // Push new todo in local state
        this.setState( state =>( {
            todos: [ ...state.todos , todo ]
        }) ) ;

        // Push new count todos        
        sessionStorage.setItem( "countTodo" , (countTodos+1) );
    }

    render() {

        const {pseudo, avatar,onReset} = this.props;

        return (
            <DocumentTitle title="todo | dashboard">
                <>
                    {
                        ( (!pseudo || !avatar)  ) &&
                        onReset()
                    }
                    <section className="todo">

                        {/* data user */}
                        <User onReset={onReset} {...this.props} />

                        <section className="wrap-todo">

                            {/* form write && add new todo */}
                            <FormTodo onAddTodo={this.onSaveTodo} />

                        </section>

                    </section>

                </>
            </DocumentTitle>
        );
    }

};
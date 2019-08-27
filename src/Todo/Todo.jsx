import React from 'react';
import DocumentTitle from 'react-document-title';
import User from './User';
import FormTodo from './FormTodo';
import ShowTodos from './ShowTodos';
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
        this.onRemoveTodo = this.onRemoveTodo.bind( this ); 
        this.onChangeTodo = this.onChangeTodo.bind( this ); 
    }

    
    /**
     * @bindMethod [constructor]
     * @param {SyntheticEvent} e 
     * @param {Object} todo 
     */
    onChangeTodo( e , todo ) {
        
        e.preventDefault();

        if( typeof todo !== 'object' ) {
            console.warn("debug onChangeTodo , arg2 bust me Object bust is " , typeof todo );
            return ;
        }
        
        try {

            const extractTodo = JSON.parse(this.state.todos.filter( item => (
                todo.id === JSON.parse( item ).id
            ) )[0]);

            
            extractTodo.text = todo.change ;

            const newTodos = this.state.todos.map( item => {

                console.log( todo.id === JSON.parse(item).id );
                return ( todo.id === JSON.parse(item).id ) ? JSON.stringify(extractTodo) : item

            } ) ;

            // PUSH Update todos
            this.setState( {
                todos: newTodos
            } ) ;
                
        } catch( SyntaxError ) { /** Silence is <feature /> */ }

    }

    /**
     * @bindMethod [constructor]
     * @param {SyntheticEvent} e 
     * @param {Object} todo 
     */
    onRemoveTodo( e , todo ) {


        e.preventDefault();

        if( typeof todo !== 'object' ) {
            console.warn("debug onRemoveTodo , arg2 bust me Object bust is " , typeof todo );
            return ;
        }

        const newTodos = this.state.todos.filter( item => (
            (  todo.id !== JSON.parse( item ).id )
        ) ) ;

        this.setState( {
            todos: newTodos
        } );
    }

    /**
     * @description synchronous state<->sessionStorage before any render
     */
    reOrderSession() {

        sessionStorage.setItem( 'countTodo' , this.state.todos.length );

        Array.from( Array( (this.state.todos.length+1) ).keys() ).map( key => {
         
            if( this.state.todos[key] )
                sessionStorage.setItem( `todo-${key}` , this.state.todos[key] )
            else
                sessionStorage.removeItem( `todo-${key}`);

            return key;
         } ) ;
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

        const
            countTodos = this.state.todos.length ,
            saveTodo = JSON.stringify({
                text:todo,
                id: (Math.random() * Date.now()).toString()
            })
        ;
        
        // Push new todo in sessionStorage
        sessionStorage.setItem( `todo-${countTodos}` , saveTodo 
        );

        // Push new todo in local state
        this.setState( state =>( {
            todos: [ ...state.todos , saveTodo ]
        }) ) ;

        // Push new count todos        
        sessionStorage.setItem( "countTodo" , (countTodos+1) );
    }

    render() {

        const
            {pseudo, avatar,onReset} = this.props ,
            {todos} = this.state
        ;

        this.reOrderSession() ;

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

                            {/* show all todos */}
                            <ShowTodos 
                                list={todos}
                                onRemoveTodo={this.onRemoveTodo}
                                onChangeTodo={this.onChangeTodo}
                            />

                        </section>

                    </section>

                </>
            </DocumentTitle>
        );
    }

};
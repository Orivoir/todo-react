import React from 'react';
import DocumentTitle from 'react-document-title';
import User from './User';
import './Todo.css';

export default class Todo extends React.Component {

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
                        </section>

                    </section>

                </>
            </DocumentTitle>
        );
    }

};
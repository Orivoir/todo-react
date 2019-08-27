import React from 'react';
import DocumentTitle from 'react-document-title';

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
                        {/* data user  
                            <User {...this.props} />
                        */}

                    </section>

                </>
            </DocumentTitle>
        );
    }

};
import React from 'react';
import {Redirect} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import avatarImg from './../ressources/avatar.png';
import './Home.css';

export default class Home extends React.Component {

    state = {

        tempAvatar: null ,
        errors: {
            avatar: null ,
            pseudo: null
        }
    } ;

    constructor( props ) {

        super( props );

        this.inputFileRef = React.createRef();
        this.inputPseudoRef = React.createRef();
        this.onChangeAvatar = this.onChangeAvatar.bind( this );
        this.onOpenFile = this.onOpenFile.bind( this );
    }

    componentDidMount() {

        const inputFile = this.inputFileRef.current ;

        if( !inputFile ) return ;

        inputFile.addEventListener('change' , this.onChangeAvatar );
    }

    /**
     * @bindMethod [constructor]
     * @param {SyntheticEvent} e 
     */
    onChangeAvatar( e ) {

        const inputFile = this.inputFileRef.current ;

        if( !inputFile ) return ;

        const
            avatar = inputFile.files[0] ,
            readerF = new FileReader()
        ;

        if( !avatar || !(avatar instanceof File) ) return ;

        if( !/(png|jpe?g|gif|svg)/i.test( avatar.type ) ) {

            this.setState( state => ({
                errors: {
                    pseudo: state.errors.pseudo ,
                    avatar: "Ce fichier : '" + avatar.name + "' , n'est pas une image valide ."
                }
            }) )
            return ;
        }

        readerF.addEventListener( 'load' , () => {

            this.setState( {
                tempAvatar: readerF.result
            } ) ;

        }  ) ;

        readerF.readAsDataURL( avatar );

    }

    /**
     * @bindMethod [constructor]
     * @param {SyntheticEvent} e 
     */
    onOpenFile( e ) {

        const inputFile = this.inputFileRef.current ;

        if( !inputFile ) return ;

        inputFile.click();
    }

    render() {

        const
            {logged,onNext} = this.props ,
            {tempAvatar, errors } = this.state
        ;

        return (
            <DocumentTitle title="todo | home">
                <>
                    {/* if user is already logged redirect to dashboard todo */}
                    {
                        logged &&
                        <Redirect to="/todo" />
                    }
                    <section className="home">

                        <form method="post">

                            <div>
                                <label className="hidden" htmlFor="pseudo">pseudo</label>
                                <input type="text" id="pseudo" ref={this.inputPseudoRef} placeholder="Votre pseudo" name="pseudo" />
                                {
                                    errors.pseudo &&
                                    <p className="error error-field"> { errors.pseudo } </p>
                                }
                            </div>

                            <div>
                                <label className="hidden" htmlFor="avatar">avatar</label>
                                <figure onClick={this.onOpenFile}>
                                    <button type="button" className="focus-avatar">
                                        
                                        <img
                                            src={(tempAvatar || avatarImg)}
                                            alt="your avatar"
                                            // default size (px)
                                            width="75"
                                            height="auto"
                                        />
                                        <figcaption>
                                            changer avatar
                                        </figcaption>

                                    </button>
                                </figure>
                                {
                                    errors.avatar &&
                                    <span className="error error-field"> { errors.avatar } </span>
                                }
                                <input ref={this.inputFileRef} type="file" className="hidden" name="avatar" id="avatar" />
                            </div>

                            <div>
                                <button 
                                    type="submit"
                                    className="next"
                                    onClick={e => {
                                            e.preventDefault();

                                            const pseudo = this.inputPseudoRef.current.value ; 

                                            if( pseudo.trim() <= 2 ) {

                                                this.setState( state => ({
                                                    errors: {
                                                        avatar: state.errors.avatar ,
                                                        pseudo: "Votre pseudo est trop court."
                                                    }
                                                }) ) ;

                                                return ;
                                            }

                                            onNext(e , {
                                                avatar: tempAvatar || avatarImg ,
                                                pseudo: pseudo
                                            } ) ;
                                        }
                                    }
                                >
                                    suivant
                                </button>
                            </div>

                        </form>

                    </section>
                </>
            </DocumentTitle>
        );
    }

};
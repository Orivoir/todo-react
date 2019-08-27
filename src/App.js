import React from 'react';
import {Route , Switch} from 'react-router-dom';
import Home from './Home/Home';
import Todo from './Todo/Todo';

export default class App extends React.Component {
  
  state = {

    user: {
      pseudo: null ,
      avatar: null ,
      logged: false
    }
  } ;

  constructor( props ) {

    super( props ) ;

    const
      avatar = sessionStorage.getItem('avatar') ,
      pseudo = sessionStorage.getItem('pseudo') ,
      logged = sessionStorage.getItem('logged')
    ;

    if( avatar && pseudo && logged ) {
        this.state.user = {
            logged: true ,
            avatar: avatar,
            pseudo: pseudo
        } ;
    }

    this.onChangeUser = this.onChangeUser.bind( this );
    this.onReset = this.onReset.bind( this );
  }

  /**
   * 
   * @param {SyntheticEvent} e 
   */
  onReset( e ) {

    e.preventDefault();

    this.setState( {
      user: {
        logged: false ,
        avatar: null ,
        pseudo: null
      }
    } ) ;
  }

  /**
   * 
   * @param {SyntheticEvent} e 
   * @param {Object} user 
   */
  onChangeUser(e, user) {

    e.preventDefault() ;
    
    if( !(typeof user.pseudo === "string" && typeof user.avatar === "string") ) {
      console.warn("debug onChangeUser : user typeof attribute is invalid");
      return ;
    }

    this.setState( {
      user: {
        pseudo: user.pseudo ,
        avatar: user.avatar ,
        logged: true
      }
    } ) ;
    
    sessionStorage.setItem( 'logged' , true ) ;
    sessionStorage.setItem( 'avatar' , user.avatar ) ;
    sessionStorage.setItem( 'pseudo' , user.pseudo ) ;
  }

  render() {

    return (
      <>
        <Switch>
          <Route exact path="/" render={() => ( !this.state.user.logged ? <Home onNext={this.onChangeUser} /> : <Todo {...this.state.user} onReset={this.onReset} /> ) } />
        </Switch>
      </>
    
    ) ;
  }

} ;

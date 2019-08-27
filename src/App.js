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

    this.onChangeUser = this.onChangeUser.bind( this );
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
    } )
  }

  render() {

    return (
      <>
        <Switch>
          <Route exact path="/" render={() => <Home onNext={this.onChangeUser} />} />
          <Route path="/todo" render={() => <Todo {...this.state.user} />} />
        </Switch>
      </>
    
    ) ;
  }

} ;

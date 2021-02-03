import React from 'react';

class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    }
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.name,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  }

  onSubmitBack = () => {
    this.props.onRouteChange('signin');
  }

  render() {
    return (
      <article className="br3 ba b--black-10 bg-near-white mv4 w-80 w-50-m w-30-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Create Account</legend>
              <legend className="f5 fw6 ph9 mh0"></legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-white w-100" type="name" name="username"  id="username" onChange={ this.onNameChange }/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-white w-100" type="password" name="password"  id="password" onChange={ this.onPasswordChange }/>
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent hover-bg-white pointer f6 dib" type="submit" value="Register" onClick={ this.onSubmitRegister }/>
            </div>
            <div className="lh-copy mt3">
              <p className="f6 link dim black db pointer" onClick={ this.onSubmitBack }>Go back</p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Signin;
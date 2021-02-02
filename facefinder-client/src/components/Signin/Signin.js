import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInName: '',
      signInPassword: ''
    }
  }

  onNameChange = (event) => {
    this.setState({ signInName: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value })
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.signInName,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          this.props.onRouteChange('home');
        }
      })

  }

  onSubmitRegister = () => {
    console.log(this.state);
    this.props.onRouteChange('register');
  }
  
  render() {

    return (
      <article className="br3 ba b--black-10 bg-near-white mv4 w-80 w-50-m w-30-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">FaceFinder</legend>
              <legend className="f5 fw5 ph9 mh0">This magical app will detect faces in your pictures.</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-white w-100" type="name" name="username" id="username" onChange={ this.onNameChange }/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-white w-100" type="password" name="password" id="password" onChange={ this.onPasswordChange }/>
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent hover-bg-white pointer f6 dib" type="submit" value="Sign in" onClick={ this.onSubmitSignIn }/>
            </div>
            <div className="lh-copy mt3">
              <p className="f6 link dim black db pointer" onClick={ this.onSubmitRegister }>Create an account</p>
            </div>
            <div className="lh-copy mt3">
              <p className="f6 link dim black db pointer">Continue as guest</p>
            </div>
          </div>
        </main>
      </article>
    )
  }

}

export default Signin;
import React from 'react';

const Signin = ({ onRouteChange }) => {
  return (
    <article className="br3 ba b--black-10 bg-near-white mv4 w-80 w-50-m w-30-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f3 fw6 ph0 mh0">Create Account</legend>
            <legend className="f5 fw6 ph9 mh0"></legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-white w-100" type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-white w-100" type="password" name="password"  id="password"/>
            </div>
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent hover-bg-white pointer f6 dib" type="submit" value="Register" onClick={ () => onRouteChange('home') }/>
          </div>
          <div className="lh-copy mt3">
            <p className="f6 link dim black db pointer" onClick={() => onRouteChange('signin')}>Go back</p>
          </div>
        </div>
      </main>
    </article>
  )
}

export default Signin;
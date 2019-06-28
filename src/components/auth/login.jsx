import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Circle } from 'better-react-spinkit';
import LoginForm from '../forms/loginForm.jsx';
import SignupForm from '../forms/signUpForm.jsx';
import ResetForm from '../forms/resetForm.jsx';
import '../../css/modules.css';
import '../../css/style.css';
import '../../css/login.css';
import { setNewPassword } from '../../actions/resetPasswordActions';

export const Login = () => (
  <section id='login'>
    <header>
      <ul>
        <li id='head-brand'>
          <Link to='/'>
            Send<span className='head-span'>IT</span>
          </Link>
        </li>
      </ul>
      <ul className='ml-auto mt-25'>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
      </ul>
    </header>
    <div className='banner'>
      <div className='sendit-text mb-34'>
        <h5>
          The <span className='head-span'>Courier</span> service app you've
          been waiting for
        </h5>
        <p>SendIT makes reaching the world easier!</p>
      </div>
      <LoginForm />
    </div>
  </section>
);

export const Signup = () => (
  <section id='login'>
    <header>
      <ul>
        <li id='head-brand'>
          <Link to='/'>
            Send<span className='head-span'>IT</span>
          </Link>
        </li>
      </ul>
      <ul className='ml-auto mt-25'>
        <li>
          <Link to='/'>Login</Link>
        </li>
      </ul>
    </header>
    <div className='banner'>
      <div className='sendit-text'>
        <h5>
          The <span className='head-span'>Courier</span> service app you've been
          waiting for
        </h5>
        <p className='mb-34'>
          Register to experience our world class courier services
        </p>
      </div>
      <div id='form-box'>
        <div className='text-center'>
          <SignupForm />
        </div>
      </div>
    </div>
  </section>
);

export const Reset = () => (
  <section id='login'>
    <header>
      <ul>
        <li id='head-brand'>
          <Link to='/'>
            Send<span className='head-span'>IT</span>
          </Link>
        </li>
      </ul>
      <ul className='ml-auto'>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
      </ul>
    </header>
    <div className='banner bg-pd'>
      <div className='sendit-text mb-24'>
        <h5>
          The <span className='head-span'>Courier</span> service app you've been
          waiting for!
        </h5>
      </div>
      <div id='form-box'>
        <ResetForm />
      </div>
    </div>
  </section>
);

export class ResetPassword extends Component {
  state = {
    password: ''
  }

  componentWillUnmount() {
    // Clear State
    this.setState({
      password: ''
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  save = (event) => {
    event.preventDefault();
    const data = this.state;

    this.props.setNewPassword(data);
  }


  render() {
    const { password } = this.state;
    const { isLoading } = this.props.setPassword;

    return <section id='login'>
      <header>
        <ul>
          <li id='head-brand'>
            <Link to='/'>
              Send<span className='head-span'>IT</span>
            </Link>
          </li>
        </ul>
        <ul className='ml-auto'>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
        </ul>
      </header>
      <div className='banner bg-pd'>
        <div className='sendit-text mb-24'>
          <h5>
            The <span className='head-span'>Courier</span> service app you've been
            waiting for
        </h5>
        </div>
        <div id='form-box'>
          <form id='passwordForm' className='text-center' onSubmit={this.save}>
            <div className='form-row'>
              <small>Enter your new password</small>
            </div>
            <div className='mb-34'>
              <input id='password' type='password' name='password' placeholder='Password'
              onChange={this.onChange} value={password} required />
            </div>
              <div>
                <button id='save' className='btn sm is-outlined'>Save
                {isLoading && (
                  <span style={{ float: 'right', padding: '3px 3px 0 10px' }}>
                    <Circle color={'rgba(255,255,255,1)'} />
                  </span>
                )}
              </button>
              </div>
          </form>
        </div>
      </div>
    </section>;
  }
}

ResetPassword.propTypes = {
  setNewPassword: PropTypes.func,
  setPassword: PropTypes.object
};

const mapStateToProps = state => ({
  setPassword: state.setPassword,
});

export default connect(mapStateToProps, { setNewPassword })(ResetPassword);

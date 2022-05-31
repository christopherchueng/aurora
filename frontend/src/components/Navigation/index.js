import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <ProfileButton user={sessionUser} />
      );
    } else {
      sessionLinks = (
        <>
          <LoginFormModal />
          <SignupFormModal />
        </>
      );
    }

    return (
      <div className='navbar'>
          <div className='navbar-list'>
            <div className='navbar-left'>
              <div className='home-logo-ctn'>
                <div className='home-logo-click'>
                  <NavLink exact to="/">
                    <img className='home-logo' src='/images/favicon.ico'></img>
                  </NavLink>
                </div>
              </div>
              <div className='github-logo-ctn'>
                <div className='github-logo-click'>
                  <a href='https://github.com/christopherchueng/Aurora'>
                    <img className='github-logo' src='/images/github-logo.png'></img>
                  </a>
                </div>
              </div>
            </div>
            <div className='navbar-right'>
              <div className='add-track-ctn'>
                <div className='add-track-click'>
                  <NavLink to='/upload'>
                    <img className='add-track-icon' src='/images/add-track-icon.png'></img>
                  </NavLink>
                </div>
              </div>
              {isLoaded && sessionLinks}
            </div>
          </div>
      </div>
    );
}

export default Navigation;

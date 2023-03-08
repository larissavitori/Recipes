import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../buttons/Button';
import './Profile.css';

function Profile() {
  const userEmail = JSON.stringify(localStorage.getItem('user'));
  const history = useHistory();
  return (
    <div className="profile">
      <div>
        <span
          data-testid="profile-email"
        >
          {userEmail}
        </span>
        <Button
          bDataTestId="profile-done-btn"
          bHandleClick={ () => history.push('/done-recipes') }
          bTitle="Done Recipes"
        />
        <Button
          bDataTestId="profile-favorite-btn"
          bHandleClick={ () => history.push('/favorite-recipes') }
          bTitle="Favorite Recipes"
        />
        <Button
          bDataTestId="profile-logout-btn"
          bHandleClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
          bTitle="Logout"
        />
      </div>
    </div>
  );
}

export default Profile;

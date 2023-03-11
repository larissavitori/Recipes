import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../buttons/Button';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState({
    email: '',
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const history = useHistory();
  return (
    <div className="profile-component">
      <div>
        <span
          data-testid="profile-email"
        >
          {user?.email}
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

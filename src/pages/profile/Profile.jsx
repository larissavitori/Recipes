import { useHistory } from 'react-router-dom';
import { Header } from '../../components';
import Footer from '../../components/footer/Footer';

function Profile() {
  const history = useHistory();

  const userEmail = JSON.stringify(localStorage.getItem('user'));

  return (
    <div>
      <Header hTitle="Profile" hSearchDisabled />
      <div>
        <span
          data-testid="profile-email"
        >
          {userEmail}
        </span>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }

        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

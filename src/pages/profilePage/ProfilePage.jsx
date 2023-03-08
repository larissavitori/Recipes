import React from 'react';
import { Header } from '../../components';
import Footer from '../../components/footer/Footer';
import Profile from '../../components/profile/Profile';

function ProfilePage() {
  return (
    <div>
      <Header hTitle="Profile" />
      <Profile />
      <Footer />

    </div>
  );
}

export default ProfilePage;

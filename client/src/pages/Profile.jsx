import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const data = JSON.parse(localStorage.getItem('user'));



  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${user.data.token}`
        }
      });
      const data = await response.json();
      // console.log('data', data);

    } catch (error) {
      console.error('Error fetching users:', error);

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>Profile</div>
  )
}

export default Profile
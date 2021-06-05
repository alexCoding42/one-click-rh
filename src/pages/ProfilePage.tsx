import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Box, Text } from '@chakra-ui/react';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    };
    checkUser();
  }, []);

  if (!user) return null;

  return (
    <Box p={4}>
      <Text fontSize="2xl">Profile</Text>
      <Text fontSize="xl">Username: {user.username}</Text>
      <Text fontSize="xl">Email: {user.attributes.email}</Text>
      <AmplifySignOut />
    </Box>
  );
};

export default withAuthenticator(ProfilePage);

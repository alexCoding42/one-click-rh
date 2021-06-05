import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Box, Flex, Text } from '@chakra-ui/react';

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
    <Box mx="auto" my={4} px={8} py={4} borderRadius="lg" boxShadow="lg" bg="white" w="3xl">
      <Flex direction="column" alignItems="center">
         <Text fontSize="2xl" color="gray.700" fontWeight="700" mb={4}>Vous êtes connecté avec</Text>
        <Text fontSize="l" color="gray.700" fontWeight="500" mb={4}>Username: {user.username}</Text>
        <Text fontSize="l" color="gray.700" fontWeight="500" mb={4}>Email: {user.attributes.email}</Text>
        <AmplifySignOut />
      </Flex>
    </Box>
  );
};

export default withAuthenticator(ProfilePage);

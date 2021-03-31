import React, { ReactNode } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { HiMenu as MenuIcon, HiOutlineX as CloseIcon } from 'react-icons/hi';

const Links = [
  { linkName: 'Home', to: '/' },
  { linkName: 'My Appointments', to: 'my-appointments' },
];

const NavLink = ({ children, to }: { children: ReactNode; to: string }) => (
  <Link
    as={ReachLink}
    px={2}
    py={1}
    rounded={'md'}
    color='black'
    _hover={{ textDecoration: 'none', bg: 'black', color: 'white' }}
    _active={{ textDecoration: 'none', bg: 'black', color: 'white' }}
    to={to}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg='white' px={4} borderBottom='1px solid' borderColor='gray.300'>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          colorScheme='gray'
          icon={isOpen ? <CloseIcon /> : <MenuIcon />}
          aria-label='Open Menu'
          display={{ base: 'flex', sm: !isOpen ? 'none' : '' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Image boxSize='45px' src='favicon.png' alt='logo' />
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link, index) => (
              <NavLink key={index} to={link.to}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems='center'>
          <Wrap display={{ base: 'none', sm: 'block' }}>
            <WrapItem>
              <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
            </WrapItem>
          </Wrap>
          <HStack fontSize={['sm', 'xl']} marginLeft='20px'>
            <Text color='red.500'>Click</Text>
            <Text color='black'> & Kiosque RH</Text>
          </HStack>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link, index) => (
              <NavLink key={index} to={link.to}>
                {link.linkName}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;

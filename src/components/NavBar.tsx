import React, { ReactNode } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  MdMenu as MenuIcon,
  MdClose as CloseIcon,
  MdAdd as AddIcon,
} from 'react-icons/md';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

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
    color='gray.200'
    _hover={{ textDecoration: 'none', bg: 'gray.200', color: 'black' }}
    _active={{ textDecoration: 'none', bg: 'gray.200', color: 'black' }}
    to={to}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg='black' px={4} borderBottom='5px solid' borderColor='#FF0080'>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <MenuIcon />}
          aria-label={'Open Menu'}
          display={{ md: !isOpen ? 'none' : 'inherit' }}
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
        <Flex alignItems={'center'}>
          <Button
            variant={'solid'}
            color='gray.200'
            bg='#FF0080'
            _hover={{ bg: '#7928CA' }}
            size={'sm'}
            mr={4}
            leftIcon={<AddIcon />}
          >
            Add appointment
          </Button>
          <ColorModeSwitcher />
          {/* <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
            >
              <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu> */}
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

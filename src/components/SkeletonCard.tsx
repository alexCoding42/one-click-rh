import React, { FC } from 'react';
import { Box, SkeletonText } from '@chakra-ui/react';

const SkeletonCard: FC = () => {
  return (
    <Box mt={50} mx="auto" px={8} py={4} borderRadius="lg" boxShadow="lg" bg="white" w="2xl">
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  );
}

export default SkeletonCard;

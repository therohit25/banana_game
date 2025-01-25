import type { BoxProps } from '@mui/material';
import Box from '@mui/material/Box';

export const FlexBox = ({ children, ...props }: BoxProps) => (
  <Box display='flex' {...props}>
    {children}
  </Box>
);

export const FlexBoxJustify = ({ children, ...props }: BoxProps) => (
  <Box display='flex' justifyContent='space-between' {...props}>
    {children}
  </Box>
);

export const FlexBoxCentered = ({ children, ...props }: BoxProps) => (
  <Box
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    {...props}
  >
    {children}
  </Box>
);

export const FlexBoxRow = ({ children, ...props }: BoxProps) => (
  <Box display='flex' flexDirection='row' {...props}>
    {children}
  </Box>
);

import { Box, useStyleConfig } from '@chakra-ui/react';
function MainPanel(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('MainPanel', { variant });
  return (
    <Box __css={styles} minH='100vh' {...rest}>
      {children}
    </Box>
  );
}

export default MainPanel;

import { Box, useStyleConfig } from "@chakra-ui/react";
function PanelContainer(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("PanelContainer", { variant });
  return (
    <Box __css={styles} minH="100vh" {...rest}>
      {children}
    </Box>
  );
}

export default PanelContainer;

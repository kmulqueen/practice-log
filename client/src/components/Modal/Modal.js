import React, { useContext } from "react";
import {
  Box,
  Button,
  Heading,
  Layer,
  Paragraph,
  ResponsiveContext,
  Text,
} from "grommet";
import { Alert, Checkmark, CircleInformation, FormClose } from "grommet-icons";
import PropTypes from "prop-types";

function Modal({ heading, subtitle, content, footer, status, onClose }) {
  const size = useContext(ResponsiveContext);
  return (
    <>
      <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
        <Box
          fill="vertical"
          overflow="auto"
          width={!["xsmall", "small"].includes(size) ? "medium" : undefined}
          pad="medium"
        >
          <Box justify="between" direction="row">
            <Box flex={false} gap="small" direction="row" align="center">
              <Box justify="center">
                {status === "ok" ? (
                  <Checkmark color={`status-${status}`} />
                ) : status === "warning" || status === "critical" ? (
                  <Alert color={`status-${status}`} />
                ) : (
                  status === "information" && (
                    <CircleInformation color={`status-${status}`} />
                  )
                )}
              </Box>
              <Heading margin="none" size="small" level={2}>
                {heading}
              </Heading>
            </Box>
            <Box justify="center">
              <Button icon={<FormClose />} onClick={onClose} />
            </Box>
          </Box>
          {subtitle && <Text size="small">{subtitle}</Text>}
          <Box overflow="auto" pad={{ vertical: "medium" }}>
            <Paragraph margin="none">{content}</Paragraph>
          </Box>
        </Box>
        {footer.length ? (
          <Box
            fill="vertical"
            overflow="auto"
            width={!["xsmall", "small"].includes(size) ? "medium" : undefined}
          >
            <Box
              direction="row"
              gap="small"
              pad={{ vertical: "small", horizontal: "medium" }}
              background="background-contrast"
            >
              <Alert color={`status-${status}`} />
              <Text color="text-strong" weight="bold">
                Footer if you need it
              </Text>
            </Box>
          </Box>
        ) : null}
      </Layer>
    </>
  );
}

Modal.propTypes = {
  heading: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  content: PropTypes.string.isRequired,
  footer: PropTypes.string,
  status: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

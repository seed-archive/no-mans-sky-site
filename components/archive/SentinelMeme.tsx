"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { FormattedMessage, useIntl } from "react-intl";

// A Claim button whose every answer is no, a random one each press: the
// messages `sentinelMeme.answer.0` to `sentinelMeme.answer.31`.
const ANSWERS = 32;

export function SentinelMeme() {
  const intl = useIntl();
  const [press, setPress] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        onClick={() => {
          // Never the same answer twice in a row.
          const next = Math.floor(Math.random() * (ANSWERS - 1));
          setAnswer(next >= answer ? next + 1 : next);
          setPress(press + 1);
          setOpen(true);
        }}
      >
        <FormattedMessage id="sentinelMeme.claim" />
      </Button>
      <Snackbar
        key={press}
        open={open}
        autoHideDuration={2500}
        onClose={(_event, reason) => {
          if (reason !== "clickaway") {
            setOpen(false);
          }
        }}
        message={intl.formatMessage({ id: `sentinelMeme.answer.${answer}` })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}

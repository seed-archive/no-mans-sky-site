"use client";

import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

import Link from "@/components/archive/LocalLink";

// The page of a menu section: its heading, the section's menu label, and one
// link a page under it with a line of what that page holds (the Database, a
// group of tools). Every text is a message id.
export function IndexList(props: {
  title: string;
  entries: { href: string; label: string; line: string }[];
}) {
  const { title, entries } = props;
  return (
    <Stack spacing={3} sx={{ maxWidth: 760 }}>
      <Typography variant="h3" component="h1">
        <FormattedMessage id={title} />
      </Typography>
      <Stack component="ul" spacing={2} sx={{ p: 0, m: 0 }}>
        {entries.map((entry) => (
          <Stack key={entry.href} component="li" sx={{ listStyle: "none" }}>
            <MuiLink component={Link} href={entry.href} variant="h6">
              <FormattedMessage id={entry.label} />
            </MuiLink>
            <Typography variant="body2" color="text.secondary">
              <FormattedMessage id={entry.line} />
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

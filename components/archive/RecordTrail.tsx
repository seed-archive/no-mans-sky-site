"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Link from "@/components/archive/LocalLink";
import { FormattedMessage } from "react-intl";

import { isKind } from "@/lib/archive/kinds";
import { databasePath, kindPath, recordPath } from "@/lib/archive/paths";
import type { AssetCard } from "@/lib/archive/read";

// The way back up: home, the Database, the record's list, then every record
// above this one. A kind with no list (a space station) skips the list.
export function RecordTrail(props: { asset: AssetCard }) {
  const { asset } = props;
  return (
    <Breadcrumbs>
      <MuiLink component={Link} href="/" color="inherit" underline="hover">
        <FormattedMessage id="archive.home" />
      </MuiLink>
      <MuiLink
        component={Link}
        href={databasePath()}
        color="inherit"
        underline="hover"
      >
        <FormattedMessage id="archive.browse" />
      </MuiLink>
      {isKind(asset.kind) ? (
        <MuiLink
          component={Link}
          href={kindPath(asset.kind)}
          color="inherit"
          underline="hover"
        >
          <FormattedMessage id={`kinds.${asset.kind}`} />
        </MuiLink>
      ) : null}
      {asset.trail.map((step) => (
        <MuiLink
          key={step.id}
          component={Link}
          href={recordPath(step.kind, step.id)}
          color="inherit"
          underline="hover"
        >
          {step.name}
        </MuiLink>
      ))}
      <Typography color="text.primary">{asset.name}</Typography>
    </Breadcrumbs>
  );
}

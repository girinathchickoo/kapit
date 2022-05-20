import Link from "next/link";
import { Typography } from "@mui/material";

export const HyperLink = ({ href, name }: HyperLinkProps) => {
  return (
    <Link href={""}>
      <Typography
        sx={{
          cursor: "pointer",
          fontSize: "0.80rem",
          fontFamily: "CallunaSans-Regular",
        }}
      >
        {name}
      </Typography>
    </Link>
  );
};

interface HyperLinkProps {
  href: string;
  name: string;
}

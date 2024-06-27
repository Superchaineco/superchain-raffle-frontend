"use client";
import type { ReactElement, ReactNode } from "react";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import css from "./styles.module.css";
import MUILink from "@mui/material/Link";

const FooterLink = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}): ReactElement => {
  return href ? (
    <Link href={href} passHref legacyBehavior>
      <MUILink>{children}</MUILink>
    </Link>
  ) : (
    <MUILink>{children}</MUILink>
  );
};

const Footer = (): ReactElement | null => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  return (
    <footer className={css.container}>
      <ul>
        <li>
          <Typography variant="caption">Kolektivo Labs © 2024</Typography>
        </li>
        <li>
          <FooterLink href="/#">Terms</FooterLink>
        </li>
        <li>
          <FooterLink href="/#">Docs</FooterLink>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

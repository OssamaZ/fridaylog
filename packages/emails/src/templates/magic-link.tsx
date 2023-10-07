import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Image } from "./components/image";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { Footer } from "./components/footer";
import { main, anchor, h1, container, paragraphLight, paragraph } from "./components/styles";

export default function Email({ link }: { link: string }) {
  return (
    <Html>
      <Head />
      <Preview>Log in with this magic link 🪄</Preview>
      <Section style={main}>
        <Container style={container}>
          <Text style={h1}>Hello,</Text>
          <Text style={paragraph}>Use the link bellow to log in to fridaylog</Text>
          <Link
            href={link}
            target="_blank"
            style={{
              ...anchor,
              display: "block",
              marginBottom: "16px",
            }}>
            Click here to log in with this magic link
          </Link>
          <Text style={paragraphLight}>
            If you didn&apos;t try to log in, you can safely ignore this email.
          </Text>
          <Image path="/notion-logo.png" width="32" height="32" alt="fridaylog" />
          <Footer />
        </Container>
      </Section>
    </Html>
  );
}

Email.PreviewProps = {
  link: "http://localhost:3000/api/auth/magic-link",
};

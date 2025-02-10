import {
  Button,
  Container,
  Group,
  List,
  ListItem,
  Text,
  Title,
  Image,
} from "@mantine/core";
import NextImage from "next/image";
import NextLink from "next/link";
import hero from "@/assets/hero.png";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <Container size="lg" className={styles.container}>
      <Image
        component={NextImage}
        src={hero.src}
        alt="Email"
        w="100%"
        h="auto"
        maw={400}
        width={hero.width}
        height={hero.height}
        className={styles.image}
      />
      <div className={styles.content}>
        <Title>
          The{" "}
          <Text span inherit c="blue">
            platform
          </Text>{" "}
          where{" "}
          <Text span inherit c="grape">
            opportunities
          </Text>{" "}
          and{" "}
          <Text span inherit c="orange">
            talent
          </Text>{" "}
          meets
        </Title>
        <Text c="dimmed" mt="md">
          <strong>Chambitos</strong> is a platform designed to connect
          freelancers and small business owners with clients looking for various
          services. It provides a user-friendly marketplace where skilled
          professionals can showcase their talents and find meaningful work
          opportunities.
        </Text>
        <List mt={30} spacing="sm">
          <ListItem>
            <strong>Find work opportunities</strong> - Browse through a wide
            range of job listings and find the perfect match for your skills and
            expertise.
          </ListItem>
          <ListItem>
            <strong>Post job listings</strong> - Create job listings to attract
            skilled professionals and grow your business.
          </ListItem>
          <ListItem>
            <strong>Secure payments</strong> - Make secure payments and receive
            funds for completed work through our platform.
          </ListItem>
        </List>
        <Group className={styles.buttons} mt={30}>
          <Button component={NextLink} href="/sign-up" size="md">
            Get started
          </Button>
          <Button
            component={NextLink}
            href="#features"
            size="md"
            variant="default"
          >
            Learn more
          </Button>
        </Group>
      </div>
    </Container>
  );
}

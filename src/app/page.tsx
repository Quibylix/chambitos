import {
  Button,
  Container,
  Group,
  List,
  ListItem,
  Text,
  Title,
  Image,
  Card,
  SimpleGrid,
  Badge,
} from "@mantine/core";
import NextImage from "next/image";
import NextLink from "next/link";
import hero from "@/assets/hero.png";
import styles from "./page.module.css";
import {
  IconBrowser,
  IconBriefcase,
  IconCreditCard,
} from "@tabler/icons-react";

const features = [
  {
    title: "Browse job listings",
    description:
      "Find the perfect job listings that match your skills and expertise.",
    icon: IconBrowser,
  },
  {
    title: "Post job listings",
    description:
      "Create job listings to attract skilled professionals and grow your business.",
    icon: IconBriefcase,
  },
  {
    title: "Secure payments",
    description:
      "Make secure payments and receive funds for completed work through our platform.",
    icon: IconCreditCard,
  },
];

const testimonials = [
  {
    title: "I found my dream job on Chambitos",
    description:
      "I was looking for a job that matched my skills and expertise, and I found it on Chambitos. The platform is easy to use, and I was able to connect with clients looking for",
  },
  {
    title: "Chambitos helped me grow my business",
    description:
      "I was looking for a platform to post job listings and attract skilled professionals. Chambitos provided me with the perfect solution, and I was able to grow my business and connect with clients looking for",
  },
  {
    title: "Secure payments and reliable service",
    description:
      "Chambitos offers secure payments and reliable service. I was able to make secure payments and receive funds for completed work through the platform. I highly recommend Chambitos to anyone looking for",
  },
];

export default function HomePage() {
  return (
    <Container size="lg" mx="auto">
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
            freelancers and small business owners with clients looking for
            various services. It provides a user-friendly marketplace where
            skilled professionals can showcase their talents and find meaningful
            work opportunities.
          </Text>
          <List mt={30} spacing="sm">
            <ListItem>
              <strong>Find work opportunities</strong> - Browse through a wide
              range of job listings and find the perfect match for your skills
              and expertise.
            </ListItem>
            <ListItem>
              <strong>Post job listings</strong> - Create job listings to
              attract skilled professionals and grow your business.
            </ListItem>
            <ListItem>
              <strong>Secure payments</strong> - Make secure payments and
              receive funds for completed work through our platform.
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
      <Container component="section" fluid mt={100} id="features">
        <Group justify="center">
          <Badge
            color="blue"
            size="lg"
            variant="filled"
            className={styles.badge}
          >
            Features
          </Badge>
        </Group>
        <Title mt="sm" order={2} ta="center">
          A platform that offers a wide range of features
        </Title>
        <Text mt="sm" ta="center" c="dimmed" className={styles.description}>
          Explore the features that make <strong>Chambitos</strong> the perfect
          platform for freelancers and small business owners.
        </Text>
        <SimpleGrid
          cols={{ base: 1, xs: 2, sm: 1, md: 3 }}
          spacing="xl"
          mt={50}
        >
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              shadow="md"
              radius="md"
              className={styles.card}
              padding="xl"
            >
              <Icon size={50} stroke={2} className={styles.icon} />
              <Text fz="lg" fw={500} className={styles.cardTitle} mt="md">
                {title}
              </Text>
              <Text fz="sm" c="dimmed" mt="sm">
                {description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
      <Container component="section" fluid mt={100}>
        <Group justify="center">
          <Badge
            color="blue"
            size="lg"
            variant="filled"
            className={styles.badge}
          >
            Testimonials
          </Badge>
        </Group>
        <Title mt="sm" order={2} ta="center">
          What our users are saying
        </Title>
        <Text mt="sm" ta="center" c="dimmed" className={styles.description}>
          Discover how <strong>Chambitos</strong> has helped freelancers and
          small business owners connect with clients and grow their businesses.
        </Text>
        <SimpleGrid
          cols={{ base: 1, xs: 2, sm: 1, md: 3 }}
          spacing="xl"
          mt={50}
        >
          {testimonials.map(({ title, description }) => (
            <Card
              key={title}
              shadow="md"
              radius="md"
              className={styles.card}
              padding="xl"
            >
              <Image
                component={NextImage}
                mx="auto"
                src="/chambitos-logo.webp"
                alt="Avatar"
                width={42}
                height={42}
                w="auto"
                h="auto"
                radius="xl"
                className={styles.avatar}
              />
              <Text fz="lg" fw={500} className={styles.cardTitle} mt="md">
                "{title}"
              </Text>
              <Text fz="sm" c="dimmed" mt="sm">
                {description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Container>
  );
}

import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Center,
  Paper,
} from "@mantine/core";
import image from "./image.svg";
import classes from "./NotFoundImage.module.css";
import { useRouter } from "next/router";

export function NotFoundImage() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <Paper className="!text-white" h={"100vh"} bg={"#092635"}>
      <Container className={classes.root} h={"100vh"}>
        <Center h={"75vh"}>
          <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
            <Image src={image.src} alt="" className={classes.mobileImage} />
            <div>
              <Title className={classes.title}>Something is not right...</Title>
              <Text c="dimmed" size="lg">
                Page you are trying to open does not exist. You may have
                mistyped the address, or the page has been moved to another URL.
                If you think this is an error contact support.
              </Text>
              <Button
                variant="outline"
                size="md"
                mt="xl"
                className={classes.control}
                onClick={handleBackHome}
              >
                Get back to home page
              </Button>
            </div>
            <Image src={image.src} alt="" className={classes.desktopImage} />
          </SimpleGrid>
        </Center>
      </Container>
    </Paper>
  );
}

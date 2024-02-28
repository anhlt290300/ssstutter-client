import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export const CustomEmail = ({ magicLink, username }) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link.</Preview>
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <Body className=" bg-white">
        <Container className=" m-auto px-16 py-8 flex flex-col items-center justify-center text-center">
          <Img
            src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/c067e315533803c9c363e7915c439594.png"
            width={120}
            height={120}
            alt="ssstutter-logo"
            className=" m-auto"
          />
          <Heading className=" text-xl font-semibold">
            Thanks for signing up for SSSTUTTER clone, {username}
          </Heading>
          <Text className=" text-base leading-6 ">
            please click the button below to verify your email address and
            activate your account.
          </Text>
          <Link
            className=" px-6 py-3 rounded-md bg-black/70 hover:bg-black text-white font-semibold text-lg"
            href={magicLink}
          >
            Verify Emaill Address
          </Link>

          <Hr className=" border-gray-300 mt-12" />
          <Text className=" text-base leading-6">
            If you have any questions, please contact to me at
          </Text>
          <Link href="https://www.facebook.com/tuananhnam22tuoi/">
            <Img
              src="https://cdn3.iconfinder.com/data/icons/picons-social/57/46-facebook-512.png"
              width={48}
              height={48}
              alt="fblogo"
              className="m-auto"
            />
          </Link>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default CustomEmail;

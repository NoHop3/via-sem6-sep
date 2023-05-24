import type { StoryObj } from "@storybook/react";

import { _SignUp as SignUp } from "./sign-up.container";

export default {
  title: "SignUp",
  component: SignUp,
};
type Story = StoryObj<typeof SignUp>;

export const SignUpStory: Story = () => {
  const signUpProps = {
    signUp: () => {
      console.log("signUp");
    },
  };
  return (
    <div>
      <SignUp {...signUpProps} />
    </div>
  );
};

SignUpStory.storyName = "Sign up";

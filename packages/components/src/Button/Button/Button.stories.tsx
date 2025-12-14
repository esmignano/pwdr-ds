import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    fullWidth: false
  },
  argTypes: {
    theme: {
      control: false,
      description: "Injected by Storybook toolbar (Preview decorator)."
    },
    variant: { control: "radio", options: ["primary", "secondary", "ghost"] },
    size: { control: "radio", options: ["sm", "md", "lg"] }
  },
  parameters: {
    docs: {
      description: {
        component: `
A token-driven Button component.

**Usage**
- Use \`variant="primary"\` for primary actions.
- Use \`variant="secondary"\` for alternate actions.
- Use \`variant="ghost"\` for low-emphasis actions.

**Accessibility**
- Uses \`:focus-visible\` to show a visible focus ring.
- Loading sets \`aria-busy\`.

**Edge cases to QA**
- Long labels wrap/overflow
- Disabled + loading precedence
- Full-width behavior in constrained containers
        `.trim()
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const LongLabel: Story = {
  args: {
    children: "This is a very long button label to test wrapping and layout behavior"
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Save"
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, border: "1px dashed #999", padding: 12 }}>
        <Story />
      </div>
    )
  ]
};

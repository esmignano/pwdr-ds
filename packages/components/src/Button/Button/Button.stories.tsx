import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import Button, { ButtonType } from "./Button";

// Small helper layout components
function Stack(props: { gap?: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: props.gap ?? 12 }}>
      {props.children}
    </div>
  );
}

function Row(props: { gap?: number; wrap?: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: props.gap ?? 12,
        flexWrap: props.wrap ? "wrap" : "nowrap",
        alignItems: "center",
      }}
    >
      {props.children}
    </div>
  );
}

const meta: Meta<typeof Button> = {
  title: "Components/Button/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: [
          "Pwdr Button built on react-aria-components Button.",
          "",
          "**Theming** is provided by `PwdrProvider` (colorScheme + contrast) via Storybook globals.",
          "No `theme` prop is required.",
          "",
          "**Accessibility notes**:",
          "- Buttons should have clear text content.",
          "- If you create an icon-only button variant, ensure an `aria-label` is provided.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: Object.values(ButtonType),
    },
    size: {
      control: "radio",
      options: ["small", "standard"],
    },
    disabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    children: { control: "text" },
    onClick: { action: "onClick" }, // Storybook actions
    // You can expose htmlType if you want:
    htmlType: { control: "select", options: ["button", "submit", "reset"] },
  },
  args: {
    type: ButtonType.Primary,
    size: "standard",
    disabled: false,
    isLoading: false,
    children: "Button",
    htmlType: "button",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  name: "Playground",
  render: (args) => <Button {...args} />,
};

export const Variants: Story = {
  name: "Variants",
  render: (args) => (
    <Stack>
      <Row wrap>
        <Button {...args} type={ButtonType.Primary}>Primary</Button>
        <Button {...args} type={ButtonType.Secondary}>Secondary</Button>
        <Button {...args} type={ButtonType.Tertiary}>Tertiary</Button>
        <Button {...args} type={ButtonType.Discovery}>Discovery</Button>
        <Button {...args} type={ButtonType.Success}>Success</Button>
        <Button {...args} type={ButtonType.Warning}>Warning</Button>
        <Button {...args} type={ButtonType.Alert}>Alert</Button>
      </Row>
    </Stack>
  ),
};

export const Sizes: Story = {
  name: "Sizes",
  render: (args) => (
    <Stack>
      <Row>
        <Button {...args} size="small">Small</Button>
        <Button {...args} size="standard">Standard</Button>
      </Row>
    </Stack>
  ),
};

export const States: Story = {
  name: "States",
  render: (args) => (
    <Stack>
      <Row wrap>
        <Button {...args}>Default</Button>
        <Button {...args} disabled>Disabled</Button>
        <Button {...args} isLoading>Loading</Button>
        <Button {...args} type={ButtonType.Disabled}>Type=Disabled</Button>
      </Row>
      <div style={{ fontSize: 12, opacity: 0.75 }}>
        Tip: use keyboard Tab to verify focus ring + focus-visible behavior.
      </div>
    </Stack>
  ),
};

export const LongLabelStressTest: Story = {
  name: "Edge cases: Long label",
  render: (args) => (
    <Stack>
      <Button {...args}>
        This is a very very very long button label to test wrapping, padding, and alignment behavior
      </Button>
      <Button {...args} size="small">
        Small size with a very very long label to test overflow and wrapping behavior
      </Button>
    </Stack>
  ),
};

/**
 * This is a *proxy* for IconButton a11y behavior until IconButton exists.
 * If you add a real IconButton component, move this story there and enforce aria-label.
 */
export const IconOnlyA11yReminder: Story = {
  name: "A11y: Icon-only reminder",
  render: (args) => (
    <Stack>
      <div style={{ fontSize: 12, opacity: 0.75 }}>
        When you implement IconButton, require <code>aria-label</code> for icon-only usage.
      </div>
      <Button {...args} aria-label="Add item">
        +
      </Button>
    </Stack>
  ),
};

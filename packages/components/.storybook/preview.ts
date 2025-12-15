import type { Preview } from "@storybook/react";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Powdr theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "high-contrast", title: "High Contrast" }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, ctx) => {
      const theme = ctx.globals.theme as string;
      document.documentElement.dataset.pwdrTheme = theme;
      return Story({ args: { ...(ctx.args || {}), theme } });
    }
  ],
  parameters: {
    a11y: { test: "todo" },
    controls: { expanded: true }
  }
};

export default preview;

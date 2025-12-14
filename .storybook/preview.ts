import type { Preview } from "@storybook/react";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Powder theme",
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

      // Optional: set background for visual sanity
      document.body.style.margin = "24px";
      document.body.style.background =
        theme === "dark"
          ? "#0b0b12"
          : theme === "high-contrast"
            ? "#ffffff"
            : "#ffffff";

      return Story({
        args: {
          ...(ctx.args || {}),
          theme // inject theme into component props
        }
      });
    }
  ],
  parameters: {
    a11y: {
      // keeps a11y checks on by default
      test: "todo"
    },
    controls: {
      expanded: true
    }
  }
};

export default preview;

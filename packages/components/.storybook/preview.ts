import type { Preview } from "@storybook/react";
import { PwdrProvider } from "@pwdr/theme";

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      defaultValue: "light",
      toolbar: {
        title: "Color scheme",
        items: ["light", "dark"],
      },
    },
    contrast: {
      defaultValue: "normal",
      toolbar: {
        title: "Contrast",
        items: ["normal", "high"],
      },
    },
  },
  decorators: [
    (Story, ctx) => (
      <PwdrProvider
        colorScheme={ctx.globals.colorScheme}
        contrast={ctx.globals.contrast}
      >
        <Story />
      </PwdrProvider>
    ),
  ],
};

export default preview;

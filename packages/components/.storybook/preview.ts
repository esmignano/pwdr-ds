import type { Preview } from "@storybook/react";
import * as React from "react";
import { PwdrProvider } from "@pwdr/theme";

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: "Light or dark mode",
      defaultValue: "light",
      toolbar: {
        title: "Color scheme",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    contrast: {
      description: "Contrast mode",
      defaultValue: "normal",
      toolbar: {
        title: "Contrast",
        items: [
          { value: "normal", title: "Normal" },
          { value: "high", title: "High" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, ctx) => (
      <PwdrProvider
        colorScheme={ctx.globals.colorScheme}
        contrast={ctx.globals.contrast}
      >
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </PwdrProvider>
    ),
  ],

  parameters: {
    controls: { expanded: true },
    a11y: {
      // Keeps a11y enabled; you can tighten rules later.
      test: "todo",
    },
  },
};

export default preview;

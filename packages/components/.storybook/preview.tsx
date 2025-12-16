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
          { value: "light", title: "☀︎ Light" },
          { value: "dark", title: "⏾ Dark" },
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
    (Story, ctx) => {
      const scheme = ctx.globals.colorScheme;
      const bg = scheme === "dark" ? "#050038	" : "#ffffff";

      return (
        <PwdrProvider colorScheme={scheme} contrast={ctx.globals.contrast}>
          <div style={{ padding: 24, minHeight: "100vh", background: bg}}>
            <Story />
          </div>
        </PwdrProvider>
      );
    },
  ],

  parameters: {
    controls: { expanded: true },
    a11y: { test: "todo",},
    backgrounds: { disable: true, },
  },
};

export default preview;

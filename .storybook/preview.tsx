import type { Preview } from "@storybook/react";
import * as NextImage from "next/image";
import "../src/app/globals.css";

if (typeof globalThis.process === "undefined") {
  // Polyfill process for Next.js internals used by next/image
  const globalScope = globalThis as typeof globalThis & {
    process?: { env: Record<string, string> };
  };
  globalScope.process = { env: { NODE_ENV: "development" } };
}

if (
  typeof NextImage.default === "function" &&
  !(NextImage.default as { __storybookPatched?: boolean }).__storybookPatched
) {
  const OriginalNextImage = NextImage.default;
  const MockImage = function MockImage(
    props: Parameters<typeof OriginalNextImage>[0],
  ) {
    const { fill, style, ...rest } = props;
    if (fill) {
      return (
        <span style={{ position: "relative", display: "block" }}>
          {/* biome-ignore lint/performance/noImgElement: Storybook fallback */}
          <img
            {...rest}
            alt={props.alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: style?.objectFit ?? "cover",
              ...style,
            }}
          />
        </span>
      );
    }
    return (
      <>
        {/* biome-ignore lint/performance/noImgElement: Storybook fallback */}
        <img
          {...rest}
          alt={props.alt}
          style={{
            width: props.width ?? 400,
            height: props.height ?? 300,
            objectFit: style?.objectFit ?? "cover",
            ...style,
          }}
        />
      </>
    );
  };
  (MockImage as { __storybookPatched: boolean }).__storybookPatched = true;
  Object.defineProperty(NextImage, "default", {
    configurable: true,
    value: MockImage,
  });
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0b0b0b" },
      ],
    },
  },
};

export default preview;

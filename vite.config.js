import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import noAttrScripts from "./plugins/noAttrScripts";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import svgSpritemap from "vite-plugin-svg-spritemap";
import htmlImgAlias from "./plugins/htmlImgAlias";
import componentsFullReload from "./plugins/componentsFullReload";
import htmlSvgAlias from "./plugins/htmlSvgAlias";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  const plugins = [
    handlebars({
      partialDirectory: resolve(__dirname, "components"),
      reloadOnPartialChange: true,
    }),
    ViteImageOptimizer(),
    svgSpritemap({
      pattern: "src/icons/*.svg",
      filename: "icons.svg",
      styles: false,
      injectSVGOnDev: true,
      // Обработка SVG перед добавлением в спрайт
      transform: (content, filepath) => {
        // Заменяем все fill на currentColor
        return content.replace(/fill="[^"]*"/g, 'fill="currentColor"');
      },
    }),
    htmlSvgAlias(),
    htmlImgAlias(),
    componentsFullReload(),
  ];

  if (isBuild) {
    plugins.push(noAttrScripts());
  }

  return {
    base: "./",
    build: {
      minify: false,
    },
    plugins,
    resolve: {
      alias: {
        "@img": resolve(__dirname, "img"),
      },
    },
    server: {
      hmr: {
        overlay: true,
      },
    },
  };
});

import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import noAttrScripts from "./plugins/noAttrScripts";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import svgSpritemap from "vite-plugin-svg-spritemap";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  const plugins = [
    handlebars({
      partialDirectory: resolve(__dirname, "components"),
    }),
    ViteImageOptimizer(),
    svgSpritemap({
      pattern: "src/icons/*.svg", // Путь ко всем вашим SVG-иконкам
      filename: "sprite.svg", // Имя выходного файла спрайта
    }),
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
  };
});

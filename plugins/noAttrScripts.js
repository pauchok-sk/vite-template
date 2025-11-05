const noAttrScripts = () => {
  return {
    name: "no-attribute-scripts",
    transformIndexHtml(html) {
      // Сначала находим все script теги с type="module"
      const scriptRegex =
        /<script\s+type="module"\s+[^>]*src="([^"]*)"[^>]*><\/script>/g;
      let scripts = [];
      let match;

      // Собираем все script теги и их src
      while ((match = scriptRegex.exec(html)) !== null) {
        scripts.push(match[1]); // сохраняем только src
      }

      // Удаляем все script теги из head
      let newHtml = html.replace(
        /<script\s+type="module"\s+[^>]*src="[^"]*"[^>]*><\/script>/g,
        ""
      );

      // Удаляем атрибуты
      newHtml = newHtml
        .replace(/ crossorigin=".*?"/g, "")
        .replace(/ crossorigin/g, "")
        .replace(/\s*type="module"/g, "");

      // Добавляем скрипты перед закрывающим тегом body
      if (scripts.length > 0) {
        const scriptTags = scripts
          .map((src) => `<script src="${src}"></script>`)
          .join("\n  ");

        newHtml = newHtml.replace("</body>", `  ${scriptTags}\n</body>`);
      }

      return newHtml;
    },
  };
};

export default noAttrScripts;

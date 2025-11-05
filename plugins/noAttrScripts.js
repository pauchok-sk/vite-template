const noAttrScripts = () => {
  return {
    name: "no-attribute-scripts",
    transformIndexHtml(html) {
      return html
        .replace(/ crossorigin=".*?"/g, "")
        .replace(/ crossorigin/g, "")
        .replace(/\s*type="module"/g, "");
    },
  };
};

export default noAttrScripts;
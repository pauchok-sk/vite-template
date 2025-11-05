const htmlSvgAlias = () => {
  return {
    name: "html-img-alias",
    transformIndexHtml(html) {
      return html.replace(/(\w+)="@svg\/([^"]*)"/g, '$1="./$2"');
    },
  };
};

export default htmlSvgAlias;

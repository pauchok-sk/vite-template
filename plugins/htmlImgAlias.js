const htmlImgAlias = () => {
  return {
    name: "html-img-alias",
    transformIndexHtml(html) {
      return html.replace(/(\w+)="@img\/([^"]*)"/g, '$1="./img/$2"');
    },
  }
};

export default htmlImgAlias;
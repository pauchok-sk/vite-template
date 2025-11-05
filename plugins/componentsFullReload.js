const componentsFullReload = () => {
  return {
    name: "components-full-reload",
    handleHotUpdate({ file, server }) {
      const isComponentFile =
        file.includes("/components/") || file.includes("\\components\\");

      if (isComponentFile) {
        console.log(`Component changed: ${file}, triggering full reload`);
        server.ws.send({
          type: "full-reload",
          path: "*",
        });
        return []; // Останавливаем дальнейшую обработку HMR для этого файла
      }
    },
  };
};

export default componentsFullReload;

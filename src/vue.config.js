module.exports = {
    css: {
      loaderOptions: {
        sass: {
          additionalData: `
            @import "@/scss/common.scss";
          `
        }
      }
    }
  };
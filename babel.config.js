module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: "defaults", 
          useBuiltIns: ".jsx", 
          corejs: 3, 
        },
      ],
    ],
  };
  
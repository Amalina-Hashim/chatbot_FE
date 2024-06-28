const path = require("path");

module.exports = {
  entry: "./src/components/ChatBotWidget.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "chatbot-widget.js",
    library: "ChatBotWidget",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};

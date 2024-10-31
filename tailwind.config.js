/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    extend: {},
    colors: {
      amarilli: "#DEA71D",
      amarillooscuro: "#C7961A",
    },
  },
  plugins: [
    require("flowbite/plugin"), // add this line
  ],
};

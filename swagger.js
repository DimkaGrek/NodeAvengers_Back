import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "NodeAvengers",
        description: "if you have some question write to Dima or Artem)",
    },
    host: "localhost:3000",
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

swaggerAutogen()(outputFile, routes, doc).then(async () => {
    await import("./app.js"); 
});

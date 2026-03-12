import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Beats & Loops API",
    description: "Project for CSE341 - Digital Audio Assets Management",
  },
  host: "localhost:3000",
  schemes: ["http"],
  definitions: {
    Track: {
      title: "Midnight Study",
      bpm: 85,
      key: "A Minor",
      genre: "Lo-Fi",
      durationSeconds: 185,
      fileUrl: "https://example.com/audio.mp3",
      isPublic: true,
      categoryId: "65f1a1a1a1a1a1a1a1a1a101",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/app.js"]; // Entry point

// Generar la documentación
swaggerAutogen()(outputFile, endpointsFiles, doc);

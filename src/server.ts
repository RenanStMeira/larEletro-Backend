import express from "express";
import routes from "./Routes/routes"
import cors from "cors";
import "dotenv/config";
// import conecctDatabase from "./Config/Database/dbConnect";

// async function iniciarConexao() {
//         const conexao = await conecctDatabase();
      
//         conexao.on("error", (erro) => {
//           console.error("erro de conexão", erro);
//         });
      
//         conexao.once("open", () => {
//           console.log("Conexao com o banco feita com sucesso");
//         });
//       };
      
//       iniciarConexao();

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.listen(3333, () => {
        console.info('Server running on port 3333');
});

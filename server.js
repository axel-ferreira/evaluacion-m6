const express = require("express");
const {
  crearRoommates,
  mostrarRoommates,
  mostrarGastos,
  eliminarGasto,
  modificarGasto,
  crearGasto,
  getForm,
} = require("./funciones");

const app = express();
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//______________________________________________________________________
app.post("/roommates", async (req, res) => {
  try {
    await crearRoommates();
  } catch (error) {   
       res.statusCode= error.response.status    
  }
  res.json({});
});

app.get("/roommates", async (req, res) => {
  try {
    let roommates = await mostrarRoommates(); 
    res.json({ roommates });   
  } catch (error) {
    res.statusCode= error.response.status
  }
  
});
// // ________________________________________________________________
app.post("/gastos", async (req, res) => {
  const gasto = await getForm(req);
  try {
    await crearGasto(gasto);
  } catch (error) {
    res.statusCode= error.response.status 
  }
  res.json({});
});
app.get("/gastos", async (req, res) => {
  try {
    let gastos = await mostrarGastos();    
    res.json({ gastos });
  } catch (error) {
    res.statusCode= error.response.status
  }
});

app.put("/gastos", async (req, res) => {
  const gasto = await getForm(req);
  const id = req.query.id;

  try {
    await modificarGasto(id, gasto);
  } catch (error) {
    res.statusCode= error.response.status
  }
  res.json({});
});

app.delete("/gastos", async (req, res) => {
  const id = req.query.id;
  try {
    await eliminarGasto(id);
  } catch (error) {
    res.statusCode = 404;
  }
  res.json({});
});

app.get("*", (req, res) => {
  res.send("Página aún no implementada");
});

app.listen(3000, function () {
  console.log(`Servidor corriendo en http://localhost:${3000}/`);
});
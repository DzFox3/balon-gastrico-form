const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Resend } = require("resend");

const app = express();
const resend = new Resend("re_LiGKdcFv_6PyLRF9BHq46dJECwg7aDcxJ"); // Reemplaza con API Key

app.use(cors());
app.use(bodyParser.json());

const DESTINATARIO_PREDETERMINADO = "matiascontent@gmail.com"; // Reemplazar con el email de destino

app.post("/send-email", async (req, res) => {
  const { peso, altura, nombre, apellido, email, telefono } = req.body;

  const mensajeHTML = `
  <div style="font-family: Georgia; color: #333; padding: 10px; background-color: #bca48f;">
    <h2 style="color: #203244; text-align: center;">Nuevo Formulario de Datos Recibido</h2>
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #ffffff;">
      <h3 style="color: #333;">Datos del Usuario</h3>
      <p style="font-size: 16px; margin: 10px 0;"><strong>Nombre:</strong> ${nombre} ${apellido}</p>
      <p style="font-size: 16px; margin: 10px 0;"><strong>Correo Electrónico:</strong> ${email}</p>
      <p style="font-size: 16px; margin: 10px 0;"><strong>Teléfono:</strong> ${telefono}</p>
      <p style="font-size: 16px; margin: 10px 0;"><strong>Peso:</strong> ${peso} kg</p>
      <p style="font-size: 16px; margin: 10px 0;"><strong>Altura:</strong> ${altura} cm</p>
    </div>
    <div style="margin-top: 20px; text-align: center;">
      <p style="font-size: 14px; color: #777;">Gracias por enviarnos los datos. Nos pondremos en contacto pronto.</p>
    </div>
  </div>
`;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: DESTINATARIO_PREDETERMINADO,
      subject: "Nuevo formulario recibido",
      html: mensajeHTML,
    });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

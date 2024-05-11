import servidor from './server';

const puerto = process.env.PORT || 8080;

servidor.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
})
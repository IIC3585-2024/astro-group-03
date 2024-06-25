import { addSerieComment } from "../../lib/endpoints-manager";
import { checkAuth } from "../../lib/auth";

export const POST = async ({ request, cookies }) => {
  const formData = await request.formData();
  const serieId = formData.get("serieId")?.toString();
  const comment = formData.get("comment")?.toString();
  const stars = formData.get("stars")?.toString();

  if (!serieId || !comment || !stars) {
    return new Response("Todos los campos son obligatorios", { status: 400 });
  }

  try {
    const check = await checkAuth(cookies);
    
    if (!check.user) {
      return new Response("No estás autorizado para realizar esta acción", { status: 401 });
    }

    await addSerieComment(serieId, comment, stars, check.user.id);
    return new Response("Comentario añadido correctamente", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

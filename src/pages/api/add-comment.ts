import { addSerieComment } from "../../lib/endpoints-manager";
import { checkAuth } from "../../lib/auth";

export const POST = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const serieId = formData.get("serieId")?.toString();
  const comment = formData.get("comment")?.toString();
  const stars = formData.get("stars")?.toString();

  if (!serieId || !comment || !stars) {
    return redirect(`/series/${serieId}?message=${encodeURIComponent("Todos los campos son obligatorios")}`);
  }

  try {
    const check = await checkAuth(cookies);
    
    if (!check.user) {
      return new Response("No estás autorizado para realizar esta acción", { status: 401 });
    }

    await addSerieComment(serieId, comment, stars, check.user.id);
    return redirect(`/series/${serieId}`);
  } catch (error) {
    return redirect(`/series/${serieId}?message=${encodeURIComponent(error.message)}`);
  }
};

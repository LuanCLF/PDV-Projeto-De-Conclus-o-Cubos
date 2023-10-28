import { describe, expect, it } from "vitest";
import { testServer, tokenTest } from "../../vitest.setup";

describe("testes para a rota de detalhar perfil do usuário", async () => {
  let token = `Bearer ${await tokenTest()}`;

  it("tenta pegar as informações e consegue", async () => {
    const resposta = await testServer
      .get("/usuario")
      .set({ authorization: token });

    expect(resposta.body).toHaveProperty("id");
    expect(resposta.body).toHaveProperty("nome");
    expect(resposta.body).toHaveProperty("email");
    expect(resposta.statusCode).toEqual(200);
  });
});

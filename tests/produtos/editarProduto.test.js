import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { after, before, testServer, tokenTest } from "../vitest.setup";

describe("testes para a rota de edição do produto", async () => {
  const token = `Bearer ${await tokenTest()}`;
  beforeAll(async () => {
    await before();
  });

  afterAll(async () => {
    await after();
  });


  it("tenta editar um produto mas o produto não existe", async () => {
    const resposta = await testServer
      .put("/produto/-5")
      .set({ authorization: token });

    expect(resposta.statusCode).toEqual(404);
  });

  it("tenta editar um produto mas a categoria não existe", async () => {
    const resposta = await testServer
      .put("/produto/1")
      .set({ authorization: token })
      .send({ categoria_id: -6 });

    expect(resposta.statusCode).toEqual(404);
  });
});

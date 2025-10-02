const request = require("supertest");
const app = require("../app");

describe("API de Tarefas", () => {
  let tarefaId;

  test("GET /tarefas → 200 + JSON", async () => {
    const res = await request(app).get("/tarefas");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("POST /tarefas → 201 + JSON", async () => {
    const res = await request(app)
      .post("/tarefas")
      .send({ nome: "Estudar Node", concluida: false });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    tarefaId = res.body.id;
  });

  test("GET /tarefas/:id → 200 + JSON", async () => {
    const res = await request(app).get(`/tarefas/${tarefaId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", tarefaId);
  });

  test("GET /tarefas/1 → 404 + JSON", async () => {
    const res = await request(app).get("/tarefas/1");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ msg: "Tarefa não encontrada" });
  });

  test("PUT /tarefas/:id → 200 + JSON", async () => {
    const res = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ nome: "Estudar Node e Express", concluida: true });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", tarefaId);
  });

  test("PUT /tarefas/1 → 404 + JSON", async () => {
    const res = await request(app).put("/tarefas/1").send({});
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ msg: "Tarefa não encontrada" });
  });

  test("DELETE /tarefas/:id → 204", async () => {
    const res = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(res.status).toBe(204);
  });

  test("DELETE /tarefas/1 → 404 + JSON", async () => {
    const res = await request(app).delete("/tarefas/1");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ msg: "Tarefa não encontrada" });
  });
});

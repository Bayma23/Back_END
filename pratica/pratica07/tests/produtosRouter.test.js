const request = require('supertest');
const app = require('../app');

let idProduto;

describe('/produtos API', () => {
  it('POST /produtos cria um produto', async () => {
    const res = await request(app)
      .post('/produtos')
      .send({ nome: "Laranja", preco: 10.0 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nome).toBe("Laranja");
    expect(res.body.preco).toBe(10.0);

    idProduto = res.body._id;
  });

  it('POST /produtos sem JSON retorna 422', async () => {
    const res = await request(app).post('/produtos');
    expect(res.statusCode).toBe(422);
    expect(res.body.msg).toBe("Nome e preço do produto são obrigatórios");
  });

  it('GET /produtos lista produtos', async () => {
    const res = await request(app).get('/produtos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /produtos/:id retorna produto', async () => {
    const res = await request(app).get(`/produtos/${idProduto}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(idProduto);
  });

  it('PUT /produtos/:id atualiza produto', async () => {
    const res = await request(app)
      .put(`/produtos/${idProduto}`)
      .send({ nome: "Laranja Pera", preco: 18.0 });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe("Laranja Pera");
    expect(res.body.preco).toBe(18.0);
  });

  it('DELETE /produtos/:id remove produto', async () => {
    const res = await request(app).delete(`/produtos/${idProduto}`);
    expect(res.statusCode).toBe(204);
  });
});

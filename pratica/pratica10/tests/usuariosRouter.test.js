const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

let savedId = null;
let savedToken = null;

describe('/usuarios', () => {
  // Antes de todos, aguardar conexão com mongoose (se ainda não estiver).
  beforeAll(async () => {
    // opcional: aguardar 1s para ter certeza da conexão (ajuste conforme necessário)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, 20000);

  afterAll(async () => {
    // fechar conexão do mongoose para o jest encerrar
    await mongoose.connection.close();
  });

  test('POST /usuarios -> 201 e JSON com _id e email', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ email: 'usuario@email.com', senha: 'abcd1234' })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('usuario@email.com');

    savedId = res.body._id;
  });

  test('POST /usuarios sem JSON -> 422', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({})
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(422);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Email e Senha são obrigatórios');
  });

  test('POST /usuarios/login -> 200 e token', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'usuario@email.com', senha: 'abcd1234' })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('token');

    savedToken = res.body.token;
  });

  test('POST /usuarios/login sem JSON -> 401', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({})
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Credenciais inválidas');
  });

  test('POST /usuarios/renovar com token -> 200 e token', async () => {
    const res = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${savedToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /usuarios/renovar com token inválido -> 401', async () => {
    const res = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', 'Bearer 123456789');

    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Token invalido');
  });

  test('DELETE /usuarios/:id com token -> 204', async () => {
    const res = await request(app)
      .delete(`/usuarios/${savedId}`)
      .set('authorization', `Bearer ${savedToken}`);

    expect(res.statusCode).toBe(204);
    expect(res.text).toBe('');
  });
});

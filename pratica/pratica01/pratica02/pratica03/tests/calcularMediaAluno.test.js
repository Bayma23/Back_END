const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('A função calcularMediaAluno deve existir', () => {
  expect(calcularMediaAluno).toBeDefined();
});

test('Lança erro se a1 ou a2 não forem informadas', () => {
  expect(() => calcularMediaAluno(undefined, 5)).toThrow("Notas a1 ou a2 não informadas");
  expect(() => calcularMediaAluno(7, undefined)).toThrow("Notas a1 ou a2 não informadas");
});

test('Lança erro se a1 ou a2 forem negativas', () => {
  expect(() => calcularMediaAluno(-1, 5)).toThrow("Notas a1 ou a2 não podem ser negativas");
  expect(() => calcularMediaAluno(7, -2)).toThrow("Notas a1 ou a2 não podem ser negativas");
});

test('Calcula média base quando a3 não é informada (a1 * 0.4 + a2 * 0.6)', () => {
  expect(calcularMediaAluno(6, 8)).toBeCloseTo(6 * 0.4 + 8 * 0.6);
});

test('Lança erro se a3 for negativa', () => {
  expect(() => calcularMediaAluno(7, 8, -3)).toThrow("Nota a3 não pode ser negativa");
});

test('Com a3 informada, escolhe melhor combinação (a1 + a3)', () => {
  const res = calcularMediaAluno(5, 2, 9);
  expect(res).toBeCloseTo(5 * 0.4 + 9 * 0.6);
});

test('Com a3 informada, escolhe melhor combinação (a2 + a3)', () => {
  const res = calcularMediaAluno(3, 7, 10);
  expect(res).toBeCloseTo(7 * 0.6 + 10 * 0.4);
});

  
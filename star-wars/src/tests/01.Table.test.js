/* eslint-disable no-magic-numbers */
import React from 'react';
import { render, screen } from '@testing-library/react';
import testData from '../../cypress/mocks/testData';
import App from '../App';

const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
const headerTable = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
  'Climate', 'Gravity', 'Terrain',
  'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL'];

describe('Table', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Faz uma requisição para o endpoint "/planets" ', () => {
    render(<App />);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Header da tabela é preenchido com os seguintes dados" ', async () => {
    render(<App />);
    await screen.findByRole('table', '', { timeout: 5000 });
    headerTable
      .map((header) => expect(screen
        .getByRole('columnheader', { name: header })).toBeInTheDocument());
    const linhas = document.getElementsByTagName('tr');
    expect(linhas).toHaveLength(11);
  }, 30000);

  it('Verifica se a tabela é preenchida corretamente" ', async () => {
    render(<App />);
    await screen.findByRole('table', '', { timeout: 5000 });
    testData.results
      .map((planet) => expect(screen
        .getByRole('cell', { name: planet.name })).toBeInTheDocument());
  }, 30000);
});

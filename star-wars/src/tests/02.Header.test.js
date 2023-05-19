/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-magic-numbers */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import App from '../App';

describe('Header', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Funciona corretamente ao digitar "a"', async () => {
    render(<App />);
    await screen.findByRole('table', '', { timeout: 5000 });
    const input = screen.getByTestId('name-filter');
    userEvent.type(input, 'a');
    const linhas = document.getElementsByTagName('tr');
    expect(linhas).toHaveLength(8);
  }, 30000);
  it('Funciona corretamente ao digitar "aa"', async () => {
    render(<App />);
    await screen.findByRole('table', '', { timeout: 5000 });
    const input = screen.getByTestId('name-filter');
    userEvent.type(input, 'aa');
    const linhas = document.getElementsByTagName('tr');
    expect(linhas).toHaveLength(2);
  }, 30000);
  it('Existe um botão de filtrar', async () => {
    render(<App />);
    await screen.findByRole('table', '', { timeout: 5000 });
    const button = screen.getByTestId('column-sort-button');
    expect(button).toBeInTheDocument();
  }, 30000);
  it('Funciona a função ordernar', async () => {
    render(<App />);
    await screen.findByRole('table', '', { timeout: 5000 });
    const buttonOrder = screen.getByTestId('column-sort-button');
    userEvent.click(buttonOrder);
    expect(document.getElementsByTagName('tr')[1]).toHaveTextContent('Yavin');
    userEvent.selectOptions(screen.getByTestId('column-sort'), 'diameter');
    userEvent.click(buttonOrder);
    expect(document.getElementsByTagName('tr')[1]).toHaveTextContent('Endor');
    userEvent.click(screen.getByTestId('column-sort-input-desc'));
    userEvent.click(buttonOrder);
    expect(document.getElementsByTagName('tr')[1]).toHaveTextContent('Bespin');
    userEvent.selectOptions(screen.getByTestId('column-sort'), 'population');
    userEvent.click(screen.getByTestId('column-sort-input-asc'));
    userEvent.click(buttonOrder);
    expect(document.getElementsByTagName('tr')[10]).toHaveTextContent('Hoth');
    userEvent.click(screen.getByTestId('column-sort-input-desc'));
    userEvent.click(buttonOrder);
    expect(document.getElementsByTagName('tr')[10]).toHaveTextContent('Hoth');
  }, 30000);

  it('Função dos filtros', async () => {
    render(<App />);
    await screen.findByRole('table', '', { timeout: 5000 });
    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.type(screen.getByTestId('value-filter'), '1000');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'diameter');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.type(screen.getByTestId('value-filter'), '9000');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    userEvent.type(screen.getByTestId('value-filter'), '500');
    userEvent.click(buttonFilter);
    expect(screen.getAllByRole('row')).toHaveLength(6);
    userEvent.click(screen.getAllByRole('button', { name: 'Remover' })[2]);
    expect(screen.getAllByRole('row')).toHaveLength(8);
    const input = screen.getByTestId('name-filter');
    userEvent.type(input, 'a');
    const linhas = document.getElementsByTagName('tr');
    expect(linhas).toHaveLength(7);
  }, 30000);
});

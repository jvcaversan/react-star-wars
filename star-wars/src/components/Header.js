import React, { useContext } from 'react';
import starContext from '../context/starContext';

function Header() {
  const { handleInput,
    nameFilter,
    handleChange,
    filterButton,
    newColumn,
    filterList,
    clearFilter,
    clearAll,
    filter,
    handleOrder,
    column,
    orderList,
    searchList,
  } = useContext(starContext);

  return (
    <div>
      <label htmlFor="search">
        Pesquise aqui:
        {' '}
        <input
          type="text"
          id="search"
          data-testid="name-filter"
          value={ nameFilter.name }
          onChange={ handleInput }
        />
      </label>
      {' '}
      <label htmlFor="columnFilter">
        Coluna:
        {' '}
        <select
          data-testid="column-filter"
          id="columnFilter"
          onChange={ handleChange }
          name="columnFilter"
        >
          {newColumn.map((item) => (
            <option
              key={ `${item}1` }
              value={ item }
            >
              {item}
            </option>))}
        </select>
      </label>
      {' '}
      <label htmlFor="comparision">
        Operador:
        {' '}
        <select
          data-testid="comparison-filter"
          id="comparision"
          onChange={ handleChange }
          name="comparision"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="numberInput">
        Numero:
        {' '}
        <input
          type="number"
          id="numberInput"
          data-testid="value-filter"
          value={ filter.inputNumber }
          name="inputNumber"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterButton }
        disabled={ newColumn.length === 0 }
      >
        Filtrar

      </button>
      <label htmlFor="columnSort">
        {' '}
        <select
          data-testid="column-sort"
          id="columnSort"
          onChange={ handleOrder }
          name="column"
        >
          {column.map((item) => (
            <option
              key={ `${item}sort` }
              value={ item }
            >
              {item}
            </option>))}
        </select>
      </label>
      <label htmlFor="sortASC">
        <input
          id="sortASC"
          name="sort"
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          onClick={ handleOrder }
          defaultChecked="checked"
        />
        ASC
      </label>
      <label htmlFor="sortDESC">
        <input
          id="sortDESC"
          name="sort"
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          onClick={ handleOrder }

        />
        DESC
      </label>
      {' '}
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => orderList(searchList) }
      >
        Order

      </button>

      {filterList.length > 0
      && filterList.map(({ columnFilter, comparision, inputNumber }) => (
        <div
          key={ columnFilter }
          data-testid="filter"
        >
          {`${columnFilter} ${comparision} ${inputNumber}`}
          {' '}
          <button
            type="button"
            id={ `${columnFilter}` }
            onClick={ clearFilter }
          >
            Remover
          </button>
        </div>))}
      {filterList.length > 0
                  && (
                    <button
                      type="button"
                      data-testid="button-remove-filters"
                      onClick={ clearAll }
                    >
                      Remover Filtros
                    </button>)}
    </div>
  );
}
export default Header;

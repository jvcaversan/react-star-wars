import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starContext from './starContext';

function Provider({ children }) {
  const column = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [data, setData] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [nameFilter, setNameFilter] = useState({ name: '' });
  const [filter, setFilter] = useState({ columnFilter: 'population',
    comparision: 'maior que',
    inputNumber: 0,
  });
  const [filtrado, setFiltrado] = useState(false);
  const [newColumn, setNewColumn] = useState([...column]);
  const [filterList, setFilterList] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const handleOrder = ({ target: { value, name } }) => {
    setOrder({ ...order, [name]: value });
  };
  const orderList = (element) => {
    if (order.sort === 'ASC') {
      const result = element.sort((one, two) => {
        const oneMin = -1;
        if (one[order.column] === 'unknown') {
          return 1;
        }
        if (two[order.column] === 'unknown') {
          return oneMin;
        }
        return Number(one[order.column]) - Number(two[order.column]);
      });
      setSearchList([...result]);
    } else {
      const result = element.sort((one, two) => {
        const oneMin = -1;
        if (one[order.column] === 'unknown') {
          return 1;
        }
        if (two[order.column] === 'unknown') {
          return oneMin;
        }

        return Number(two[order.column]) - Number(one[order.column]);
      });
      setSearchList([...result]);
    }
  };
  const updateColumn = () => {
    if (filtrado) {
      const result = newColumn.filter((item) => item !== filter.columnFilter);
      setNewColumn(result);
    } else {
      const result = column.filter((item) => item !== filter.columnFilter);
      setNewColumn(result);
    }
  };
  const fetchPlanets = async () => {
    const arrayPlanets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json());
    arrayPlanets.results.map((planet) => delete planet.residents);
    setData(arrayPlanets.results);
    setSearchList(arrayPlanets.results.sort((one, two) => {
      const minusOne = -1;
      if (one.name < two.name) {
        return minusOne;
      }
      return true;
    }));
  };
  const handleInput = ({ target: { value } }) => {
    setNameFilter({ name: value });
    if (filterList.length > 0) {
      const result = searchList.filter((planet) => planet.name
        .toUpperCase().includes(value.toUpperCase()));
      setSearchList(result);
    } else {
      const result = data.filter((planet) => planet.name
        .toUpperCase().includes(value.toUpperCase()));
      setSearchList(result);
    }
  };
  const handleChange = ({ target: { value, name } }) => {
    setFilter({ ...filter, [name]: value });
  };
  const buttonFilter = (element, filters) => {
    if (filters.comparision === 'maior que') {
      const result = element.filter((planet) => Number(planet[filters.columnFilter])
        > Number(filters.inputNumber));
      setSearchList(result);
    } else if (filters.comparision === 'menor que') {
      const result = element.filter((planet) => Number(planet[filters.columnFilter])
        < Number(filters.inputNumber));
      setSearchList(result);
    } else {
      const result = element.filter((planet) => Number(planet[filters.columnFilter])
        === Number(filters.inputNumber));
      setSearchList(result);
    }
  };
  useEffect(() => {
    setFilter({ columnFilter: newColumn[0],
      comparision: 'maior que',
      inputNumber: 0,
    });
  }, [newColumn]);
  const filterButton = () => {
    setFilterList([...filterList, filter]);
    updateColumn();
    setFiltrado(true);
  };
  const filterAll = () => {
    filterList.map((filters) => (
      buttonFilter(searchList, filters)
    ));
  };
  useEffect(() => {
    filterAll();
  }, [filterList]);
  const clearFilter = ({ target: { id } }) => {
    setSearchList(data);
    const newFilterList = filterList.filter((item) => item.columnFilter !== id);
    setFilterList(newFilterList);
    const response = newFilterList.map((f) => f.columnFilter);
    setNewColumn(column.filter((ys) => !response.includes(ys)));
  };
  const clearAll = () => {
    setSearchList(data);
    setFilterList([]);
    setNewColumn(column);
  };
  const contextValue = { data,
    fetchPlanets,
    handleInput,
    searchList,
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
  };
  return (
    <starContext.Provider
      value={ contextValue }
    >
      {children}
    </starContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;

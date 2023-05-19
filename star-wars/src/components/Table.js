import React, { useContext, useEffect } from 'react';
import starContext from '../context/starContext';

function Table() {
  const { fetchPlanets, searchList } = useContext(starContext);
  const headerTable = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain',
    'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL'];
  useEffect(() => {
    fetchPlanets();
  }, []);
  return (
    <table>
      <thead>
        <tr>
          {headerTable.map((header) => <th key={ header }>{ header }</th>)}
        </tr>
      </thead>
      <tbody>
        {searchList.map((planet) => (
          <tr key={ planet.name }>
            {Object.values(planet).map((item, index) => (
              index === 0 ? <td key={ index } data-testid="planet-name">{item}</td>
                : <td key={ index }>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;

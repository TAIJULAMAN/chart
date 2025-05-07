import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChartDataTable = ({ data, columns, onDataChange }) => {
  const { currentTheme } = useTheme();
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleCellClick = (rowIndex, column) => {
    setEditingCell({ rowIndex, column });
    setEditValue(data[rowIndex][column]);
  };

  const handleCellEdit = (e) => {
    setEditValue(e.target.value);
  };

  const handleCellBlur = () => {
    if (editingCell) {
      const newData = [...data];
      newData[editingCell.rowIndex][editingCell.column] = editValue;
      onDataChange(newData);
      setEditingCell(null);
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden ${
      currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  onClick={() => handleSort(column)}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${
                    currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column}</span>
                    {sortConfig.key === column && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${
            currentTheme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
          }`}>
            {sortedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column}
                    className={`px-6 py-4 whitespace-nowrap ${
                      currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                    }`}
                    onClick={() => handleCellClick(rowIndex, column)}
                  >
                    {editingCell?.rowIndex === rowIndex && editingCell?.column === column ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={handleCellEdit}
                        onBlur={handleCellBlur}
                        className={`w-full px-2 py-1 rounded ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-50 text-gray-900'
                        }`}
                        autoFocus
                      />
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChartDataTable;

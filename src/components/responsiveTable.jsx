import React, { useState, useEffect } from 'react';

const ResponsiveTable = ({ CardComponent, data }) => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth < 768 ? 1 : 3); // Adjust breakpoint and column count as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to chunk data into rows
  const chunkData = (data, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Chunk data based on the number of columns
  const rows = chunkData(data, columns);

  return (
    <table className="responsive-table">
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((item, colIndex) => (
              <td key={colIndex}>
                <CardComponent data={item} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResponsiveTable;

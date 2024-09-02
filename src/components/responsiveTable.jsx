import React, { useState, useEffect } from 'react';

const ResponsiveTable = ({ CardComponent, data }) => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth < 768 ? 3 : 4); // Adjust breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <table className="responsive-table">
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Array.from({ length: columns }).map((_, colIndex) => (
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
import React from 'react';

const requestsArray = [1, 2, 3];
export default function RequestsList(): JSX.Element {
  return (
    <div className="requests-list">
      <ul>
        {
          requestsArray.map((request, index) => (
            <li key={index}>
              {request}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

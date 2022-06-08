import React, { useEffect, useState} from 'react';
import { myBrand } from '../store/selectBrand.store';
// import Success from '../icons/Success.svg';

// const SuccessIcon = () => {
//   return(
//     <img src={Success}></img>
//   )
// }

const RequestsListItem = (): JSX.Element => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    myBrand.getRequestsFromAPI('/reg_service/api/v1/requests')
      // .then(res => console.log(res.data));
      .then(res => setRequests(res.data));
  }, [])
  return(
    <div className="requests-list">
        <ul>
          {
            requests.map((request: any) => (
              <li key={request.id}>
                {/* <SuccessIcon /> */}
                {request.city.name}
              </li>
            ))
          }
        </ul>
      </div>
  )
}

export default RequestsListItem;
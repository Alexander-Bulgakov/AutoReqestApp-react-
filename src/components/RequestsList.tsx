import React, { useEffect, useState} from 'react';
import { myBrand } from '../store/selectBrand.store';
import ListItem from './ListItem';
import './RequestsListItem.scss';

const RequestsList = (): JSX.Element => {
  
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    myBrand.getRequestsFromAPI('/reg_service/api/v1/requests')
      .then(res => setRequests(res.data));
  }, [])

  return(
    <ul className="requests-list">
      {
        requests.map((request: any) => (
          <li key={request.id}>
            <ListItem 
              code={request.status.code} 
              id={request.id} 
              brand={request.auto.brand} 
              model={request.auto.model.name} 
              date={request.createDate}/>
          </li>
        ))
      }
    </ul>
  )
}

export default RequestsList;
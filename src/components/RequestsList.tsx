import { observer } from 'mobx-react-lite';
import React, { useEffect, useState} from 'react';
import { myStore } from '../store/MyStore.store';
import ListItem from './ListItem';
import './RequestsList.scss';

const RequestsList = (): JSX.Element => {
  const [requests, setRequests] = useState([]);
  let processingReq;

  useEffect(() => {
    myStore.getRequestsFromAPI('/reg_service/api/v1/requests')
      .then(res => {
        processingReq = res.data.find((item: any) => item.status.code === 'PROCESSING');
        if (processingReq) myStore.setProcessing();
        setRequests(res.data)
      });
  }, [])

  return(
    <ul className="requests-list">
      {
        requests.map((request: any) => (
        // myStore.requests.map((request: any) => (
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

export default observer(RequestsList);
import { observer } from 'mobx-react-lite';
import React, { useEffect} from 'react';
import { myStore } from '../store/MyStore.store';
import ListItem from './ListItem';
import './RequestsListItem.scss';

const RequestsList = (): JSX.Element => {
  
  let processingReq;

  useEffect(() => {
    myStore.getRequestsFromAPI('/reg_service/api/v1/requests')
      .then(res => {
        console.log('itemList res.data >>> ', res.data);
        processingReq = res.data.find((item: any) => item.status.code === 'PROCESSING');
        console.log('processingReq >>> ', processingReq);
        
        if (processingReq) myStore.setProcessing();
        myStore.setRequests(res.data);
      });
  }, [])

  return(
    <ul className="requests-list">
      {
        myStore.requests.map((request: any) => (
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
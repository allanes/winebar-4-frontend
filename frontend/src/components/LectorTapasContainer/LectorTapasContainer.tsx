import React, { useEffect, useState } from 'react';
import { LectorTapa } from '../../codegen_output';
import { LectorTapasList } from './LectorTapasList';
import { LectoresDeTapasService } from '../../codegen_output';
import { handleApiError } from '../ClientsContainer/ClientsContainer';
import { Row, Col } from 'react-bootstrap';

export const LectorTapasContainer = () => {
  const [lectoresTapasList, setLectoresTapasList] = useState<LectorTapa[]>([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const fetchLectoresTapas = async () => {
      try {
        const lectoresResponse = await LectoresDeTapasService.handleReadLectorsTapasPorTerminalBackendApiV1LectoresTapasPorTerminalGet();
        setLectoresTapasList(lectoresResponse);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchLectoresTapas();
  }, [refreshCounter]); // Depend on refreshCounter to trigger re-fetch

  const refreshList = () => {
    setRefreshCounter((prev) => prev + 1); // Increment to trigger re-fetch
  };

  return (
    <div>
        <Row className='mb-3'>
          <Col>          
            <LectorTapasList 
              lectoresTapasList={lectoresTapasList}
              handleUpdateListado={refreshList}
            />
          </Col>
      </Row>
    </div>
  );
};

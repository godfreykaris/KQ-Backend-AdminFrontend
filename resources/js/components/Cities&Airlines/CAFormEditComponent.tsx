import React from 'react';
import BaseFormComponent from '../Common/BaseFormComponent';


const CAFormEditComponent: React.FC = () => {

  const entityTypes = [
    { entityType: 'City', value: 'cities' },
    { entityType: 'Airline', value: 'airlines' },
    
  ];

  return <BaseFormComponent dataCategory="cities_airlines" formType="Edit" entityTypes={entityTypes}/>;
};

export default CAFormEditComponent;

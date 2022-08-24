import { useContext } from 'react';

/* Context Imports */
import DataContext from 'contexts/DataContext';

const useData = () => {
    return useContext(DataContext);
}

export default useData;
import React, { createContext, useState } from 'react';


export const CaptainDataContext = createContext();



// export const useCaptain = () => {
//     const context = React.useContext(CaptainDataContext);
//     if (!context) {
//         throw new Error('useCaptain must be used within a CaptainProvider');
//     }
//     return context;
// };

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captain) => {
        setCaptain(captain);
    };

    const value={
        captain,
        setCaptain,
        loading,
        setLoading,
        error,
        setError,
        updateCaptain
    }

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
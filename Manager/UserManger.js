import React, {createContext, useState } from 'react';

const DetailsContext=createContext();

const ProfileProvider=({children})=>{
    const [uid, setUid]=useState(null);
    return
    (
        <DetailsContext.Provider value={{
            uid, setUid
        }}>
            {children}
        </DetailsContext.Provider>
    );
}

export {DetailsContext,ProfileProvider};

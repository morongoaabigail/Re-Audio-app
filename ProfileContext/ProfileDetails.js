import React, {createContext, useState } from 'react';
const ProfileDetailsContext=createContext();
const ProfileProvider=({children})=>{
    const [uid, setUid]=useState(null);
    return
    (
        <ProfileDetailsContext.Provider value={{
            uid, setUid
        }}>
            {children}
        </ProfileDetailsContext.Provider>
    );
}

export {ProfileDetailsContext,ProfileProvider};

import React, { useState } from 'react';
import Overview from '../../../modules/voting/overview'

const VotingOverview = () => {
    return (
        <>
            <div className="container mt-3 text-center">
                <h1 className="font-moesland">Stemmen Ranglijst</h1>
                <Overview />
            </div>
        </>
    )
}

export default VotingOverview;
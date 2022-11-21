import React from 'react';
import { ThreeBounce } from 'better-react-spinkit'

// Reference: exempli-gratia
// Edited by Xiao Lin

//Show a loading indicator with animations
export default function LoadingIndicator() {
    return (
        <div className="loading-indicator" style={{display: 'block', textAlign: 'center', marginTop: '400px'}}>
            Loading data from library, please wait ...
            <div>
                <ThreeBounce size={30} color='green' />
            </div>
        </div>
    );
}
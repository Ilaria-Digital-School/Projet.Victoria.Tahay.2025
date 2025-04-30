import React from "react";
import { useParams } from 'react-router-dom';

// Component to display dynamic ID from URL parameters
const Id = () => {
    const { id } = useParams();

    // Render a simple dashboard displaying the retrieved ID
    return (
        <div>
            ID Dynamics Dashboard - ID : {id}
        </div>
    );
};

export default Id;

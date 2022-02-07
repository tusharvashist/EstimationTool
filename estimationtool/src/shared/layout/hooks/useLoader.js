import React, {  useState } from 'react';
import { Box, CircularProgress } from "@material-ui/core";

const useLoader = ({ ml = 1, size = 32, mr = 2, color = "primary" } = {}) => {
    const [isLoading, setLoading] = useState(false)

    const loader = <Box ml={ml} style={{
        display: "flex"
        , justifyContent: "center"
    }}>
        <CircularProgress color={color} size={size} mr={mr} />
    </Box>
    return [isLoading ? loader : null,
        setLoading
    ]
};

export default useLoader;
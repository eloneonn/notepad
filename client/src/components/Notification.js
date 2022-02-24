import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Notification = () => { //? GROW-TRANSITIO MYÖS PIILOTETTAESSA (saattaa vaatia paikallisen tilan)
    const notification = useSelector(state => state.notification)
    var open = false

    if (notification === null) {
        open = false
        return (
            <div></div>
        )
    } else {
        open = true
        const type = notification[0]
        const message = notification[1]    
        return (
            <Snackbar open={open} autoHideDuration={5000} sx={{ bottom: { xs: 110, sm: 0 } }}>
                <Alert severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        )
    }
}

export default Notification
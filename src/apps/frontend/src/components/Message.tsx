import Alert from "react-bootstrap/Alert";
import React from "react";

export function Message({message, variant}: { message: string | undefined; variant: "info" | "warning" }) {
    if (!message) {
        return null;
    }
    return <Alert variant={variant}>
        {message}
    </Alert>
}
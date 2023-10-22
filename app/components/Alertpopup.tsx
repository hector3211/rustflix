import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type AlertProps = {
    title: string;
    message: string;
    // alertType: "movie" | "add" | null;
};

export function AlertPop({ title, message }: AlertProps) {
    return (
        <Alert className="z-50 fixed bottom-5 right-2 w-1/3 bg-transparent backdrop-blur-lg border border-white p-3">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="font-medium">{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}

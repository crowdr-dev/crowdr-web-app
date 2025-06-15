export const extractErrorMessage = (error: unknown) => {
       let errorMessage;
       if (typeof error === "string") {
         errorMessage = error;
       } else if (error instanceof Error) {
         errorMessage = error.message;
       }
       return errorMessage
}
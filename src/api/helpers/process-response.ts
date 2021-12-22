export const processResponse = (response: Response) => {
  // If response is ok (status 200), just parse the json
  if (response.ok) {
    return response.json();
  }
  // Else it's an error
  return (
    response
      // Clone the response because you cant call .json() twice on the same Response
      .clone()
      // Try to parse the error as json
      .json()
      // If it worked return the error message
      .then((json: any) => {
        // throw json.message
        console.log("error json", json);
        return Promise.reject(json.message);
      })
      .catch((error: any) => {
        return Promise.reject(error);
      })
  );
};

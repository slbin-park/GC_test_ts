const response = ({ isSuccess, code, msg }: any, result?: any) => {
  return {
    isSuccess,
    code,
    msg,
    result,
  };
};

const errResponse = ({ isSuccess, code, message }: any) => {
  return {
    isSuccess,
    code,
    message,
  };
};

export { response, errResponse };

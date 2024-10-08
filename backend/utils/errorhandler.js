class Errorhandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.costructor)
    }
};
export default Errorhandler;
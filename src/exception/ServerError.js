class ServerError extends Error {
    constructor(Code, Desc) {
        switch (typeof Code) {
            case "number":
                super();
                this.message = `Code is : ${Code}\nDesc is : ${Desc}`;
                this.Code = Code;
                this.Desc = Desc;
                break;
            case 'string':
                super();
                this.Code = Code;
                this.message = Code;
                break;
            default:
                super();
        }
        this.name = 'ServerError';
    }
}

export default ServerError;

declare namespace Api {

    interface ICustomEmail {
        to: string;
        from?: string;
        subject: string;
        msg: string;
    }
    interface ISupportRequest {
        
    }
    interface IError {
        message: string;
    }

    interface IUser {
        id: number;
        name: string;
        email: string;
    }

    interface IUserFilter {
        searchText?: string;
        nameContains?: string;
        emailContains?: string;
    }

    interface IUserCreateData {
        name: string;
        email: string;
    }

    interface IUserUpdateData {
        name: string;
        email: string;
    }

}
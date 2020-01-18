
declare namespace Api {

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

    interface UserPreferencesChangeRequest {
        theme: string;
    }

    interface SendEmailRequest {
        from?: string;
        to: string;
        subject: string;
        message: string;
    }
    interface SupportRequest {
        email: string;
        subject: string;
        message: string;
    }

    interface SupportResponse {
        message: string;
    }

    interface LoginRequest {
        username: string;
        password: string;
    }

    interface LoginResponse {
        access_token: string;
        token_type: string;
        expires_in:	number;
    }

    interface UserAddress {
        country: string;   
    }
    interface UserProfile {
        sub: string;
        name?: string;
        given_name?: string;
        family_name?: string;
        middle_name?: string;
        nickname?: string;
        preferred_username?: string;
        profile?: string;
        picture?: string;
        website?: string;
        email: string;
        email_verified?: boolean;
        gender?: string;
        birthdate?: string;
        zoneinfo?: string;
        locale?: string;
        phone_number?: string;
        phone_number_verified?: boolean;
        address?: UserAddress;
        updated_at?: number;
    }

    interface IRegisterRequest {
        email: string;
        password: string;
        given_name?: string;
        family_name?: string;
        name?: string;
        nickname?: string;
        picture?: string;
    }

    interface IRegisterResponse {
    }

    interface IChangePasswordRequest {
        email: string;
    }

    interface IChangePasswordRequest {
        message: string;
    }


}
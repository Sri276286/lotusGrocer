export class ApiConfig {
    static apiHostUrl: string = 'localhost:3000';
    static loginURL: string = `${ApiConfig.apiHostUrl}/auth/login`; // POST
    static signupURL: string = `${ApiConfig.apiHostUrl}/auth/signup`; // POST
    static logoutURL: string = `${ApiConfig.apiHostUrl}/auth/logout`; // GET
}
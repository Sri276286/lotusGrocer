export class ApiConfig {
    static apiHostUrl: string = 'localhost:3000';
    static loginURL: string = `${ApiConfig.apiHostUrl}/auth/login`; // POST
    static signupURL: string = `${ApiConfig.apiHostUrl}/auth/signup`; // POST
    static logoutURL: string = `${ApiConfig.apiHostUrl}/auth/logout`; // GET

    static cartUpdateURL: string = `${ApiConfig.apiHostUrl}/orderProducts/upsert`; // PUT
    static cartTotalURL: string = `${ApiConfig.apiHostUrl}/orders/total/products/IN_CART`; // GET

    // Used for getting cart details, order details based on order status
    static commonCartAndOrderURL: string = `${ApiConfig.apiHostUrl}/orders/customers/orderStatus`;
}
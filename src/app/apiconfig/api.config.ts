export class ApiConfig {
    static apiHostUrl: string = 'localhost:3000';
    static loginURL: string = `${ApiConfig.apiHostUrl}/auth/login`; // POST
    static signupURL: string = `${ApiConfig.apiHostUrl}/auth/signup`; // POST
    static logoutURL: string = `${ApiConfig.apiHostUrl}/auth/logout`; // GET

    static userDetailsURL: string = `${ApiConfig.apiHostUrl}/user/me`; // GET, POST

    static cartUpdateURL: string = `${ApiConfig.apiHostUrl}/orderProducts/upsert`; // PUT
    static cartTotalURL: string = `${ApiConfig.apiHostUrl}/orders/total/products/IN_CART`; // GET

    // Used for getting cart details, order details based on order status
    static commonCartAndOrderURL: string = `${ApiConfig.apiHostUrl}/orders/customers/orderStatus`;

    static userAddressListURL: string = `${ApiConfig.apiHostUrl}/user/address/list`; // GET
    static userAddressAddURL: string = `${ApiConfig.apiHostUrl}/user/address/save`; // POST
    static userAddressUpdateURL: string = `${ApiConfig.apiHostUrl}/user/address/update`; // POST
    static userAddressDeleteURL: string = `${ApiConfig.apiHostUrl}/user/address`; // POST
    static setPrimaryAddressURL: string = `${ApiConfig.apiHostUrl}/user/makePrimary`; // POST
}
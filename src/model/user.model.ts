
/**
* This is internal to this server
* UserDTO will be created in a few commits
*/
export interface User {
    id: string;
    userName: string;
    fullName: string;
    password: string;
}

/**
 * Public object to be used for response to client
 * UserDTO
 */
export interface UserDto {
    id: string;
    userName: string;
    fullName: string;
    token?: string;
    authUser?: AuthUser;
};

export interface AuthUser {
    id: string;
    username: string;
}
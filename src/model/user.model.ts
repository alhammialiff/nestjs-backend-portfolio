
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
export interface UserDTO {
    id: string;
    userName: string;
    fullName: string;
}
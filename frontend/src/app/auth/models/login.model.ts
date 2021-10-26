export class LoginRequest {
    email: string;
    password: string;
}
export class ResetPasswordRequest {
    email: string;
}
export class TokenResponse {
    token: string;
    expiration: Date;
}

import { PAuth } from "@/app/core/application/port/auth.port";
import { ClientHttp } from "../utils/client-http";
import { ILoginRequest } from "@/app/core/application/dto/auth/logi-request.dto";
import { ILoginResponse } from "@/app/core/application/dto/auth/login-response.dto";

export class AuthService implements PAuth {

    private clientHttp : ClientHttp;
    private basePath : string = "auth";

    constructor() {
        this.clientHttp = new ClientHttp();
    };

    async login(request : ILoginRequest) : Promise<ILoginResponse> {

        return this.clientHttp.post<ILoginResponse, ILoginRequest>(`${this.basePath}/login`, request);
    };
};
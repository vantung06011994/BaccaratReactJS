import JwtRepository, { IJwtRepository } from "core/domain/jwt/jwtRepository";

export interface IRepositories {
    jwt: IJwtRepository;
}

export default (infrastructure: IInfrastructures): IRepositories => {
    return {
        jwt: new JwtRepository(infrastructure),
    };
};

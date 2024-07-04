import JwtAuthUseCase, { IJWTAuthUseCase } from "../../domain/jwt/jwtAuthUseCase";

import GameUseCase from "./../../domain/game/GameUseCase";
import { IRepositories } from "../repositories";

export interface IUseCases {
    jwt: IJWTAuthUseCase;
}

const UseCases = (repositories: IRepositories): IUseCases => {
    return {
        jwt: new JwtAuthUseCase(repositories.jwt),
        game: new GameUseCase(),
    };
};
export default UseCases;

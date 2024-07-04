import Infrastructures from "../infrastructures";
import Repositories from "../repositories";
import useCases from "../useCases";

const cInfrastructures = Infrastructures();
const cRepositorires = Repositories(cInfrastructures);
const cUseCases = useCases(cRepositorires);

const presenter = {
    jwt: cUseCases.jwt,
    game: cUseCases.game,
};
export default presenter;

import "./Modules.scss";
import {useEffect, useState} from "react";
import ModuleService from "../../services/moduleService.ts";
import {ModulesResponse} from "../../interfaces/responses.ts";
import Module from "../../components/Module/Module.tsx";
import {Link} from "react-router-dom";

const Modules = () => {
    const [modules, setModules] = useState<ModulesResponse | null>(null)
    const getModules = async () => {
        const moduleService = new ModuleService();
        const modules: ModulesResponse = await moduleService.getModules();
        setModules(modules);
    }
    useEffect(() => {
        getModules();
    }, []);

    if (!modules || modules.items.length === 0) {
        return <div>Brak danych</div>
    }
    return (
        <>
            <div className="modules-list">
                <h1 className="modules-list__title">
                    Lista modułów
                </h1>
                <div className="modules-list__modules">
                    {modules.items.map((module) =>
                        <div key={module.id} className="modules-list__module">
                            <Link to={`/modules/${module.id}`}>
                                <Module title={module.name} description={module.description}/>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Modules

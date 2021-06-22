
import axios, {AxiosInstance } from "axios";
 import config from "@/config/rest-selected";


//TODO: Get from file (one for dev, other for homologation, and other to production ?)
const connectorDefault = axios.create(config.aeksiaBackEnd);
const connectorContentManager = axios.create(config.contentManager);


export default function getAPI(name ?:string) :AxiosInstance
{
    const isDefault : boolean = name == undefined;
    if(isDefault)
    {
        return connectorDefault;
    }    
    else if(name?.toLocaleLowerCase()=="contentmanager")
    {
        return connectorContentManager;
    }
    else if(name=="aeksiabackend")
    {
        return connectorDefault;
    }

    throw Error(`API Connector not found [${name}]`);
}

 
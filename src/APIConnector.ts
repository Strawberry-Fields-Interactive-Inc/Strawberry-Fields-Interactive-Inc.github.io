
import axios, {AxiosInstance } from "axios";
 import config from "@/config/rest-selected";


//TODO: Get from file (one for dev, other for homologation, and other to production ?)
const connectorDefault = axios.create(config.aeksiaBackEnd);
const connnectorContentManager = axios.create(config.contentManager);


export default function getAPI(name ?:string) :AxiosInstance
{
    const isDefault : boolean = name == undefined;
    if(isDefault)
    {
        return connectorDefault;
    }
    else if(name?.toLowerCase()=="aeksiabackend")
    {
        return connectorDefault;
    }
    else if(name?.toLowerCase()=="contentManager")
    {
        return connnectorContentManager;
    }
    throw Error(`API Connector not found [${name}]`);
}

 
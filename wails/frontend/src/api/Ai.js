import dify_api from "./axios"
class AiWapper{
    static base_ai = dify_api

    constructor(){

    }

    static setBaseAi(base_ai){
        this.base_ai = base_ai
    }

    

}
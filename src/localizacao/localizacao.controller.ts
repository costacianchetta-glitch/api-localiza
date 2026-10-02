import { Controller,Get,Param } from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';
import { get } from 'axios';

@Controller('localizacao')
export class LocalizacaoController {
    constructor (private readonly localizacaoService:LocalizacaoService){}


    // get /localização/cep/cep:
    @Get('cep/:cep')
    buscarCep(@Param('cep') cep:string){
        return this.localizacaoService.buscarCep(cep);
    }
     @Get('cidade/:cidade')
    buscarCidade(@Param('cidade') cidade:string){
        return this.localizacaoService.buscarCidade(cidade);
    }

     @Get('cep/:cep/coordenadas')
    buscarCepComCoordenadas(@Param('cep') cep:string){
        return this.localizacaoService.buscarCepComCoordenadas(cep);
    }

}

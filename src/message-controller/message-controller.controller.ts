import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { MensajeDto } from './dto/mensajedto';
import { MessagesService } from './messages/messages.service';
import { response } from 'express';


@Controller('message-controller')
export class MessageControllerController {

    constructor( private mensajeService: MessagesService){
        
    }

    @Post()
    create( @Body() mensaje: MensajeDto, @Res() response ){
        this.mensajeService.createMensaje( mensaje).then(
            mensaje => {
                response.status(HttpStatus.CREATED).json(mensaje);
            }
        ).catch( ()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la creacion.'});
        });
    }

    @Get()
    getAll( @Res() response ){
        this.mensajeService.getAll().then( mensajeList => {
            response.status( HttpStatus.OK ).json(mensajeList);
        }).catch( ()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la consulta.'});
        });
    }

    @Put( ':id' )
    updateById( @Body() updateMensajeDTO : MensajeDto, @Res() response, @Param() id){
        this.mensajeService.updateMensaje(id, updateMensajeDTO).then( mensaje => {
            response.status( HttpStatus.OK ).json(mensaje);
        }).catch(
            ()=>{
                response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la actualizacion.'});
            }
        );
    }

    @Delete( ':id' )
    deleteById(@Res() response, @Param() id){
        this.mensajeService.deleteMensaje( id ).then(
            mensaje =>{
                response.status( HttpStatus.OK ).json(mensaje);
            }
        ).catch(
            ()=>{
                response.status( HttpStatus.FORBIDDEN ).json({mensaje: 'Error al eliminar.'});
            }
        );
    }
}

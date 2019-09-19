import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from '../entities/mensaje.entity';
import { Repository } from 'typeorm';
import { MensajeDto } from '../dto/mensajedto';

@Injectable()
export class MessagesService {

    constructor(
        @InjectRepository( Mensaje )
        private  mensajeRepository: Repository<Mensaje>,
    ){}

    async getAll(): Promise<Mensaje[]>{
        return await this.mensajeRepository.find();
    }

    async createMensaje(msgNuevo: MensajeDto): Promise<Mensaje>{
        const msg = new Mensaje();
        msg.value = msgNuevo.value;
        msg.nick = msgNuevo.nick;

        return this.mensajeRepository.save(msg);
    }

    async updateMensaje(id: number, msgActualizar: MensajeDto): Promise<Mensaje>{
        const msg = await this.mensajeRepository.findOne( id );
        msg.nick = msgActualizar.nick;
        msg.value = msgActualizar.value;

        return await this.mensajeRepository.save( msg );
    
    }

    async deleteMensaje(id: number): Promise<any>{
        return await this.mensajeRepository.delete( id );
    }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractService } from "src/common/abstract.service";
import { Repository } from "typeorm";
import { Address } from "./addresses.entity";

@Injectable()
export class AddressesService extends AbstractService {
  constructor(
    @InjectRepository(Address) private readonly addressesRepository: Repository<Address>,
  ) {
    super(addressesRepository);
  }
}

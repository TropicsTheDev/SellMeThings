import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractService } from "src/common/abstract.service";
import { Repository } from "typeorm";
import { UserType } from "./userTypes.entity";

@Injectable()
export class UserTypesService extends AbstractService {
  constructor(
    @InjectRepository(UserType)
    private readonly userTypesRepository: Repository<UserType>,
  ) {
    super(userTypesRepository);
  }
}

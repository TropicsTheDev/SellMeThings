import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AbstractService {
  constructor(protected readonly repository: Repository<any>) {}

  findAll(): Promise<any[]> {
    return this.repository.find();
  }

  findOne(condition): Promise<any> {
                                        // { id: "myId "}
    return this.repository.findOne({ where: condition });
  }

  create(body): Promise<any> {
    return this.repository.save(body);
  }

  update(id, body): Promise<any> {
    return this.repository.update(id, body); 
  }

  delete(id): Promise<any> {
    return this.repository.delete(id);
  }
}

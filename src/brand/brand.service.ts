import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async createBrand(createBrandDto: CreateBrandDto) {
    const newBrand = await this.brandRepository.create(createBrandDto);
    await this.brandRepository.save(newBrand);
    return newBrand;
  }
}

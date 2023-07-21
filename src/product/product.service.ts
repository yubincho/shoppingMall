import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}


  async getAllProducts() {
    const products = await this.productRepository.find()
    return products
  }

  async getByIdOfProduct(id: string) {
    const product = await this.productRepository.findOneById(id)
    return product
  }

  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProductDto)
    await this.productRepository.save(newProduct)
    return newProduct
  }

  async updateProduct(id: string, updateProductDto:UpdateProductDto): Promise<UpdateProductDto | undefined> {
    const findProduct: Product = await this.productRepository.findOneById(id)
    if (findProduct !== null && updateProductDto) {
      if (updateProductDto.title) {
        findProduct.title = updateProductDto.title;
      }

      if (updateProductDto.price) {
        findProduct.price = updateProductDto.price;
      }

      if (updateProductDto.desc) {
        findProduct.desc = updateProductDto.desc;
      }

      await this.productRepository.save(findProduct)
      return findProduct
    }
    return undefined
  }

  async deleteByIdOfProduct(id: string) {
    await this.productRepository.delete(id)
    return 'deleted'
  }

}
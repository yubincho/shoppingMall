import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


@Controller('product')
export class ProductController {

  constructor(
    private readonly productService: ProductService
  ) {
  }


  @Get('all')
  async productGetAll() {
    const products = await this.productService.getAllProducts()
    return {count: products.length, products}
    // return products
  }

 @Get(':id')
  async productGeyById(
    @Param('id') id: string
 ) {
    return await this.productService.getByIdOfProduct(id)
 }

 @Post('create')
  async productCreate(
    @Body() createProductDto: CreateProductDto
 ) {
    const newProduct = await this.productService.createProduct(createProductDto)
    return newProduct
 }

 @Put(':id')
 async updateProduct(
   @Param('id') id: string, @Body() updateProductDto:UpdateProductDto
 ) {
    return await this.productService.updateProduct(id, updateProductDto)

 }

 @Delete(':id')
  async deleteProduct(@Param() id: string) {
    return await this.productService.deleteByIdOfProduct(id)
 }


}

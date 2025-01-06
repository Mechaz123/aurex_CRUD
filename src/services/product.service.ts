import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async findAllProduct(): Promise<Product[]> {
        return await this.productRepository.find({ relations: ['category', 'category.parentCategory'] });
    }

    async findOneProduct(id: number): Promise<Product> {
        return await this.productRepository.findOne({ where: { id }, relations: ['category', 'category.parentCategory'] });
    }

    async createProduct(Product: Partial<Product>): Promise<Product> {
        const newProduct = await this.productRepository.create(Product);
        return await this.productRepository.save(newProduct);
    }

    async updateProduct(id: number, Product: Partial<Product>): Promise<Product> {
        await this.productRepository.update(id, Product);
        return await this.findOneProduct(id);
    }

    async removeProduct(id: number) {
        let ProductData = await this.productRepository.findOneBy({ id });
        ProductData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        ProductData.updated_at = new Date(nowDate);
        return await this.updateProduct(id, ProductData);
    }
}

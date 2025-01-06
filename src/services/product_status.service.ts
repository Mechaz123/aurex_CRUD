import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStatus } from 'src/models/product_status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductStatusService {
    constructor(
        @InjectRepository(ProductStatus)
        private readonly productStatusRepository: Repository<ProductStatus>
    ) { }

    async findAllProductStatus(): Promise<ProductStatus[]> {
        return await this.productStatusRepository.find();
    }

    async findOneProductStatus(id: number): Promise<ProductStatus> {
        return await this.productStatusRepository.findOneBy({ id });
    }

    async createProductStatus(ProductStatus: Partial<ProductStatus>): Promise<ProductStatus> {
        const newProductStatus = await this.productStatusRepository.create(ProductStatus);
        return await this.productStatusRepository.save(newProductStatus);
    }

    async updateProductStatus(id: number, ProductStatus: Partial<ProductStatus>): Promise<ProductStatus> {
        await this.productStatusRepository.update(id, ProductStatus);
        return await this.findOneProductStatus(id);
    }

    async removeProductStatus(id: number) {
        let ProductStatusData = await this.productStatusRepository.findOneBy({ id });
        ProductStatusData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        ProductStatusData.updated_at = new Date(nowDate);
        return await this.updateProductStatus(id, ProductStatusData);
    }
}

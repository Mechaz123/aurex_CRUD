import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/models/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    async findAllCategory(): Promise<Category[]> {
        return await this.categoryRepository.find({ relations: ['parentCategory'] });
    }

    async findOneCategory(id: number): Promise<Category> {
        return await this.categoryRepository.findOne({ where: { id }, relations: ['parentCategory'] });
    }

    async createCategory(Category: Partial<Category>): Promise<Category> {
        const newCategory = await this.categoryRepository.create(Category);
        return await this.categoryRepository.save(newCategory);
    }

    async updateCategory(id: number, Category: Partial<Category>): Promise<Category> {
        await this.categoryRepository.update(id, Category);
        return await this.findOneCategory(id);
    }

    async removeCategory(id: number) {
        let CategoryData = await this.findOneCategory(id);
        CategoryData.active = false;
        const nowDate = new Date();
        nowDate.setHours(nowDate.getHours() - 5);
        CategoryData.updated_at = new Date(nowDate);
        return await this.updateCategory(id, CategoryData);
    }
}

using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Karapinhaxpto.Shared.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Service;
public class CategoryService:ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<bool> Create(CategoryAddDTO categoryAddDTO)
    {
        var category = new Category
        {
            Description = categoryAddDTO.Descripton,
        };
        return await _categoryRepository.Create(category);
    }

    public async Task<bool> Delete(int id)
    {
        var category=await _categoryRepository.GetById(id);
        if ((category!=null))
        {
            return await _categoryRepository.Delete(category);
        }
        return false;
       
    }

    public async Task<List<Category>> GetAll()
    {
        return await _categoryRepository.GetAll();
    }

    public async Task<Category> GetById(int id)
    {
        return await _categoryRepository.GetById(id);
    }

    public async Task<bool> Update(CategoryUpdateDTO categoryUpdateDTOs)
    {
        var category = await _categoryRepository.GetById(categoryUpdateDTOs.Id);
        
        if((category!=null))
        {
            category.Description = categoryUpdateDTOs.Description;
            return await _categoryRepository.Update(category);
        }
        return false;
    }
}

using Karapinhaxpto.DTOs;
using Karapinhaxpto.Shared.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Karapinhaxpto.Api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategory()
    {
        return Ok(await _categoryService.GetAll());
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        return Ok(await _categoryService.GetById(id));
    }

    [HttpPost("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        return Ok(await _categoryService.Delete(id));
    }
    [HttpPost]
    public async Task<IActionResult> CreateCategory(CategoryAddDTO categoryAddDTO)
    {
        return Ok(await _categoryService.Create(categoryAddDTO));
    }
    [HttpPut]
    public async Task<IActionResult> UpdateCategory(CategoryUpdateDTO categoryUpdateDTO)
    {
        return Ok(await _categoryService.Update(categoryUpdateDTO));
    }
}

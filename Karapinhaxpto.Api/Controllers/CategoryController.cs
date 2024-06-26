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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        return Ok(await _categoryService.Delete(id));
    }
    [HttpPost]
    public async Task<IActionResult> CreateCategory(CategoryAddDTO categoryAddDTO)
    {
        return Ok(await _categoryService.Create(categoryAddDTO));
    }
   


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryUpdateDTO categoryUpdateDTO)
    {
        if (id != categoryUpdateDTO.Id)
        {
            return BadRequest("O ID fornecido na URL não coincide com o ID no corpo da solicitação.");
        }

        var result = await _categoryService.Update(categoryUpdateDTO);
        if (result)
        {
            return NoContent();
        }

        return NotFound();
    }
}

using Karapinhaxpto.Shared.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DAL.Repository;
public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly KarapinhaxptoContext _context;
    public  GenericRepository(KarapinhaxptoContext context)
    {
        _context = context;
    }

    public async Task<bool> Create(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> Delete(T entity)
    {
        _context.Set<T>().Remove(entity);
        return await _context.SaveChangesAsync() > 0;
    }

   

    public async Task<List<T>> GetAll()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T> GetById(int id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<bool> Update(T entity)
    {
         _context.Entry(entity).State = EntityState.Modified;
        return await _context.SaveChangesAsync() > 0;
    }


  
   
}

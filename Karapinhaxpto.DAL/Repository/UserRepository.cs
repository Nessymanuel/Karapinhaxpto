using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DAL.Repository;
public class UserRepository : GenericRepository<User>, IUserRepository
{

    private readonly KarapinhaxptoContext _context;
    public UserRepository(KarapinhaxptoContext context) : base(context)
    {
        
        _context = context;
    }

    public async Task<User> GetByEmail(string email)
    {
        return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

    }
}




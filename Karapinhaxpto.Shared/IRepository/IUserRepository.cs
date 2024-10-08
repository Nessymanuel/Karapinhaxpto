﻿using Karapinhaxpto.DTOs;
using Karapinhaxpto.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IRepository;
public interface IUserRepository : IGenericRepository<User>
{
    Task<User> GetByEmail(string username);
   // Task<List<Model.Service>> GetByCategory(int categoryId);
}

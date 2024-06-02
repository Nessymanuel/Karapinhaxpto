﻿using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.DAL.Repository;
public class ProfileRepository:GenericRepository<Profile>, IProfileRepository
{
    public ProfileRepository(KarapinhaxptoContext context) : base(context)
    {
    }

   
}

using Karapinhaxpto.Model;
using Karapinhaxpto.Shared.IRepository;


namespace Karapinhaxpto.DAL.Repository;
public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
    public CategoryRepository(KarapinhaxptoContext context) : base(context)
    {
    }
}

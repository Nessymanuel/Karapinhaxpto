using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karapinhaxpto.Shared.IRepository;

    public class IEmailSettings
    {
        public string Server { get; set; }
        public int Port { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public  string Email { get; set; }
    }


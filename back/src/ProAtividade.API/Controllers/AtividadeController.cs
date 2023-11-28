using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.VisualBasic;
using ProAtividade.API.Data;
using ProAtividade.API.Models;
using SQLitePCL;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;
        public AtividadeController(DataContext context)
        {
            this._context = context;

        }
        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
        }

        [HttpGet("{id}")]
        public Atividade GetById(int id)
        {
            return _context.Atividades.FirstOrDefault(atividade => atividade.Id == id);
        }


        [HttpPost]
        public IEnumerable<Atividade> Post(Atividade atividade)
        {
            _context.Add(atividade);
            if (_context.SaveChanges() > 0)
                return _context.Atividades;
            else
                throw new Exception("Fail");
        }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if (atividade.Id != id) throw new Exception("Id's do not macth");

            _context.Update(atividade);
            if (_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(atividade => atividade.Id == id);
            else
                throw new Exception("Fail");
        }

        [HttpDelete("{id}")]
        public Boolean Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(atividade => atividade.Id == id);
            if (atividade == null) throw new Exception("Id does not exist");
            _context.Remove(atividade);
            return _context.SaveChanges() > 0;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Features._##Class##;
using API.Features.Photos;
using API.Model;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ##Class##Controller : BaseController
    {

        [HttpGet]
		public async Task<ActionResult<List<##Class##Dto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

		[HttpGet("{id}")]
		public async Task<ActionResult<##Class##Dto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }


        [HttpPost]
		public async Task<ActionResult<##Class##Dto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
		public async Task<ActionResult<##Class##Dto>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
		public async Task<ActionResult<Unit>> Delete(Guid id)
		{
			return await Mediator.Send(new Delete.Command { Id = id });
		}
    }
}